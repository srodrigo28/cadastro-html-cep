const addressForm = document.querySelector("#address-form")
const cepInput    = document.querySelector("#cep")
const addressInput = document.querySelector("#address")
const cityInput   = document.querySelector("#city")
const neighboarhoodInput = document.querySelector("#neighborhood")
const regionInput = document.querySelector("#region")
const formInputs = document.querySelector("[data-input]")

const closeButton = document.querySelector("#close-message")
const messageElement = document.querySelector("#message");
const messageElementText = document.querySelector("#message p")

const fadeElement = document.querySelector("#fade")
const loaderElement = document.querySelector("#loader")

// Validade Cep Input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if(!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

// Get address event
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value

    if(inputValue.length === 8){
        getAddress(inputValue);
    }
})

const getAddress = async (cep) => {
    console.log(cep);
    toggleLoader();

    cepInput.blur(); // bloquea o input até liberar

    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const res = await fetch(apiUrl);

    const data = await res.json();

    // caso error 1
    if(data.erro === "true"){
        toggleLoader();
        addressForm.reset()
        toggleMessage("Error tente novamente " + cep )
        return false;
    }

    // caso sucesso
    if(data){
        console.log(data);
        

    // preencher os campos
        addressInput.value = data.logradouro
        cityInput.value = data.localidade
        neighboarhoodInput.value = data.bairro
        regionInput.value = data.uf
    
    toggleLoader();

    }else{
        // caso error 2
        console.error("CEP não encontrado");
        return;
    }
}

// show or hide message
const toggleMessage = (msg) => {
    messageElementText.innerText = msg
    fadeElement.classList.toggle("hide")
    messageElement.classList.toggle("hide"); 
}

// Show or hide loader
const toggleLoader = () => {
    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
}

// fechar o modal
closeButton
.addEventListener("click", () => { toggleMessage() });

// Save address
addressForm.addEventListener("submit", (e) => {
    e.preventDefault()

    toggleLoader();

    setTimeout( () => {
        toggleLoader()

        toggleMessage("Endereço salvo com sucesso!")

        addressForm.reset()

        toggleDisabled();
    }, 2500)
})