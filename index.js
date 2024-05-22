const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./Files`, (err, files) => {
    res.render("index",{files:files});
  });
});
app.post("/create",(req,res)=>{
    
    fs.writeFile(`./files/${req.body.taskName.split(" ").join("")}.txt`,req.body.taskDesc,(err)=>{
        res.redirect("/")
    })
})
app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./Files/${req.params.filename}`,"utf-8",(err,fileData)=>{
        res.render('show',{filename: req.params.filename , fileData: fileData})
    })
})
app.get("/edit/:filename",(req,res)=>{
    res.render('edit',{filename: req.params.filename})
})

app.post("/edit",(req,res)=>{
    fs.rename(`./Files/${req.body.previous}`,`./Files/${req.body.new}`,(err)=>{
        console.log(req.body);
        res.redirect("/")
    })
    
})

app.listen(3000, (req, res) => {
  console.log("Server working");
});
