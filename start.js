import {Alert} from './alert.js';
import {MainArray} from './array.js'

class toDoList {

    addButton = document.querySelector(".add");
    input = document.querySelector(".engine");
    mainUl = document.querySelector(".main_list");

    alert = new Alert;
    mainTable = new MainArray;

    createSingleLi = (e) => {
        e.preventDefault();
        const li = document.createElement("li");
        li.innerHTML = this.input.value + `<button class="delete_button">usuń</button>`;
        li.className = "element";
        if (this.input.value == ""){
            this.alert.showPrimaryAlert();
            return
        }
        this.mainTable.pushPrimaryArray(li);
        this.mainTable.primaryArray.forEach((item,key) => {
            item.dataset.key = key;
            this.mainUl.appendChild(item);
        });
        this.input.value = "";
    
        
        
        
    }

    initialise() {
        const mainArray = []
        this.addButton.addEventListener("click", this.createSingleLi);
        
    }

}



const newToDoList = new toDoList;
newToDoList.initialise();