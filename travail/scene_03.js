var tween_block_shift_01;
var tween_block_shift_02;
var tween_block_shift_03;
var tween_block_shift_04;
var tween_block_shift_05;

var fall_block_02;
var active_lever_3 = false;
var active_lever_4 = false;

var enemy_03;
var zone_enemy_03;
var tween_enemy_03;
var enemy_03_agro = false;
var etat_enemy_03 = true;

var power_up_dash;
var etat_power_up_dash = false;
var dash = false;
var tween_power_up;


class scene_03 extends Phaser.Scene{
    constructor(){
        super("scene_03");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_03_placeholder', 'scene_03.json');
        //this.load.image('player','assets/player.png');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });
        this.load.spritesheet('enemy','assets/ennemi.png',{ frameWidth: 212, frameHeight: 282 });
        this.load.spritesheet('enemy_02','assets/mush_02.png',{ frameWidth: 150, frameHeight: 216 });
        this.load.image('fall_block_02','assets/fall_block_02.png');
        this.load.spritesheet('mush_cloud','assets/nuage_toxique.png',{ frameWidth: 122.5, frameHeight: 135 });
        this.load.image('power_up','assets/banane_01.png');
    }

    create(){
        const map = this.make.tilemap({key: 'scene_03_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        
        const ground_01_s3 = map.createLayer('ground_01_s3', tileset, 0, 0);
        const ground_02_s3 = map.createLayer('ground_02_s3', tileset, 0, 0);
        const block_shift_01 = map.createLayer('block_shift_01', tileset,0,0);
        const block_shift_02 = map.createLayer('block_shift_02', tileset,0,0);
        const block_shift_03 = map.createLayer('block_shift_03', tileset,0,0);
        const block_shift_04 = map.createLayer('block_shift_04', tileset,0,0);
        const block_shift_05 = map.createLayer('block_shift_05', tileset,0,0);
        const wall_s3 = map.createLayer('wall_s3', tileset,0,0);
        const lever_3 = map.createLayer('lever_3', tileset,0,0);
        const lever_4 = map.createLayer('lever_4', tileset,0,0);
        const trap_s3 = map.createLayer('trap_s3', tileset,0,0);

        
        //ground_01_s3.setCollisionByExclusion(-1, true);
        block_shift_01.setCollisionByExclusion(-1, true);
        block_shift_02.setCollisionByExclusion(-1, true);
        block_shift_03.setCollisionByExclusion(-1, true);
        block_shift_04.setCollisionByExclusion(-1, true);
        block_shift_05.setCollisionByExclusion(-1, true);
        ground_02_s3.setCollisionByExclusion(-1, true);
        wall_s3.setCollisionByExclusion(-1, true);
        lever_3.setCollisionByExclusion(-1, true);
        lever_4.setCollisionByExclusion(-1, true);
        trap_s3.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(100,804,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;
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

        tween_block_shift_01 = this.tweens.add({
            targets: block_shift_01,
            y: - 300,
            duration: 3000,
            //paused: true,
            yoyo : true,
            repeat: -1,
        }); 

        tween_block_shift_02 = this.tweens.add({
            targets: block_shift_02,
            y:  400,
            duration: 3000,
            //paused: true,
            yoyo : true,
            repeat: -1,
        }); 

        tween_block_shift_03 = this.tweens.add({
            targets: block_shift_03,
            x:  300,
            duration: 3000,
            paused: true,
            yoyo : true,
            repeat: -1,
        }); 

        tween_block_shift_04 = this.tweens.add({
            targets: block_shift_04,
            y:  -300,
            duration: 3000,
            paused: true,
            yoyo : true,
            repeat: -1,
        }); 

        tween_block_shift_05 = this.tweens.add({
            targets: block_shift_05,
            y:  1152,
            duration: 12000,
            paused: true,
            //yoyo : true,
            repeat: 0,
        }); 

        fall_block_02 = this.physics.add.sprite(1152,764,'fall_block_02');
        fall_block_02.setOrigin(0);
        fall_block_02.body.setAllowGravity(false);
        //fall_block_02.body.immovable = true;
        fall_block_02.setSize(128,192);
        //fall_block_02.setOffset(50,40);

        enemy_03 = this.physics.add.sprite(600,1500,'enemy');/*.setSize(90,70);*/
        enemy_03.body.setAllowGravity(true);
        enemy_03.setCollideWorldBounds(true);
        enemy_03.setScale(0.6);
        enemy_03.setSize(140,242);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 39 }),
            frameRate: 25,
            repeat: 0
        });

        zone_enemy_03 = this.add.zone(600, 1828).setSize(1000, 200);
        this.physics.world.enable(zone_enemy_03);
        zone_enemy_03.body.setAllowGravity(false);
        zone_enemy_03.body.moves = false;

