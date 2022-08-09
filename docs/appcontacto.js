window.onload = function() {
    // Input
    var textNombre = document.getElementById('subNombre');
    var textEmail = document.getElementById('subEmail');
    var textMens = document.getElementById('subMens');

    // Error message
    var nomError = document.getElementById('nombreError');
    var emError = document.getElementById('emailError');
    var mensError = document.getElementById('mensError');

    // Add event listeners
    textNombre.addEventListener('blur', validateText);
    textNombre.addEventListener('focus', clearNomError);

    textEmail.addEventListener('blur', validateEmail);
    textEmail.addEventListener('focus', clearEmailError);

    textMens.addEventListener('blur', validateMens);
    textMens.addEventListener('focus', clearMensError);

    function clearNomError(e) {
        nomError.classList.add('hiddenError');
        textNombre.classList.remove('alertRed');
    }

    function clearEmailError(e) {
        emailError.classList.add('hiddenError');
        textEmail.classList.remove('alertRed');
    }

    function clearMensError(e) {
        mensError.classList.add('hiddenError');
        textMens.classList.remove('alertRed');
    }

    function validateText(e) {
        var x = textNombre.value;
        if(x.length < 3) {
        nomError.classList.remove('hiddenError');
        }
    }

    function validateMens(e) {
        var x = textNombre.value;
        if(x.length < 5) {
        mensError.classList.remove('hiddenError');
        }
    }

    function validateEmail(e) {
        var x = textEmail.value;
        var mailFormat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(mailFormat.test(x) == false){        
            emError.classList.remove('hiddenError');
        }
    }
}

function clickEnviar(){

    validateBtnNombre();
    validateBtnEmail();
    validateBtnMens();

    if(validateBtnNombre() == true  && validateBtnEmail() == true && validateBtnMens() == true){
            let nombre = document.getElementById("subNombre").value;
            let email = document.getElementById("subEmail").value;
            let mensaje = document.getElementById("subMens").value;
            window.open('mailto:test@mail.com?cc='+email+'&subject=Contacto de '+nombre+'&body='+mensaje)
        }
}

function validateBtnNombre() {
    let x = document.getElementById("subNombre").value;
    if (x == "") {
        document.getElementById("subNombre").classList.add('alertRed');
        return false;
    } else if(x.length < 3){
        document.getElementById("subNombre").classList.remove('hiddenError');
        return false
    } else {
        return true;
    }
}

function validateBtnEmail() {
    let x = document.getElementById("subEmail").value;
    var mailFormat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (x == "") {
        document.getElementById("subEmail").classList.add('alertRed');
        return false;
    } else if(mailFormat.test(x) == false){        
        document.getElementById("subEmail").classList.remove('hiddenError');
        return false;
    } else {
        return true;
    }
}

function validateBtnMens() {
    let x = document.getElementById("subMens").value;
    if (x == "") {
        document.getElementById("subMens").classList.add('alertRed');
        return false;
    } else if(x.length < 3){
        document.getElementById("subMens").classList.remove('hiddenError');
        return false
    } else {
        return true;
    }
}

function redirigirGithub(){
    window.open('https://github.com/hlerda1/wordle', '_blank').focus();
}

function redirigirContacto(){
    window.location.href="contacto.html"
}

