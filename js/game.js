const Game = {

    name: 'Plants vs Zombies',
    description: 'Help your farmer and defend humankind from a Zombie invasion',
    version: '1.0.0',
    license: undefined,
    author: 'Javier Fernández, Marisa Vitale',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    FPS: 60,
    framesCounter: 0,
    points: 0,
    background: undefined,
    player: undefined,
    positionEnemy: undefined,
    positionEnemyDeadX: undefined,
    positionEnemyDeadY: undefined,
    level: 0,
    enemies: [],
    strongEnemies: [],
    powers: [],
    powersLive: [],
    keys: {
        space: 32,
        top: 38,
        bottom: 40,
    },
    audioCanvas: document.querySelector('.audio-canvas'),
    audioOver: document.querySelector('.audio-over'),

    // INIT GAME
    init() {

        this.canvasTag = document.getElementById("canvas");
        this.ctx = this.canvasTag.getContext("2d");
        this.setDimensions();
        this.start();

        // POINTS COUNTER (LIVES, WEAPON, ENEMIES KILLED)
        this.livePoints = document.querySelector('.lives p span')
        this.livePoints.innerText = this.player.lives
        this.bulletPoints = document.querySelector('.weapons p span')
        this.bulletPoints.innerText = this.player.weapon
        this.enemiesPoints = document.querySelector('.points p span')
        this.enemiesPoints.innerText = this.points
    },


    // CANVAS DIMENSIONS
    setDimensions() {
        this.canvasSize.w = window.innerWidth - 200
        this.canvasSize.h = window.innerHeight - 150
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },


    // START GAME
    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.clearScreen()
            this.drawAll()
            this.generateNewPower()
            this.generateEnemies()
            this.generateStrongEnemies()
            this.generateNewPowerLive()
            this.clearPower()
            this.killerEnemies()
            this.killerStrongEnemies()
            this.isCollisionEnemies()
            this.isCollisionStrongEnemies()
            this.isCollisionPower()
            this.isCollisionPowerLive()
            this.level++
            this.clearBullets()
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
        }, 1000 / this.FPS)

    },


    // RESET / NEW GAME
    reset() {
        this.audioCanvas.play()
        this.audioOver.pause()
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "img/background-large.jpg");
        this.player = new Player(this.ctx, this.canvasSize, 100, 100, 'img/player-one.png', this.keys);
        this.enemies = [];
        this.strongEnemies = [];
        this.powers = [];
        this.powersLive = [];
        this.points = 0
        this.level = 0
    },


    // GENERATE POWER UPs / WEAPON 
    generateNewPower() {
        if ((this.framesCounter % this.FPS === 0) && (Math.random() * 100 < 5)) {
            this.powers.push(new Power(this.ctx, this.canvasSize.w - 50, (Math.random() * this.canvasSize.h), 50, 50, this.canvasSize, .1, 2, 3));
        }
    },
    // GENERATE POWER UPs / LIVES
    generateNewPowerLive() {
        if ((this.framesCounter % this.FPS === 0) && (Math.random() * 100 < 5)) {
            this.powersLive.push(new PowerLives(this.ctx, this.canvasSize.w - 50, (Math.random() * this.canvasSize.h), 50, 50, this.canvasSize, .1, 2, 3));
        }
    },


    // GENERATE ENEMIES
    generateEnemies() {

        if ((this.framesCounter % this.FPS === 0) && (Math.random() * 100 < 30)) {
            this.enemies.push(new Enemy(this.ctx, this.canvasSize, this.canvasSize.w, (Math.random() * (this.canvasSize.h - 200)), 100, 160, 1));
        }
    },

    generateStrongEnemies() {

        if ((this.framesCounter % this.FPS === 0) && (this.level > 500) && (Math.random() * 100 < 20)) {
            this.strongEnemies.push(new StrongEnemy(this.ctx, this.canvasSize, this.canvasSize.w, (Math.random() * (this.canvasSize.h - 200)), 120, 180, 4));
        }
    },


    // CLEAR POWER UP Weapon and Lives ARRAYs (OUT OF CANVAS)
    clearPower() {

        this.powers.forEach(
            elm => {
                if (elm.powerPos.x < 0) {
                    this.powers.shift(elm)
                }
            })
        this.powersLive.forEach(
            elm => {
                if (elm.powerPos.x < 0) {
                    this.powersLive.shift(elm)
                }
            })
    },


    // CLEAR BULLETS ARRAYs (OUT OF CANVAS)
    clearBullets() {

        this.player.bullets.forEach(
            elm => {
                if (elm.bulletPos.x > this.canvasSize.w) {
                    this.player.bullets.shift(elm)

                }
            })
    },


    // DRAW BACKGROUND PLAYER ENEMIES and POWER UPs (WEAPON and LIVES)
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.enemies.forEach(elm => elm.draw(this.framesCounter))
        this.strongEnemies.forEach(elm => elm.draw(this.framesCounter))
        this.powers.forEach(elm => elm.draw())
        this.powersLive.forEach(elm => elm.draw())
    },


    // CLEAR ALL
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
    },


    //COLLISION PowerUp WEAPON/Player  => Player.Weapon++
    isCollisionPower() {
        if (this.powers.some(pow => {
            return (
                this.player.playerPos.x < pow.powerPos.x + pow.powerSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > pow.powerPos.x &&
                this.player.playerPos.y < pow.powerPos.y + pow.powerSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > pow.powerPos.y
            );
        })) {
            this.powers.shift()
            this.player.weapon += 10
            const audioPowerWeapon = document.querySelector('.audio-power-weapon')
            audioPowerWeapon.play()
            this.bulletPoints.innerText = this.player.weapon
        }

    },

    //COLLISION PowerUp LIVES/Player  => Player.Lives++
    isCollisionPowerLive() {
        if (this.powersLive.some(pow => {
            return (
                this.player.playerPos.x < pow.powerPos.x + pow.powerSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > pow.powerPos.x &&
                this.player.playerPos.y < pow.powerPos.y + pow.powerSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > pow.powerPos.y
            );
        })) {
            this.powersLive.shift()
            this.player.lives++
            const audioPowerLives = document.querySelector('.audio-power-lives')
            audioPowerLives.play()
            this.livePoints.innerText = this.player.lives
        }

    },

    //COLLISION ENEMIES/PLAYER =>  Player.Lives--  => Game Over
    isCollisionEnemies() {
        if (this.player.lives > 0 && this.enemies.some(elm => {
            return (this.player.playerPos.x + (this.player.playerSize.w - 40) >= elm.enemiesPos.x);
        })
        ) {
            this.player.lives -= 1
            this.livePoints.innerText = this.player.lives
            this.enemies.shift()
            const audioDead = document.querySelector('.audio-dead')
            audioDead.play()

        }
        else if (this.player.lives === 0) {
            this.gameOver()
        }

    },

    isCollisionStrongEnemies() {
        if (this.player.lives > 0 && this.strongEnemies.some(elm => {
            return (this.player.playerPos.x + (this.player.playerSize.w - 40) >= elm.enemiesPos.x);
        })
        ) {
            this.player.lives -= 1
            this.livePoints.innerText = this.player.lives
            this.strongEnemies.shift()
            const audioDead = document.querySelector('.audio-dead')
            audioDead.play()

        }
        else if (this.player.lives === 0) {
            this.gameOver()
        }

    },

    // KILL ENEMIES
    killerEnemies() {

        //bullet shooted
        let bulletShoot = this.player.bullets.find(bullet => {
            return this.enemies.some(enemy => {
                return (
                    bullet.bulletPos.x < enemy.enemiesPos.x + enemy.enemiesSize.w &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemiesPos.x &&
                    bullet.bulletPos.y < enemy.enemiesPos.y + enemy.enemiesSize.h &&
                    bullet.bulletSize.h + bullet.bulletPos.y > enemy.enemiesPos.y
                )
            });
        });

        //enemy shooted
        let enemyShoot = this.enemies.findIndex(enemy => {

            return this.player.bullets.some(bullet => {
                return (
                    enemy.enemiesPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                    enemy.enemiesPos.x + enemy.enemiesSize.w > bullet.bulletPos.x &&
                    enemy.enemiesPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                    enemy.enemiesSize.h + enemy.enemiesPos.y > bullet.bulletPos.y
                )
            });
        });

        if ((bulletShoot != undefined) && (enemyShoot >= 0)) {

            this.player.bullets.shift()
            this.points++
            this.enemiesPoints.innerText = this.points
            this.enemies.splice(enemyShoot, 1)
            const audioEnemies = document.querySelector('.audio-enemies')
            audioEnemies.play()
            this.drawExplosion()
            this.positionEnemy = this.enemies[enemyShoot]
            this.positionEnemyDeadX = this.positionEnemy.enemiesPos.x
            this.positionEnemyDeadY = this.positionEnemy.enemiesPos.y
        }

        this.explosionImageInstance = new Image()
        this.explosionImageInstance.src = `img/explosion.png`

    },
    drawExplosion() {
        setTimeout(() => {
            this.ctx.drawImage(this.explosionImageInstance, this.positionEnemyDeadX, this.positionEnemyDeadY, 50, 50)
        }, 4000);

    },


    // KILL STRONG ENEMIES
    killerStrongEnemies() {

        //bullet shooted
        let bulletShoot = this.player.bullets.find(bullet => {
            return this.strongEnemies.some(enemy => {
                return (
                    bullet.bulletPos.x < enemy.enemiesPos.x + enemy.enemiesSize.w &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemiesPos.x &&
                    bullet.bulletPos.y < enemy.enemiesPos.y + enemy.enemiesSize.h &&
                    bullet.bulletSize.h + bullet.bulletPos.y > enemy.enemiesPos.y
                )
            });
        });

        //enemy shooted
        let enemyStrongShoot = this.strongEnemies.findIndex(enemy => {

            return this.player.bullets.some(bullet => {
                return (
                    enemy.enemiesPos.x < bullet.bulletPos.x + bullet.bulletSize.w &&
                    enemy.enemiesPos.x + enemy.enemiesSize.w > bullet.bulletPos.x &&
                    enemy.enemiesPos.y < bullet.bulletPos.y + bullet.bulletSize.h &&
                    enemy.enemiesSize.h + enemy.enemiesPos.y > bullet.bulletPos.y
                )
            });
        });

        if ((bulletShoot != undefined) && (enemyStrongShoot >= 0)) {
            this.player.bullets.shift()
            this.points += 2
            this.enemiesPoints.innerText = this.points
            this.strongEnemies.splice(enemyStrongShoot, 1)
            const audioEnemies = document.querySelector('.audio-enemies')
            audioEnemies.play()
        }

    },


    // GAME OVER 
    gameOver() {
        clearInterval(this.interval);

        // GAME CANVAS hide
        this.audioCanvas.pause()
        const canva = document.querySelector('#background-canvas')
        canva.style.display = "none"

        // GAME OVER SLIDE shows
        const game = document.querySelector('.over')
        game.style.display = "flex"
        this.audioOver.play()

        // GAME OVER Points
        const gamePoints = document.querySelector('.game-over p span')
        gamePoints.innerText = this.points

    }


}



