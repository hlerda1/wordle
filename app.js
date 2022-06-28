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
        [0,3,0,3,0],
        [0,0,2,0,0],
        [0,2,0,0,0],
        [0,0,0,1,2],
        [0,1,0,0,0]
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

    pintarTablero();

    var letras = [
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' ']
    ];

    function inicio(){
        
    }
}