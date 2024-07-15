const valoresHora = {
    "Oficial Especializado": 53.27,
    "Oficial": 45.39,
    "Medio Oficial": 41.85,
    "Ayudante": 38.42
};

function actualizarValorHora() {
    const categoria = document.getElementById('categoria').value;
    const valorHora = valoresHora[categoria];
    document.getElementById('valorHora').value = valorHora.toFixed(2);
    calcular();
}

function calcular() {
    // Obtener valores de las horas y sueldos
    const horasNormales = parseFloat(document.getElementById('horasNormales').value) || 0;
    const horas50 = parseFloat(document.getElementById('horas50').value) || 0;
    const horas100 = parseFloat(document.getElementById('horas100').value) || 0;
    const valorHora = parseFloat(document.getElementById('valorHora').value) || 0;

    // Calcular remuneraciones
    const remunerativoHorasNormales = horasNormales * valorHora;
    const remunerativoHoras50 = horas50 * valorHora * 1.5;
    const remunerativoHoras100 = horas100 * valorHora * 2;

    document.getElementById('remunerativoHorasNormales').innerText = `$${remunerativoHorasNormales.toFixed(2)}`;
    document.getElementById('remunerativoHoras50').innerText = `$${remunerativoHoras50.toFixed(2)}`;
    document.getElementById('remunerativoHoras100').innerText = `$${remunerativoHoras100.toFixed(2)}`;

    const subtotalRemunerativo = remunerativoHorasNormales + remunerativoHoras50 + remunerativoHoras100;

    // Calcular descuentos
    const jubilacionPorcentaje = parseFloat(document.getElementById('jubilacion').value) / 100;
    const obraSocialPorcentaje = parseFloat(document.getElementById('obraSocial').value) / 100;
    const ley23032Porcentaje = parseFloat(document.getElementById('ley23032').value) / 100;

    const descuentoJubilacion = subtotalRemunerativo * jubilacionPorcentaje;
    const descuentoObraSocial = subtotalRemunerativo * obraSocialPorcentaje;
    const descuentoLey23032 = subtotalRemunerativo * ley23032Porcentaje;

    document.getElementById('descuentoJubilacion').innerText = `$${descuentoJubilacion.toFixed(2)}`;
    document.getElementById('descuentoObraSocial').innerText = `$${descuentoObraSocial.toFixed(2)}`;
    document.getElementById('descuentoLey23032').innerText = `$${descuentoLey23032.toFixed(2)}`;

    const subtotalDescuento = descuentoJubilacion + descuentoObraSocial + descuentoLey23032;

    // Obtener valor no remunerativo
    const asignacionFamiliar = parseFloat(document.getElementById('asignacionFamiliar').value) || 0;

    // Calcular total a percibir
    const totalPercibir = subtotalRemunerativo - subtotalDescuento + asignacionFamiliar;

    // Actualizar subtotales y total a percibir en el HTML
    document.getElementById('subtotalRemunerativo').innerText = `$${subtotalRemunerativo.toFixed(2)}`;
    document.getElementById('subtotalDescuento').innerText = `$${subtotalDescuento.toFixed(2)}`;
    document.getElementById('subtotalNoRemunerativo').innerText = `$${asignacionFamiliar.toFixed(2)}`;
    document.getElementById('totalPercibir').innerText = `$${totalPercibir.toFixed(2)}`;
}

function imprimir() {
    window.print();
}

function guardarDatos() {
    const datos = {
        name: document.getElementById('name').value,
        cuil: document.getElementById('cuil').value,
        fecha: document.getElementById('fecha').value,
        categoria: document.getElementById('categoria').value,
        valorHora: document.getElementById('valorHora').value,
        horasNormales: document.getElementById('horasNormales').value,
        horas50: document.getElementById('horas50').value,
        horas100: document.getElementById('horas100').value,
        jubilacion: document.getElementById('jubilacion').value,
        obraSocial: document.getElementById('obraSocial').value,
        ley23032: document.getElementById('ley23032').value,
        asignacionFamiliar: document.getElementById('asignacionFamiliar').value
    };
    localStorage.setItem('datosRecibo', JSON.stringify(datos));
    alert('Datos guardados');
}

function cargarDatos() {
    const datos = JSON.parse(localStorage.getItem('datosRecibo'));
    if (datos) {
        document.getElementById('name').value = datos.name;
        document.getElementById('cuil').value = datos.cuil;
        document.getElementById('fecha').value = datos.fecha;
        document.getElementById('categoria').value = datos.categoria;
        document.getElementById('valorHora').value = datos.valorHora;
        document.getElementById('horasNormales').value = datos.horasNormales;
        document.getElementById('horas50').value = datos.horas50;
        document.getElementById('horas100').value = datos.horas100;
        document.getElementById('jubilacion').value = datos.jubilacion;
        document.getElementById('obraSocial').value = datos.obraSocial;
        document.getElementById('ley23032').value = datos.ley23032;
        document.getElementById('asignacionFamiliar').value = datos.asignacionFamiliar;
        calcular();
        alert('Datos cargados');
    } else {
        alert('No hay datos guardados');
    }
}
