const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")
var bodyParser = require('body-parser')
var student = new Array();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: "hello,wolrd!!"
    })

});


app.get("/hello", (req, res) => {
    console.log(req.query);
    res.json({
        message: "hello - world!" + req.query.name + " !"
    })
});


app.get("/class/:id", (req, res) => {
    res.json({
        params: req.params
    })
    console.log(req.params);
});



app.get("/class", (req, res) => {
    res.json({
        message: "Get request"
    })
});

app.post("/class", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Post request"
    })
});


// PRACTICE
app.get('/sum/:x1/:x2', (req, res) => {

    res.json(parseInt(req.params.x1) + parseInt(req.params.x2));
})
app.get("/sum", (req, res) => {
    res.json(parseInt(req.query.x1) + parseInt(req.query.x2));
})

app.get("/student",(req,res)=>{
    res.json({
        students:student
    })
})
app.post("/student", (req, res) => {
    student.push({
        id: req.body.id,
        name: req.body.name
    })
    res.json({
        students:student,
    })


})


app.delete("/student/:id", (req, res) => {
    student = student.filter(item => item.id !== req.params.id);
    res.json({
        students:student
    })
})


app.put("/student/:id",(req,res)=>{
    student = student.map(item=>{
        if(item.id === req.params.id){
            item.name = req.body.name
        }
        return item;
    })
    res.json({
        students:student
    })
})


app.get("/student/:id",(req,res)=>{
    res.json({
        student:student.find(item => item.id === Number(req.params.id))
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

console.log("Server is running")