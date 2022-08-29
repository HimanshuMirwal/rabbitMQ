const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const SendRabbit = require("./Send-reddis.js");
const modelEmailUSer = require("./models/emailUser");
const ReceiveRabbit = require("./receive-reddis.js");
const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect("mongodb+srv://admin-himanshu:test123@cluster0.qewzz.mongodb.net/Practice?retryWrites=true&w=majority")
    .then(data => {
        console.log("connected")
    }).catch(Err => console.log("error", Err));

app.get("/", (req, res) => {
    modelEmailUSer.find().then(data => {
    res.json(data)
}).catch(Err => console.log("Err from receice-rabbit while updating, ", Err))
})
app.post("/send", (req, res) => {
    console.log(req.body)
    const { email, subject, description } = req.body
    const newData = new modelEmailUSer({
        email: email,
        subject: subject,
        description: description,
        response: "none"
    })
    newData.save()
        .then((data) => {
            SendRabbit.Send({ ...newData, _id: data._id });
            ReceiveRabbit.Receive()
            res.json("data send successfully.")
        })
        .catch(Err => {
            console.log("Error from /send route", Err)
            res.json("Error from /send route", Err)
        });
    // console.log(process.env);
})
app.get("/users", (req, res) => {
    modelEmailUSer.find()
    .then(data=>{
        res.json(data)
    })
    .catch(Err=>console.log(Err));
})
app.get("/delete", (req, res) => {
    modelEmailUSer.deleteMany({},function(err) {
        if (err) {
            console.log(err)
        } else {
            res.send('data delted');
        }
    })
    .then(data=>{
        console.log(data)
    })
    .catch(Err=>console.log(Err));
})
app.listen(5000, function () {
    console.log("server is running on 5000")
})