window.onload = function(){   

    let focoVacio = 0;
    traerObjetoStorage();
    saltarFila();
    inicio2();
    saltar();
    validacionRecarga();

    /*MUEVE EL CURSOR AL BLOQUE SIGUEINTE CON CADA LETRA INTRODUCIDA Y CONDICIONA BACKSPACE*/
    function saltar(){
        for (let iFila = 0; iFila < 6; iFila++) {
            for (let iColumna = 0; iColumna < 5; iColumna++){
                document.getElementById('block'+iFila+'_'+iColumna).oninput = function(event) {
                    // var target = event.srcElement || event.target;
                    var target = event.target;
                    var next = target;
                    var myLength = target.value.length;
                    if (myLength >= 1) {
                        while (next = next.nextElementSibling) {
                            if (next == null)
                                break;
                            if (next.tagName.toLowerCase() === "input") {
                                next.focus();
                                break;
                            }
                        }
                    }
                    // Move to previous field if empty (user pressed backspace)
                    else if (myLength === 0) {
                        var previous = target;
                        while (previous = previous.previousElementSibling) {
                            if (previous == null)
                            {
                                break;
                            }
                            if (previous.tagName.toLowerCase() === "input") {
                                previous.focus();
                                break;
                            }
                        }
                    }
                };                
     
            }
        }
    }

    document.addEventListener('keydown', verificarBackspace)
    function verificarBackspace(event){
        var keyId = event.keyCode;
        if (keyId == 8)
        {
            focoVacio = 1;
        }
        else
        {
            focoVacio = 0;
        }
    }

    var minutesLabel = document.getElementById("minutos");
    var secondsLabel = document.getElementById("segundos");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
}
let partElegida = localStorage.getItem('partida');

/*ARREGLO PARA IDENTIFICAR COLORES ASIGNADOS A LOS LETRAS INTRODUCIDAS*/
var colores = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
];


/*ARREGLO DE LAS LETRAS INTRODUCIDAS POR EL JUGADOR*/
var letras = [
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ']
];

let palabraGanadora = '';

var palabraFila = '';

/*ARREGLO DONDE DE DESGLOZAN LAS LETRAS DE LA PALABRA GANADORA*/
var arrayPalabraGanadora = ['','','','',''];

/*ARREGLO DONDE DE DESGLOZAN LAS LETRAS DE LA PALABRA INTRODUCIDA POR EL JUGADOR*/
var arrayFila = [' ',' ',' ',' ',' ']; 

/*INDICA EN QUE FILA SE ENCUENTRA EL JUGADOR*/
var focoFila = 0;

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
    partidas:{
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
    }
};

function traerObjetoStorage(){
    let nombreJugador = localStorage.getItem('jugador');

    objetoJuego = JSON.parse(localStorage.getItem(nombreJugador))
    if(partElegida > objetoJuego.partidas.length-1){
        const objNuevo = {
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
        }
        objetoJuego.partidas.push(objNuevo)
    }
    
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iColumna = 0; iColumna < 5; iColumna++){
            document.getElementById('block'+iFila+'_'+iColumna).value = objetoJuego.partidas[partElegida].ultimaGrilla[iFila][iColumna]
        }            
    }
    cargarLetras();
    
    if(objetoJuego.partidas[partElegida].palabraExistente.length > 0){
        focoFila = objetoJuego.partidas[partElegida].posicionGrilla+1;
    }
    else{
        focoFila = objetoJuego.partidas[partElegida].posicionGrilla
    }
    
    saltarFila();
}

/* --OBTENER ARRAY DE PALABRAS ELEGIR PALABRA GANADORA-- */
var arrayListaPalabras = Array();

fetch('https://wordle.danielfrg.com/words/5.json')
.then(data => {
    return data.json();
})
.then(response => {
    for (let i = 0; i < response.length; i++) {
        arrayListaPalabras[i] = response[i];
    }
    if(objetoJuego.partidas[partElegida].palabraExistente == ''){
        // if(objetoJuego.palabrasUsadas != null){
        if(objetoJuego.partidas[partElegida].palabrasUsadas.length > 0){   
            let condicion = 0
            do{
                let random = Math.floor(Math.random() * response.length);
                for (var i = 0; i < objetoJuego.partidas[partElegida].palabrasUsadas.length; i++)
                {
                    if(objetoJuego.partidas[partElegida].palabrasUsadas[i] == arrayListaPalabras[random]){
                        condicion = 0;
                    }
                    else{
                        condicion = 1;
                        palabraGanadora = arrayListaPalabras[random]
                    }                       
                }
            }
            while(condicion < 1);                
        }
        else{
            let random = Math.floor(Math.random() * response.length);
            palabraGanadora = arrayListaPalabras[random]
        }
    }
    else{
        palabraGanadora = objetoJuego.partidas[partElegida].palabraExistente;
    }
    cargarArrayPalabraGanadora();
    console.log(palabraGanadora);
    
})
.catch(function(error){
    console.log("Error", error);
    // alert("ERROR" +'\n'+ error);
})
/* --OBTENER ARRAY DE PALABRAS ELEGIR PALABRA GANADORA-- */

