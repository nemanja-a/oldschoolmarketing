import { connectToDatabase } from "../../util/mongodb"

    // Get Websites
    export default async function handler(req, res) {
        const { db } = await connectToDatabase()
        const query = req.query
        const page = await db.collection("websites").findOne({page: Number(query.page)})
        let updatedPage = JSON.parse(JSON.stringify(page));
        const categories = query.categories && query.categories.length && query.categories.split(',').map(category =>{
            return parseInt(category, 10);
        })
        if (categories) {
            for (var i = 0; i < updatedPage.websites.length; i++) {
                 if (!categories.includes(String(updatedPage.websites[i].category))) {
                    updatedPage.websites[i] = { 
                        columnIndex: updatedPage.websites[i].columnIndex,
                        rowIndex: updatedPage.websites[i].rowIndex,
                        isEmpty: true
                    }
                }
            }
        } 
        categories ? res.json(updatedPage) : res.json(page)
    }