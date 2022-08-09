//Headers
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

//PORT
app.listen(process.env.PORT || PORT, (req,res)=>{
    console.log('Connected to Database')
})

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

//MongoDB and CRUD
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Server is live on ${PORT} and ready to send the Waifus ^_^`)
        const db = client.db(dbName)//Database Name
        const animeBacklog = db.collection('animes')
        const animeComplete = db.collection('animeComplete')

        //EJS
        app.get('/', (req,res)=>{
            animeBacklog.find().toArray().then(resultAB=> {
              animeComplete.find().toArray().then(resultAC => {
                res.render('index.ejs', {animes: resultAB, animeComplete: resultAC})
            })
            .catch(error => console.error(error))
        })
        //Add Anime
        app.post('/addAnime', (req,res) =>{
            animeBacklog.insertOne({showName: req.body.showName, streamService: req.body.streamService, likes: 0})
            .then(result => {
                console.log('Anime Added')
                res.redirect('/')
            })
           .catch(error => console.error(error))
        })
        //Finish Anime
        app.post('/finishAnime', (req,res) =>{
            animeComplete.insertOne({showName: req.body.showName, streamService: req.body.streamService, likes: 0})
            .then(result =>{
                console.log('Anime finished! Moved to Completed')
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })
        //Like Anime
        app.put('/addOneLike', (req,res)=>{
            animeBacklog.updateOne({showName: req.body.showName, streamService: req.body.streamService, likes: req.body.likes},{
                $set: {
                    likes:req.body.likes + 1
                }
            },{
                sort: {_id: -1},
                upsert: true
            })
            .then(result => {
                console.log('Added One Like')
                res.json('Like Added')
            })
            .catch(error => console.error(error))
        })
        //Delete Anime
        app.delete('/deleteAnime', (req, res) => {
            animeBacklog.deleteOne({showName: req.body.showName})
            .then(result => {
                console.log('Anime Deleted')
                res.json('Anime Deleted')
            })
            .catch(error => console.error(error))
        })
        app.delete('/deleteAnimeFinish', (req, res) => {
            animeComplete.deleteOne({showName: req.body.showName})
            .then(result => {
                console.log('Finished Anime Deleted')
                res.json('Finished Anime Deleted')
            })
            .catch(error => console.error(error))
        })
    })
})


//About EJS
app.get('/about', (req,res) =>{
    res.render('about.ejs')
})
//Contact
app.get('/contact', (req,res) =>{
    res.render('contact.ejs')
})