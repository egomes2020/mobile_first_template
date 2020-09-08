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



//function add item //////////////////////////////////////////
function addItem(item){
    let position = "beforebegin"
    let itemElement = `<li class="list-item"  contenteditable="true">
                            <i class="far fa-circle" job="complete"></i>
                            <p> ${item}<i class="fas fa-trash-alt de" job="delete"></i></p><i>
                        </li>`

    list.insertAdjacentHTML(position, itemElement)

}

// add item with keyup ""enter //////////////////////////////
document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        item=input.value
        //if the input isn´t empty
        if(item){
            addItem(item)
        }

        input.value=""
    }
})