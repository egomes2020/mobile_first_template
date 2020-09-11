// select elements////////////////////////////////////////
const clear = document.querySelector('#clear-btn')
const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#add-input')
const add_btn = document.getElementById("add_btn");

//classes names///////////////////////////////////////////
const CHECK = "far fa-check-circle"
const UNCHECK = "far fa-circle"
const LINE_THROUGH = "lineThrough"


//variables ///////////////////////////////////////////////////
let LIST, id;

// GET ITEM FROM LOCAL STORAGE
let data = localStorage.getItem("TODO")

// CHECK IF DATA IS NOT EMPTY
if(data){
    LIST = JSON.parse(data);
    id = LIST.length
    loadList(LIST)
}else{
    // if data is not empty
    LIST = []
    id = 0
}

// LOAD ITEMS TO USER INTERFACE
 function loadList(array){
     array.forEach(function(item){
         addItem(item.name, item.id, item.done, item.trash)
     })
 }


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

    if(trash) {return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const position = "beforebegin"
    const itemElement = `<li class="list-item">
                            <i class="far ${DONE}" job="complete" id="${id}"></i>
                            <p class=" text ${LINE}"contenteditable="true" >${item}</p><i class="fas fa-trash-alt de" job="delete" id=" ${id}"></i>
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


            localStorage.setItem("TODO", JSON.stringify(LIST))


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



list.addEventListener("click",function (event) {
    const element = event.target // returns any item clicked 
    const elementJob = event.attributes.job.value // complete or delete

    if (elementJob == "complete"){
            completeItem(element)
     } else if (elementJob == "delete") {
             removeItem(element)
    }

    localStorage.setItem("TODO", JSON.stringify(LIST))


})