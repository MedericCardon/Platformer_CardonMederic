var tween_block;
var camera_block = false;
var enemy_01;
var zone_enemy_01;
var enemy_02;
var compteur_cam = 250;
var etat_cam = true;
var enemy_01_agro = false;

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
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 100 });
        this.load.image('enemy','assets/ennemi.png');
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

        player = this.physics.add.sprite(1300,1444,'player').setScale(0.8).setSize(90,70)/*.setOffset(40,0)*/;
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 11 }),
            frameRate: 25,
            repeat: 0
        });

        enemy_01 = this.physics.add.sprite(1466,1400,'enemy');/*.setSize(90,70);*/
        enemy_01.body.setAllowGravity(true);
        enemy_01.setCollideWorldBounds(true);
        enemy_01.setScale(2);

        zone_enemy_01 = this.add.zone(1150, 1444).setSize(800, 200);
        this.physics.world.enable(zone_enemy_01);
        zone_enemy_01.body.setAllowGravity(false);
        zone_enemy_01.body.moves = false;
        

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


        this.physics.add.collider(enemy_01,ground_02_s2);
        this.physics.add.collider(lever_s2,player, leverOn_s2,null,this);
        this.physics.add.collider(ground_02_s2,player, climbOff,null,this);
        this.physics.add.collider(player,ground_02_s2);
        this.physics.add.collider(wall_s2,player, climbOn,null,this);

        this.physics.add.overlap(player, zone_enemy_01,agro_enemy_01,null,this);
        
        this.physics.add.collider(block,player);

        tween_block = this.tweens.add({
            targets: block,
            x: -600,
            duration: 2500,
            paused: true,
            yoyo : true,
            repeat: -1
        });
        

    }

    update(){

        zone_enemy_01.body.debugBodyColor = zone_enemy_01.body.touching.none ? 0x00ffff : 0xffff00;

       
        if(zone_enemy_01.body.touching.none){
            enemy_01_agro = false;
            console.log("agro false")
            enemy_01.body.immovable = true; 
            enemy_01.setVelocityX(0);
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
        

        if(keyZ.isDown && player.body.blocked.left && wall_climb == true){
            player.setVelocityY(-200);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'left';
            player.flipX = true;
            player.setAngle(90);
            if(keyZ.isUp){
                player.setAngle(0);
            } 
        }
        else if (keyQ.isDown){
            player.anims.play('run', true);
            player.setVelocityX(-350);
            player.setBounce(0.1);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'left';
            player.flipX = true;
            if(player.body.blocked.down){
                player.setRotation(0);
            }
        }
        else if(keyZ.isDown && player.body.blocked.right && wall_climb == true){
            player.setVelocityY(-200);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'right';
            player.flipX = false;
            player.setAngle(-90);
            if(keyZ.isUp){
                player.setAngle(0);
            }
           
        }
        else if (keyD.isDown) {
            player.setVelocityX(350);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'right';
            player.flipX = false;
            player.anims.play('run', true);
            if(player.body.blocked.down){
                player.setRotation(0);
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keyS)){
            player.setVelocityY(900);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else  {
            player.setVelocityX(0);
            textX.setText(player.x);
            textY.setText(player.y);
            player.setRotation(0);
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
    if(zone_enemy_01.body.touching && enemy_01_agro == true){
        enemy_01.body.immovable = false
        this.physics.moveToObject(enemy_01, player, 200);
    }
}

