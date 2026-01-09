const listaHistorial = document.getElementById("lista-historial");
const historial = [];


let onPickCallback = null;

function convertirSimboloAOperacion(sim) {
  switch (sim) {
    case "+": return "sumar";
    case "−": return "restar";
    case "×": return "multiplicar";
    case "÷": return "dividir";
    default: return null;
  }
}

export function addHistorialLine(linea) {
  historial.unshift(linea);
  renderHistorial(onPickCallback);
}

export function renderHistorial(onPick) {
  onPickCallback = onPick;

  if (!listaHistorial) return;

  listaHistorial.innerHTML = "";

  historial.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    li.dataset.index = String(index);
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      // Formato esperado: "a + b = r"
      const partes = item.split(" ");
      if (partes.length < 5) return;

      const a = partes[0];
      const sim = partes[1];
      const b = partes[2];
      const r = partes[4];

      const op = convertirSimboloAOperacion(sim);
      if (!op || !onPickCallback) return;

      onPickCallback({ a, b, op, r });
    });

    listaHistorial.appendChild(li);
  });
}
