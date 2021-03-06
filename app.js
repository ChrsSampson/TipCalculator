const tipButtons = document.querySelector('.app-btn-container');
const billInput = document.querySelector('.input-money')
const peopleInput = document.querySelector('#people')
const customTip = document.querySelector('.input-custom')
const billError = document.querySelector('#bill-error')
const peopleError = document.querySelector('#people-error')

const reset = document.querySelector('.btn-reset')

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

    determineTip (input){
        switch (input){
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
    }

    selectButton(element){
        Array.from(element.parentElement.children).forEach(child => {
            if(child.classList.contains('selected')){
                child.classList.remove('selected')
            }
        })
        if(element.tagName === 'BUTTON'){
            element.classList.add('selected')
        }
    }

    toggleError (element){
        element.classList.toggle('hidden')
    }

    resetCalc (){
        calc.total = 0.00
        calc.percent = 0
        calc.people = 1
        tipDisplay.textContent = '$0.00'
        totalDisplay.textContent = '$0.00'
        billInput.value = ''
        peopleInput.value = ''
    }

}


// -----------------------Event Handlers-------------------------

window.addEventListener ('load', () => {
    calc = new Calc();
})

tipButtons.addEventListener('click', (e) => {
    if(e.target.nodeName === "BUTTON"){
        calc.selectButton(e.target)
        calc.determineTip(e.target.value)
        calc.calculateTip(calc.total, calc.percent, calc.people)
        customTip.value = ''
    }
})

customTip.onchange = (e) => {
    if(!isNaN(e.target.value) ){
        calc.percent = `0.${e.target.value}`
        calc.calculateTip(calc.total, calc.percent, calc.people)
    }
    else{
        
    }
}

customTip.onclick = (e) => {
    calc.selectButton(e.target);
}

billInput.onchange = (e) => {
    if(!isNaN(e.target.value) ){
        if(!billError.classList.contains('hidden')){
            calc.toggleError(billError)
        }
        calc.total = 0.00
        calc.total = parseInt(e.target.value)
        calc.calculateTip(calc.total, calc.percent, calc.people)
    }
    else{
        calc.toggleError(billError)
    }
}

peopleInput.onchange = (e) => {
    if(!isNaN(e.target.value) || e.target.value === 0){
        if(!peopleError.classList.contains('hidden')){
            calc.toggleError(peopleError)
        }
        calc.people = parseInt(e.target.value)
        calc.calculateTip(calc.total, calc.percent, calc.people)
    }
    else{
        calc.toggleError(peopleError)
    }
}

reset.onclick = () => {
    calc.resetCalc()
}