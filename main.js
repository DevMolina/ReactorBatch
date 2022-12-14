const mostrarFechaActual = document.querySelector(".date")
const mostrarHoraActual = document.querySelector(".time")

const fecha = document.getElementById("fecha");
const mostrarFecha = document.getElementById("mostrarFecha")

const date = new Date();
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

const formatFecha = (fecha) => {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
    return `${dias[fecha.getDay()]} ${fecha.getDate()} de ${meses[fecha.getMonth()]} del ${fecha.getFullYear()}`;
}

const formatHour = (fecha) => {
    const hours12 = fecha.getHours() % 12 || 12;
    const minutes = fecha.getMinutes();
    const isAm = date.getHours() < 12;
    return `${hours12.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isAm ? "a.m." : "p.m."}`;
}

// window.addEventListener('load', function () {
//     fecha.addEventListener('change', function () {
//         const anno = parseInt(String(this.value).substring(0, 4));
//         const mes = parseInt(String(this.value).substring(5, 7));
//         const dia = parseInt(String(this.value).substring(8, 10));
//         const fechaSele = new Date(anno, mes - 1, dia);
//         const difTime = fechaSele.getTime() - date.getTime();
//         if (this.value && difTime >= 0) {
//             mostrarFecha.innerText = `La fecha es: ${formatFecha(fechaSele)}`;
//         } else {
//             mostrarFecha.innerText = 'La fecha que ingresa debe ser después de la fecha actual';
//         }
//     });
// });

function agregarMinutos(fecha, min) {
    return new Date(fecha + min * 60000)
}


function configurar() {
    console.log('Configurar');
    const fecha1 = document.getElementById("fecha").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const tiempoLlenado = document.getElementById("tiempoLLenado").value;
    const tiempoAireado = document.getElementById("tiempoAireado").value;
    const tiempoDecantacion = document.getElementById("tiempoDecantacion").value;
    const tiempoVaciado = document.getElementById("tiempoVaciado").value;
    const ciclos = document.getElementById("ciclos").value;
    if (fecha1 == '') {
        console.log('No debe ser null');
    }
    const anno = parseInt(String(fecha1).substring(0, 4));
    const mes = parseInt(String(fecha1).substring(5, 7));
    const dia = parseInt(String(fecha1).substring(8, 10));
    const horas = parseInt(String(horaInicio).substring(0, 2));
    const minutos = parseInt(String(horaInicio).substring(3, 5));
    const confFecha = new Date(anno, mes - 1, dia, horas, minutos);
    html = '';
    console.log(confFecha);
    let t0 = confFecha;
    for (var i = 1; i <= ciclos; i++) {
        let t1 = agregarMinutos(t0.getTime(), tiempoLlenado);
        let t2 = agregarMinutos(t1.getTime(), tiempoAireado);
        let t3 = agregarMinutos(t2.getTime(), tiempoDecantacion);
        let t4 = agregarMinutos(t3.getTime(), tiempoVaciado);

        console.log(t1);
        console.log(t2);
        console.log(t3);
        console.log(t4);
        html += `
        <div class="card card-list" style="width: 18rem;">
            <div class="card-header cart-title">
                Ciclo ${i}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Inicio: ${t0.toLocaleDateString('es-ES',options)} ${formatHour(t0)}</li>
                <li class="list-group-item">Llenado: ${t0.toLocaleDateString('es-ES',options)} ${formatHour(t1)}</li>
                <li class="list-group-item">Aireado: ${t0.toLocaleDateString('es-ES',options)} ${formatHour(t2)}</li>
                <li class="list-group-item">Decantación: ${t0.toLocaleDateString('es-ES',options)} ${formatHour(t3)}</li>
                <li class="list-group-item">Vaciado: ${t0.toLocaleDateString('es-ES',options)} ${formatHour(t4)}</li>
            </ul>
        </div>
        
        `;
        t0 = t4;
    }

    document.getElementsByClassName("listado-cards")[0].innerHTML = html;

}


setInterval(() => {
    mostrarFechaActual.textContent = `${formatFecha(date)}`;
    mostrarHoraActual.textContent = `${formatHour(date)}`;
}, 200);

