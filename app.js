const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const conversionPrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document
    .querySelector('[data-js="currency-one-times"]')
const currencyContainer = document
    .querySelector('[data-js="currency-container"]')


const ShowAlert = err => {
    const div = document.createElement('div')
    const button = document.createElement('button')

    div.textContent = err.message
    
    div.classList.add('alert','alert-warning','alert-dismissible','fade','show')
    div.setAttribute('role', 'alert')
    button.classList.add('btn-close')
    button.setAttribute('aria-label', 'close')

    const removeAlert = () => div.remove()

    button.addEventListener('click',removeAlert)

    div.appendChild(button)
    currencyContainer.insertAdjacentElement('afterend', div)
}

const state = (() => {
    let exchangeRate = {}
    return {
        getExchangeRate: () => exchangeRate,
        setExchangeRates: newExchangeRate => {
            if(!newExchangeRate.conversion_rates) {
                ShowAlert({ 
                    message: 'O objeto precisa ter uma propriedade converion_rates' 
                })
                return
            }

            exchangeRate = newExchangeRate
            return exchangeRate
        }
    }
})()

const APIKey = '04cf6b5908dbe464ff892035'
const getUrl = currency =>
     `https://v6.exchangerate-api.com/v6/${APIKey}/latest/${currency}`

const messageError = typeError => ({
  'unsupported-code': 'A moeda não existe em nosso banco de dados.',
  'malformed-request': 'O endpoint do seu resquest precisa seguir a estrutura a seguir: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD ',
  'invalid-key': 'A chave da api não é válida.',
  'inaction-account': 'O seu endereço de email não foi confirmado',
  'quota-reached': 'Sua conta alcançou o limite de requests permitidos em seu plano atual.' 
})[typeError] || 'Não foi possível obter dados da moeda informada.'

const fetchExchangeRates = async url => {
    try{
        const response = await fetch(url)
        
        if(!response.ok) {
            throw new Error('Sua conexão falhou. Não foi possível obter dados.')
        }
            
        const conversionRatesData = await response.json()

        if(conversionRatesData.result === 'error') {
            const errorMessage = messageError(conversionRatesData['error-type'])
            throw new Error(errorMessage)
        }

        return state.setExchangeRates(conversionRatesData)
    }catch (err) {
        ShowAlert(err)
    }
}

const getOptions = (currencySelected, conversion_rates) => {
    const setSelectedAttribute = currency =>
        currency === currencySelected ? 'selected' : '' 
    const getOptionsAsArray = currency =>
        `<option ${setSelectedAttribute(currency)}>${currency}</option>`

    return Object.keys(conversion_rates)
    .map(getOptionsAsArray)
    .join()
}

const getMultipliedExchangeRate = conversion_rates => {
    const currencyTwo = conversion_rates[currencyTwoEl.value]
    return (timesCurrencyOneEl.value * currencyTwo).toFixed(2)
}

const getNotRoundExchangeRate = conversion_rates => {
    const currencyTwo = conversion_rates[currencyTwoEl.value]
    return `1 ${currencyOneEl.value} = ${1 * currencyTwo} ${currencyTwoEl.value}`
}

showUpdatedRates = ({ conversion_rates }) => {
    convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates ) 
    conversionPrecisionEl.textContent = getNotRoundExchangeRate(conversion_rates) 
}

const showInitialInfo = ({ conversion_rates }) => {

    currencyOneEl.innerHTML = getOptions('USD', conversion_rates)
    currencyTwoEl.innerHTML = getOptions('BRL', conversion_rates)

    showUpdatedRates({ conversion_rates }) //shorthand Property names
}

const init = async () => {
    const url = getUrl('USD')
    const exchangeRate = await fetchExchangeRates(url) 

    if(exchangeRate && exchangeRate.conversion_rates) {
       showInitialInfo(exchangeRate)
    }
}

const handleTimesCurrencyOneElInput = () => {
    const { conversion_rates } = state.getExchangeRate()

    convertedValueEl.textContent = getMultipliedExchangeRate(conversion_rates) 
}

const handleCurrencyTwoElInput =  () => {
    const exchangeRate = state.getExchangeRate()
    showUpdatedRates(exchangeRate)
}

const handleCurrencyOneElInput =  async e => {
    const url = getUrl(e.target.value)
    const exchangeRate = await fetchExchangeRates(url)

    showUpdatedRates(exchangeRate)
}

timesCurrencyOneEl.addEventListener('input', handleTimesCurrencyOneElInput )
currencyTwoEl.addEventListener('input', handleCurrencyTwoElInput)
currencyOneEl.addEventListener('input', handleCurrencyOneElInput)

init()