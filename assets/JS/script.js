const carrusel = document.getElementById("carrusel");

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

    anterior.addEventListener("click", function () {
        mostrar(actual - 1);
    });

    siguiente.addEventListener("click", function () {
        mostrar(actual + 1);
    });
}
/* Validación accesible del formulario */
const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const campos = [
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