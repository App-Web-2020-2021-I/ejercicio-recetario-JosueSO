function mostrarError(mensaje) {
    $("#form_error").text(mensaje);
    $("#form_error").show(600);
}

function ocultarError() {
    $("#form_error").hide(300);
    $("#form_error").text("");
}

function borraIngrediente(id) {
    $("#" + id).hide(400, function() {
        $(this).remove();
    });
}

function agregaReceta(receta) {
    let html_lista = "";

    receta.ingredientes.forEach(ingrediente => {
        html_lista += `<li>${ingrediente}</li>`;
    });

    let html = 
    `<div class="card text-left mb-3" id=${receta.id}>
        <img class="card-img-top" src="${receta.imagen}" alt="">
        <div class="card-body">
            <h4 class="card-title">${receta.nombre}</h4>
        </div>
        <div class="card-footer text-center">
            <button class="btn btn-outline-info" onclick="muestraModal(${receta.id})">Ver más</button>
        </div>
        <div class="d-none info_extra">
            <ul>${html_lista}</ul>
            <p>${receta.preparacion}</p>
        </div>
    </div>`;

    $("#lista_" + receta.categoria).append(html);
}

function muestraModal(id) {
    //Obtener información
    let nombre = $("#" + id + " .card-title").text();
    let imagen = $("#" + id + " .card-img-top").attr("src");
    let lista = $("#" + id + " .info_extra li");
    
    console.log(lista);

    let ingredientes_html = "";
    for(let i = 0; i < lista.length; i++) {
        ingredientes_html += `<li class="list-group-item">${lista[i].textContent}</li>`;
    };
    let preparacion = $("#" + id + " .info_extra p").text();

    //Asignarla en el modal
    $("#modal_receta .modal-title").text(nombre);
    $("#modal_receta .img-fluid").attr("src", imagen);
    $("#modal_receta .list-group").html(ingredientes_html);
    $("#modal_receta .preparacion").text(preparacion);

    $('#modal_receta').modal('show');
}

function limpiaFormulario() {
    $("#receta_nombre").val("");
    $("#receta_imagen").val("");
    $("#receta_ingrediente").val("");
    $("#receta_lista_ingredientes").html("");
    $("#receta_preparacion").val("");
}

$(document).ready(function() {
    $("#form_error").hide(0);

    $("#form_receta").submit(function(e) {
        e.preventDefault();

        let nombre = $("#receta_nombre").val();
        if (nombre.trim() === "") {
            mostrarError("El nombre no puede estar vacío");
            return;
        }

        let categoria = $("#receta_categoria").val();
        if (categoria.trim() === "") {
            mostrarError("No se seleccionó la categoría");
            return;
        }

        let imagen = $("#receta_imagen").val();
        if (imagen.trim() === "") {
            mostrarError("La URL de la imagen no puede estar vacía");
            return;
        }

        let lista = $("#receta_lista_ingredientes li span");
        
        let ingredientes = [];
        for(let i = 0; i < lista.length; i++) {
            ingredientes.push(lista[i].textContent);
        };

        let preparacion = $("#receta_preparacion").val();
        if (preparacion.trim() === "") {
            mostrarError("La preparación no puede estar vacía");
            return;
        }

        ocultarError();

        let receta = {
            id: Date.now(),
            nombre,
            categoria,
            imagen,
            ingredientes,
            preparacion
        };

        agregaReceta(receta);
        limpiaFormulario();
    });

    $("#ingrediente_button").click(function() {
        let ingrediente = $("#receta_ingrediente").val();

        if (ingrediente.trim() === "") {
            mostrarError("El nombre del ingrediente no puede estar vacío");
            return;
        }

        let id = "ing_" + Date.now();

        let html = 
        `<li class="list-group-item" id="${id}">
            <button class="btn btn-sm btn-outline-danger" type="button" onclick="borraIngrediente(${id})">&times;</button>
            <span class="pl-2">${ingrediente}</span>
        </li>`;

        $("#receta_lista_ingredientes").append(html);

        $("#receta_ingrediente").val("");

        ocultarError();
    });
});