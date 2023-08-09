const app = express();


// SHOW //
// get a single bookmark
app.get('/bookmark/:id', async (req, res) => {
    try {
        const id = req.params.id
        // get a bookmark from db
        const bookmark = await Bookmark.findById(id)
        //return bookmark as json
        res.json(bookmark)
    } catch (error) {
        res.status(400).json({error})
    }
})