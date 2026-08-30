/* 

Tecnologias Emergentes de la Programacion

Alumno: Marcelo Nicolás Pimienta Dejesús

Fecha: 30 de Agosto de 2026

*/

const boton = document.getElementById("cargarBtn");
const noticias = document.getElementById("noticias");
const framework = document.body.dataset.framework;

boton.addEventListener("click", cargarNoticias);

async function cargarNoticias() {

    noticias.innerHTML = "";

    boton.disabled = true;

    if (framework === "bootstrap") {

        noticias.innerHTML = `
            <p class="text-center mt-4">
                Cargando noticias...
            </p>
        `;

    } else {

        noticias.innerHTML = `
            <p class="text-center mt-8 text-gray-600">
                Cargando noticias...
            </p>
        `;
    }

    try {

        const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!respuesta.ok) {
            throw new Error("Error al obtener las noticias");
        }

        const datos = await respuesta.json();

        noticias.innerHTML = "";

        datos.slice(0, 6).forEach(function(noticia) {

            let tarjeta;

            if (framework === "bootstrap") {

                tarjeta = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">

                            <img 
                                src="https://picsum.photos/400/200?random=${noticia.id}" 
                                class="card-img-top" 
                                alt="Imagen de la noticia"
                            >

                            <div class="card-body">

                                <h5 class="card-title text-capitalize">
                                    ${noticia.title}
                                </h5>

                                <p class="card-text text-secondary">
                                    ${noticia.body}
                                </p>

                                

                            </div>

                        </div>
                    </div>
                `;

            } else {

                tarjeta = `
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">

                        <img 
                            src="https://picsum.photos/400/200?random=${noticia.id}" 
                            class="w-full h-48 object-cover" 
                            alt="Imagen de la noticia"
                        >

                        <div class="p-5">

                            <h2 class="text-xl font-bold capitalize mb-3">
                                ${noticia.title}
                            </h2>

                            <p class="text-gray-600 mb-4">
                                ${noticia.body}
                            </p>

                           

                        </div>

                    </div>
                `;
            }

            noticias.innerHTML += tarjeta;
        });

    } catch (error) {

        if (framework === "bootstrap") {

            noticias.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Ocurrió un error al cargar las noticias.
                </div>
            `;

        } else {

            noticias.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Ocurrió un error al cargar las noticias.
                </div>
            `;
        }

        console.log(error);

    } finally {

        boton.disabled = false;

    }
}