import { connectToDatabase } from "../../util/mongodb"

// Get Websites
export default async function handler(req, res) {
    const { db } = await connectToDatabase()
    const query = req.query
    const page = await db.collection("websites").findOne({ page: Number(query.page) })
    let updatedPage = JSON.parse(JSON.stringify(page));
    if (query.category || query.country) {
        for (var i = 0; i < updatedPage.websites.length; i++) {
            const hasCategory = updatedPage.websites[i].categories && updatedPage.websites[i].categories.includes(Number(query.category))
            const hasCountry = updatedPage.websites[i].countries && updatedPage.websites[i].countries.includes(Number(query.country))
            if (
                (query.category && query.country && (!hasCategory || !hasCountry)) ||
                (query.category && !hasCategory) ||
                (query.country && !hasCountry)
            ) {
                updatedPage.websites[i] = {
                    columnIndex: updatedPage.websites[i].columnIndex,
                    rowIndex: updatedPage.websites[i].rowIndex,
                    isEmpty: true
                }
            }
        }
    }
    query.category || query.country ? res.json(updatedPage) : res.json(page)
}