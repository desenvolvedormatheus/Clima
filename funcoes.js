// data e hora atuais
$(document).ready(function() {
    let dataHoraAtual = new Date();
    let hora = `${dataHoraAtual.getHours()}:${dataHoraAtual.getMinutes()}`;

    let diasDaSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    let diaDaSemana = diasDaSemana[dataHoraAtual.getDay()];

    let diaDoMes = dataHoraAtual.getDate();

    let meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    let mes = meses[dataHoraAtual.getMonth()];

    let ano = dataHoraAtual.getFullYear();

    $("#datahora").html(`${hora} - ${diaDaSemana}, ${diaDoMes} de ${mes} de ${ano}`)
}); 

// Função que é chamada quando as coordenadas são obtidas com sucesso
function success(pos) {
    let city = "Guarulhos";
    const apichave = 'ec392aeb8368568c3d68c3c7fe112665';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apichave}&units=metric`;
    
    $.getJSON(url, function(data) {

        // clima e cidade
        let descricao = data.weather[0].main;
        $("#descricao").html(descricao)

        city = city[0].toUpperCase() + city.substring(1).toLowerCase();
        $("#cidade").html(city)

        // sons e fundos relativos
        if(descricao === "Clear"){
            $("#fundo").attr("src", "imgs/fundosol.jpg");
        } else if(descricao === "Thunderstorm" || descricao === "Rain"){
            $("#som").attr("src", "sons/somChuva.mp3");
            let som = $("#som").get(0); som.volume = 0.1; som.play();
            $("#fundo").attr("src", "imgs/fundochuva.jpg");
        } else if(descricao === "Snow"){
            $("#fundo").attr("src", "imgs/fundoneve.jpg");
        } else{
            $("#fundo").attr("src", "imgs/fundonublado.jpg");
        }

        // Graus atual
        $("#graus").html(Math.ceil(data.main.temp)+ "º")

        // Cards
        $("#temperaturaMinima").html(parseInt(data.main.temp_min)+ "º")
        $("#temperaturaMaxima").html(parseInt(data.main.temp_max)+ "º")

        const chuvaMm = data.rain ? data.rain["1h"] : 0;
        $("#mmDeChuva").html(chuvaMm + "mm")
        
        const porcentoChuva = data.rain ? data.rain["pop"] : 0;
        $("#porcentagemChuva").html(porcentoChuva + "%")
        
        $("#velocidadeVento").html(data.wind.speed + " km/h")

        $("#umidade").html(data.main.humidity+ "%")

        $("#arcoIris").html("Não há probabilidade.")

        let nascer = data.sys.sunrise;
        let dataNascer = new Date(nascer * 1000);
        let horaNascer = dataNascer.toLocaleTimeString('pt-BR', {hour: 'numeric', minute: 'numeric'});
        $("#nascerSol").html(horaNascer + " -")

        let porSol = data.sys.sunset;
        let dataPorSol = new Date(porSol * 1000);
        let horaPorSol = dataPorSol.toLocaleTimeString('pt-BR', {hour: 'numeric', minute: 'numeric'});
        $("#porSolSol").html(horaPorSol + " -")
        
        function getDescricaoLua(estado) {
            switch (estado) {
              case "0": return "Lua Nova";
              case "1": return "Lua Crescente";
              case "2": return "Lua Cheia";
              case "3": return "Lua Minguante";
              default: return "Desconhecido";
            }
          }
        const estadoLua = data.weather[0].icon[0];
        const descricaoLua = getDescricaoLua(estadoLua);
        $("#lua").html(descricaoLua)

    });
}
success()
