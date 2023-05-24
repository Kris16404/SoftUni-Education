function attachGradientEvents() {
    const gradiendBoxElement = document.getElementById('gradient-box');
    const resultElement = document.getElementById('result')
    gradiendBoxElement.addEventListener('mousemove', gradientMove);
    gradiendBoxElement.addEventListener('mouseout', gradientUnfocus)


    function gradientMove(e) {
        let position = e.offsetX / (e.target.clientWidth - 1);
        position = Math.floor(position * 100);
        resultElement.textContent = `${position}%`;
    }

    function gradientUnfocus() {
        resultElement.textContent = '';
    }

}