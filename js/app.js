// Variables
const form = document.querySelector('#request-quote')
const loader = document.querySelector('#loading img')

const html = new HTMLUI()

// Eventlisteners
Eventlisteners()
function Eventlisteners() {
    document.addEventListener('DOMContentLoaded', function () {
        html.getYear()
    })
    form.addEventListener('submit' , function(e){
        e.preventDefault()
        const model = document.querySelector('#make').value
        const year = document.querySelector('#year').value
        const level = document.querySelector('input[name = "level"]:checked').value

        if(document.querySelector('#result').innerHTML.length > 0){
            document.querySelector('.result').remove()
        }
        if (model == '') {
            html.displayError('لطفا مدل خودرو رو انتخاب کنید')
            setTimeout(() => {
                document.querySelector('.error').remove()
            }, 3000);
        } else {
            loader.style.display = 'block'
            setTimeout(() => {
                loader.style.display = 'none'    
                const insurance = new Insurance(model , year , level)
                const price = insurance.calculatePrice(insurance)
                html.showFactor(price , insurance)
            }, 1500);

        }
    })
}

