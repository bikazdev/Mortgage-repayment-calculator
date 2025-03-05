const $ = document;

const getClear = $.querySelector('.clear')
const getAllInput = $.querySelectorAll('input')
const getMonthlyRepay = $.querySelector('.monthly-repay')
const getResultRepay = $.querySelector('.result-total-repay')
const getBtn = $.querySelector('.calc-repayment-btn')

const resultPage = $.querySelector('.result-page')
const defaultValue = $.querySelector('.default-value')

const getInputAmount = $.querySelector('.amount-input')
const getInputTerm = $.querySelector('.term-input')
const getInputRate = $.querySelector('.rate-input')
const getRadioRepayment = $.querySelector('.repayment')
const getRadioInterestOnly = $.querySelector('.interest-only')


let mortgageAmount, annualRate, mortgageTerm;


getBtn.addEventListener('click', function() {
    event.preventDefault()
    result()
    errorHandler()
    
})

getClear.addEventListener('click', function() {
    clearInputs(getAllInput)
})



getAllInput.forEach(function(item) {
    if(item.type === 'radio'){
        item.addEventListener('click', function(event) {
            getAllInput.forEach(inp => inp.parentElement.classList.remove('active'))
            event.target.parentElement.classList.add('active')
        })
    }
    item.addEventListener('input', function(event){
        errorHandler()
        
    })
})



function result(){
    let allInputField = checkInputs(getAllInput)

    if(allInputField){
        if(getRadioRepayment.checked){
            defaultValue.classList.add('hidden')
            resultPage.classList.remove('hidden')
            calcRepaymentMethod()
        }else if(getRadioInterestOnly.checked){
            defaultValue.classList.add('hidden')
            resultPage.classList.remove('hidden')
            calcInterestOnlyMethod()
        }else{
            return false
        }
    }
}


function checkInputs(input){
    let allField = true

    input.forEach(function(item) {
        if(item.type === 'number' && item.value === ''){
            allField = false
        }
    })
    if(!getRadioRepayment.checked && !getRadioInterestOnly.checked){
        allField = false
    }

    return allField
}


function calcRepaymentMethod(){
    getInputValue()

    let monthlyRate = (annualRate / 100) / 12;
    let totalPayments = mortgageTerm * 12

    let monthlyPayment = (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)

    let totalRepayment = monthlyPayment * totalPayments
    getMonthlyRepay.innerHTML = "£" + monthlyPayment.toFixed(2)
    getResultRepay.innerHTML = "£" + totalRepayment.toFixed(2)
}

function calcInterestOnlyMethod() {
    getInputValue()

    let monthlyIOPayment = (mortgageAmount * (annualRate / 100)) / 12

    let totalIO = monthlyIOPayment * (mortgageTerm * 12)
    getMonthlyRepay.innerHTML = "£" + monthlyIOPayment.toFixed(2)
    getResultRepay.innerHTML = "£" + totalIO.toFixed(2)


}

function getInputValue(){
    mortgageAmount = getInputAmount.value
    annualRate = getInputRate.value
    mortgageTerm = getInputTerm.value
}

function clearInputs(input) {
    input.forEach(item => {
        item.parentElement.classList.remove('change')
        if(item.nextElementSibling && item.nextElementSibling.classList.contains('error')){
            item.nextElementSibling.remove()
        }
        if(item.type === 'number'){
            item.value = ''
        }else if(item.type === 'radio'){
            item.checked = false;
            item.parentElement.classList.remove('active')
        }
    })
    getMonthlyRepay.innerHTML = '-'
    getResultRepay.innerHTML = '-'
    resultPage.classList.add('hidden')
    defaultValue.classList.remove('hidden')
}


function errorHandler() {
    getAllInput.forEach(function(input) {
        const error = input.nextElementSibling;
        if(input.value.trim() === ''){
            
            if(!input.nextElementSibling || !input.nextElementSibling.classList.contains('error')){
                const error = document.createElement('span')
                input.parentElement.classList.add('change')
                error.classList.add('error')
                error.innerHTML = 'This field is required'
                input.after(error)
            }
           
        }else{
            
            if(error && error.classList.contains('error')){
                error.remove()
            }
            input.parentElement.classList.remove('change')
        }
    })
}


