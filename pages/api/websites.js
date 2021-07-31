import { connectToDatabase } from "../../util/mongodb"

    // Get Websites
    export default async function handler(req, res) {
        const { db } = await connectToDatabase()
        const query = req.query
        const page = await db.collection("websites").findOne({page: Number(query.page)})
        let updatedPage = JSON.parse(JSON.stringify(page));
        if (query.category) {            
            for (var i = 0; i < updatedPage.websites.length; i++) { 
                if (updatedPage.websites[i].categories && !updatedPage.websites[i].categories.includes(Number(query.category))) {
                    updatedPage.websites[i] = { 
                        columnIndex: updatedPage.websites[i].columnIndex,
                        rowIndex: updatedPage.websites[i].rowIndex,
                        isEmpty: true
                    }
                }
            }
        } 
        query.category ? res.json(updatedPage) : res.json(page)
    }