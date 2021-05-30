var tween_block;
var camera_block = false;
var enemy_01;
var zone_enemy_01;
var enemy_02;
var zone_enemy_02;
var tween_enemy_02;
var enemy_03;
var zone_enemy_03;
var tween_enemy_03;
var compteur_cam = 250;
var etat_cam = true;
var enemy_01_agro = false;
var mush_poison;
var etat_poison = true;
var compteur_mush = 150;
var relance_poison = 150;
var target = new Phaser.Math.Vector2();

var etat_dash = true;
var compteur_dash = 50;
var relance_dash = 150;

var textDash;

var anim_mush_02 = true;


class scene_02 extends Phaser.Scene{
    constructor(){
        super("scene_02");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_02_placeholder', 'scene_02.json');
        //this.load.image('player','assets/player.png');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });
        this.load.spritesheet('enemy','assets/ennemi.png',{ frameWidth: 212, frameHeight: 282 });
        this.load.spritesheet('enemy_02','assets/mush_02.png',{ frameWidth: 150, frameHeight: 216 });
        this.load.image('bulle','assets/bulle.png');
        this.load.spritesheet('mush_cloud','assets/nuage_toxique.png',{ frameWidth: 122.5, frameHeight: 135 });
    }

    create(){
        const map = this.make.tilemap({key: 'scene_02_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        const lever_s2 = map.createLayer('lever_s2', tileset,0,0);
        const water_s2 = map.createLayer('water_s2', tileset, 0, 0);
        const ground_02_s2 = map.createLayer('ground_02_s2', tileset, 0, 0);
        const ground_01_s2 = map.createLayer('ground_01_s2', tileset, 0, 0);
        const wall_s2 = map.createLayer('wall_s2', tileset,0,0);
        const block = map.createLayer('block', tileset,0,0);
        

        lever_s2.setCollisionByExclusion(-1, true);
        ground_02_s2.setCollisionByExclusion(-1, true);
        wall_s2.setCollisionByExclusion(-1, true);
        block.setCollisionByExclusion(-1, true);
        

        groupeBullets = this.physics.add.group();
        groupeBulletsEnemy = this.physics.add.group();

        player = this.physics.add.sprite(1884,282,'player').setScale(0.8).setSize(90,70)/*.setOffset(40,0)*/;
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
            frameRate: 25,
            repeat: 0
        });
        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 34 }),
            frameRate: 50,
            repeat: 0
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 35, end: 41 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'cloud',
            frames: this.anims.generateFrameNumbers('mush_cloud', { start: 0, end: 5 }),
            frameRate: 4,
            repeat: 0
        });

        enemy_01 = this.physics.add.sprite(1466,1400,'enemy');/*.setSize(90,70);*/
        enemy_01.body.setAllowGravity(true);
        enemy_01.setCollideWorldBounds(true);
        enemy_01.setScale(0.6);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 0, end: 39 }),
            frameRate: 25,
            repeat: 0
        });

        zone_enemy_01 = this.add.zone(1150, 1444).setSize(800, 200);
        this.physics.world.enable(zone_enemy_01);
        zone_enemy_01.body.setAllowGravity(false);
        zone_enemy_01.body.moves = false;

        enemy_02 = this.physics.add.sprite(1410,800,'enemy_02');/*.setSize(90,70);*/
        enemy_02.body.setAllowGravity(true);
        enemy_02.setCollideWorldBounds(true);
        enemy_02.setScale(0.6);

        this.anims.create({
            key: 'walk_mush_02',
            frames: this.anims.generateFrameNumbers('enemy_02', { start: 0, end: 34 }),
            frameRate: 15,
            repeat: 0
        });

        this.anims.create({
            key: 'hide',
            frames: this.anims.generateFrameNumbers('enemy_02', { start: 35, end: 44 }),
            frameRate: 25,
            repeat: 0
        });

        zone_enemy_02 = this.add.zone(1410, 780).setSize(600, 300);
        this.physics.world.enable(zone_enemy_02);
        zone_enemy_02.body.setAllowGravity(false);
        zone_enemy_02.body.moves = false;

        tween_enemy_02 = this.tweens.add({
            targets: enemy_02,
            x: 1510,
            duration: 500,
            yoyo : true,
            paused : false,
            repeat: -1
        });

        mush_poison = this.physics.add.sprite(enemy_02.x , enemy_02.y - 100,'mush_cloud').setScale(2);
        mush_poison.body.setAllowGravity(false);
        mush_poison.setAlpha(0);


    /*enemy_03 = this.physics.add.sprite(1342,932,'enemy');
        enemy_03.body.setAllowGravity(true);
        enemy_03.setCollideWorldBounds(true);
        enemy_03.setScale(2);

        zone_enemy_03 = this.add.zone(1342, 780).setSize(64, 300);
        this.physics.world.enable(zone_enemy_03);
        zone_enemy_03.body.setAllowGravity(false);
        zone_enemy_03.body.moves = false;

        tween_enemy_03 = this.tweens.add({
            targets: enemy_03,
            y: 650,
            duration: 1000,
            paused: true,
            yoyo : true,
            repeat: 0
        });*/

        tween_block = this.tweens.add({
            targets: block,
            x: -600,
            duration: 2500,
            paused: true,
            yoyo : true,
            repeat: -1,
        }); 
        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  5000  , 1664);
        this.physics.world.setBounds(0, 0, 5000 , 1664);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texteBanane = this.add.text(-350,-90, scoreBanane,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);


        this.physics.add.overlap(player,zone_enemy_02,poison,null,this);
        this.physics.add.overlap(player,zone_enemy_02,hit_player,null,this);
        this.physics.add.overlap(player,zone_enemy_02,anim_mush,null,this);
        //this.physics.add.collider(player,zone_enemy_03,agro_enemy_03,null,this);
        this.physics.add.collider(enemy_01,ground_02_s2);
        this.physics.add.collider(enemy_02,ground_02_s2);
        //this.physics.add.collider(enemy_03,ground_02_s2);
        this.physics.add.collider(lever_s2,player, leverOn_s2,null,this);
        this.physics.add.collider(ground_02_s2,player, climbOff,null,this);
        this.physics.add.collider(player,ground_02_s2);
        this.physics.add.collider(wall_s2,player, climbOn,null,this);
        this.physics.add.overlap(player, zone_enemy_01,agro_enemy_01,null,this);
        this.physics.add.collider(block,player);

        target.x = 1410;
        target.y = 932;

        /*this.input.on('pointerdown', function () {
            dash(player);
        }, this);*/


    }

    update(){

        

        if(etat_poison == false && relance_poison > 0){ 
            relance_poison --;
            if(relance_poison <= 0 ){
                compteur_mush = 150;
                relance_poison = 150;
            }
        }

        if(etat_dash == false && relance_dash > 0){ 
            relance_dash --;
            if(relance_dash <= 0 ){
                compteur_dash = 50;
                relance_dash = 150;
                etat_dash = true;
            }
        }

        zone_enemy_01.body.debugBodyColor = zone_enemy_01.body.touching.none ? 0x00ffff : 0xffff00;
        zone_enemy_02.body.debugBodyColor = zone_enemy_02.body.touching.none ? 0x00ffff : 0xffff00;

       
        if(zone_enemy_01.body.touching.none){
            enemy_01_agro = false;
            //console.log("agro false")
            enemy_01.body.immovable = true; 
            enemy_01.setVelocityX(0);
        }

        if(zone_enemy_02.body.touching.none){
            etat_poison = false;
            enemy_02.anims.play('walk_mush_02',true);
            tween_enemy_02.play();
            mush_poison.setAlpha(0);
            anim_mush_02 = true;
            this.physics.moveToObject(enemy_02, target, 200);
        }
            if(compteur_cam == 0){
                compteur_cam = 250;
            }

        if( camera_block == true){
            const cam = this.cameras.main;
            if(compteur_cam > 0 && etat_cam == true){
                compteur_cam --;
                cam.pan(2800, 700, 2000);
                console.log(compteur_cam);
            }         
        }
        if(compteur_cam <= 0){
            console.log("ok");
            this.cameras.main.pan(1781, 292, 2000);
            etat_cam = false;
        }
        

        if(keyQ.isDown){
            if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                console.log(wall_climb);
                player.anims.play('climb',true);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
            }
            else if (keyQ.isDown){
                console.log(wall_climb);
                player.anims.play('run', true);
                player.setVelocityX(-350);
                player.setBounce(0.1);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
            }
        }
        else if (keyD.isDown){
            if(keyD.isDown && space.isDown && etat_dash == true){
                dashOn();
                player.setVelocityX(800);
                textDash.setText(compteur_dash);
            }

            else if(keyD.isDown && keyZ.isDown && player.body.blocked.right && wall_climb == true){
                player.setVelocityY(-250);
                player.setVelocityX(350);
                player.anims.play('climb',true);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
            }
            else if (keyD.isDown) {
                player.setVelocityX(350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                player.anims.play('run', true);
            }
            
        }
        else if(Phaser.Input.Keyboard.JustDown(keyS)){
            player.setVelocityY(500);
            textX.setText(player.x);
            textY.setText(player.y);
        }
        else  {
            player.setVelocityX(0);
            textX.setText(player.x);
            textY.setText(player.y);
            player.setRotation(0);
            player.anims.play('idle', true);
        }
        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.setBounce(0.1);
            textX.setText(player.x);
            textY.setText(player.y);
        }
    }
}

