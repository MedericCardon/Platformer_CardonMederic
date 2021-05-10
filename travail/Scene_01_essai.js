
var player;
var cursors;
var space;
var tween_platmove1;
var tween_platmove2;
var keyE;

var boutonTire;
var banane;

var compteurBullet = 50;
var bulletOn = true;
var groupeBullets;
var bullet;

var scoreBanane = 10;
var texteBanane;

class Scene_01 extends Phaser.Scene{
    constructor(){
        super("Scene_01");
    }
    init(data){
    }
    preload(){
        this.load.image('tiles', 'place_holder_2.png');
        this.load.tilemapTiledJSON('scene_01_placeholder', 'scene_01.json');
        this.load.image('player','player.png');
        this.load.image('banane','banane_01.png');
    }

    create(){
        const map = this.make.tilemap({key: 'scene_01_placeholder'});
        const tileset = map.addTilesetImage('place_holder_02'/*nom fichier tiled*/, 'tiles');
        const plateforme_mouvement = map.createLayer('plateforme_mouvement', tileset, 0, 0);
        const plateforme_mouvement2 = map.createLayer('plateforme_mouvement2', tileset, 0, 0);
        const plateforme_fix = map.createLayer('plateforme_fix', tileset, 0, 0);
        const levier1 = map.createLayer('levier1', tileset, 0, 0);
        const levier2 = map.createLayer('levier2', tileset, 0, 0);

        plateforme_fix.setCollisionByExclusion(-1, true);
        plateforme_mouvement.setCollisionByExclusion(-1, true);
        plateforme_mouvement2.setCollisionByExclusion(-1, true);
        levier1.setCollisionByExclusion(-1, true);
        levier2.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(100,100,'player');
        player.body.setAllowGravity(true);
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        groupeBullets = this.physics.add.group();

        banane = this.physics.add.sprite(700,200,'banane');

        this.physics.add.collider(plateforme_fix,player);
        this.physics.add.collider(plateforme_fix,banane);
        this.physics.add.overlap(banane,player,dropBanane,null,this)

        this.physics.add.collider(plateforme_mouvement,player);
        this.physics.add.collider(plateforme_mouvement2,player);
        this.physics.add.collider(levier1,player,actionLevier1,null,this);
        this.physics.add.collider(levier2,player,actionLevier2,null,this);

        this.physics.add.collider(plateforme_fix,groupeBullets,bulletDestroy,null,this);
        this.physics.add.collider(plateforme_mouvement,groupeBullets);
        this.physics.add.collider(player,groupeBullets);

        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        boutonTire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        texteBanane = this.add.text(40,28, scoreBanane,{font: '20px Georgia', fill: '#f0acdc' });

        tween_platmove1 = this.tweens.add({
            targets: plateforme_mouvement,
            y: 50,
            duration: 4000,
            yoyo: true,
            paused: true,
            repeat: -1
        });

        tween_platmove2 = this.tweens.add({
            targets: plateforme_mouvement2,
            y: 150,
            duration: 4000,
            yoyo: true,
            paused: true,
            repeat: -1
        });

    }

    

    update(){

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }


        if ( Phaser.Input.Keyboard.JustDown(boutonTire)) {// Appuyer sur ESPACE permet de lancer un projectile //
            tirer(player);
        }

        if (cursors.left.isDown)  {
            player.setVelocityX(-250);
            player.direction = 'left';
            player.setBounce(0.1);

        }
        else if (cursors.right.isDown) {

            player.setVelocityX(250);
            player.direction = 'right';
            player.setBounce(0.1);
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            player.setVelocityY(900);
            player.setBounce(0);
        }
        else  {
            player.setVelocityX(0);
        }
        if (space.isDown) {
            player.setVelocityY(-300);
            player.setBounce(0.1);
        }  
    }
}

function actionLevier1(){
    if(keyE.isDown){
        tween_platmove1.play(); 
    }
}

function actionLevier2(){
    if(keyE.isDown){
        tween_platmove2.play();
    }
}

function tirer(player) {
    
        if (bulletOn == true){
            if(scoreBanane >= 1){
                scoreBanane -= 1
                texteBanane.setText(scoreBanane);
            var coefDir;
            if (player.direction == 'left') { // determine la direction du joueur //
                coefDir = -1; 
            } else { 
                coefDir = 1
            }
            bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'banane'); // permet de créer la carte à coté du joueur //
            // Physique de la carte //
            bullet.setCollideWorldBounds(false);
            bullet.body.allowGravity = true;
            bullet.setVelocity(1200 * coefDir, -80); // vitesse en x et en y
            bulletOn = false;
        }
    }
}

function bulletDestroy(){
    bullet.destroy(true,true);
}

function dropBanane(){
    banane.destroy(true,true);
    scoreBanane += 7 
    texteBanane.setText(scoreBanane);
}

