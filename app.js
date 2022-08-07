

window.onload = function(){

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

    var palabraGanadora = '';

    var palabraFila = '';

    /*ARREGLO DONDE DE DESGLOZAN LAS LETRAS DE LA PALABRA GANADORA*/
    var arrayPalabraGanadora = ['a','b','a','c','o'];

    /*ARREGLO DONDE DE DESGLOZAN LAS LETRAS DE LA PALABRA INTRODUCIDA POR EL JUGADOR*/
    var arrayFila = [' ',' ',' ',' ',' ']; 

    /*INDICA EN QUE FILA SE ENCUENTRA EL JUGADOR*/
    var focoFila = 0;

    /* --OBTENER ARRAY DE PALABRAS ELEGIR PALABRA GANADORA-- */
    var arrayListaPalabras = Array();

    fetch('https://wordle.danielfrg.com/words/5.json')
    .then(data => {
        return data.json();
    })
    .then(response => {
        for (let i = 0; i < response.length; i++) {
            arrayListaPalabras[i] = response[i];
            // console.log(arrayListUsers[i])
        }
        let random = Math.floor(Math.random() * response.length);    
        palabraGanadora = arrayListaPalabras[random]
        console.log(palabraGanadora)
        cargarArrayPalabraGanadora()
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
            //   const input = document.getElementById('block1_1')
            //   console.log(iFila,iColumna)
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

    saltarFila();

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
                                break;
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

    // function inicio(){
    //     for (let iFila = 0; iFila < 6; iFila++) {
    //         for (let iColumna = 0; iColumna < 5; iColumna++){
    //             document.getElementById('block'+iFila+'_'+iColumna).oninput = function(event) {
    //             // var x = document.getElementById('block'+iFila+'_'+iColumna).value;                
    //             letras[iFila][iColumna] = event.target.value;
    //             console.log(letras);
    //             };                
     
    //         }
    //     }
    // }

    /*Funcion para obtener la fila*/
    function inicio2(){        
        for (let iFila = 0; iFila < 6; iFila++) {
            for (let iColumna = 0; iColumna < 5; iColumna++){
                document.getElementById('block'+iFila+'_'+iColumna).onkeydown = function(event) {
                    if (event.key === "Enter") {              
                        cargarLetras();
                        cargarFila(iFila)                        
                        console.log(letras);
                        console.log(arrayFila[0]+arrayFila[1]+arrayFila[2]+arrayFila[3]+arrayFila[4])
                        validarLetra(iFila);
                        pintarTablero();
                        focoFila++;
                        saltarFila();
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
        // var array1 = [' ',' ',' ',' ',' '];    
        for (let iColumna = 0; iColumna < 5; iColumna++){
            arrayFila[iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
        }        
        return arrayFila;
    }

    /*CARGA LA PALABRA GANADORA EN EL ARRAY DE PALABRA GANADORA*/
    //////////ESTA FUNCION DEBE SER ADAPTADA PARA INCLUIR LA ULTIMA PALABRA DEL OBJETO/////////////////////////// 
    function cargarArrayPalabraGanadora(){
        arrayPalabraGanadora = palabraGanadora.split("");
        for (let i = 0; i <5 ; i++){
            console.log(arrayPalabraGanadora[i])
        }
    }

    /*Verificación que las letras corresponden a la palabra y si estan desordenadas*/
    function validarLetra(fila){
        let iFila = fila;        
        for (let i = 0; i < 5; i++){
            let letraExiste = false; 
            var contador = 0;
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

    inicio2();

    saltar();
}