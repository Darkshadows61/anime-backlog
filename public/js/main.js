//Constants
const deleteText = document.querySelectorAll('#anime-trash')
const thumbText = document.querySelectorAll('#anime-like')
const finishAnimeText = document.querySelectorAll('#anime-finish')
const finishAnimeDelete = document.querySelectorAll('#anime-trash-finish')
const finishAnimeLike = document.querySelectorAll('#anime-finish-like')

//Arrays
Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteAnime)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})
Array.from(finishAnimeText).forEach((element) =>{
    element.addEventListener('click', finishAnime)
    element.addEventListener('click', deleteAnime)
})

Array.from(finishAnimeDelete).forEach((element) =>{
    element.addEventListener('click', deleteAnimeFinish)
})

//Async Await
async function deleteAnime(){
    const showName = this.parentNode.childNodes[1].innerText
    const streamService = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteAnime', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'showName': showName,
              'streamService': streamService
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteAnimeFinish(){
    const showName = this.parentNode.childNodes[1].innerText
    const streamService = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteAnimeFinish', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'showName': showName,
              'streamService': streamService
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function finishAnime(){
    const showName = this.parentNode.childNodes[1].innerText
    const streamService = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('finishAnime', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'showName': showName,
              'streamService': streamService,
              'likes': tLikes
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const showName = this.parentNode.childNodes[1].innerText
    const streamService = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'showName': showName,
              'streamService': streamService,
              'likes': tLikes
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
