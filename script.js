window.onload = function () {
    setTimeout(function() {
        alert('Se ha completado la carga');
        $('#onload').fadeOut();
        $('body').removeClass('hidden');
    }, 2500);   
}


function mostrarMedidas() {
    var tipoPaquete = document.getElementById("tipo_paquete").value;
    var medidasDiv = document.getElementById("medidas");

    if (tipoPaquete === "paquete_pequeño" || tipoPaquete === "paquete_grande") {
        medidasDiv.style.display = "block";
    } else {
        medidasDiv.style.display = "none";
    }
}

function mostrarPrecioLocal() {
    var localCheckbox = document.getElementById("local");
    var envioLocalDiv = document.getElementById("envioLocal");

    if (localCheckbox.checked) {
        envioLocalDiv.style.display = "block";
    } else {
        envioLocalDiv.style.display = "none";
    }
}

function calcularPrecio(event) {
    event.preventDefault();

    var tipoPaquete = document.getElementById("tipo_paquete").value;
    var peso = parseFloat(document.getElementById("peso").value);
    var localCheckbox = document.getElementById("local");
    var distanciaInput = document.getElementById("distancia");
    var precioFinal = 0;

    if (localCheckbox.checked) {
        precioFinal = calcularPrecioLocal();
    } else {
        var distancia = parseFloat(distanciaInput.value, 10);

        if (isNaN(distancia) || distancia <= 0) {
            alert("La distancia debe ser mayor que 0.");
            return;
        }

        precioFinal = calcularPrecioNoLocal(distancia);
    }

    document.getElementById("precioFinal").innerText = "Precio del envío: €" + precioFinal.toFixed(2);
}

function calcularPrecioLocal() {
    var peso = parseFloat(document.getElementById("peso").value);

    if (peso < 10) {
        return 5; // Mismo precio entre ciudades para paquetes de menos de 10 Kg
    } else if (peso >= 10 && peso <= 20) {
        return 5 * 1.5; // Precio multiplicado por 1.5 para paquetes entre 10 y 20 Kg
    } else {
        return 5 * 2; // Precio multiplicado por 2 para paquetes mayores de 20 Kg
    }
}

function calcularPrecioNoLocal(distancia) {
    var peso = parseFloat(document.getElementById("peso").value);

    if (peso < 10) {
        return 9; // Precio fijo de 9€ para paquetes de menos de 10 Kg
    } else if (peso >= 10 && peso <= 20) {
        return 9 * 1.5; // Precio multiplicado por 1.5 para paquetes entre 10 y 20 Kg
    } else {
        return 9 * 2; // Precio multiplicado por 2 para paquetes mayores de 20 Kg
    }
}
