function roadRadar(speed, area) {
    let currentLimit = 0;
    const parsedSpeed = Number(speed);
    const speedLimitInAreas = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    };
    currentLimit = speedLimitInAreas[area];
    const diffrenceInSpeed = parsedSpeed - currentLimit;
    let speedingStatus = '';

    if (diffrenceInSpeed <= 20 && diffrenceInSpeed > 0) {
        speedingStatus = 'speeding';
    } else if (diffrenceInSpeed <= 40 && diffrenceInSpeed > 20) {
        speedingStatus = 'excessive speeding';
    } else {
        speedingStatus = 'reckless driving';
    }

    if (diffrenceInSpeed <= 0) {
        console.log(`Driving ${parsedSpeed} km/h in a ${currentLimit} zone`);
    } else {
        console.log(`The speed is ${diffrenceInSpeed} km/h faster than the allowed speed of ${currentLimit} - ${speedingStatus}`);
    }

}

roadRadar(40, 'city');
// Driving 40 km/h in a 50 zone
roadRadar(21, 'residential');
// The speed is 1 km/h faster than the allowed speed of 20 - speeding
roadRadar(120, 'interstate');
// The speed is 30 km/h faster than the allowed speed of 90 - excessive speeding
roadRadar(200, 'motorway');
// The speed is 70 km/h faster than the allowed speed of 130 - reckless driving