# wordle

Wordle es un juego que prueba tu conocimiento sobre el lenguaje. El objetivo es descubrir la palabra ganadora.

Para jugar wordle solo necesitas un navegardor. Puede jugarse tanto en PC como en celular.
Algunos problemas de autenticación pueden ocurrir en la version actual. Para resolverlo, instale y habilite "Allow CORS": https://mybrowseraddon.com/access-control-allow-origin.html.

Para jugar solo accedé a la página principal utilizando el siguiente link: https://hlerda1.github.io/wordle/.
Una vez en la página ingresá tu nombre de usuario y hace click en "jugar".
Si ese usuario es nuevo podras registrarlo y automaticamente iniciar una nueva partida, si es un usuario ya existente se te pedirá que elijas entre las partidas guardadas o si queres, podes iniciar una nueva.
Verás una grilla de 5 x 6 con la primera fila habilitada para introducir palabras. Si estas continuando una partida anterior, observaras que las filas previas se han repopulado y continuaras donde quedaste.
Ingresa una palabra de cinco letras y presiona Enter/Return/Entrar el sistema validara contra la "Palabra Ganadora" y te mostrara lo siguiente:
    - Si la palabra introducida es correcta, los campos se resaltaran en verde y un mensaje de felicitaciones aparecerá preguntando si querés continuar jugando o volver a la página principal.
    - Si la palabra introducida no es correcta el sistema resaltará las letras que introduciste de la sigueinte manera:
        - Verde, la letra esta en la palabra y en la posición correcta.
        - Amarillo, la letra esta en la palabra pero en un lugar diferente.
        - Gris, la letra no es parte de la palabra ganadora.
    - Si después de seís(6) intentos no lograste descubrir la palabra ganadora un mensaje indicando que fallaste y si querés continuar jugando o volver a la página principal.


Podras obtener el código fuente en el siguiente repositorio: https://github.com/hlerda1/wordle.