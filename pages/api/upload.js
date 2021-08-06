import { ImageAnnotatorClient } from '@google-cloud/vision'
import nc from 'next-connect'
import { hasUnsafeContent } from '../../lib/util'
import multer from 'multer'
import { memoryStorage } from 'multer'
import DataURIParser from 'datauri/parser'
import path from 'path'
import { ALLOWED_FORMATS } from '../../util/variables'
import cloudinary from 'cloudinary'
import { getGSACredentials } from '../../lib/util'

const storage =  memoryStorage()
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if(ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, file)
    } else {
      cb (new Error('Not supported format file type.', false))
    }
  }
 })

const formatBufferTo64 = (file) => { 
  const parser = new DataURIParser()
  return parser.format(path.extname(file.originalname).toString(), file.buffer)
}


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}) 
const cloudinaryUpload = (file) => cloudinary.v2.uploader.unsigned_upload(
  file, process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET, { cloud_name: "worldin2021" }
)

const handler = nc()
  .use(upload.single("image"))
  .post( async (req,res) => {    
  const projectId = process.env.GOOGLE_PROJECT_ID
  const credentials = getGSACredentials()
  // Check if image has inappropriate content
  const visionClient = new ImageAnnotatorClient({projectId, credentials})
  const [result] = await visionClient.safeSearchDetection(req.file.buffer)
  const detections = result.safeSearchAnnotation;
  if (!detections) {
    return res.status(417).json({uploaded: false, message: "An error occured during safe search detection."}) 
  }
  if (hasUnsafeContent(detections)) {
    return res.status(200).json({uploaded: false, message: "Image upload failed because image might contain adult, violence, medical, racy or other disturbing content."}) 
  }
  const file64 = formatBufferTo64(req.file)
  const uploadResult = await cloudinaryUpload(file64.content)

 res.json({uploaded: true, cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url})
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler