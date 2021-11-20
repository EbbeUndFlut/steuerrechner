let form = document.querySelector("form")
let yearDisplay = document.querySelector(".result > h2 > span")
let moneyDisplay = document.querySelector(".money")
let churchDisplay = document.querySelector(".churchTax")
let incomeDisplay = document.querySelector(".income")
let totalDisplay = document.querySelector(".total")
let btn = document.querySelector('input[type="submit"]')
let cycleBtn = document.querySelector(".submitCycle")
let circleIncome = document.querySelector(".incomeCircle")
let circleTax = document.querySelector(".taxCircle")
let circleCurch = document.querySelector(".churchCircle")
let validIncome = false

// Validate if the income greater the 0
let validation = (value) => {
    value > 0
        ? ((validIncome = true), (cycleBtn.style.transform = "translate(-50%, 50%) rotate(360deg)"), (cycleBtn.style.cursor = "pointer"))
        : ((validIncome = false), (cycleBtn.style.transform = "translate(-50%, 50%) rotate(180deg)"), (cycleBtn.style.cursor = "default"))
}
let changeYear = (value) => {
    yearDisplay.innerHTML = value
}

let mayTheSteuerberaterBeWithYou = () => {
    if (validIncome !== true) {
        return
    }

    let money = Number(form.money.value)
    let income = money
    let year = form.year.value
    let isSplit = form.tarif[1].checked
    let inChurch = form.church.checked
    let tax = 0.0
    let churchTax = 0.0
    let totalTax = 0.0
    isSplit ? (money /= 2) : null

    switch (year) {
        case "2021":
            tax = zwanzigEinUndZwanzig(money)
            break
        case "2020":
            tax = zwanzigZwanzig(money)
            break
        case "2019":
            tax = zwanzigNeunzehn(money)
            break
    }
    isSplit ? (tax *= 2) : null

    inChurch ? (churchTax = Math.floor(forHeaven(tax))) : null
    totalTax = tax + churchTax

    // Formated Output

    moneyDisplay.innerHTML = `${Math.floor(tax).toLocaleString("de")} €`
    churchDisplay.innerHTML = `${Math.floor(churchTax).toLocaleString("de")} €`
    incomeDisplay.innerHTML = `${Math.floor(income).toLocaleString("de")} €`
    totalDisplay.innerHTML = `${Math.floor(totalTax).toLocaleString("de")} €`

    createChart({ income: income, tax: tax, inChurch: inChurch })

    // Move the Result upwards
    document.querySelector(".resultContainer").style.bottom = "0"
}

// churchTax
let forHeaven = (value) => {
    return value * 0.09
}

//Tax Calculations

let zwanzigEinUndZwanzig = (value) => {
    if (value <= 9744) {
        return 0
    } else if (value >= 9745 && value <= 14753) {
        let y = (value - 9744) / 10000
        return (995.21 * y + 1400) * y
    } else if (value >= 14754 && value <= 57918) {
        let y = (value - 14753) / 10000
        return (208.85 * y + 2397) * y + 950.96
    } else if (value >= 57919 && value <= 274612) {
        return 0.42 * value - 9136.63
    } else {
        return 0.45 * value - 17374.99
    }
}
let zwanzigZwanzig = (value) => {
    if (value <= 9408) {
        return 0
    } else if (value >= 9409 && value <= 14532) {
        let y = (value - 9408) / 10000
        return (972.87 * y + 1400) * y
    } else if (value >= 14533 && value <= 57051) {
        let y = (value - 14533) / 10000
        return (212.02 * y + 2397) * y + 972.79
    } else if (value >= 57052 && value <= 270500) {
        return 0.42 * value - 8963.74
    } else {
        return 0.45 * value - 17078.74
    }
}
let zwanzigNeunzehn = (value) => {
    if (value <= 9168) {
        return 0
    } else if (value >= 9169 && value <= 14254) {
        let y = (value - 9168) / 10000
        return (980.14 * y + 1400) * y
    } else if (value >= 14255 && value <= 55960) {
        let y = (value - 14254) / 10000
        return (216.16 * y + 2397) * y + 965.58
    } else if (value >= 55961 && value <= 265326) {
        return 0.42 * value - 8780.9
    } else {
        return 0.45 * value - 16740.68
    }
}

// this is for the fancy shit
let createChart = (values) => {
    console.log(values)
    let step = 629 / values.income
    let taxDash = values.tax * step
    let churchDash = values.inChurch ? forHeaven(values.tax) * step : 0
    let churchOffset = taxDash * -1

    console.log(taxDash)
    circleTax.style.strokeDasharray = `${taxDash} 629`
    circleCurch.style.strokeDasharray = `${churchDash} 629`
    circleCurch.style.strokeDashoffset = churchOffset
}
