const addressForm = document.querySelector("#address-form")
const cepInput = document.querySelector("#cep")
const addressInput = document.querySelector("#address")
const cityInput = document.querySelector("#city")
const neighboarhoodInput = document.querySelector("#neighborhood")
const regionInput = document.querySelector("#region")
const formInputs = document.querySelector("[data-input]")

const closeButton = document.querySelector("#close-message")

// Validade Cep Input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/
    const key = String.fromCharCode(e.keyCode)

    console.log(e.keyCode)
    console.log(key)
})