function climbOn(){
    wall_climb = true
}

function climbOff(){
    wall_climb = false
}

function leverOn_s2(block){
    if(keyE.isDown && camera_block == false){
        tween_block.play();
        camera_block = true;
    }
}

function agro_enemy_01 (){
    enemy_01_agro = true;
    enemy_01.anims.play('walk',true);
    if(zone_enemy_01.body.touching && enemy_01_agro == true){
        enemy_01.body.immovable = false
        this.physics.moveToObject(enemy_01, player, 200);

    }
}

/*function agro_enemy_02 (){
        tween_enemy_02.play();
}*/
/*function agro_enemy_03 (){
    tween_enemy_03.play();
}*/

function poison(){
    tween_enemy_02.pause();
    this.physics.moveToObject(enemy_02, target, 200);
    etat_poison = true;
    if(compteur_mush == 0){
        etat_poison = false;
        mush_poison.setAlpha(1);
    }
    else if(etat_poison == true ){
        console.log(compteur_mush);
        compteur_mush --
        mush_poison.setAlpha(0);
    }
}

function hit_player(){
    
    if(etat_poison == false){
        playerHp -= 1
        mush_poison.anims.play('cloud',true);
        console.log(playerHp);
        textHp.setText(playerHp);
    }
}

function anim_mush(){
    if(anim_mush_02 == true){
        enemy_02.anims.play('hide',true);
        anim_mush_02 = false;
    }
}


function dashOn(){
    if(compteur_dash == 0){
        etat_dash = false;
    }
    else if(etat_dash == true ){
        compteur_dash --
    }
}

