etat_power_up_dash = true;


var tween_block_01;
var tween_block_02;
var tween_block_03;

var tween_ground_block1;
var tween_ground_block2;
var tween_ground_block3;


class scene_04 extends Phaser.Scene{
    constructor(){
        super("scene_04");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_04_placeholder', 'scene_04.json');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });

        this.load.image('background_s4','assets/scene_04/background_04.png');
        this.load.image('branches_s4','assets/scene_04/branche_s4.png');
        this.load.image('etoiles_s4','assets/scene_04/etoiles_s4.png');
        this.load.image('crystal_paralaxe_s4','assets/scene_04/crystal_paralaxe_s4.png');
        this.load.image('mush_para_01_s4','assets/scene_04/mush_para_01_s4.png');
        this.load.image('mush_para_02_s4','assets/scene_04/mush_para_02_s4.png');
        this.load.image('foreground_s4','assets/scene_04/foreground_s4.png');
    }

    create(){

        this.add.image(0,0,'background_s4').setOrigin(0);
        this.add.image(-300,-200,'etoiles_s4').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-800,'mush_para_02_s4').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-200,-800,'mush_para_01_s4').setOrigin(0).setScrollFactor(0.5);
        this.add.image(-100,-450,'crystal_paralaxe_s4').setOrigin(0).setScrollFactor(0.7);
        this.add.image(0,0,'foreground_s4').setOrigin(0);
        this.add.image(0,0,'branches_s4').setOrigin(0);

        const map = this.make.tilemap({key: 'scene_04_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        const grass_door = map.createLayer('grass_door',tileset,0,0);
         const door_explo = map.createLayer('door_explo',tileset,0,0);
        const ground_02_s4 = map.createLayer('ground_02_s4', tileset,0,0);
        const trap_s4 = map.createLayer('trap_s4', tileset,0,0);
        const ground_01_s4 = map.createLayer('ground_01_s4', tileset,0,0);
        
        const wall_s4 = map.createLayer('wall_s4', tileset,0,0);

        ground_02_s4.setCollisionByExclusion(-1, true);
        wall_s4.setCollisionByExclusion(-1, true);
        trap_s4.setCollisionByExclusion(-1, true);
        door_explo.setCollisionByExclusion(-1, true);


        const shift_block_01_s4 = map.createLayer('shift_block_01_s4', tileset,0,0);
        const ground_block_01 = map.createLayer('ground_block_01', tileset,0,0);
        shift_block_01_s4.setCollisionByExclusion(-1, true);

        tween_block_01 = this.tweens.add({
            targets: shift_block_01_s4,
            x:  500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });

        tween_ground_block1 = this.tweens.add({
            targets: ground_block_01,
            x:  500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });

        const shift_block_02_s4 = map.createLayer('shift_block_02_s4', tileset,0,0);
        const ground_block_02 = map.createLayer('ground_block_02', tileset,0,0);
        shift_block_02_s4.setCollisionByExclusion(-1, true);

        tween_block_02 = this.tweens.add({
            targets: shift_block_02_s4,
            x:  -500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });

        tween_ground_block2 = this.tweens.add({
            targets: ground_block_02,
            x:  -500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });

        const shift_block_03_s4 = map.createLayer('shift_block_03_s4', tileset,0,0);
        const ground_block_03 = map.createLayer('ground_block_03', tileset,0,0);
        shift_block_03_s4.setCollisionByExclusion(-1, true);

        tween_block_03 = this.tweens.add({
            targets: shift_block_03_s4,
            x:  500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });

        tween_ground_block3 = this.tweens.add({
            targets: ground_block_03,
            x:  500,
            duration: 2000,
            yoyo : true,
            repeat: -1,
        });


         


        player = this.physics.add.sprite(100,2077,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;
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


        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

        this.physics.add.collider(door_explo,player);
        this.physics.add.collider(shift_block_01_s4,player);
        this.physics.add.collider(shift_block_02_s4,player);
        this.physics.add.collider(shift_block_03_s4,player);
        this.physics.add.collider(wall_s4,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s4,player, climbOff,null,this);
        this.physics.add.collider(trap_s4,player, trap,null,this);

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3584  , 2176);
        this.physics.world.setBounds(0, 0, 3584 , 2176);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texteBanane = this.add.text(-350,-90, scoreCrystal,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
    }

    update(){

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

function trap(){
    player.x = 102;
    player.y = 804;
}

function dashOn(){
    if(compteur_dash == 0){
        etat_dash = false;
    }
    else if(etat_dash == true ){
        compteur_dash --
    }
}

