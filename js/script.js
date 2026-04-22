let autos = [];
let filtroActual = "todos";

function agregarAuto() {
    const auto = document.getElementById("auto").value.trim();
    const prioridad = document.getElementById("prioridad").value;
    const fecha = document.getElementById("fecha").value;

    // VALIDACIÓN
    if (auto === "" || prioridad === "" || fecha === "") {
        alert("⚠️ Por favor, complete TODOS los campos.");
        return;
    }

    autos.push({
        nombre: auto,
        prioridad,
        fecha,
        estado: "disponible"
    });

    document.getElementById("auto").value = "";
    document.getElementById("prioridad").value = "";
    document.getElementById("fecha").value = "";

    mostrarAutos();
}

function mostrarAutos() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let disponibles = 0;
    let vendidos = 0;

    autos.forEach((a, index) => {
        if (filtroActual === "todos" || filtroActual === a.estado) {
            const li = document.createElement("li");

            li.innerHTML = `
                <div>
                    <b>${a.nombre}</b><br>
                    Prioridad: ${a.prioridad}<br>
                    Fecha: ${a.fecha}
                </div>
                <div>
                    <span class="estado ${a.estado}">
                        ${a.estado}
                    </span>
                    <button onclick="cambiarEstado(${index})">✔</button>
                    <button class="eliminar" onclick="eliminarAuto(${index})">🗑</button>
                </div>
            `;

            lista.appendChild(li);
        }

        a.estado === "disponible" ? disponibles++ : vendidos++;
    });

    document.getElementById("total").textContent = autos.length;
    document.getElementById("disponibles").textContent = disponibles;
    document.getElementById("vendidos").textContent = vendidos;
}

function cambiarEstado(index) {
    autos[index].estado =
        autos[index].estado === "disponible"
            ? "vendido"
            : "disponible";
    mostrarAutos();
}

function eliminarAuto(index) {
    if (confirm("¿Seguro que desea eliminar este vehículo?")) {
        autos.splice(index, 1);
        mostrarAutos();
    }
}

function filtrar(tipo) {
    filtroActual = tipo;
    mostrarAutos();
}
function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("activo");
}

const btn = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

btn.onclick = () => {
    sidebar.classList.toggle("activo");
};