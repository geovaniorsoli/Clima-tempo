const apiKey = "2030cce9898243278e3224436231811"

function climate(e) {
    e.preventDefault()

    const location = document.getElementById('local').value

    clima(location).then(response => {
        const weatherData = response.data.current
        const locationData = response.data.location

        const containterClima = document.getElementById('ShowClimate')
        if (containterClima) {
            containterClima.innerHTML = ''

            const local = document.createElement("h1");
            local.textContent = ` ${locationData.name}, ${locationData.region}, ${locationData.country}`; // Nome formatado do local
            containterClima.appendChild(local);
            
            const temp = document.createElement("h1")
            temp.className = 'temp'
            temp.textContent = ` ${weatherData.temp_c} °C`
            containterClima.appendChild(temp)

            const sense = document.createElement("h2")
            sense.textContent = `Sensação Térmica: ${weatherData.feelslike_c} °C`
            containterClima.appendChild(sense)

            const condicao = document.createElement('h2')
            condicao.textContent = `Condição: ${weatherData.condition.text}`
            containterClima.appendChild(condicao)

            const umidade = document.createElement('h2')
            umidade.textContent = `Umidade: ${weatherData.humidity}%`
            containterClima.appendChild(umidade)
        }

    }).catch(error => {
        console.error('erro na api aq n busco certinho', error)
    })
}

document.getElementById('form').addEventListener('submit', climate)



function clima(location) {
    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
}


function styleclima(){
    const atual = new Date().getHours
    const DOM = document.body

    if(atual >= 6 && atual < 12){
        DOM.className = "manha"
    } else if (atual >= 12 && atual < 18){
        DOM.className = "tarde"
        }else{ 
        DOM.className = "noite"
    }


}

styleclima()