const palabras = ["ELEFANTE", "COMPUTADORA", "BICICLETA", "TELEVISOR", "GALAXIA", "AEROPUERTO", "RINOCERONTE", "EXTRATERRESTRE", "MONTAÑA", "TORNADO"];
const canvas = document.getElementById("canvas");
const dib = canvas.getContext("2d");
let palabraSecreta;
let palabraAdivinada = [];
let intentosRestantes = 7;
let letrasUsadas = [];

function seleccionarPalabraAleatoria() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  palabraAdivinada = Array(palabraSecreta.length).fill("_");
  document.getElementById("palabraActual").textContent = palabraAdivinada.join(" ");
}

function dibujarAhorcado(intentos) {
  dib.clearRect(0, 0, canvas.width, canvas.height);

  if (intentos < 7) {
    dib.beginPath();
    dib.moveTo(50, 350);
    dib.lineTo(50, 50);
    dib.stroke();
    dib.beginPath();
    dib.moveTo(48, 50);
    dib.lineTo(200, 50);
    dib.stroke();
    dib.beginPath();
    dib.moveTo(200, 50);
    dib.lineTo(200, 100);
    dib.stroke();
  }

  if (intentos < 6) {
    dib.beginPath();
    dib.arc(200, 125, 25, 0, Math.PI * 2);
    dib.stroke();
  }

  if (intentos < 5) {
    dib.beginPath();
    dib.moveTo(200, 150);
    dib.lineTo(200, 250);
    dib.stroke();
  }

  if (intentos < 4) {
    dib.beginPath();
    dib.moveTo(200, 175);
    dib.lineTo(150, 200);
    dib.stroke();
  }

  if (intentos < 3) {
    dib.beginPath();
    dib.moveTo(200, 175);
    dib.lineTo(250, 200);
    dib.stroke();
  }

  if (intentos < 2) {
    dib.beginPath();
    dib.moveTo(200, 250);
    dib.lineTo(150, 300);
    dib.stroke();
  }

  if (intentos < 1) {
    dib.beginPath();
    dib.moveTo(200, 250);
    dib.lineTo(250, 300);
    dib.stroke();
  }
}

function verificarVictoriaDerrota() {
  if (palabraAdivinada.join("") === palabraSecreta) {
    document.getElementById("mensajeFinal").textContent = "¡Muy bien, has ganado!";
  } else if (intentosRestantes === 0) {
    document.getElementById("mensajeFinal").textContent = "¡Perdiste! La palabra secreta era: " + palabraSecreta;
  }
}

function actualizarInterfaz() {
  document.getElementById("intentosRestantes").textContent = intentosRestantes;
  document.getElementById("palabraActual").textContent = palabraAdivinada.join(" ");
  document.getElementById("letrasUsadasTexto").textContent = letrasUsadas.join(" - ");
}

function jugar(letra) {
  letra = letra.toUpperCase();

  if (letrasUsadas.includes(letra)) {
    return;
  }

  letrasUsadas.push(letra);

  if (palabraSecreta.includes(letra)) {
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (palabraSecreta[i] === letra) {
        palabraAdivinada[i] = letra;
      }
    }
    document.getElementById(letra).classList.add("correcto");
    document.getElementById(letra).classList.remove("incorrecto");
  } else {
    intentosRestantes--;
    dibujarAhorcado(intentosRestantes);
    document.getElementById(letra).classList.add("incorrecto");
    document.getElementById(letra).classList.remove("correcto");
  }

  actualizarInterfaz();
  verificarVictoriaDerrota();

  document.getElementById(letra).setAttribute("disabled", true);
}

function reiniciarJuego() {
  intentosRestantes = 7;
  letrasUsadas = [];
  palabraAdivinada = [];
  seleccionarPalabraAleatoria();
  dibujarAhorcado(intentosRestantes);
  actualizarInterfaz();
  verificarVictoriaDerrota();

  const botonesLetras = document.querySelectorAll(".botonLetra");
  botonesLetras.forEach(boton => {
    boton.removeAttribute("disabled");
    boton.classList.remove("correcto", "incorrecto");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const letrasDisponibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasDisponiblesContenedor = document.getElementById("letrasDisponibles");

  for (const letra of letrasDisponibles) {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.id = letra;
    boton.className = "boton botonLetra";
    boton.addEventListener("click", () => {
      if (intentosRestantes > 0 && !letrasUsadas.includes(letra)) {
        jugar(letra);
      }
    });
    letrasDisponiblesContenedor.appendChild(boton);
  }

  seleccionarPalabraAleatoria();
  dibujarAhorcado(intentosRestantes);
  actualizarInterfaz();

  const reiniciarBtn = document.getElementById("reiniciarBtn");
  reiniciarBtn.addEventListener("click", reiniciarJuego);
});
