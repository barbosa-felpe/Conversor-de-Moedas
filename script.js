async function converter() {
    const display = document.getElementById("display")
    const moedaInput = parseFloat(document.getElementById("moedaInput").value)
    const moedaDestino = document.getElementById("moedaDestino").value
    const moedaOrigem = document.getElementById("moedaOrigem").value

    if(Number.isNaN(moedaInput)){
        alert("O valor que você digitou é invalido! Digite outro.")
    } else{
        const resposta = await fetch("https://v6.exchangerate-api.com/v6/b6a1899865f33db5ec610a89/latest/USD")
    const dados = await resposta.json()

    const taxas = dados.conversion_rates


    const taxaOrigem = moedaOrigem === "USD" ? 1 : taxas[moedaOrigem]
    const taxaDestino = moedaDestino === "USD" ? 1 : taxas[moedaDestino]

    
    const convertido = moedaInput * (taxaDestino / taxaOrigem)

    display.innerText = `${moedaInput} ${moedaOrigem} = ${convertido.toFixed(2)} ${moedaDestino}`
        
        
    }

    
}

const inverter = document.getElementById("inverterMoedas")
const selectOrigem = document.getElementById("moedaOrigem")
const selectDestino = document.getElementById("moedaDestino")

inverter.addEventListener("click", () => {
    let temp = selectOrigem.value
    selectOrigem.value = selectDestino.value
    moedaDestino.value = temp

    converter()
})

document.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        converter()
    }
})