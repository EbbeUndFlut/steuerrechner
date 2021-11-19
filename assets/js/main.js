let form = document.querySelector("form")
let yearDisplay = document.querySelector(".result > h2 > span")
let moneyDisplay = document.querySelector(".money")
let btn = document.querySelector('input[type="submit"]')

let validation = (value) => {
    value > 0 ? ((btn.disabled = false), (btn.style.color = "white")) : ((btn.disabled = true), (btn.style.color = "#6b705c"))
}
let changeYear = (value) => {
    yearDisplay.innerHTML = value
}

let mayTheSteuerberaterBeWithYou = () => {
    let money = Number(form.money.value)
    let year = form.year.value
    let isSplit = form.tarif[1].checked
    let inChurch = form.church.checked
    let tax = 0.0

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

    console.log(forHeaven(tax))
    moneyDisplay.innerHTML = `${inChurch ? Math.floor(tax + forHeaven(tax)) : Math.floor(tax)} €`
}

let forHeaven = (value) => {
    return value * 0.09
}

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
let zwanzigNeunzehn = (value) => {
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
