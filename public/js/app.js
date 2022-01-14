//const { response } = require("express")

//console.log('Client side javascript file is loaded!')

//we'll be using fetch, which is a browser based api.
// it can be used in client side javascript, but not in the backend in node.
//calling fetch in our client side js kicks of an asynchronous i/o operation.
// it is like calling request in nodejs. This means that we won't have access to the data right away.
// instead we'll provide a function which will run when the data is available.

//puzzle.mead.io/puzzle
//the first argument is the url we're tyring to fetch from
//the second argument is a callback function which will be executed when the data is available. It is passed after the then keyword.
//then function is a part of a much bigger api called as promises.
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
})*/

/*fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = '' //empty for now

//the first argument for an event listener will be the event, and the second argument will be a callback function
//the callback function runs every time the event takes place.
//e is an event which is an argument to the callback function.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //it will prevent the default behaviour of refreshing the browser.
    //console.log('testing!')

    const location = search.value
    //console.log(location)

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                messageOne.textContent = data.error
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})