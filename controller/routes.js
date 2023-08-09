const express = require("express")
const Bookmark= require("url")// Model

const router = express.Router()



// Routes:

// INDEX: - GET "/"                                         
router.get("/", async(req,res)=>{
    try{
    
        const allBookmark= await Bookmark.find({})
        res.json(allBookmark)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// CREATE: - POST- "/"                                      
router.post("/", async(req, res)=>{
    try{
      
        const oneBookmark = await Bookmark.create(req.body)
        res.json(oneBookmark)
    }
    catch(error){
        res.status(400).json({error})
    }
})
// SHOW: GET; "/:id" -           
router.get("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const oneBookmark= await Bookmark.findById(id);
        res.json(oneBookmark)
    }
    catch(error){
        res.status(400).json({error})
    }   
})

// UPDATE - PUT - "/:id" -   

router.put("/:id", async(req,res)=>{
    try{
        const id= req.params.id
        const oneBookmark = await Bookmark.findByIdAndUpdate(id, req.body,{new:true})
        res.json(oneBookmark)
    }
    catch(error){
        res.status(400).json(error)
    }
})

// DESTROY - DELETE - "/:id" 
router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id
        const oneBookmark = await Bookmark.findByIdAndDelete(id)
        res.status(204).json(oneBookmark)
    }
    catch(error){
        res.status(400).json(error)
    }
})



module.exports=router