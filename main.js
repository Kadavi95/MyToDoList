//POBIERANIE I DODAWANIE OBIEKTOW i ELEMENTOW//
const addButton = document.querySelector(".add");
const searchButton = document.querySelector(".search");
const deleteMainButton = document.querySelector(".delete_main");
const allButtons = [...document.querySelectorAll('.buttonMenu')];
const numberOfTasks = document.querySelector(".heading_container h1 span");
const numberOfTaskH = document.querySelector(".heading_container h1")
const input = document.querySelector(".engine");
const mainUl = document.querySelector(".main_list");
const liElements = document.getElementsByClassName("element");
const mainTable = [];
const darkModeFakeButton = document.querySelector(".dark_mode-container .dark_mode-background");
const darkModeFakeCircle = document.querySelector(".dark_mode-container .dark_mode-background .dark_mode-circle");
const darkModeSiteBody = document.querySelector('body');
let flag = false;
let secondaryFlag = false;
let valueForBodyHeight = 100;

//Funkcja(w funkcji w innej funkcji) do wywoływania alertu//

const alertSearch = () => {
    alert('Treść zadania jest pusta, uzupełnij treść')
}
//Funkcja w innej funkcji do ograniczenia liczby znaków i wyświetlenia alertu//
const secondarySearchAlert = () => {
    alert('Zawartość znaków ograniczona do 22 znaków')
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
    //usunięte do zmiany koncepcji na overFlowScroll//
    // if (mainTable.length > 5) {
    //     valueForBodyHeight -= 10;
    //     document.body.style.height = `${valueForBodyHeight}vh`
    //     console.log(valueForBodyHeight)
    // }
}
//Fukcja zasadniczq dla addButton- dodawanie zadań, stylowanie nowych elementów//
const addSomeTask = function (e) {
    e.preventDefault();
    const inputValue = input.value;
    if (inputValue === '') {
        alertSearch()
        return
    };
    if (inputValue.length > 22) {
        console.log(inputValue['length']);
        secondarySearchAlert()
        return
    }
    const li = document.createElement('li');
    li.innerHTML = inputValue + `<button class="delete_button">usuń</button>`;
    li.className = 'element';
    if (secondaryFlag === false) {
        li.style.color = '#000'
    } else if(secondaryFlag === true) {
        li.style.color = '#fff'
    } 
    mainTable.push(li);
    mainTable.forEach((item,key) => {
        item.dataset.key = key
        mainUl.appendChild(item)
    });
    console.log(mainTable)
    input.value = '';
    numberOfTasks.textContent = liElements['length'];
    li.querySelector("button").addEventListener('click', remove);
    flag = false; 
    searchButton.textContent = 'Wyszukaj zadanie';
     //warunek zwiąkszający wysokość body przy dłuższej liście zadań
     //na próbę usuwam//
    // if (mainTable.length > 6 ){
    //     valueForBodyHeight += 10;
    //      document.body.style.height = `${valueForBodyHeight}vh`
         
         
    // } 
    if (mainTable.length > 4 && mainTable.length < 6 || window.innerWidth < 415 && mainTable.length > 3  && mainTable.length < 4 ) {
        valueForBodyHeight += 10;
        document.body.style.height = `${valueForBodyHeight}vh`
    };
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
        searchMainTable = searchMainTable.filter((li) => li.textContent.toLowerCase().includes(inputValue));
        mainUl.textContent = '';
        searchMainTable.forEach(item => mainUl.appendChild(item));
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
        if (inputValue.length > 22) {
            console.log(inputValue['length'])
            secondarySearchAlert()
            return
        }
        const li = document.createElement('li');
        li.innerHTML = inputValue + `<button class="delete_button">usuń</button>`;
        li.className = 'element';
        if (secondaryFlag === false) {
            li.style.color = '#000'
        } else if(secondaryFlag === true) {
            li.style.color = '#fff'
        } 
        mainTable.push(li);
        mainTable.forEach((item,key) => {
            item.dataset.key = key
            mainUl.appendChild(item)
        });
        console.log(mainTable)
        input.value = '';
        numberOfTasks.textContent = liElements['length'];
        li.querySelector("button").addEventListener('click', remove);
        flag = false; 
        searchButton.textContent = 'Wyszukaj zadanie';
        //warunek zwiąkszający wysokość body przy dłuższej liście zadań//
        //na próbę usuwam//
        // if (mainTable.length > 4  ||  window.innerWidth < 415 && mainTable.length > 3 ){
        //     valueForBodyHeight += 10;
        //     document.body.style.height = `${valueForBodyHeight}vh`

        // } 
        if (mainTable.length > 4 && mainTable.length < 6 || window.innerWidth < 415 && mainTable.length > 3  && mainTable.length < 4 ) {
            valueForBodyHeight += 10;
            document.body.style.height = `${valueForBodyHeight}vh`
        };
        console.log(window.innerWidth, window.innerHeight,valueForBodyHeight)
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
    document.body.style.height = '100vh'
}
const changeDayMode = () => {
    const allLi = document.querySelectorAll('ul li');
    if(secondaryFlag === false) {
        darkModeFakeCircle.classList.remove('circleToLeft');
        darkModeFakeCircle.classList.add('circleToRight');
        darkModeSiteBody.classList.add('darkModeSite');
        allButtons.forEach((button) => {
            button.style.color = "#fff"
            button.classList.add('buttonDarkMode')
        });
        console.log(allButtons)
        numberOfTaskH.style.color = '#fff';
        allLi.forEach(li => li.style.color = '#fff');
        input.style.backgroundColor = '#737373';
        input.style.border = '1px solid #fff'
        input.style.color = '#fff'
        secondaryFlag = true;

    } else if(secondaryFlag === true) {
        darkModeFakeCircle.classList.remove('circleToRight');
        darkModeFakeCircle.classList.add('circleToLeft');
        darkModeSiteBody.classList.remove('darkModeSite');
        allButtons.forEach((button) => {
            button.style.color = "#000"
            button.classList.remove('buttonDarkMode')
        })
        console.log(allButtons)
        numberOfTaskH.style.color = "#000";
        allLi.forEach(li => li.style.color = '#000');
    
        input.style.backgroundColor = '#808080';
        input.style.border = '1px solid #000';
        input.style.color = '#000';

        secondaryFlag = false;
    }
}
//Buttons-add Event//
addButton.addEventListener('click', addSomeTask);
input.addEventListener('keydown',addTaskByEnter);
searchButton.addEventListener('click', searchSomeTask);
deleteMainButton.addEventListener('click', deleteAllTasks);
darkModeFakeButton.addEventListener('click', changeDayMode);




