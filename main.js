const TIPOS = ["♥", "♦", "♣", "♠"];
const VALORES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const VALOR_MAPA = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
let baraja = [];
let cartaJugador, cartaCpu;

const cpuCardSlot = document.getElementById("cpu-card-slot");
const playerCardSlot = document.getElementById("player-card-slot");
const heigherButton = document.getElementById("higher-button");
const lowerButton = document.getElementById("lower-button");
const nextRoundButton = document.getElementById("next-round-button");
const resultText = document.getElementById("result-text");
const deckCountText = document.getElementById("deck-count");

const nuevaBaraja = () => {
  baraja = [];

  for (let tipo of TIPOS) {
    for (let valor of VALORES) {
      baraja.push({
        tipo: tipo,
        valor: valor,
        valorNumerico: VALOR_MAPA[valor],
      });
    }
  }

  for (let i = baraja.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
  }
};

const siguienteRonda = () => {
  if (baraja.length < 2) {
    nuevaBaraja();
  }

  cartaJugador = baraja.pop();
  cartaCpu = baraja.pop();

  mostrarCarta(cartaJugador, playerCardSlot);
  mostrarDorsoCarta(cpuCardSlot);

  deckCountText.textContent = baraja.length;

  resultText.textContent = "Mas alta o Mas baja?";
  toggleBotones(true);
};

const mostrarCarta = (carta, slot) => {
  slot.innerHTML = "";
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const colorClass = carta.tipo === "♥" || carta.tipo === "♦" ? "red" : "black";
  cardElement.classList.add(colorClass);

  cardElement.dataset.value = carta.valor;
  cardElement.dataset.suit = carta.tipo;

  const tipoCentral = document.createElement("span");
  tipoCentral.textContent = carta.tipo;
  cardElement.appendChild(tipoCentral);

  slot.appendChild(cardElement);
};

const mostrarDorsoCarta = (slot) => {
  slot.innerHTML = "";
  const cardBackElement = document.createElement("div");
  cardBackElement.classList.add("card-back");
  slot.appendChild(cardBackElement);
};

const elegirOpcion = (adivanza) => {
  toggleBotones(false);

  mostrarCarta(cartaCpu, cpuCardSlot);

  const valorJ = cartaJugador.valorNumerico;
  const valorC = cartaCpu.valorNumerico;

  let resultado = "";

  if (adivanza === "alta") {
    if (valorC > valorJ) resultado = "Ganaste!! Era mas alta";
    else if (valorC < valorJ) resultado = "Perdiste!! Era mas baja.";
    else resultado = "Perdiste!! Era un empate";
  } else {
    if (valorC < valorJ) resultado = "Ganaste!! Era mas baja.";
    else if (valorC > valorJ) resultado = "Perdiste!! Era mas alta.";
    else resultado = "Perdiste!! Era un empate";
  }

  resultText.textContent = resultado;
};

const toggleBotones = (mostrarAdivinanza) => {
  if (mostrarAdivinanza) {
    heigherButton.classList.remove("hidden");
    lowerButton.classList.remove("hidden");
    nextRoundButton.classList.add("hidden");
  } else {
    heigherButton.classList.add("hidden");
    lowerButton.classList.add("hidden");
    nextRoundButton.classList.remove("hidden");
  }
};

heigherButton.addEventListener("click", () => elegirOpcion("alta"));
lowerButton.addEventListener("click", () => elegirOpcion("baja"));
nextRoundButton.addEventListener("click", siguienteRonda);

nuevaBaraja();
siguienteRonda();
