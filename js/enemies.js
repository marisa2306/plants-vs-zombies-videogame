class Enemy {
    constructor(ctx, canvasSize, enemiesPosX, enemiesPosY, enemiesWidth, enemiesHeight, speed) {
        this.ctx = ctx

        this.canvasSize = {
            w: canvasSize.w,
            h: canvasSize.h
        }
        this.enemiesPos = {
            x: enemiesPosX,
            y: enemiesPosY
        }
        this.enemiesSize = {
            w: enemiesWidth,
            h: enemiesHeight
        }
        this.speed = speed
        this.enemiesImageInstance = new Image()
        this.enemiesImageInstance.src = `img/zombie-girl.jpg`
        this.enemiesImageInstance.frames = 4;
        this.enemiesImageInstance.framesIndex = 0;

    }


    draw(framesCounter) {

        this.ctx.drawImage(
            this.enemiesImageInstance,
            this.enemiesImageInstance.framesIndex * Math.floor(this.enemiesImageInstance.width / this.enemiesImageInstance.frames),
            0,
            Math.floor(this.enemiesImageInstance.width / this.enemiesImageInstance.frames),
            this.enemiesImageInstance.height,
            this.enemiesPos.x,
            this.enemiesPos.y,
            this.enemiesSize.w,
            this.enemiesSize.h,
        )
        this.animate(framesCounter),
        this.moveEnemies()
        
    }

        
        animate(framesCounter) {
            if (framesCounter % 8 == 0) {
                this.enemiesImageInstance.framesIndex++;
            }
            if (this.enemiesImageInstance.framesIndex > this.enemiesImageInstance.frames - 1) {
                this.enemiesImageInstance.framesIndex = 0;
            }
        }

    moveEnemies() {
        this.enemiesPos.x -= this.speed
    }
}

class StrongEnemy extends Enemy {

    constructor(ctx, canvasSize, enemiesPosX, enemiesPosY, enemiesWidth, enemiesHeight, speed) {

        super(ctx, canvasSize, enemiesPosX, enemiesPosY, enemiesWidth, enemiesHeight, speed)
        this.enemies2ImageInstance = new Image()
        this.enemies2ImageInstance.src = `img/zombie-two-frames.png`
        this.enemies2ImageInstance.frames = 5;
        this.enemies2ImageInstance.framesIndex = 0;

    }

    draw(framesCounter) {

        this.ctx.drawImage(
            this.enemies2ImageInstance,
            this.enemies2ImageInstance.framesIndex * Math.floor(this.enemies2ImageInstance.width / this.enemies2ImageInstance.frames),
            0,
            Math.floor(this.enemies2ImageInstance.width / this.enemies2ImageInstance.frames),
            this.enemies2ImageInstance.height,
            this.enemiesPos.x,
            this.enemiesPos.y,
            this.enemiesSize.w,
            this.enemiesSize.h,
        )
        this.animate(framesCounter),
            this.moveEnemies()
    }

    animate(framesCounter) {
        if (framesCounter % 8 == 0) {
            this.enemies2ImageInstance.framesIndex++;
        }
        if (this.enemies2ImageInstance.framesIndex > this.enemies2ImageInstance.frames - 1) {
            this.enemies2ImageInstance.framesIndex = 0;
        }
    }

    moveEnemies() {
        this.enemiesPos.x -= this.speed
    }

}   