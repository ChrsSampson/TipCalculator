const tipButtons = document.querySelector('.app-btn-container');
const billInput = document.querySelector('.input-money')
const peopleInput = document.querySelector('#people')

const tipDisplay = document.querySelector('#tip');
const totalDisplay = document.querySelector('#total');

let calc = ''

class Calc {
    constructor (){
        this.percent  = 0;
        this.total = 0.00
        this.people = 1
    }

    calculateTip (bill, tip, people){
            let tipAmount = bill * tip;
            let totalAmount = bill + tipAmount;
            let amountPerPerson = totalAmount / people;

            // convert number to currenty format and regex to add commas
            const ta = tipAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            const ap = amountPerPerson.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            console.log(ta, ap)
            this.setResult(ta, ap)
    }

    setResult (tip, total){
        tipDisplay.textContent = `$${tip}`
        totalDisplay.textContent = `$${total}`
    }

    throwError (error){
        console.log(error)
    }

}

window.onload = () => {
    calc = new Calc();
}

tipButtons.addEventListener('click', (e) => {
    if(e.target.nodeName === "BUTTON"){
        switch (e.target.textContent){
            case '5%':
                calc.percent = 0.05
                break;
            case '10%':
                calc.percent = 0.1
                break;
            case '15%':
                calc.percent = 0.15
                break;
            case '20%':
                calc.percent = 0.2
                break;
            case '25%':
                calc.percent = 0.25
                break;
            case '50%':
                calc.percent = 0.5
                break;
            default:
                calc.percent = 0.15
                break;
        }
        calc.calculateTip(calc.total, calc.percent, calc.people)
    }
})

billInput.onchange = (e) => {
    if(!isNaN( parseInt(e.target.value) ) ){
        calc.total = 0.00
        calc.total = parseInt(e.target.value)
        calc.calculateTip(calc.total, calc.percent, calc.people)
    }
    else{
        calc.throwError('Enter A Valid Amount')
    }
}

peopleInput.onchange = (e) => {
    if(!isNaN( parseInt(e.target.value) ) || e.target.value === 0){
    calc.people = parseInt(e.target.value)
    calc.calculateTip(calc.total, calc.percent, calc.people)
    }
    else{
        calc.throwError('Enter A Valid Amount')
    }
}