let objetoJuego = {
    nombre: '',
    posicionGrilla: 0,
    palabrasUsadas: [],
    palabraExistente: '',
    resultadosPartidas: [],
    ultimaGrilla: [
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','','']
    ],  
};

function clickNuevo(){
    objetoJuego.nombre = document.getElementById('textLogin').value;
    // objetoJuego.posicionGrilla = 0;
    // if (fila <= 0){
    //     objetoJuego.palabrasUsadas.push(palabraGanadora)
    //     }
    // console.log(objetoJuego)
    // for (let iFila = 0; iFila < 6; iFila++) {
    //     for (let iColumna = 0; iColumna < 5; iColumna++){
    //         objetoJuego.ultimaGrilla[iFila][iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
    //     }
    // }
    let serializacionObjeto = JSON.stringify(objetoJuego);
    localStorage.setItem(objetoJuego.nombre, serializacionObjeto);
    localStorage.setItem('jugador', objetoJuego.nombre);
    window.location.href="juego.html";
    // console.log(localStorage);
}

function clickContinuar(){
    objetoJuego.nombre = document.getElementById('textLogin').value;
    localStorage.setItem('jugador', objetoJuego.nombre);
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
    else{
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