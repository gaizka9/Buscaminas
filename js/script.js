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
        this.classList.remove("celda");

        if(g.getMina(this.id)) {
            this.innerText = 'X';
            muerto(g);
        }else{
            var m = comprobar(g, this.id);
            this.innerText = m;
            this.setAttribute('data-mina', m);

            if (m == 0) {
                limpiar(g, this.id);
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
