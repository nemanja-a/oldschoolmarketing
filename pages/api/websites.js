import { connectToDatabase } from "../../util/mongodb"
import { createCipheriv, randomBytes, createDecipheriv } from "crypto";

    // Get Websites
    export default async function handler(req, res) {
        const { db } = await connectToDatabase()
        // temp
      
        //
          const query = req.query
          const websites = await db
              .collection("websites")
              .findOne({page: Number(query.page)})
              res.json(websites)
    }