function timeToWalk(steps, footprint, speed){
    const distanceInMeters = steps * footprint;
    const speedInMetersPerSec = speed / 3.6;
    const timeForBreaksInSec = Math.floor(distanceInMeters / 500) * 60;
    let time = distanceInMeters / speedInMetersPerSec + timeForBreaksInSec;

    const timeInMin = Math.floor(time / 60).toFixed(0).padStart(2, '0');
    const timeInSec = (time % 60).toFixed(0).padStart(2, '0');
    const timeInHour = Math.floor(time / 3600).toFixed(0).padStart(2, '0');

    

    console.log(`${timeInHour}:${timeInMin}:${timeInSec}`);
}

timeToWalk(4000, 0.60, 5);
// 00:32:48
timeToWalk(2564, 0.70, 5.5);
// 00:22:35