/*CAMBIA EL COLOR DEL BLOQUE DEPENDIENDO DE SI ES CORRECTA LA LETRA Y SU POSICION*/
function pintarTablero(){
    for (var iFila = 0; iFila < 6; iFila++) {
        for (var iColumna = 0; iColumna < 5; iColumna++){
            const input = document.getElementById('block'+iFila+'_'+iColumna)
            switch (colores[iFila][iColumna]) {
            case 0:
                    input.style.backgroundColor = 'white';
                break;
            case 1:
                input.style.backgroundColor = 'green';
            break;
            case 2:
                    input.style.backgroundColor = 'yellow';
                break;
            case 3:
                input.style.backgroundColor = 'grey';
            break;
            
            default:
                break;
            }
        }        
        } 
}

/*CARGA LA PALABRA GANADORA EN EL ARRAY DE PALABRA GANADORA*/
function cargarArrayPalabraGanadora(){
    arrayPalabraGanadora = palabraGanadora.split("");
}

/*FUNCION PARA ENFOCAR EN LA SIGUEINTE FILA Y DESABILITAR LA ANTERIOR*/
function saltarFila(){
    for(let i = 0; i < 6; i++){
        if (focoFila != i){
            document.getElementById('row'+i).disabled = true;
        }
        else{
            document.getElementById('row'+i).disabled = false;
            document.getElementById('block'+i+'_0').focus();
        }
    }

}

function obtenerFecha(){
    var d = Date(Date.now());
    let a = d.toString();
    let b = a.slice(4,22);
    return b
}

function cargarObjeto(fila){
    // objetoJuego.nombre = 'Horacio';
    
    objetoJuego.partidas[partElegida].posicionGrilla = fila;
    objetoJuego.partidas[partElegida].fecha = obtenerFecha();
    if (fila <= 0){
        objetoJuego.partidas[partElegida].palabrasUsadas.push(palabraGanadora)
        objetoJuego.partidas[partElegida].palabraExistente = palabraGanadora
        }
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iColumna = 0; iColumna < 5; iColumna++){
            objetoJuego.partidas[partElegida].ultimaGrilla[iFila][iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
        }
    }
    let serializacionObjeto = JSON.stringify(objetoJuego);

    localStorage.setItem(objetoJuego.nombre, serializacionObjeto)
}

/*Funcion para obtener la fila*/
function inicio2(){  
    let palabraValida = false;      
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iColumna = 0; iColumna < 5; iColumna++){
            document.getElementById('block'+iFila+'_'+iColumna).onkeydown = function(event) {
                if (event.key === "Enter") {              
                    cargarLetras();
                    cargarFila(iFila)
                    palabraFila = arrayFila[0]+arrayFila[1]+arrayFila[2]+arrayFila[3]+arrayFila[4] 
                    for(let i = 0; i < arrayListaPalabras.length; i++){
                        if (arrayListaPalabras[i] == palabraFila){
                            palabraValida = true; 
                        }
                    }
                    if(palabraValida == true){
                        validarLetra(iFila);
                        pintarTablero();
                        focoFila++;  
                        saltarFila();                      
                        let resultado = compararPalabras(iFila);
                        cargarObjeto(iFila);
                        if (resultado == true){
                            limpiarTablero();
                        }  
                    }   
                    else{
                        alert('No es una palabra de la lista')
                    }       
                }
            };         
        }
    }
}

/*OBTIENE LAS LETRAS DE LA FILA Y CARGA EN EL ARRAY DE LETRAS*/
function cargarLetras(){
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iColumna = 0; iColumna < 5; iColumna++){
            letras[iFila][iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
        }
    }
}

