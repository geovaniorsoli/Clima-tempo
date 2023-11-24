const apiKey = "2030cce9898243278e3224436231811"

function climate(e) {
    e.preventDefault()
    const location = document.getElementById('local').value
    clima(location)
}

 document.getElementById('form').addEventListener('submit', climate)

 function clima(location){

    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=pt`)

        .then(response => {
        const weatherData = response.data.current
        const locationData = response.data.location

        const containerClima = document.getElementById('ShowClimate')
        if (containerClima) {
            containerClima.innerHTML = ''

            const iconUrl = weatherData.condition.icon; 
            const imgIcon = document.createElement('img');
            imgIcon.src = `https:${iconUrl}`; 
            containerClima.appendChild(imgIcon);

            const temp = document.createElement("h1")
            temp.className = 'temp'
            temp.textContent = ` ${weatherData.temp_c}°C`
            containerClima.appendChild(temp)

            const local = document.createElement("h1");
            local.className = 'Local'
            local.textContent = ` ${locationData.name} ${locationData.region} ${locationData.country}`;
            containerClima.appendChild(local);
            
            const sense = document.createElement("h2")
            sense.innerHTML = `<div class="mt-3"> </div> Sensação Térmica ${weatherData.feelslike_c} °C`
            containerClima.appendChild(sense)

            const condicao = document.createElement('h2')
            condicao.innerHTML = `<div class="mt-3"> </div> <ion-icon class="format-icon" name="partly-sunny-outline"></ion-icon> ${weatherData.condition.text}`
            containerClima.appendChild(condicao)

            const umidade = document.createElement('h2')
            umidade.innerHTML = `<div class="mt-3"> </div> <ion-icon class="icondisplay format-icon" name="water-outline"></ion-icon> ${weatherData.humidity}%`
            containerClima.appendChild(umidade)

        }
        const ConainterShowMoreDetails = document.getElementById('ShowMoreDetails')
     if (ConainterShowMoreDetails) {
        ConainterShowMoreDetails.innerHTML = ''

        const TitleMoreDetails = document.createElement('h1')
        TitleMoreDetails.innerHTML = `Mais detalhes`
        TitleMoreDetails.className = 'font'
        ConainterShowMoreDetails.appendChild(TitleMoreDetails)

        const Vento = document.createElement('p')
        Vento.innerHTML = `Vento: ${weatherData.wind_kph} km/h`
        ConainterShowMoreDetails.appendChild(Vento)
         
        const VentoDirecao = document.createElement('p')
        const getVentoDirecao = weatherData.wind_dir

        if(getVentoDirecao == 'SSE'){
            VentoDirecao.innerHTML = `Direção do vento: Sudeste-Sul`
        }
        else if(getVentoDirecao == 'SW'){
            VentoDirecao.innerHTML = `Direção do vento: Sudoeste`
        }
        else if(getVentoDirecao == 'SE'){
            VentoDirecao.innerHTML = `Direção do vento: Sudoeste`
        }
        else if(getVentoDirecao == 'NW'){
            VentoDirecao.innerHTML = `Direção do vento: Noroeste`
        }
        else if(getVentoDirecao == 'NE'){
            VentoDirecao.innerHTML = `Direção do vento: Nordeste`
        }
        else if(getVentoDirecao == 'W'){
            VentoDirecao.innerHTML = `Direção do vento: Oeste`
        }
        else if(getVentoDirecao == 'E'){
            VentoDirecao.innerHTML = `Direção do vento: Leste`
        }
        else if(getVentoDirecao == 'S'){
            VentoDirecao.innerHTML = `Direção do vento: Sul`
        }
        
        ConainterShowMoreDetails.appendChild(VentoDirecao)

        const UV = document.createElement('p')
        const getUV = weatherData.uv

        
        if(getUV <= 2){
            UV.innerHTML = `Nível UV: <span class='Green'> ${weatherData.uv} - Mínimo </span>`
        
        }
        else if(getUV <= 5){
            UV.innerHTML = `Nível UV: <span class='Yellow'> ${weatherData.uv} - Moderado </span>`
        }
        else if(getUV <= 7){
            UV.innerHTML = `Nível UV:  <span class='Red'> ${weatherData.uv} - Alto`
        }
        else if(getUV <= 10){
            UV.innerHTML = `Nível UV: <span class='Red'> ${weatherData.uv} - Muito Alto`
        }
        else{
            UV.innerHTML = `Nível UV: <span class='Black'> ${weatherData.uv} - Extremo`
        }
        ConainterShowMoreDetails.appendChild(UV)

        const getpressaoin = weatherData.pressure_in
        const pressao = document.createElement('p')
        pressao.innerHTML = `Pressão: ${getpressaoin} in`
        ConainterShowMoreDetails.appendChild(pressao)

        const chuva = document.createElement('p')
        chuva.innerHTML = `Chuva: ${weatherData.precip_mm}mm`
        ConainterShowMoreDetails.appendChild(chuva)

        const lastupdate = document.createElement('p')
        lastupdate.innerHTML = `Última atualização: ${weatherData.last_updated}`
        ConainterShowMoreDetails.appendChild(lastupdate)

     }
     function exibirMensagemErro(mensagem) {
        const containerClima = document.getElementById('ShowClimate');
        if (containerClima) {
            containerClima.innerHTML = `<div class="alert alert-warning" role="alert">${mensagem}</div>`;
        }
    }
    
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const location = document.getElementById('local').value
        clima(location)
    })

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


    