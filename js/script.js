// select elements////////////////////////////////////////
const clear = document.querySelector('#clear-btn')
const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#add-input')

//classes names///////////////////////////////////////////
const CHECK = "far fa-check-circle"
const UNCHECK = "far fa-circle"
const LINE_THROUGH = "line_through"

//show date////////////////////////////////////////////////
const options = {
    year: "numeric" ,
    weekday: "long", 
    month: "short", 
    day: "numeric"
}

const today = new Date()
date.innerText = today.toLocaleDateString("br", options);