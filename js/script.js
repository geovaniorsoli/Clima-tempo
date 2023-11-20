const apiKey = "2030cce9898243278e3224436231811"

function climate(e) {
    e.preventDefault()
    const location = document.getElementById('local').value
    clima(location)
}

 document.getElementById('form').addEventListener('submit', climate)

 function clima(location){

    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)

        .then(response => {
        const weatherData = response.data.current
        const locationData = response.data.location

        const containterClima = document.getElementById('ShowClimate')
        if (containterClima) {
            containterClima.innerHTML = ''

            const temp = document.createElement("h1")
            temp.className = 'temp'
            temp.textContent = ` ${weatherData.temp_c}°C`
            containterClima.appendChild(temp)

            const local = document.createElement("h1");
            local.className = 'Local'
            local.textContent = ` ${locationData.name} ${locationData.region} ${locationData.country}`;
            containterClima.appendChild(local);
            
            const sense = document.createElement("h2")
            sense.innerHTML = `<div class="mt-3"> </div> Sensação Térmica ${weatherData.feelslike_c} °C`
            containterClima.appendChild(sense)

            const condicao = document.createElement('h2')
            condicao.innerHTML = `<div class="mt-3"> </div> <ion-icon name="partly-sunny-outline"></ion-icon> ${weatherData.condition.text}`
            containterClima.appendChild(condicao)

            const umidade = document.createElement('h2')
            umidade.innerHTML = `<div class="mt-3"> </div> <ion-icon class="icondisplay" name="water-outline"></ion-icon> ${weatherData.humidity}%`
            containterClima.appendChild(umidade)
        }

    }).catch(error => {
        console.error('erro na api aq n busco certinho', error)
    })
}


function setlocaldefault(e) {
    e.preventDefault();
    const setlocal = document.querySelector("#localsave").value;
    console.log(setlocal);  
    clima(setlocal);
    localStorage.setItem('localpadrao' , setlocal)
}

document.getElementById('form-default').addEventListener('submit', setlocaldefault);

window.onload = () =>{
    let localPadrao = localStorage.getItem("localpadrao") || "sao paulo"
        clima(localPadrao)
}   
    
function styleclima(){
    const atual = new Date().getHours()
    const DOM = document.body
    let CSS

    if(atual >= 6 && atual < 18){
        DOM.className = "dia"
        CSS = '/style/dia.css'
    } else{ 
        DOM.className = "noite"
        CSS = '/style/noite.css'
    }

    document.getElementById('tema').setAttribute("href", CSS)
    console.log(styleclima)
}

styleclima()


    