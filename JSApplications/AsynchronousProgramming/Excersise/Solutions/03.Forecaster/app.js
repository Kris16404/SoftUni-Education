function attachEvents() {
    const inputEl = document.querySelector('#location');
    const getWeatherBtnEl = document.querySelector('#submit');
    const currentWeatherEl = document.querySelector('#current');
    const upcomingWeatherEl = document.querySelector('#upcoming');
    const forecastWeatherEl = document.querySelector('#forecast');
    const locationsUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
    let codesArr = [];

    const weatherSymbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }




    getWeatherBtnEl.addEventListener('click', getWeatherFunc);
    fetch(locationsUrl)
        .then(response => response.json())
        .then(arr => {
            arr.forEach(obj => {
                codesArr.push(obj)
            });
        });

    function getWeatherFunc(e) {
        let isFound = false;
        let indexFound = 0;
        inputElValue = inputEl.value;
        for (let i = 0; i < codesArr.length; i++) {
            const obj = codesArr[i];
            if (obj.name === inputElValue) {
                isFound = true;
                indexFound = i;
                break;
            }
        }

        if (!isFound) {
            return
        }

        const locationCode = codesArr[indexFound].code;
        const forecastUrl = `http://localhost:3030/jsonstore/forecaster/today/${locationCode}`;
        const upcomingForecastUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                createCurrentCondElement(data.name, data.forecast)
            });

        fetch(upcomingForecastUrl)
            .then(response => response.json())
            .then(data => {
                createUpcomingCondElement(data.name, data.forecast)
            });
    }

    function createCurrentCondElement(name, forecastObj) {

        let divEl = document.createElement('div');
        divEl.classList.add('forecasts');

        let conditionSymbolSpan = document.createElement('span');
        conditionSymbolSpan.classList.add('condition', 'symbol');
        conditionSymbolSpan.innerHTML = weatherSymbols[forecastObj.condition];

        let conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        let locationNameSpan = document.createElement('span');
        locationNameSpan.classList.add('forecast-data');
        locationNameSpan.textContent = name;

        let locationTempSpan = document.createElement('span');
        locationTempSpan.classList.add('forecast-data');
        locationTempSpan.innerHTML = `${forecastObj.low}${weatherSymbols.Degrees}/${forecastObj.high}${weatherSymbols.Degrees}`;

        let locationconditionSpan = document.createElement('span');
        locationconditionSpan.classList.add('forecast-data');
        locationconditionSpan.textContent = forecastObj.condition;

        conditionSpan.appendChild(locationNameSpan);
        conditionSpan.appendChild(locationTempSpan);
        conditionSpan.appendChild(locationconditionSpan);

        divEl.appendChild(conditionSymbolSpan);
        divEl.appendChild(conditionSpan);

        currentWeatherEl.appendChild(divEl);
        forecastWeatherEl.style.display = 'block';
    }

    function createUpcomingCondElement(name, forecastArr) {

        let divEl = document.createElement('div');
        divEl.classList.add('forecast-info');

        for (let i = 0; i < forecastArr.length; i++) {
            const forecastObj = forecastArr[i];

            let conditionSpan = document.createElement('span');
            conditionSpan.classList.add('upcoming');

            let conditionSymbolSpan = document.createElement('span');
            conditionSymbolSpan.classList.add('symbol');
            conditionSymbolSpan.innerHTML = weatherSymbols[forecastObj.condition];

            let locationTempSpan = document.createElement('span');
            locationTempSpan.classList.add('forecast-data');
            locationTempSpan.innerHTML = `${forecastObj.low}${weatherSymbols.Degrees}/${forecastObj.high}${weatherSymbols.Degrees}`;

            let locationconditionSpan = document.createElement('span');
            locationconditionSpan.classList.add('forecast-data');
            locationconditionSpan.textContent = forecastObj.condition;

            conditionSpan.appendChild(conditionSymbolSpan);
            conditionSpan.appendChild(locationTempSpan);
            conditionSpan.appendChild(locationconditionSpan);

            divEl.appendChild(conditionSpan);
        }
        upcomingWeatherEl.appendChild(divEl);
    }
}

attachEvents();