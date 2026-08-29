/*
Tecnologías Emergentes de la Programación

Alumno: Marcelo Nicolás Pimienta Dejesús

Fecha: 30 de Agosto de 2026

*/
const boton = document.getElementById("cargarBtn");

const galeria = document.getElementById("galeria");

boton.addEventListener("click", cargarGatos);

async function cargarGatos() {
    const respuesta = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    const gatos = await respuesta.json();

    galeria.innerHTML = "";

    gatos.forEach(function(gato) {
        const imagen = document.createElement("img");
        imagen.src = gato.url;

        galeria.appendChild(imagen);
    });
}
