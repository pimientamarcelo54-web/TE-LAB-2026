/*
Tecnologías Emergentes de la Programación
Alumno: Marcelo Nicolás Pimienta Dejesús
Fecha: 16 de Agosto de 2026

*//*
const generarBtn=document.getElementById("generar-btn");
const copiarBtn=document.getElementById("copiar-btn");
const passwordOutput=document.getElementById("password-output");
const lengthInput=document.getElementById("length-input");
const mayusculasCheck=document.getElementById("mayusculas");
const minusculasCheck=document.getElementById("minusculas");
const numerosCheck=document.getElementById("numeros");
const simbolosCheck=document.getElementById("simbolos");


const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const MAYUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()_+-=[]{},.<>?";

function generarPassword(){
    let pool= "";
    if(minusculasCheck.checked){
        pool += MINUSCULAS;
    }
    if(mayusculasCheck.checked){
        pool += MAYUSCULAS;
    }
    if(numerosCheck.checked){
        pool += NUMEROS;
    }
    if(simbolosCheck.checked){
        pool += SIMBOLOS;
    }

    if(pool == " "){
        alert("No haz marcado ninguna opcion");
        return;
    }

    const largo = parseInt(lengthInput.value);

    let resultado = "";
    for(let i = 0; i < largo; i++){
        const indiceAlAzar = Math.floor(Math.random() * pool.length);
        resultado += pool[indiceAlAzar];
    }

    passwordOutput.value= resultado;
}

generarBtn.addEventListener("click",generarPassword);

copiarBtn.addEventListener("click",function(){
    if(passwordOutput.value === ""){
        alert("Primero genera una contraseña");
        return;
    }

    navigator.clipboard.writeText(passwordOutput.value)
    .then(function(){
        alert("¡Contraseña copiada!");
    })
    .catch(function (error){

        console.error("No se pudo copiar:",error);
    });
});