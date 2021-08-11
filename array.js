export class MainArray {
    mainUL = document.querySelector(".mainList");
    primaryArray = [];
    pushPrimaryArray(arg){
        this.primaryArray.push(arg);
    }
    show(){
        console.log(this.primaryArray);
    }
   
}