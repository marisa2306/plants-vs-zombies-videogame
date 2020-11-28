window.onload = () => {


    let start = document.querySelectorAll('.start-button')

    start.forEach(elm => {
        elm.onclick = () => {
            startGame();
        }
    })

    function startGame() {

        const intro = document.querySelector('.intro')
        intro.style.display = "none"
        const finish = document.querySelector('.over')
        finish.style.display = "none"

        const canva = document.querySelector('canvas')
        canva.style.display = "block"
        const backCanvas = document.querySelector('#background-canvas')
        backCanvas.style.display = 'flex'

        Game.init('canvas')
    }

};