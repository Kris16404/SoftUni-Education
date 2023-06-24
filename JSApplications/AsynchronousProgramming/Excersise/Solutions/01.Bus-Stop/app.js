function getInfo() {
  const stopIdElValue = document.querySelector('#stopId').value;
  const stopNameEl = document.querySelector('#stopName');
  const busesEl = document.querySelector('#buses');
  const ERR_MSG = `Error`;
  let url = `http://localhost:3030/jsonstore/bus/businfo/${stopIdElValue}`;

  if (busesEl.children.length !== 0) {
    const arrFromChildren = Array.from(busesEl.children);
    arrFromChildren.forEach(element => {
      element.remove();
    });
  }

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const buses = data.buses;
      const stopName = data.name;
      stopNameEl.textContent = stopName;
      for (const bus in buses) {
        let arriveTime = buses[bus];
        let busEl = createBus(bus, arriveTime);
        busesEl.appendChild(busEl);
      }
    })
    .catch(stopNameEl.textContent = ERR_MSG);

  function createBus(line, arriveTime) {
    let liEl = document.createElement('li');
    liEl.textContent = `Bus ${line} arrives in ${arriveTime} minutes`;
    return liEl;
  }
}
