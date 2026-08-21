/* Esto es para que funcione el carrusel
 */const carrusel = document.getElementById("carrusel"); /* se llama el id que esta colocado en el index */

if (carrusel) {
    const slides = carrusel.querySelectorAll(".diapositiva");
    const anterior = document.getElementById("anterior");
    const siguiente = document.getElementById("siguiente");
    const anuncio = document.getElementById("anuncio-carrusel");
    let actual = 0;
    function mostrar(numero) {
        slides[actual].hidden = true;
        actual = (numero + slides.length) % slides.length;
        slides[actual].hidden = false;
        anuncio.textContent = "Mostrando " + slides[actual].querySelector("h3").textContent + ".";
    }

    anterior.addEventListener("click", function () { /* cuando en el sitio web se genera un clic en el boton activa esto y esto llama a la funcion y muestra la anterior diapositiva */
        mostrar(actual - 1);
    });

    siguiente.addEventListener("click", function () {/* cuando en el sitio web se genera un clic en el boton activa esto y esto llama a la funcion y muestra la siguiente diapositiva */
        mostrar(actual + 1);
    });
}
/* Validación del formulario */
const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const campos = [ /* mensajes que se colocan en caso de que la persona no haya rellenado correctamente el formulario */
            { campo: document.getElementById("nombre"), error: document.getElementById("errorNombre"), mensaje: "Debe escribir su nombre." },
            { campo: document.getElementById("correo"), error: document.getElementById("errorCorreo"), mensaje: "Debe escribir un correo electrónico válido." },
            { campo: document.getElementById("carro"), error: document.getElementById("errorCarro"), mensaje: "Debe seleccionar un carro." },
            { campo: document.getElementById("mensaje"), error: document.getElementById("errorMensaje"), mensaje: "Debe escribir un mensaje." }
        ];

        let primero = null;
        let valido = true;

        campos.forEach(item => {
            item.error.textContent = "";
            item.campo.removeAttribute("aria-invalid");

            let error = false;
            if (item.campo.value.trim() === "") error = true;
            if (item.campo.type === "email" && item.campo.value.trim() !== "" && !item.campo.checkValidity()) error = true;

            if (error) {
                item.error.textContent = item.mensaje;
                item.campo.setAttribute("aria-invalid", "true");
                if (!primero) primero = item.campo;
                valido = false;
            }
        });

        const resultado = document.getElementById("resultado");

        if (valido) {
            resultado.textContent = "Solicitud enviada correctamente.";
            formulario.reset();
        } else {
            resultado.textContent = "El formulario contiene errores. Revise los campos indicados.";
            primero.focus();
        }
    });
}