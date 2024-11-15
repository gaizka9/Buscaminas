export function chetos(rayosX, g) {
    const tds = document.querySelectorAll('td');

    tds.forEach(td => {
        if(g.getMina(td.id)) {
            if (rayosX == "active") {
                td.classList.add('sin-clic');
                td.classList.add('ok');
            }
        }
    });
}