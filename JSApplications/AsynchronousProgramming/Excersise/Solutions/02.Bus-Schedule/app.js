function solve() {
    let depotUrl = `http://localhost:3030/jsonstore/bus/schedule/depot`;
    let infoEl = document.querySelector('.info');
    let departBtnEl = document.querySelector('#depart');
    let arriveBtnEl = document.querySelector('#arrive');
    let stopName = '';

    function depart() {
        fetch(depotUrl)
            .then(response => response.json())
            .then(stopId => {
                const nextStopId = stopId.next;
                stopName = stopId.name;
                depotUrl = `http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`;
                infoEl.textContent = `Next stop ${stopName}`;
                departBtnEl.disabled = true;
                arriveBtnEl.disabled = false;
            })
    }

    function arrive() {
        infoEl.textContent = `Arriving at ${stopName}`;
        departBtnEl.disabled = false;
        arriveBtnEl.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();