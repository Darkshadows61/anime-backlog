//Headers
const express = require('express')
const app = express()
const PORT = 8000

const animeShows = {
    'onegai muscle': {
        'showName': 'Onegai Muscle',
        'streamService': 'Crunchy Roll'
    },
    'dance in the navel engagement': {
        'showName': 'Dance in the Navel Engagement',
        'streamService': 'Amazon Prime'
    },
    'unknown': {
        'showName': 'Unknown',
        'streamService': 'Unknown'
    },
}

//Setup PORT and where to Listen
app.listen(PORT, ()=>{
    console.log(`Server is live on ${PORT} and ready to send the Waifus ^_^`)
})

//Send basic html file
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//Respond with JSON
app.get('/api/:name' ,(req,res)=>{
    const animeShowName = req.params.name.toLowerCase()
    if( animeShows[animeShowName] ){
        res.json(animeShows[animeShowName])
    } else {
        res.json(animeShows['unknown'])
    }
})