import { Grafo } from './grafo.js';
import { crearTabla } from './campo.js';

let g = new Grafo;
g = grafo(g);

const minado = document.getElementById('minado');
minado.appendChild(crearTabla());

function grafo(g){
    const row = document.getElementById('row').value
    const col = document.getElementById('col').value
    const sweeper = document.getElementById('sweeper')
    sweeper.max = row * col;

    var minas = sweeper.value;
    var ids = [];

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            g.addNodo(`${i}-${j}`);
            ids.push(`${i}-${j}`);

            if (j != 0) {
                g.addArista(`${i}-${j}`, `${i}-${j-1}`);
            }

            if(i != 0) {
                g.addArista(`${i}-${j}`, `${i-1}-${j}`);

                if (j != 0) {
                    g.addArista(`${i}-${j}`, `${i-1}-${j-1}`);
                }

                if (j != col-1) {
                    g.addArista(`${i}-${j}`, `${i-1}-${j+1}`);
                }
            }
        }
    }

    meterMina(g, minas, ids);

    return g;
}

const restart = document.getElementById('restart');
restart.addEventListener('click', function() {
    
    g = new Grafo;
    g = grafo(g);
    
    minado.innerHTML = '';
    const nuevaTabla = crearTabla(); 
    minado.appendChild(nuevaTabla);
    asignarEventosCeldas()
});


asignarEventosCeldas()


function comprobar(g, nodeId) {
    const vecinos = g.getVecinos(nodeId); 
    let minas = 0;

    vecinos.forEach(vecino => {

        minas += g.getMina(vecino); 
    });

    return minas; 
}



function muerto(g) {
    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        if(g.getMina(td.id)) {
            td.innerText = 'X';
        } 

        td.classList.add('sin-clic');
    });
}



function despejar(g, vecinos) {

    vecinos = new Set(vecinos);

    vecinos.forEach(vecino => {
        const miTd = document.getElementById(vecino);

        
        if (!miTd.classList.contains("celda")) {
            return; 
        }

        
        miTd.classList.remove("celda");
        const minasAlrededor = comprobar(g, vecino);
        miTd.innerText = minasAlrededor;
        miTd.setAttribute('data-mina', minasAlrededor);
        
        
        if (minasAlrededor == 0) {
            const nuevosVecinos = g.getVecinos(vecino); 
            nuevosVecinos.forEach(nuevoVecino => {
                vecinos.add(nuevoVecino); 
            });

            despejar(g, nuevosVecinos);
        }
    });
}


function asignarEventosCeldas() {
    var cont = document.getElementById('sweeper').value;

    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        td.addEventListener('click', function() {
            if (!this.classList.contains('bandera')) {
                this.classList.remove("celda");

                if (g.getMina(this.id)) {
                    this.innerText = 'X';
                    muerto(g);
                } else {
                    var m = comprobar(g, this.id);
                    this.innerText = m;
                    this.setAttribute('data-mina', m);

                    if (m == 0) {
                        var vecinos = g.getVecinos(this.id);
                        despejar(g, vecinos, cont);
                    }

                    ganar()
                }
            }
        });

        td.addEventListener('contextmenu', function(event) {
            event.preventDefault();

            if (this.classList.contains('celda')) {
                if (g.getBandera(this.id)) {
                    g.setBandera(this.id);
                    td.classList.remove('bandera');
                } else {
                    g.setBandera(this.id);
                    td.classList.add('bandera');
                }
            }
        });
    });
}

function meterMina(g, minas, ids){
    let n;
     for (let i = 0; i < minas; i++) {

        n = Math.floor(Math.random() * ids.length);
        g.setMina(ids[n]);
        ids.splice(n, 1);
    }
}

function ganar() {
    const ganar = document.querySelectorAll('.celda').length;
    const sweeper = parseInt(document.getElementById('sweeper').value, 10);

    if (ganar === sweeper) {
        alert('¡Has ganado!');
    }
}