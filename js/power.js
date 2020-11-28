// POWER UP -- WEAPON POINTS++
class Power {

    constructor(ctx, powerPosX, powerPosY, powerWidth, powerHeight, canvasSize, powerGravity, powerVelX, powerVelY) {
        this.ctx = ctx
        this.powerPos = {
            x: powerPosX,
            y: powerPosY
        }
        this.powerSize = {
            w: powerWidth,
            h: powerHeight
        }
        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.powerVel = {
            x: powerVelX,
            y: powerVelY
        }
        this.powerGravity = powerGravity
        this.powerImageName = 'power.png'

        this.powerImageInstance = undefined

        this.init()
    }

    init() {
        this.powerImageInstance = new Image()
        this.powerImageInstance.src = `img/${this.powerImageName}`
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.powerImageInstance, this.powerPos.x, this.powerPos.y, this.powerSize.w, this.powerSize.h)
    }

    move() {

        if (this.powerPos.y >= this.canvasSize.h - 100 - this.powerSize.h) {
            this.powerVel.y *= -1
        }

        if (this.powerPos.x >= this.canvasSize.w - this.powerSize.w) {
            this.powerVel.x *= -1
        }

        this.powerPos.x += this.powerVel.x

        this.powerVel.y += this.powerGravity
        this.powerPos.y += this.powerVel.y
    }
}




// POWER UP -- LIVES++
class PowerLives extends Power {

    constructor(ctx, powerPosX, powerPosY, powerWidth, powerHeight, canvasSize, powerGravity, powerVelX, powerVelY) {

        super(ctx, powerPosX, powerPosY, powerWidth, powerHeight, canvasSize, powerGravity, powerVelX, powerVelY)

        this.powerLives = "player-lives.png"

        this.init()
    }

    init() {
        this.powerLiveInstance = new Image()
        this.powerLiveInstance.src = `img/${this.powerLives}`
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.powerLiveInstance, this.powerPos.x, this.powerPos.y, this.powerSize.w, this.powerSize.h)
    }


    move() {

        if (this.powerPos.y >= this.canvasSize.h - 100 - this.powerSize.h) {
            this.powerVel.y *= -1
        }

        if (this.powerPos.x >= this.canvasSize.w - this.powerSize.w) {
            this.powerVel.x *= -1
        }

        this.powerPos.x += this.powerVel.x

        this.powerVel.y += this.powerGravity
        this.powerPos.y += this.powerVel.y
    }

}   