/*CARGA EL ARRAY DE LA FILA PARA SU COMPARACION*/
function cargarFila(fila){
    let iFila = fila   
    for (let iColumna = 0; iColumna < 5; iColumna++){
        arrayFila[iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
    }        
    return arrayFila;
}

function compararPalabras(fila){
    let iFila = fila;
    palabraFila = arrayFila[0]+arrayFila[1]+arrayFila[2]+arrayFila[3]+arrayFila[4]
    if(palabraFila == palabraGanadora){
        // Get the modal
        var modal = document.getElementById("indexModalGanador");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeG")[0];

        modal.style.display = "block";

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //     modal.style.display = "none";
        // }
        
        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //     modal.style.display = "none";
        //     }
        // }
        objetoJuego.partidas[partElegida].resultadosPartida.posicion.push(fila)
        let valorMin = document.getElementById('minutos').textContent
        let valorSeg = document.getElementById('segundos').textContent
        objetoJuego.partidas[partElegida].resultadosPartida.tiempo.push(valorMin+":"+valorSeg)
        return true
    }
    else if(iFila >= 5){
        // Get the modal
        var modal = document.getElementById("indexModalPerdedor");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeP")[0];

        modal.style.display = "block";

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //     modal.style.display = "none";
        // }
        
        // // When the user clicks anywhere outside of the modal, close it
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //     modal.style.display = "none";
        //     }
        // }
        objetoJuego.partidas[partElegida].resultadosPartida.posicion.push(6)
        let valorMin = document.getElementById('minutos').textContent
        let valorSeg = document.getElementById('segundos').textContent
        objetoJuego.partidas[partElegida].resultadosPartida.tiempo.push(valorMin+":"+valorSeg)
        return true
    }
}

function clickContinuar(){
    window.location.href="juego.html";
}

function clickVolver(){
    window.location.href="index.html";
}


function limpiarTablero(){
    for (let iFila = 0; iFila < 6; iFila++) {
        for (let iColumna = 0; iColumna < 5; iColumna++){
            objetoJuego.partidas[partElegida].ultimaGrilla[iFila][iColumna] = '';
        }
    }
    objetoJuego.partidas[partElegida].palabraExistente = '';
    objetoJuego.partidas[partElegida].posicionGrilla = 0;
    
    let serializacionObjeto = JSON.stringify(objetoJuego);

    localStorage.setItem(objetoJuego.nombre, serializacionObjeto)
}

/*Verificación que las letras corresponden a la palabra y si estan desordenadas*/
function validarLetra(fila){
    let iFila = fila;        
    for (let i = 0; i < 5; i++){
        let letraExiste = false; 
        // var contador = 0;
        if(arrayFila[i] == arrayPalabraGanadora[i]){
            colores[iFila][i] = 1;
        }
        else{
            for(let e = 0; e < 5; e++){
                if(arrayFila[i] == arrayPalabraGanadora[e]){
                    letraExiste = true;
                }
            }
            if(letraExiste == true){
                colores[iFila][i] = 2;
            }
            else{
                colores[iFila][i] = 3;
            }
        }
    }
}

function validarLetra2(fila){
    let iFila = fila;   
    var arrayGanadora = ['','','','',''];  
    var arrayFilaVieja = ['','','','',''];  
    arrayGanadora = objetoJuego.partidas[partElegida].palabraExistente.split("");
    arrayFilaVieja = objetoJuego.partidas[partElegida].ultimaGrilla[iFila];
    for (let i = 0; i < 5; i++){
        let letraExiste = false; 
        // var contador = 0;
        // arrayGanadora = palabraExistente.split("");
        if(arrayFilaVieja[i] == arrayGanadora[i]){
            colores[iFila][i] = 1;
        }
        else{
            for(let e = 0; e < 5; e++){
                if(arrayFilaVieja[i] == arrayGanadora[e]){
                    letraExiste = true;
                }
            }
            if(letraExiste == true){
                colores[iFila][i] = 2;
            }
            else{
                colores[iFila][i] = 3;
            }
        }
    }
}

function validacionRecarga(){
    if(objetoJuego.partidas[partElegida].palabraExistente.length > 0){
        
        for(let i = 0; i < focoFila; i++){
                validarLetra2(i);
            }
        pintarTablero();
    }
}  


function redirigirGithub(){
    window.open('https://github.com/hlerda1/wordle', '_blank').focus();
}

function redirigirContacto(){
    window.location.href="contacto.html"
}

function resultadoPartida(){
    // Get the modal
    var modal = document.getElementById("indexModalResultados");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("closeR")[0];

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