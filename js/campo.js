
const container = document.getElementById('container');

container.appendChild(crearTabla());

function crearTabla() {
    const tabla = document.createElement('table');

    const row = 32
    const col = 32

    for (let i = 0; i < row; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            const celda = document.createElement('td');
            celda.setAttribute('id', `${i}-${j}`); 
            celda.classList.add("celda");
            
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

