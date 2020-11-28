class Player {
    constructor(ctx, canvasSize, playerWidth, playerHeigth, playerImage, keys) {
        this.ctx = ctx

        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.playerPos = {
            x: this.canvasSize.w - 1400,
            y: this.canvasSize.h - 150,
        }

        this.playerSize = {
            w: playerWidth,
            h: playerHeigth
        }

        this.imageName = playerImage
        this.playerInstance = undefined

        this.init()
        this.keys = keys
        this.bullets = [];
        this.weapon = 10
        this.lives = 3
        this.setEventListeners()
    }


    init() {
        this.playerInstance = new Image()
        this.playerInstance.src = `${this.imageName}`

        this.playerShootImageInstance = new Image()
        this.playerShootImageInstance.src = `img/player-shooting.png`
        this.playerShootImageInstance.frames = 3;
        this.playerShootImageInstance.framesIndex = 0;
    }

    draw() {
        this.ctx.drawImage(this.playerInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(bullet => bullet.draw())
    }


    setEventListeners() {

        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.top:
                    this.walkUp()
                    break;
                case this.keys.bottom:
                    this.walkDown()
                    break;
                case this.keys.space:
                    if (this.weapon > 0) {
                        this.shoot();
                        this.weapon--
                        this.bulletPoints = document.querySelector('.weapons p span')
                        this.bulletPoints.innerText = this.weapon
                    }
                    break;
            }
        });
    }


    walkUp() {
        if (this.playerPos.y > this.canvasSize.h - 700) {
            this.playerPos.y -= 120
        }
    }

    walkDown() {
        if (this.playerPos.y < this.canvasSize.h - 150) {
            this.playerPos.y += 120
        }
    }


    shoot() {
        this.drawShoot(this.framesCounter)
        this.bullets.push(new Bullets(this.ctx, this.playerPos.x, this.playerPos.y, 100, 100))
        const audioWeapon = document.querySelector('.audio-weapon')
        audioWeapon.play()

    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);
    }


    drawShoot(framesCounter) {

        this.ctx.drawImage(
            this.playerShootImageInstance,
            this.playerShootImageInstance.framesIndex * Math.floor(this.playerShootImageInstance.width / this.playerShootImageInstance.frames),
            0,
            Math.floor(this.playerShootImageInstance.width / this.playerShootImageInstance.frames),
            this.playerShootImageInstance.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h,
        )
        this.animateShoot(framesCounter)

    }

    animateShoot(framesCounter) {
        if (framesCounter % 1 == 0) {
            this.playerShootImageInstance.framesIndex++;
        }
        if (this.playerShootImageInstance.framesIndex > this.playerShootImageInstance.frames - 1) {
            this.playerShootImageInstance.framesIndex = 0;
        }
    }
}