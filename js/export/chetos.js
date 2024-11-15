export function chetos(param, g) {
    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        if(g.getMina(td.id)) {
            if (param.get("rayosX") == "active") {
                td.classList.add('ok');
            }

            if (param.get("inmortal") == "active") {
                td.classList.add('sin-clic');
            }
        }
    });

    if (param.get("safeClick") == "active") {
        const col = document.getElementById('col').value
        const row = document.getElementById('row').value
        let safe = -1;
        let celdas = new Set()

        while (safe != 0) {
            let x = Math.floor(Math.random() * row);
            let y = Math.floor(Math.random() * col);

            var nodeId = `${y}-${x}`;
            safe = comprobar(g, nodeId);
            if (g.getMina(nodeId)) {
                safe = 9;
            }

            if (safe != 0) {
                celdas.add(nodeId)
            }

            if (celdas.size === col*row) {
                nodeId = null;
                break;
            }
        }

        if (nodeId != null) {
            const td = document.getElementById(nodeId);
            td.style.backgroundColor = '#00ff00';
        }
    }
}


function comprobar(g, nodeId) {
    const vecinos = g.getVecinos(nodeId); 
    let minas = 0;

    vecinos.forEach(vecino => {

        minas += g.getMina(vecino); 
    });

    return minas; 
}