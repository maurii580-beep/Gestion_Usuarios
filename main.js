// 2. Estructura de datos
let usuarios = [
    {
        nombre: "Juan",
        edad: 30,
        rol: "Administrador",
        activo: true
    }
];

// Variables de apoyo
const formulario = document.getElementById('formularioUsuario');
const tbody = document.getElementById('tablaUsuarios');

// Inicializar la tabla al cargar
mostrarUsuarios();

// Event Listener para el formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recargar la página
    agregarUsuario();
});

// Función 1: Validar Formulario
function validarFormulario(nombre, edad, rol) {
    if (nombre.trim() === '' || edad === '' || rol === '') {
        alert('Por favor, complete todos los campos.');
        return false;
    }
    if (Number(edad) <= 0) {
        alert('La edad debe ser un número mayor a 0.');
        return false;
    }
    return true;
}

// Función 2: Agregar Usuario
function agregarUsuario() {
    const nombreInput = document.getElementById('nombre').value;
    const edadInput = document.getElementById('edad').value;
    const rolInput = document.getElementById('rol').value;

    if (validarFormulario(nombreInput, edadInput, rolInput)) {
        const nuevoUsuario = {
            nombre: nombreInput,
            edad: Number(edadInput),
            rol: rolInput,
            activo: true
        };
        
        usuarios.push(nuevoUsuario);
        formulario.reset();
        filtrarUsuarios();
    }
}

// Función 3: Mostrar Usuarios en el DOM
function mostrarUsuarios(arregloA_Mostrar = usuarios) {
    tbody.innerHTML = ''; 
    
    let activos = 0;
    let inactivos = 0;

    arregloA_Mostrar.forEach((usuario) => {
        usuario.activo ? activos++ : inactivos++;

        const tr = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = usuario.nombre;
        tr.appendChild(tdNombre);

        const tdEdad = document.createElement('td');
        tdEdad.textContent = usuario.edad;
        tr.appendChild(tdEdad);

        const tdRol = document.createElement('td');
        tdRol.textContent = usuario.rol;
        tr.appendChild(tdRol);

        const tdEstado = document.createElement('td');
        const spanEstado = document.createElement('span');
        spanEstado.textContent = usuario.activo ? 'Activo' : 'Inactivo';
        spanEstado.className = usuario.activo ? 'badge bg-success' : 'badge bg-secondary';
        tdEstado.appendChild(spanEstado);
        tr.appendChild(tdEstado);

        const tdAcciones = document.createElement('td');
        
        const btnEstado = document.createElement('button');
        btnEstado.textContent = 'Cambiar Estado';
        btnEstado.className = 'btn btn-sm btn-warning me-2';
        const indiceReal = usuarios.indexOf(usuario); 
        btnEstado.onclick = () => cambiarEstado(indiceReal);
        tdAcciones.appendChild(btnEstado);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn btn-sm btn-danger';
        btnEliminar.onclick = () => eliminarUsuario(indiceReal);
        tdAcciones.appendChild(btnEliminar);

        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);
    });

    document.getElementById('contadorActivos').textContent = activos;
    document.getElementById('contadorInactivos').textContent = inactivos;
}

// Función 4: Cambiar Estado
function cambiarEstado(index) {
    usuarios[index].activo = !usuarios[index].activo;
    filtrarUsuarios();
}

// Función 5: Filtrar Usuarios
function filtrarUsuarios() {
    const filtro = document.getElementById('filtroRol').value;
    let usuariosFiltrados;

    if (filtro === 'Todos') {
        usuariosFiltrados = usuarios;
    } else {
        usuariosFiltrados = usuarios.filter(user => user.rol === filtro);
    }
    
    mostrarUsuarios(usuariosFiltrados);
}

// Función Adicional: Eliminar Usuario
function eliminarUsuario(index) {
    if(confirm('¿Estás seguro de eliminar este usuario?')){
        usuarios.splice(index, 1);
        filtrarUsuarios();
    }
}

// Función Adicional: Ordenar por Edad
function ordenarPorEdad() {
    usuarios.sort((a, b) => a.edad - b.edad);
    filtrarUsuarios();
}