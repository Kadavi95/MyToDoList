//POBIERANIE I DODAWANIE OBIEKTOW i ELEMENTOW//

const addButton = document.querySelector(".add");
const searchButton = document.querySelector(".search");
const deleteMainButton = document.querySelector(".delete_main");
const numberOfTasks = document.querySelector(".heading_container h1 span");
const input = document.querySelector(".engine");
const mainUl = document.querySelector(".main_list");
const liElements = document.getElementsByClassName("element");
const mainTable = [];
let flag = false;
//Funkcja(w funkcji w innej funkcji) do wywoływania alertu//

const alertSearch = () => {
    alert('Treść zadania jest pusta, uzupełnij treść')
}
//Funkcja w innej funkcji do ograniczenia liczby znaków i wyświetlenia alertu//
const secondarySearchAlert = () => {
    alert('Zawartość znaków ograniczona do 16 znaków')
}
//Funkcja w innej fukcji informująca, że nie wyczyszczę zadań, póki choć jedno nie będzie w tablicy//
const thirdSearchAlert = () => {
    alert('Lista zadań jest pusta')
}
//Funcja czyszczączca zawartość głównego UL'a oraz jednocześnie dodająca do UL'a elementy po wykonaniu metody splice na main table//
const reset = () => {
    mainUl.textContent = '';
    mainTable.forEach((item, key) => {
    item.dataset.key = key;
    mainUl.appendChild(item)
    })
}
//Funkcja w funkcji addSomeTask usuwająca poszególne elementy//
const remove = (e) => {
    e.preventDefault()
    const index = e.target.parentNode.dataset.key;
    mainTable.splice(index,1);
    reset()
    numberOfTasks.textContent = liElements['length'];
}
//Fukcja zasadniczq dla addButton- dodawanie zadań, stylowanie nowych elementów//
const addSomeTask = function (e) {
    e.preventDefault();
    const inputValue = input.value;
    if (inputValue === '') {
        alertSearch()
        return
    };
    if (inputValue.length > 15) {
        console.log(inputValue['length'])
        secondarySearchAlert()
        return
    }
    const li = document.createElement('li');
    li.innerHTML = inputValue + `<button class="delete_button">usuń</button>`;
    li.className = 'element';
    mainTable.push(li);
    mainTable.forEach((item,key) => {
        item.dataset.key = key
        mainUl.appendChild(item)
    });
    console.log(mainTable)
    input.value = '';
    numberOfTasks.textContent = liElements['length'];
    li.querySelector("button").addEventListener('click', remove);
    li.querySelector("button").style.backgroundColor = "#ccffff";
    li.querySelector("button").style.color = "#000000 ";
    li.querySelector("button").style.border = "1px solid #ffccff";
    li.querySelector("button").style.borderRadius = "50%";
    li.querySelector("button").style.marginLeft = "5px";
    li.querySelector("button").style.height = "25px";
    li.querySelector("button").style.width = "45px"; 
    flag = false; 
    searchButton.textContent = 'Wyszukaj zadanie';

}
//Funkcja dla searchbutton z wykorzystaniem "flagi"//
const searchSomeTask = (e) => {
    e.preventDefault();
    const inputValue = input.value.toLowerCase()
    if (flag === false) {
        if (inputValue === '') {
            alertSearch()
            return
        }
        flag = true;
        searchButton.textContent = 'Resetuj wyszukiwanie';
        input.value = '';
        let searchMainTable = [...liElements];
        searchMainTable = searchMainTable.filter((li) => li.textContent.toLowerCase().includes(inputValue))
        mainUl.textContent = ''
        searchMainTable.forEach(item => mainUl.appendChild(item))
        numberOfTasks.textContent = liElements['length']
    } else if ( flag === true) {
        flag = false; 
        searchButton.textContent = 'Wyszukaj zadanie';
        input.value = '';
        mainUl.textContent = '';
        mainTable.forEach(item => mainUl.appendChild(item));
        numberOfTasks.textContent = liElements['length']
    }
}
//Zbieżne do addSomeTask tyle, że uzależnione od klawisza enter (keyCode === 13)//
const addTaskByEnter = (e) => {
    if (e.keyCode === 13){
        const inputValue = input.value;
        if (inputValue === '') {
            alertSearch()
            return
        };
        if (inputValue.length > 15) {
            console.log(inputValue['length'])
            secondarySearchAlert()
            return
        }
        const li = document.createElement('li');
        li.innerHTML = inputValue + `<button class="delete_button">usuń</button>`;
        li.className = 'element';
        mainTable.push(li);
        mainTable.forEach((item,key) => {
            item.dataset.key = key
            mainUl.appendChild(item)
        });
        input.value = '';
        numberOfTasks.textContent = liElements['length'];
        li.querySelector("button").addEventListener('click', remove);
        li.querySelector("button").style.backgroundColor = "#ccffff";
        li.querySelector("button").style.color = "#000000 ";
        li.querySelector("button").style.border = "1px solid #ffccff";
        li.querySelector("button").style.borderRadius = "50%";
        li.querySelector("button").style.marginLeft = "5px";
        li.querySelector("button").style.height = "25px";
        li.querySelector("button").style.width = "45px"; 
        flag = false; 
        searchButton.textContent = 'Wyszukaj zadanie';
    } else {
        return
    }
}
const deleteAllTasks = (e) => {
    e.preventDefault();
    if(mainTable['length'] === 0) {
        thirdSearchAlert()
        return
    }
    const inputValue = input.value.toLowerCase();
    input.value = '';
    mainTable.length = 0;
    mainUl.textContent = '';
    numberOfTasks.textContent = '';

    flag = false; 
    searchButton.textContent = 'Wyszukaj zadanie';
}
//Buttons-add Event//
addButton.addEventListener('click', addSomeTask);
input.addEventListener('keydown',addTaskByEnter);
searchButton.addEventListener('click', searchSomeTask);
deleteMainButton.addEventListener('click', deleteAllTasks);


