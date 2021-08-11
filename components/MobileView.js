
import style from "../styles/mobile.module.css"
import { WEBSITE } from "../util/variables"
import Image from "next/image"

export default function MobileView() {
    
    return (
        <div className={style.container}>
            <Image
                priority  
                src={WEBSITE.THUMBNAIL.IMAGE_PREVIEW_DEFAULT}            
                layout="fill"                
                alt="No image found"
            />
            <span>Visit page on any device without touch screen!</span>
        </div>
    )
}