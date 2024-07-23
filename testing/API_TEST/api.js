const express = require('express');

const app = express();

const db = require('./db')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(5000,()=>{
    console.log("server started at port 5000")
})

app.get('/mobiles',(req,res)=>{
    db.getMobiles()
    .then((mobiles)=>{
        res.send(mobiles)

    })
    .catch((err)=>{
        res.send(err)
    })
    
})
app.post('/mobiles',(req,res)=>{
    db.addMobile(req.body.id,req.body.name,req.body.price,req.body.ram,req.body.storage)
    .then(()=>{
        res.send(req.body)

    })
    .catch((err)=>{
        res.send(err)
    })
})
app.put('/mobiles',(req,res)=>{
    db.updateMobile(req.body.name,req.body.price,req.body.ram,req.body.storage,req.body.id)
    .then(()=>{
        res.send(req.body)

    })
    .catch((err)=>{
        res.send(err)
    })
})
app.delete('/mobiles',(req,res)=>{
    db.deleteMobile(req.body.id)
    .then(()=>{
        res.send("deleted")

    })
    .catch((err)=>{
        res.send(err)
    })
})