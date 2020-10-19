class Insurance {
    constructor(model, year, level) {
        this.model = model,
            this.year = year,
            this.level = level
    }
    calculatePrice(info) {
        let price = 2000000;
        const model = info.model;
        switch (model) {
            case '1':
                price = price * 1.15
                break;
            case '2':
                price = price * 1.30
                break;
            case '3':
                price = price * 1.80
                break;
        }
        const year = info.year
        let diffrence = this.getDiffrenceYear(year)
        price = price - (((diffrence * 3) / 100) * price)

        let level = info.level;
        price = this.calculateLevel(level, price)
        return price;

    }
    calculateLevel(level, price) {
        if (level == 'basic') {
            price = price * 1.30
        } else {
            price = price * 1.50
        }
        return price;
    }
    getDiffrenceYear(year) {
        let persianNum = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
        function perToEng(str) {
            if (typeof str === 'string') {
                for (let i = 0; i < 10; i++) {
                    str = str.replace(persianNum[i], i)
                }
            }
            return str;
        }
        let now = new Date().toLocaleDateString('fa-IR')
        let nowYear = now.slice(0, 4)
        let engDate = perToEng(nowYear)
        let diffYear = engDate - year

        return diffYear;
    }

}

class HTMLUI {
    getYear() {

        let persianNum = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g]
        function perToEng(str) {
            if (typeof str === 'string') {
                for (let i = 0; i < 10; i++) {
                    str = str.replace(persianNum[i], i)
                }
            }
            return str;
        }
        let now = new Date().toLocaleDateString('fa-IR')
        let nowYear = now.slice(0, 4)
        let max = perToEng(nowYear)
        let min = max - 20;

        const select = document.querySelector('#year')

        for (let i = max; i >= min; i--) {
            const option = document.createElement('option')
            option.value = i
            option.innerText = i
            select.appendChild(option)
        }
    }
    displayError(message) {
        const div = document.createElement('div')
        div.className = 'error'
        div.innerHTML = message;

        form.insertBefore(div, document.querySelector('.form-group'))
    }
    showFactor(price, info) {
        const div = document.querySelector('#result')
        let result = document.createElement('div')
        result.classList.add('result')
        let model = info.model;
        switch (model) {
            case '1':
                model = 'پراید'
                break;
            case '2':
                model = 'اپتیما'
                break;
            case '3':
                model = 'پورشه'
                break;
        }

        let level = info.level
        switch (level) {
            case 'basic':
                level = 'ساده'
                break;
            case 'complete':
                level = 'کامل';
                break;
        }
        result.innerHTML = `
        <p class="header">خلاصه فاکتور</p>
        <p>مدل خودرو: ${model}</p>
        <p>سال ساخت: ${info.year}</p>
        <p>نوع بیمه: ${level}</p>
        <p class="total">قیمت نهایی: ${price}</p>
        `
        div.appendChild(result)
    }
}
