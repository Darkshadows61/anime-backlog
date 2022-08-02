//Headers
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//MongoDB
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'backlog'

//Middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Setup PORT and where to Listen
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Server is live on ${PORT} and ready to send the Waifus ^_^`)
        const db = client.db(dbName)//Database Name
        const animeCollection = db.collection('animes')
        app.get('/', (req,res)=>{
            animeCollection.find().toArray()
            .then(data => {
                res.render('index.ejs', {animes: data})
            })
            .catch(error => console.error(error))
        })
        app.post('/addAnime', (req,res) =>{
            animeCollection.insertOne({showName: req.body.showName, streamService: req.body.streamService, likes: 0})
            .then(result => {
                console.log('Anime Added')
                res.redirect('/')
            })
           .catch(error => console.error(error))
        })
        app.put('/addOneLike', (req,res)=>{
            animeCollection.updateOne({showName: req.body.showName, streamService: req.body.streamService, likes: req.body.likes},{
                $set: {
                    likes:req.body.likes + 1
                }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Like')
                response.json('Like Added')
            })
            .catch(error => console.error(error))
        })
        app.delete('/deleteAnime', (req, res) => {
            animeCollection.deleteOne({stageName: req.body.showName})
            .then(result => {
                console.log('Anime Deleted')
                res.json('Anime Deleted')
            })
            .catch(error => console.error(error))
        })
})


app.listen(process.env.PORT || PORT, (req,res)=>{
    console.log('yes')
})