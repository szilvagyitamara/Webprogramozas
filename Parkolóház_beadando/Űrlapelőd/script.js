document.getElementById("parkingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const zona = document.getElementById("zona").value;
    const jarmu = document.getElementById("jarmu").value;
    const ora = parseInt(document.getElementById("ora").value) || 0;
    const perc = parseInt(document.getElementById("perc").value) || 0;
    const berlet = document.getElementById("berlet").checked;


    const zonaArak = {
        A: 4000,
        B: 1000,
        C: 900,
        D: 800,
        E: 700
    };

    const zonaNevek = {
        A: "Prémium zóna – 4000 Ft / óra",
        B: "Gazdaságos szint – 1000 Ft / óra",
        C: "Méygarázs B1 – 900 Ft / óra",
        D: "Méygarázs B2 - 800 Ft / óra",
        E: "Központi zóna - 700 Ft / óra"
    };

    let alapdij = zonaArak[zona];
    let teljesIdo = ora + perc / 60;

    let osszeg = 0;
    let aktualis = alapdij;

    for (let i = 0; i < Math.ceil(teljesIdo); i++) {
        let arany = 1;
        if (i === Math.floor(teljesIdo) && teljesIdo % 1 !== 0) {
            arany = teljesIdo % 1;
        }
        osszeg += aktualis * arany;
        aktualis *= 1.1;
    }

    if (jarmu === "teherauto") osszeg *= 1.2;
    if (jarmu === "kisbusz") osszeg *= 1.1;
    if (berlet) osszeg *= 0.9;

    if (osszeg > 5000000) osszeg = 5000000;

    const most = new Date();
    const oraMost = most.getHours();

    let ingyenesIdoszak = false;
    if (oraMost >= 21 || oraMost < 5) {
        osszeg = 0;
        ingyenesIdoszak = true;
    }


    const mostStr = most;

    document.getElementById("eredmeny").innerHTML = `
        <div class="ticket">
            <div class="ticket-header">
                <div class="logo">🚘</div>
                <h3>Parkolóház Díjkalkulátor</h3>
            </div>
            <div class="ticket-body">
                <p><span class="label">Dátum:</span> ${most.toLocaleString("hu-HU")}</p>
                <p><span class="label">Zóna:</span> ${zonaNevek[zona] || zona}</p>
                <p><span class="label">Jármű:</span> ${jarmu}</p>
                <p><span class="label">Idő:</span> ${ora} ó ${perc} p</p>
            </div>
            <div class="ticket-footer">
                <div class="price">${osszeg.toFixed(0)} Ft</div>
                ${ingyenesIdoszak ? '<p class="free-note">(Ingyenes időszak: 21:00–05:00)</p>' : ''}
            </div>
        </div>
        <button id="printTicket" class="btn">🖨️ Nyomtatás</button>
    `;
    document.getElementById('printTicket').addEventListener('click', function () {
        window.print();
    });
});