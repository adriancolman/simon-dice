
const $cuadros = document.querySelectorAll(".cuadro");
let jugadaDeUsuario = [];
let jugadaDeMaquina = [];
const $start = document.querySelector(".start");
const $bloqueo = document.querySelector(".bloqueo");
let ronda = 0;
const $mensaje = document.querySelector(".mensaje");

bloquearUsuario();
$start.onclick = function () {
    desbloquearPantalla();
    comenzarJuego();
}


function comenzarJuego() {

    bloquearUsuario();
    ronda++;
    jugadaMaquina();
    jugadaDeUsuario = [];

}

function desbloquearPantalla() {
    $start.classList.add("outmargin");
    $bloqueo.classList.remove("bloqueo");
}

function escribirMensaje(mensaje, tipo) {
    $mensaje.textContent = mensaje;
    if (tipo === "maquina") {
        $mensaje.classList.remove("bg-primary");
        $mensaje.classList.remove("bg-warning");
        $mensaje.classList.add("bg-success");
    }
    else if (tipo === "jugador") {
        $mensaje.classList.remove("bg-success");
        $mensaje.classList.add("bg-warning");
    }
    else if (tipo === "perdiste") {
        $mensaje.classList.remove("bg-warning");
        $mensaje.classList.add("bg-primary");
    }
}

function imprimirRonda() {
    const $numeroRonda = document.querySelector(".numero-ronda");
    const imprimirNRonda = ronda.toString().padStart(2, "0");
    $numeroRonda.textContent = imprimirNRonda;

}

function resaltar(element, index) {
    setTimeout(function () {
        element.classList.add("activo");
    }, (index + 1) * 1000);
    setTimeout(function () {
        element.classList.remove("activo");
    }, (index + 1.5) * 1000);
}

function tomarJugadaUsuario(element) {
    jugadaDeUsuario.push(element);
    return jugadaDeUsuario;
}

function jugadaMaquina() {
    escribirMensaje("turno maquina", "maquina");
    imprimirRonda();
    let valor = generarNumRandom();

    jugadaDeMaquina.push($cuadros[valor]);
    jugadaDeMaquina.forEach(resaltar);
    setTimeout(turnoUsuario, (jugadaDeMaquina.length + 1) * 1000);
    for (let i = 0; i < jugadaDeMaquina.length; i++) {
        const element = jugadaDeMaquina[i];
        resaltar(element, i);
    }

    return jugadaDeMaquina;
}

function generarNumRandom() {
    const valor = Math.floor(Math.random() * 4);
    return valor;
}



function bloquearUsuario() {
    $cuadros.forEach(function (cuadro) {
        cuadro.classList.add("bloqueado");
    });
}

function desbloquearUsuario(element) {
    element.classList.remove("bloqueado");
}

function turnoUsuario() {
    escribirMensaje("turno usuario", "jugador");
    $cuadros.forEach(desbloquearUsuario);

    $cuadros.forEach(function (cuadro) {
        cuadro.onclick = function (e) {
            
            e.target.classList.add("activo");
            setTimeout(function () {
                e.target.classList.remove("activo");
            }, 500);
            tomarJugadaUsuario(e.target);

            if (jugadaDeUsuario.length === jugadaDeMaquina.length) {

                if (compararJugadas(jugadaDeMaquina, jugadaDeUsuario) === "game over") {
                    alert("perdiste");
                    ronda = 0;
                    escribirMensaje("Clickeá el botón START para comenzar", "perdiste");
                    jugadaDeMaquina = [];
                    bloquearUsuario();
                    setTimeout(function () {
                        $start.classList.remove("outmargin");
                    }, 1000);
                    ;
                }
                else {
                    bloquearUsuario();
                    setTimeout(comenzarJuego, 1000);

                }
            }
        }
    });

}


function compararJugadas(elemento1, elemento2) {
    const perdiste = "game over";
    for (let i = 0; i < elemento1.length; i++) {
        if (elemento1[i].id === elemento2[i].id) {
            
        }
        else {
            return perdiste;
        }


    }
}

function desbloquearTablero(){
    $bloqueo.classList.remove("bloqueo");
    
}





