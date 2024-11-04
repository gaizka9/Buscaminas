import { Grafo } from './grafo.js';

const g = new Grafo;

const row = 32
const col = 32

for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
        g.addNodo(`${i}-${j}`);

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

const btn = document.querySelector('button');

btn.addEventListener('click', function() {
    location.reload();
});


const tds = document.querySelectorAll('td');

tds.forEach(td => {
    td.addEventListener('click', function() {

        if(!this.classList.contains('bandera')){

            this.classList.remove("celda");

            if(g.getMina(this.id)) {
                this.innerText = 'X';
                muerto(g);
            }else{
                var m = comprobar(g, this.id);
                this.innerText = m;
                this.setAttribute('data-mina', m);

                if (m == 0) {
                    var vecinos = g.getVecinos(this.id); 
                    despejar(g, vecinos);

                }
            }

        }        
    });
});


tds.forEach(td => {
    td.addEventListener('contextmenu', function(event) {
        event.preventDefault(); 

        if(this.classList.contains('celda')){
            if(g.getBandera(this.id)){

                g.setBandera(this.id);
                td.classList.remove('bandera');
            }else{
                g.setBandera(this.id);
                td.classList.add('bandera');
            }
        }
    });
});



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


