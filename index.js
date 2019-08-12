const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true });


const Student = mongoose.model('Student', {
    name: String,
    address: {
        type:Map,
        validate:function(v){
            return v.get("road") !== "ABC";
        }
    }
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (a, b) => {
    b.json({
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





app.get("/student", (req, res) => {
    Student.find({}, function (err, docs) {
        if (!err) {
            res.json({
                student: docs
            });
        } else {
            res.json({
                success: false
            });
        }
    });
    // res.json({
    //     students: student
    // })
})
app.post("/student", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const student = new Student({
        name: name,
        address: address,
    });
const err = student.validateSync();
console.log(err)
    student.save(function (err) {
        if (!err) {
            res.json({
                success: true,
            })
        }
        else {
            res.json({
                success: false,
            })
        }
    });
    // res.json({
    //     success:true,
    // })


})


app.delete("/student/:id", (req, res) => {
    Student.deleteOne({ _id: req.params.id }, function (err) {
        res.json({ success: !err });
    });

})


app.put("/student/:id", (req, res) => {
    Student.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        address: req.body.address,
    },
        function (err) {
            if (!err) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    )
})


app.get("/student/:id", (req, res) => {
    Student.findOne({ _id: req.params.id }, function (err, student) {
        if (!err) {
            res.json({
                student: student
            });
        }
        else {
            res.json({
                success: false
            });
        }
    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

console.log("Server is running")