        power_up_dash = this.physics.add.sprite(170,1800,'power_up');
        power_up_dash.body.setAllowGravity(false);
        power_up_dash.setCollideWorldBounds(true);

        tween_power_up = this.tweens.add({
            targets: power_up_dash,
            y:  1700,
            duration: 3000,
            //paused: true,
            yoyo : true,
            repeat: -1,
        }); 


        this.physics.add.collider(block_shift_01,player);
        this.physics.add.collider(block_shift_02,player);
        this.physics.add.collider(block_shift_03,player);
        this.physics.add.collider(block_shift_04,player);
        this.physics.add.collider(block_shift_05,player);

        this.physics.add.collider(fall_block_02,player);
        this.physics.add.collider(fall_block_02,ground_02_s3,enable_fallBlock_02,null,this);
        this.physics.add.collider(wall_s3,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s3,player, climbOff,null,this);
        this.physics.add.collider(ground_02_s3,enemy_03);
        this.physics.add.collider(lever_3,player, leverOn3_s3,null,this);
        this.physics.add.collider(lever_4,player, leverOn4_s3,null,this);
        this.physics.add.collider(trap_s3,player, trap,null,this);
        this.physics.add.overlap(power_up_dash,player, activeDash,null,this);

        this.physics.add.overlap(player, zone_enemy_03,agro_enemy_03,null,this);
        this.physics.add.overlap(player, enemy_03,hitEnemy,null,this);

        
        

        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  5000  , 2000);
        this.physics.world.setBounds(0, 0, 5000 , 2000);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texteBanane = this.add.text(-350,-90, scoreCrystal,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
    }

    update(){

        if(etat_enemy_03 == false){
            enemy_03.anims.stop('walk',true);
            
        }

        if(etat_dash == false && relance_dash > 0){ 
            relance_dash --;
            if(relance_dash <= 0 ){
                compteur_dash = 50;
                relance_dash = 150;
                etat_dash = true;
            }
        }
        if(space.isUp && compteur_dash < 50){
            compteur_dash = 50;
            dash = false;
        }

        zone_enemy_03.body.debugBodyColor = zone_enemy_03.body.touching.none ? 0x00ffff : 0xffff00;

       
        if(zone_enemy_03.body.touching.none){
            enemy_03_agro = false;
            //console.log("agro false")
            enemy_03.body.immovable = true; 
            enemy_03.setVelocityX(0);
        }

        if(keyQ.isDown){
            if(keyQ.isDown && space.isDown && etat_dash == true && etat_power_up_dash == true){
                dashOn();
                player.setVelocityX(-800);
                textDash.setText(compteur_dash);
                dash = true;
            }
            else if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
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
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
            }
        }
        else if (keyD.isDown){
            if(keyD.isDown && space.isDown && etat_dash == true && etat_power_up_dash == true){
                dashOn();
                player.setVelocityX(800);
                textDash.setText(compteur_dash);
                dash = true;
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
            textX.setText(player.x);
            textY.setText(player.y);
        }
    }
}

function climbOn(){
    console.log(wall_climb);
    wall_climb = true
}

function climbOff(){
    wall_climb = false
}
function enable_fallBlock_02(){
    fall_block_02.body.setAllowGravity(false);
    fall_block_02.body.immovable = true;
}

function leverOn3_s3(){
    if(keyE.isDown && active_lever_3 == false){
        active_lever_3 = true;
        tween_block_shift_03.play();
        tween_block_shift_04.play();
    }
}

function leverOn4_s3(){
    if(keyE.isDown && active_lever_4 == false){
        active_lever_4 = true;
        tween_block_shift_05.play();
        console.log("ok");
    }
}

function trap(){
    player.x = 102;
    player.y = 804;
}

function agro_enemy_03 (){
    enemy_03_agro = true;
    enemy_03.anims.play('walk',true);
    if(zone_enemy_03.body.touching && enemy_03_agro == true){
        enemy_03.body.immovable = false;
        this.physics.moveToObject(enemy_03, player, 200);
    }
    if (enemy_03.x > player.x){
        enemy_03.direction = 'right';
        enemy_03.flipX = true;
    }
    else if(enemy_03.x < player.x){
        enemy_03.direction = 'left';
        enemy_03.flipX = false;
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

function activeDash(){
    power_up_dash.destroy(true,true);
    etat_power_up_dash = true;
}

function hitEnemy(){
    if(dash == true && etat_enemy_03 == true){
        enemy_03.setVisible(false);
        enemy_03.setScale(0);
        etat_enemy_03 = false;
        enemy_03.anims.stop('walk',true);
    }
}
