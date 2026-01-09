// -----------------------------------
// HACER LOS IMPORTS DE LAS FUNCIONES QUE VAMOS A USAR
// -----------------------------------
import { addHistorialLine, renderHistorial } from "./historial.js";

// -----------------------------------
// CREAR EVENTOS EN LOS BOTONES QUE LLAMEN A LAS
// FUNCIONES IMPORTADAS PREVIAMENTE
// -----------------------------------


let operacionActual = null;


// -----------------------------------
// ELEMENTOS DEL DOM
// -----------------------------------
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultado = document.getElementById("resultado");
const botonesNumeros = document.querySelectorAll("[data-num]");
const botonesOperaciones = document.querySelectorAll(".op");
const botonIgual = document.querySelector('[data-op="igual"]');
const botonC = document.querySelector('[data-op="borrar"]');
const botonAC = document.querySelector('[data-op="borrarTodo"]'); 

// -----------------------------------
// HISTORIAL CON FUNCION DE CLICKABLE
// -----------------------------------
renderHistorial(({ a, b, op, r }) => {
    num1.value = a;
    num2.value = b;
    operacionActual = op;
    resultado.textContent = r;
});

const simbolos = {
    sumar: "+",
    restar: "−",
    multiplicar: "×",
    dividir: "÷",
};

// -----------------------------------
// BOTONES DE NUMERITOS GUAPETONES
// -----------------------------------
//const botonesNumeros = document.querySelectorAll("[data-num]");

botonesNumeros.forEach( boton => { 
    boton.addEventListener("click", () =>{
        const valor = boton.dataset.num;

        const inputActivo = !operacionActual ? num1 : num2;

        if (valor === ".") {
            // NO PERMITIR MÁS DE UN PUNTO
            if (inputActivo.value.includes(".")) return;

            // SI EMPIEZA CON PUNTO, CONVERTIR EN 0.
            if (inputActivo.value === "") {
                inputActivo.value = "0.";
                return;
            }
        }

        if(!operacionActual){
            num1.value += valor;
        } else {
            //hasta operacion no seguir.
            num2.value += valor;

        }
     //   if (!num1.value) {
     //        num1.value = valor;
     //    } else if(!num2.value) {
    //         num2.value = valor;
    //     }
    });
});


// -----------------------------------
// BOTONES DE OPERACIONES GUAPETONES
// -----------------------------------
//const botonesOperaciones = document.querySelectorAll(".op");

botonesOperaciones.forEach( boton => { 
    boton.addEventListener("click", () =>{
        operacionActual = boton.dataset.op;
    });
});

// -----------------------------------
// BOTONES DE IGUAL / TODOS SOMOS IGUALES
// -----------------------------------
//const botonIgual = document.querySelector('[data-op="igual"]');

botonIgual.addEventListener("click", () =>{
    if(!num1.value || !num2.value || !operacionActual) return;

    const a = Number(num1.value);
    const b = Number(num2.value);
    if (Number.isNaN(a) || Number.isNaN(b)) return;
    let r = 0;

    switch(operacionActual) {
        case "sumar": r = a + b; break;
        case "restar": r = a - b; break;
        case "multiplicar": r = a * b; break;
        case "dividir": r = a / b; break;
    }
    r = Number(r.toFixed(10));
    resultado.textContent = r;

    const linea = `${a} ${simbolos[operacionActual]} ${b} = ${r}`;
    addHistorialLine(linea);
});


botonC.addEventListener("click", () =>{
    // SI NO HAY OPERACION, ELIMINA EL NUM1
    // SI YA HAY OPERACION, ELIMINA EL NUM2
    if (operacionActual && num2.value !== "") {
        num2.value = "";
        return;
    }

    if (operacionActual && num2.value === "") {
        operacionActual = null;
        return;
    }

    if (!operacionActual) {
        num1.value = "";
    }
});

botonAC.addEventListener("click", () =>{
     num1.value = "";
     num2.value = "";
     operacionActual = null;
     resultado.textContent = "0";
});