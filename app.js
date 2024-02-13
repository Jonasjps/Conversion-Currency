const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const convertedValueEl = document.querySelector('[data-js="converted-value"]')
const conversionPrecisionEl = document.querySelector('[data-js="conversion-precision"]')
const timesCurrencyOneEl = document.querySelector('[data-js="currency-one-times"]')
const currencyContainer = document.querySelector('[data-js="currency-container"]')




const state = (() => {
    let exchangeRate = {}
    return {
        getExchangeRate: () => exchangeRate,
        setExchangeRates: newExchangeRate => {
            if(!newExchangeRate.conversion_rates) {
                console.log('O objeto precisa ter uma propriedade converion_rates')
                return
            }

            exchangeRate = newExchangeRate
            return exchangeRate
        }
    }
})()















































// const getUrl = currency => `https://v6.exchangerate-api.com/v6/04cf6b5908dbe464ff892035/latest/${currency}`

// const messageError = typeError => ({
//   'unsupported-code': 'A moeda não existe em nosso banco de dados.',
//   'malformed-request': 'O endpoint do seu resquest precisa seguir a estrutura a seguir: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD ',
//   'invalid-key': 'A chave da api não é válida.',
//   'inaction-account': 'O seu endereço de email não foi confirmado',
//   'quota-reached': 'Sua conta alcançou o limite de requests permitidos em seu plano atual.' 
// })[typeError] || 'Não foi possível obter dados da moeda informada.'

// const ShowAlert = err => {
//     const div = document.createElement('div')
//     const button = document.createElement('button')

//     div.textContent = err.message
    
//     div.classList.add('alert','alert-warning','alert-dismissible','fade','show')
//     div.setAttribute('role', 'alert')
//     button.classList.add('btn-close')
//     button.setAttribute('aria-label', 'close')

//     button.addEventListener('click', () => {
//         div.remove()
//     })

//     div.appendChild(button)
//     currencyContainer.insertAdjacentElement('afterend', div)
// }

// const fetchExchangeRates = async url => {
//     try{
//         const response = await fetch(url)
        
//         if(!response.ok) {
//             throw new Error('Sua conexão falhou. Não foi possível obter dados.')
//         }
            
//         const conversionRatesData = await response.json()

//         if(conversionRatesData.result === 'error') {
//             throw new Error(messageError(conversionRatesData['error-type']))
//         }

//         return conversionRatesData
//     }catch (err) {
//         ShowAlert(err)
//     }
// }

// const showInitialInfo = () => {
//     const getOptions = currencySelected => Object.keys(internalExchangeRates.conversion_rates)
//     .map(currency => `<option ${currency === currencySelected ? 'selected' : ''}>${currency}</option>`)
//     .join()

//     currencyOneEl.innerHTML = getOptions('USD')
//     currencyTwoEl.innerHTML = getOptions('BRL')

//     convertedValueEl.textContent = internalExchangeRates.conversion_rates.BRL.toFixed(2)
//     conversionPrecisionEl.textContent = `1 USD = ${internalExchangeRates.conversion_rates.BRL} BRL`
// }

// const init = async () => {
     
//     internalExchangeRates = {...(await fetchExchangeRates(getUrl('USD')))}

//     if(internalExchangeRates.conversion_rates) {
//        showInitialInfo()
//     }
// }

// showUpdatedRates = () => {
//     convertedValueEl.textContent = (timesCurrencyOneEl.value * internalExchangeRates.conversion_rates[currencyTwoEl.value]).toFixed(2)
//     conversionPrecisionEl.textContent = `1 ${currencyOneEl.value} = ${1 * internalExchangeRates.conversion_rates[currencyTwoEl.value]} ${currencyTwoEl.value}`
// }

// timesCurrencyOneEl.addEventListener('input', e => {
//     convertedValueEl.textContent = (e.target.value * internalExchangeRates.conversion_rates[currencyTwoEl.value]).toFixed(2)
// })

// currencyTwoEl.addEventListener('input', showUpdatedRates)

// currencyOneEl.addEventListener('input', async e => {
//     internalExchangeRates = {...(await fetchExchangeRates(getUrl(e.target.value)))}
//     showUpdatedRates()
// })


// init()