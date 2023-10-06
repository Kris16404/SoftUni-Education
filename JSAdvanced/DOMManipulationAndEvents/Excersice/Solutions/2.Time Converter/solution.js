function attachEventsListeners() {
    function calculateTime(e) {
        const daysInputElement = document.getElementById('days');
        const hoursInputElement = document.getElementById('hours');
        const minutesInputElement = document.getElementById('minutes');
        const secondsInputElement = document.getElementById('seconds');




        let daysParsed = Number(daysInputElement.value);
        let hoursParsed = Number(hoursInputElement.value);
        let minutesParsed = Number(minutesInputElement.value);
        let secondsParsed = Number(secondsInputElement.value);

        // Calculate the time for each element 

        if (daysParsed && daysParsed !== 0) {
            hoursParsed = daysParsed * 24;
            minutesParsed = hoursParsed * 60;
            secondsParsed = minutesParsed * 60;


        } else if (hoursParsed && hoursParsed !== 0) {
            daysParsed = hoursParsed / 24;
            minutesParsed = hoursParsed * 60;
            secondsParsed = minutesParsed * 60;

        } else if (minutesParsed && minutesParsed !== 0) {
            hoursParsed = minutesParsed / 60;
            daysParsed = hoursParsed / 24;
            secondsParsed = minutesParsed * 60;

        } else if (secondsParsed && secondsParsed !== 0) {
            minutesParsed = secondsParsed / 60;
            hoursParsed = minutesParsed / 60;
            daysParsed = hoursParsed / 24;
        }

        daysInputElement.value = daysParsed;
        hoursInputElement.value = hoursParsed;
        minutesInputElement.value = minutesParsed;
        secondsInputElement.value = secondsParsed;
    }

    const daysBtnElementValue = document.getElementById('daysBtn').addEventListener('click', calculateTime);
    const hoursBtnElementValue = document.getElementById('hoursBtn').addEventListener('click', calculateTime);
    const minutesBtnElementValue = document.getElementById('minutesBtn').addEventListener('click', calculateTime);
    const secondsBtnElementValue = document.getElementById('secondsBtn').addEventListener('click', calculateTime);

}