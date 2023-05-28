function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
}

function solve(area, vol, input) {
    let parsedInput = JSON.parse(input);
    let resultArr = [];
    for (const obj of parsedInput) {
        let areaCalc = area.call(obj);
        let volumeCalc = vol.call(obj);
        let resultObj = {
            area: areaCalc,
            volume: volumeCalc
        };
        resultArr.push(resultObj);
    }
    return resultArr;
}

solve(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`);