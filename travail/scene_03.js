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
var compteur_dash = 50;
var etat_dash = true;
var relance_dash = 150;

var particles_end1_s3;
var emitter_particles_end1_s3;

var particles_end2_s3;
var emitter_particles_end2_s3;

var plateforme_01;
var plateforme_02;
var plateforme_03;
var plateforme_04;

var end1 = false;
var end2 = false;

var particles_player;
var emitter_particles_player;

var crystal_chute_01;
var crystal_chute_02;
var crystal_chute_03;
var crystal_chute_04;

var tween_crystal_chute_01;
var tween_crystal_chute_02;
var tween_crystal_chute_03;
var tween_crystal_chute_04;


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
        this.load.image('background_s3','assets/scene_03/background_03.png');
        this.load.image('branches_s3','assets/scene_03/branches_s3.png');
        this.load.image('etoiles_s3','assets/scene_03/etoiles_s3.png');
        this.load.image('crystal_paralaxe_s3','assets/scene_03/crystal_paralaxe_s3.png');
        this.load.image('mush_para_01_s3','assets/scene_03/mush_para_01_s3.png');
        this.load.image('mush_para_02_s3','assets/scene_03/mush_para_02_s3.png');
        this.load.image('foreground_s3','assets/scene_03/foreground.png');
        this.load.image('end_01','assets/scene_03/end_01_s3.png');
        this.load.image('plateforme_s3','assets/scene_03/plateforme_s3.png');
        this.load.image('plateforme_02_s3','assets/scene_03/plateforme_02_s3.png');
        this.load.image('end_02','assets/scene_03/end_02_s3.png');
        this.load.image('particles_end','assets/particules_end.png');
        this.load.image('particles_player','assets/particles_singe.png');
        this.load.image('crystal_chute','assets/crystal_chute.png');
    }

    create(){
        this.add.image(0,0,'background_s3').setOrigin(0);
        this.add.image(-300,-250,'etoiles_s3').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-250,'mush_para_02_s3').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-200,-150,'mush_para_01_s3').setOrigin(0).setScrollFactor(0.5);
        this.add.image(-100,869,'crystal_paralaxe_s3').setOrigin(0).setScrollFactor(0.7);
        this.add.image(0,0,'foreground_s3').setOrigin(0);
        this.add.image(0,0,'branches_s3').setOrigin(0);
        const map = this.make.tilemap({key: 'scene_03_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        
    
        const wall_s3 = map.createLayer('wall_s3', tileset,0,0);
        const lever_3 = map.createLayer('lever_3', tileset,0,0);
        const lever_4 = map.createLayer('lever_4', tileset,0,0);
        const trap_s3 = map.createLayer('trap_s3', tileset,0,0);


        wall_s3.setCollisionByExclusion(-1, true);
        lever_3.setCollisionByExclusion(-1, true);
        lever_4.setCollisionByExclusion(-1, true);
        trap_s3.setCollisionByExclusion(-1, true);

        particles_player = this.add.particles('particles_player');
        emitter_particles_player = particles_player.createEmitter({
            x:0,
            y:0,
            speed: 30,
            lifespan: 1500,
            frequency: 70,
            quantity: 2,
            scale: { start: 1, end: 0.2 },
            blendMode: 'ADD',
        });

        player = this.physics.add.sprite(109,797,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;//depart = 109,797
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        particles_end1_s3 = this.add.particles('particles_end');
        emitter_particles_end1_s3 = particles_end1_s3.createEmitter({
            x:3480,
            y:1800,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 1 },
            blendMode: 'ADD',
        });


        crystal_chute_01 = this.physics.add.sprite(2300,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_01.body.setAllowGravity(false);

        tween_crystal_chute_01 = this.tweens.add({
            targets: crystal_chute_01,
            y:  2200,
            duration: 1800,
            //paused: true,
            repeat: -1,
        }); 

        crystal_chute_02 = this.physics.add.sprite(2450,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_02.body.setAllowGravity(false);

        tween_crystal_chute_02 = this.tweens.add({
            targets: crystal_chute_02,
            y:  2200,
            duration: 2000,
            //paused: true,
            repeat: -1,
        });

        crystal_chute_03 = this.physics.add.sprite(2600,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_03.body.setAllowGravity(false);

        tween_crystal_chute_03 = this.tweens.add({
            targets: crystal_chute_03,
            y:  2200,
            duration: 2200,
            //paused: true,
            repeat: -1,
        })



        this.add.image(-60,0,'end_01').setOrigin(0);

        particles_end2_s3 = this.add.particles('particles_end');
        emitter_particles_end2_s3 = particles_end2_s3.createEmitter({
            x:3323,
            y:-10,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 0.5 },
            blendMode: 'ADD',
        });

        this.add.image(0,0,'end_02').setOrigin(0);

        plateforme_01 = this.physics.add.sprite(500,1100,'plateforme_s3').setSize(90,70)/*.setOffset(40,0)*/;
        plateforme_01.body.setAllowGravity(false);
        plateforme_01.setCollideWorldBounds(true);
        plateforme_01.body.immovable = true;

        plateforme_02 = this.physics.add.sprite(950,900,'plateforme_s3').setSize(90,70)/*.setOffset(40,0)*/;
        plateforme_02.body.setAllowGravity(false);
        plateforme_02.setCollideWorldBounds(true);
        plateforme_02.body.immovable = true;

        plateforme_03 = this.physics.add.sprite(2500,750,'plateforme_s3').setSize(90,70)/*.setOffset(40,0)*/;
        plateforme_03.body.setAllowGravity(false);
        plateforme_03.setCollideWorldBounds(true);
        plateforme_03.body.immovable = true;

        plateforme_04 = this.physics.add.sprite(3200,755,'plateforme_02_s3').setSize(200,60)/*.setOffset(40,0)*/;
        plateforme_04.body.setAllowGravity(false);
        plateforme_04.setCollideWorldBounds(true);
        plateforme_04.body.immovable = true;

        const ground_01_s3 = map.createLayer('ground_01_s3', tileset, 0, 0);
        const ground_02_s3 = map.createLayer('ground_02_s3', tileset, 0, 0);
        const ground_03_s3 = map.createLayer('ground_03_s3', tileset, 0, 0);

        ground_01_s3.setCollisionByExclusion(-1, true);
        ground_02_s3.setCollisionByExclusion(-1, true);
        ground_03_s3.setCollisionByExclusion(-1, true);

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
            frames: this.anims.generateFrameNumbers('player', { start: 35, end: 40 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 82, end: 87 }),
            frameRate: 8,
            repeat: 0
        });



        fall_block_02 = this.physics.add.sprite(1088,764,'fall_block_02');
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

        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.physics.add.collider(lever_3,player,leverOn3_s3,null,this);
        this.physics.add.collider(lever_4,player,leverOn4_s3,null,this);

        this.physics.add.collider(plateforme_01,player);
        this.physics.add.collider(plateforme_02,player);
        this.physics.add.collider(plateforme_03,player);
        this.physics.add.collider(plateforme_04,player);

        this.physics.add.collider(fall_block_02,player);
        this.physics.add.collider(fall_block_02,ground_03_s3,disable_fallBlock_s2,null,this);
        this.physics.add.collider(player,ground_03_s3);
        this.physics.add.collider(fall_block_02,ground_02_s3,enable_fallBlock_02,null,this);
        
        this.physics.add.collider(wall_s3,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s3,player, climbOff,null,this);
        this.physics.add.collider(ground_02_s3,enemy_03);
        this.physics.add.collider(trap_s3,player, trap,null,this);
        this.physics.add.overlap(power_up_dash,player, activeDash,null,this);

        this.physics.add.overlap(player, zone_enemy_03,agro_enemy_03,null,this);
        this.physics.add.overlap(player, enemy_03,hitEnemy,null,this);

        this.physics.add.collider(crystal_chute_01,player, trap,null,this);
        this.physics.add.collider(crystal_chute_02,player, trap,null,this);
        this.physics.add.collider(crystal_chute_03,player, trap,null,this);

        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3456  , 1984);
        this.physics.world.setBounds(0, 0, 3456 , 1984);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texteBanane = this.add.text(-350,-90, scoreCrystal,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
    }

    update(){

        if(player.y == 1821 && player.x == 3411){
            this.scene.start("scene_04");
            end2 = true;
            end1 = false;
        }
        if(player.y <= 40 && player.x >= 3311){
            this.scene.start("scene_05");
            end1 = true;
            end2 = false;
        }


        if(plateforme_01.y > 1099){
            plateforme_01.setVelocityY(-100);
        }
        else if(plateforme_01.y < 797 ){
            plateforme_01.setVelocityY(100);
        }

        if(plateforme_02.y < 901){
            plateforme_02.setVelocityY(100);
        }
        else if(plateforme_02.y > 1280 ){
            plateforme_02.setVelocityY(-100);
        }


        if(active_lever_3 == true){
            if(plateforme_03.x >= 2499){
                plateforme_03.setVelocityX(-200);
            }
            if(plateforme_03.x <= 1750 ){
                plateforme_03.setVelocityX(200);
                console.log("ok plateforme")
            }
        }

        if(active_lever_4 == true){
            if(plateforme_04.y <= 755){
                plateforme_04.setVelocityY(200);
            }
            else if(plateforme_04.y == 1821)
                plateforme_04.setVelocity(0);
        }

        
        
        
        

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
            else if (keyQ.isDown && player.body.blocked.down){
                player.anims.play('run', true);
                player.setVelocityX(-350);
                player.setBounce(0.1);
                //textX.setText(player.x);
                //textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
                emitter_particles_player.startFollow(player);
            }
            else if(keyZ.isDown && keyQ.isDown){
                player.anims.play('jump', true);
                player.setVelocityX(-350);
                player.flipX = true;
            }
            /*else if (keyQ.isDown){
                player.anims.play('jump', true);
                player.flipX = true;
            }*/
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
            else if (keyD.isDown && player.body.blocked.down) {
                player.setVelocityX(350);
                //textX.setText(player.x);
                //textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                player.anims.play('run', true);
                emitter_particles_player.startFollow(player);
            }
            else if(keyZ.isDown && keyD.isDown){
                player.anims.play('jump', true);
                player.setVelocityX(350);
                player.flipX = false;
            }
            /*else if (keyD.isDown){
                player.anims.play('jump', true);
                player.flipX = false;
            }*/
            
        }
        else if (keyD.isUp && keyQ.isUp && keyZ.isUp && space.isUp){
            player.setVelocityX(0);
            //textX.setText(player.x);
            //textY.setText(player.y);
            player.setRotation(0);
            emitter_particles_player.stopFollow(player);
            player.anims.play('idle', true);
        }
        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.anims.play('jump',true);
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

function disable_fallBlock_s2(){
    fall_block_02.body.setAllowGravity(true);
    fall_block_02.body.immovable = false;
}

function leverOn3_s3(){
    if(keyE.isDown && active_lever_3 == false){
        active_lever_3 = true;
    }
}

function leverOn4_s3(){
    if(keyE.isDown && active_lever_4 == false){
        active_lever_4 = true;
    }
}

function trap(){
    player.x = 109;
    player.y = 797;
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


function hitEnemy(){
    if(dash == true && etat_enemy_03 == true){
        enemy_03.setVisible(false);
        enemy_03.setScale(0);
        etat_enemy_03 = false;
        enemy_03.anims.stop('walk',true);
    }
}

function activeDash(){
    dash = true;
}