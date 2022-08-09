// let objetoJuego = {
//     nombre: '',
//     posicionGrilla: 0,
//     palabrasUsadas: [],
//     palabraExistente: '',
//     resultadosPartidas: [],
//     ultimaGrilla: [
//         ['','','','',''],
//         ['','','','',''],
//         ['','','','',''],
//         ['','','','',''],
//         ['','','','',''],
//         ['','','','','']
//     ],  
// };

let objetoJuego = {
    nombre: '',
    partidas:[{
        fecha: '',
        posicionGrilla: 0,
        palabrasUsadas: [],
        palabraExistente: '',
        resultadosPartida: {
            posicion: [],
            tiempo: [],
        },
        ultimaGrilla: [
            ['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','',''],
            ['','','','','']
        ],  
    }]
};

function clickNuevo(){
    objetoJuego.nombre = document.getElementById('textLogin').value;
    let serializacionObjeto = JSON.stringify(objetoJuego);
    localStorage.setItem(objetoJuego.nombre, serializacionObjeto);
    localStorage.setItem('jugador', objetoJuego.nombre);
    localStorage.setItem('partida', 0);
    window.location.href="juego.html";
    // console.log(localStorage);
}

function clickNuevaPartida(){
    objetoJuego.nombre = document.getElementById('textLogin').value;
    console.log(objetoJuego.partidas.length)
    localStorage.setItem('jugador', objetoJuego.nombre);
    localStorage.setItem('partida', objetoJuego.partidas.length);
    window.location.href="juego.html";
}

function clickJugar(){
    let keyJugador = document.getElementById('textLogin').value
    if(localStorage.getItem(keyJugador) === null)
    {
        // Get the modal
        var modal = document.getElementById("indexModalNoExiste");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeNe")[0];

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
    }
    else{

        obtenerPartidas();
        // Get the modal
        var modal = document.getElementById("indexModalExiste");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeEx")[0];

        modal.style.display = "block";
        // alert("Usuario y contraseña invalidos")
        // localStorage.setItem('loginStatusKey', 0)

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        
    }
}

function obtenerPartidas(){
    let nombreJugador = document.getElementById('textLogin').value
    objetoJuego = JSON.parse(localStorage.getItem(nombreJugador))
    console.log(objetoJuego.partidas[0].resultadosPartida.posicion.length)
    
    for (let i = 0; i < objetoJuego.partidas.length; i++) {
        // arrayListUsers[i] = response.data[i];
        /* --Loading table-- */
        // GET TABLE
        var table = document.getElementById("tablaPartidas");
        // INSERT ROW
        var row = table.insertRow();    
        // INSERT CELLS
        var cell = row.insertCell();
        let p = i+1;
        cell.innerHTML = 'Partida '+p;
        var cell = row.insertCell();
        cell.innerHTML = objetoJuego.partidas[i].fecha;
        var cell = row.insertCell();
        cell.innerHTML = '<input type="button" class="tablaSelect" onclick="clickSeleccionar('+i+')" value="Select"/>';
        // var cell = row.insertCell();
        // cell.innerHTML = 'TBD';
        /* --Loading table-- */
    }
}

function clickSeleccionar(i){
    objetoJuego.nombre = document.getElementById('textLogin').value;
    localStorage.setItem('jugador', objetoJuego.nombre);
    localStorage.setItem('partida', i);
    window.location.href="juego.html";
}

function redirigirGithub(){
    window.open('https://github.com/hlerda1/wordle', '_blank').focus();
}

function redirigirContacto(){
    window.location.href="contacto.html"
}