export class Grafo {
    constructor() {
        this.nodes = {}; 
    }

    addNodo(id) {
        if (!this.nodes[id]) {
            const randomNum = Math.floor(Math.random() * 5) + 1;
            const tieneMina = randomNum === 1; 

            this.nodes[id] = { vecinos: [], mina: tieneMina }; 
        }
    }

    addArista(nodo1, nodo2) {
        
        if (this.nodes[nodo1] && this.nodes[nodo2]) {
            if (!this.nodes[nodo1].vecinos.includes(nodo2)) {
                this.nodes[nodo1].vecinos.push(nodo2);
            }
            if (!this.nodes[nodo2].vecinos.includes(nodo1)) {
                this.nodes[nodo2].vecinos.push(nodo1);
            }
        }
    }

    getVecinos(nodeId) {
        return this.nodes[nodeId]?.vecinos || []; 
    }

    getMina(nodeId) {
        return this.nodes[nodeId]?.mina; 
    }
}
