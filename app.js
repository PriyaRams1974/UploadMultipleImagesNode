const express = require('express');
const ejs = require('ejs')
const app = express();
const multer = require('multer');

let data = []

app.use(express.static("upload"));
app.set("view engine","ejs");


const storage = multer.diskStorage({
destination : (req,file,cb)=>{
    cb(null,"upload")
},
filename : (req,file,cb)=>{
    cb(null,Date.now()+"_"+file.originalname)
}
})



app.post("/uploading_images",async(req,res)=>{
    try{
        const upload = multer({storage:storage}).array('file',6);
        upload(req,res,(err)=>{
            if(!req.files){
                res.send({"status":"failure",message:"select your file"})
            }else if(err){
                res.send({"err":err.message})
            }else if(req.files.length == 0){
                res.send({status:'failure',message:"please select your file"})
            } else{
                //res.send({status:"sucess",data:req.files})
                // for(let i of req.files){
                //     console.log("data",i)
                //     res.render('index',{data : i})
                // }
                const data = req.files
                console.log("data = ",data)
                res.render('index',{data})
            }
        })


    }catch(err){
        res.json({"err":err.message})
    }
})

app.get('/',(req,res)=>{
res.render('index',{data:[]})
})



app.listen(7070,()=>{
    console.log("server started...")
})