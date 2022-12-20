const express = require("express")
const bodyParser = require("body-parser")
const ejs = require('ejs')
const mongoose = require('mongoose')


const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

// connexion à la bdd 
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost/sotherbyDB", { useNewUrlParser: true })

//creer notre premier schema 
const paintingSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
})

const Painting = mongoose.model("paintingSold", paintingSchema)

const Jonconde = new Painting({
    name: "La Jonconde",
    author: "Leonard de Vinci",
    price: 400
});

const Guernica = new Painting({
    name: "Guernica",
    author: "Picasso",
    price: 200
});

const NuitEtoilee = new Painting({
    name: "La Nuit Etoilée",
    author: "Van Gogh",
    price: 300
});

/*
Painting.insertMany([Jonconde, Guernica, NuitEtoilee], (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("insert success")
    }
})
*/


app.get('/painting', (req, res) => {
    Painting.find({}, (err, peintures) => {
        if (err) {
            console.log(err)
        } else {
            res.send(peintures)
        }
    })
})
app.post('/painting', (req, res) => {
    const Object = new Painting({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price
    })
    Object.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("peinture vendu")
        }
    })
})

app.delete('/painting', (req, res) => {
    Painting.deleteMany({}, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("peinture supprimé")
        }
    })
})


app.get("/painting/:paintingName", (req, res) => {
    Painting.findOne({ name: req.params.paintingName }, (err, peinture) => {
        if (err) {
            console.log(err)
        } else {
            res.send(peinture)
        }
    })
})

app.put('/painting/:paintingName', (req, res) => {
    Painting.replaceOne(
        { name: req.params.paintingName },
        { name: req.body.name, author: req.body.author, price: req.body.price }, // ici on ajoute nos nouveaux parametres 
        { overwrite: true }, // parametre de mongoose, on lui dit qu'on peut reecrire au dessus 
        (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("put updated")
            }
        })
})


app.listen(3002, (req, res) => {
    console.log("Serveur lancée sur le port 3002")
}) 