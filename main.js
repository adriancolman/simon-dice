
const $cuadro = document.querySelectorAll(".cuadro");
let $jugadaUsuario = [];
let $jugadaMaquina = [];
const $start = document.querySelector(".start");
const $bloqueo = document.querySelector(".bloqueo");
let ronda = 0;
const $mensaje = document.querySelector(".mensaje");

bloquearUsuario();
$start.onclick = comenzarJuego;


function comenzarJuego() {
    $start.classList.add("outmargin");
    $bloqueo.classList.remove("bloqueo");
    bloquearUsuario();
    ronda++;
    jugadaMaquina();
    $jugadaUsuario = [];
    
}

function escribirMensaje(mensaje, tipo){
    $mensaje.textContent= mensaje;
    if(tipo==="maquina"){
        $mensaje.classList.remove("bg-primary");
        $mensaje.classList.remove("bg-warning");
        $mensaje.classList.add("bg-success");
    }
    else if(tipo==="jugador"){
        $mensaje.classList.remove("bg-success");
        $mensaje.classList.add("bg-warning");
    }
    else if(tipo==="perdiste"){
        $mensaje.classList.remove("bg-warning");
        $mensaje.classList.add("bg-primary");
    }
}

function imprimirRonda(){
    let $numeroRonda=document.querySelector(".numero-ronda");
    if(ronda<10){
        $numeroRonda.textContent=`0${ronda}`;
    }
    else if(ronda>=10){
        $numeroRonda.textContent= ronda;
    }
}

function resaltar (element, index){
    setTimeout(function(){
    element.classList.add("activo");
    }, (index+1)*1000);
    setTimeout(function () {
        element.classList.remove("activo");
      }, (index+1.5)*1000);
}

function tomarJugadaUsuario(element){
    $jugadaUsuario.push(element);
    console.log($jugadaUsuario);
    return $jugadaUsuario;
}

function jugadaMaquina(){
    escribirMensaje("turno maquina", "maquina");
    imprimirRonda();
    let valor;
    function azar(){valor = Math.floor(Math.random()*10); return valor;}
    azar();
    while(valor >3){
        azar();
    }
    if(valor<=3){
        $jugadaMaquina.push($cuadro[valor]);
        $jugadaMaquina.forEach(resaltar);
        console.log($jugadaMaquina);
        setTimeout(turnoUsuario, ($jugadaMaquina.length+1) *1000);
        for (let i = 0; i < $jugadaMaquina.length; i++) {
            const element = $jugadaMaquina[i];
            resaltar(element, i);
        }
        
        return $jugadaMaquina;
    }

    
}



function bloquearUsuario() {
    $cuadro.forEach(function (cuadro) {
        cuadro.classList.add("bloqueado");
        cuadro.onclick = function (){
            contadorClicks ++;
            if(contadorClicks==1 || contadorClicks==10){
                if(cuadro.className === "bloqueado"){
                alert("aguarde su turno");}
            }
            else {

            }
            return contadorClicks;
        }   
      });
}

function desbloquearUsuario(element){
    element.classList.remove("bloqueado");
}

function turnoUsuario(){
    escribirMensaje("turno usuario","jugador");
    $cuadro.forEach(desbloquearUsuario);
    
    $cuadro.forEach(function(cuadro){
        cuadro.onclick = function(e){
            //cuadro = e.target;
        e.target.classList.add("activo");
        setTimeout(function(){
            e.target.classList.remove("activo");
        },500);
        tomarJugadaUsuario(e.target);
    
    if($jugadaUsuario.length === $jugadaMaquina.length){
        
        compararJugadas($jugadaMaquina, $jugadaUsuario);
        if(compararJugadas($jugadaMaquina, $jugadaUsuario)==="game over"){
            alert("perdiste");
            ronda = 0;
            escribirMensaje("Clickeá el botón START para comenzar", "perdiste");
            $jugadaMaquina=[];
            bloquearUsuario();
            setTimeout(function(){
                $start.classList.remove("outmargin");
            },1000);
            $bloqueo.classList.remove("bloqueo");
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


function compararJugadas(elemento1, elemento2){
    const perdiste  = "game over";
    for (let i = 0; i < elemento1.length; i++) {
        if(elemento1[i].id===elemento2[i].id){
            console.log("esta bien!");
            }
        else{
            return perdiste;
        }

        
    }
}





