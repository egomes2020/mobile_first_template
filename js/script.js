// select elements////////////////////////////////////////
const clear = document.querySelector('#clear-btn')
const date = document.querySelector('#pdate')
const list = document.querySelector('#list')
const input = document.querySelector('#add-input')


//classes names///////////////////////////////////////////
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle"
const LINE_THROUGH = "lineThrough"


//variables local storage ///////////////////////////////////////////////////
// let LIST = JSON.parse(localStorage.getItem('COMPRAS')) || [], id= 0

let LIST, id

 //add item to localstorage

function saveStorage(){
    localStorage.setItem("COMPRAS", JSON.stringify(LIST))
}

//get item from localstorage
let data = localStorage.getItem('COMPRAS')

LIST = JSON.parse(data) || [], id=0
loadList()


// load itens to interface
function loadList(){
    LIST.forEach(function(item){
        addItem(item.name, item.id, item.done, item.trash)
    })
}



//clear localstorage
clear.addEventListener("click", function(){
    localStorage.clear()
    location.reload()
})



//show date////////////////////////////////////////////////
const options = {
    year: "numeric" ,
    weekday: "long", 
    month: "short", 
    day: "numeric"
}

const today = new Date()
date.innerText = today.toLocaleDateString("br", options);






//function add item //////////////////////////////////////////
function addItem(item, id, done, trash){

    if(trash) {return}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "afterbegin"
    const itemElement = `<li class="list-item">
                            <i class="far ${DONE} " job ="complete" id="${id}"></i>
                            <p class="text ${LINE}" contenteditable="true" >${item}</p><i class="fas fa-trash-alt de" job ="delete" id=" ${id}"></i>
                        </li>
                        `;

    list.insertAdjacentHTML(position, itemElement)

}



// add item with keyup ""enter //////////////////////////////
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
       const item = input.value
        //if the input isn´t empty
        if(item){
            addItem(item, id, false, false)

            LIST.push({
                name: item,
                id: id,
                done: false,
                trash: false
            })


            //add item to localstorage
            saveStorage()

            id++
        }

        input.value=""
    }
})





//function complete item /////////////////////////////////////////
function completeItem(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true
}





// function remove item ////////////////////////////////////////////////
function removeItem(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true

}




// target the items ///////////////////////////////////////////////
document.addEventListener("click", function(event){
    const element = event.target
    const elementJob = element.attributes.job.value

    if (elementJob == "complete"){
        completeItem(element)
    } else if(elementJob == "delete"){
        removeItem(element)
} 

    //add item to localstorage
    saveStorage()
}) 




//function loader
window.addEventListener("load", function (){
    const loader = document.querySelector(".loader")
    loader.className += " hidden"
})
