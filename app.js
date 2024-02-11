const currencyOneEl = document.querySelector('[data-js="currency-one"]')
const currencyTwoEl = document.querySelector('[data-js="currency-two"]')
const currencyContainer = document.querySelector('[data-js="currency-container"]')

const url = 'https://v6.exchangerate-api.com/v6/04cf6b5908dbe464ff892035/latest/USD'

const messageError = typeError => ({
    'unsupported-code': 'A moeda não existe em nosso banco de dados.',
    'malformed-request': 'O endpoint do seu resquest precisa seguir a estrutura a seguir: https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD ',
    'invalid-key': 'A chave da api não é válida.',
    'inaction-account': 'O seu endereço de email não foi confirmado',
    'quota-reached': 'Sua conta alcançou o limite de requests permitidos em seu plano atual.' 
})[typeError] || 'Não foi possível obter dados da moeda.'

const fetchExchangeRates = async () => {
    try{
        const response =  await fetch(url)
        
        if(!response.ok){
            throw new Error('Sua conexão falhou. Não foi possível obter as informações.')
        }

        const conversionRatesData = await response.json()

        if(conversionRatesData.result === 'error') {
            throw new Error(messageError('oi'))
        }

        console.log(conversionRatesData)
    }catch (err) {
        const div = document.createElement('div')
        const button = document.createElement('button')
        div.textContent = err.message
        div.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show')
        div.setAttribute('role', 'alert')
        button.classList.add('btn-close')
        button.setAttribute('aria-label', 'close')

        button.addEventListener('click', () => {
            div.remove()
        })

        currencyContainer.insertAdjacentElement('afterend', div)
        div.appendChild(button)
       
    }
}

fetchExchangeRates()

const option = `<option>oi</option>`

currencyOneEl.innerHTML = option
currencyTwoEl.innerHTML = option
