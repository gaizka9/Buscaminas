export class Grafo {
    constructor() {
        this.nodes = {}; 
    }

    addNodo(id) {
        this.nodes[id] = { vecinos: [], mina: false, bandera: false }; 
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
        return this.nodes[nodeId].mina; 
    }

    setMina(nodeId) {
        this.nodes[nodeId].mina = true; 
    }

    getBandera(nodeId) {
        return this.nodes[nodeId].bandera; 
    }

    setBandera(nodeId) {
        this.nodes[nodeId].bandera = !this.nodes[nodeId].bandera; 
    }
}
