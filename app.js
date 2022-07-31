window.onload = function(){
    // var xAxis = [
    //     ['01','02','03','04','05','06'],
    //     ['07','08','09','10','11','12'],
    //     ['13','14','15','16','17','18'],
    //     ['19','20','21','22','23','24'],
    //     ['25','26','27','28','29','30'],
    //     ['31','32','33','34','35','36']
    // ];

    // for (var i = 0; i < 6; i++) {
    //     for (var e = 0; e < 6; e++){
    //         console.log(xAxis[i][e]);
    //     }        
    //   }

    var colores = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];

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

    

    var letras = [
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ']
    ];

    var arrayPalabra = ['a','b','a','c','o'];

    var arrayFila = [' ',' ',' ',' ',' ']; 

    function inicio(){
        for (let iFila = 0; iFila < 6; iFila++) {
            for (let iColumna = 0; iColumna < 5; iColumna++){
                document.getElementById('block'+iFila+'_'+iColumna).oninput = function(event) {
                // var x = document.getElementById('block'+iFila+'_'+iColumna).value;                
                letras[iFila][iColumna] = event.target.value;
                console.log(letras);
                };                
     
            }
        }
    }

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
                    }
                };                
     
            }
        }
    }

    function cargarLetras(){
        for (let iFila = 0; iFila < 6; iFila++) {
            for (let iColumna = 0; iColumna < 5; iColumna++){
                letras[iFila][iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
            }
        }
    }

    function cargarFila(fila){
        let iFila = fila
        // var array1 = [' ',' ',' ',' ',' '];    
        for (let iColumna = 0; iColumna < 5; iColumna++){
            arrayFila[iColumna] = document.getElementById('block'+iFila+'_'+iColumna).value;
        }        
        return arrayFila;
    }

    /*Verificación que las letras corresponden a la palabra y si estan desordenadas*/
    function validarLetra(fila){
        let iFila = fila;
        let letraExiste = false;
        for (let i = 0; i < 5; i++){
            if(arrayFila[i] == arrayPalabra[i]){
                colores[iFila][i] = 1;
            }
            else{
                for(let e = 0; e < 5; e++){
                    if(arrayFila[i] == arrayPalabra[e]){
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

    
}