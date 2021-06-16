var tween_block;
var camera_block = false;

// ----- enemy_01 ----- //
var enemy_01;
var zone_enemy_01;
var enemy_agro_01 = false;
var etat_enemy_01 = true;
var compteurEnemy_01 = 100;
var invincibleEnemy_01 = false;
var enemyHp_01 = 2;
var target_enemy_01 = new Phaser.Math.Vector2();
var spawn_enemy_01 = false;

var enemy_02;
var zone_enemy_02;
var tween_enemy_02;

var compteur_cam = 250;
var etat_cam = true;

var mush_poison;
var etat_poison = true;
var compteur_mush = 0;
var relance_poison = 120;
var target = new Phaser.Math.Vector2();

var textDash;

var anim_mush_02 = true;

var particles_end_s2;
var emitter_particles_end_s2;

var active_lever_02 = false;

var block;

var enemy_02_direction_right = true;
var enemy_02_direction_left = false;

var particles_player;
var emitter_particles_player;

var particles_bullet;
var emitter_particles_bullet


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
        this.load.spritesheet('enemy_02','assets/mush_02.png',{ frameWidth: 150, frameHeight: 316 });
        this.load.image('bulle','assets/bulle.png');
        this.load.spritesheet('mush_cloud','assets/nuage_toxique.png',{ frameWidth: 197, frameHeight: 197 });

        this.load.image('background_s2','assets/scene_02/background_s2.png');
        this.load.image('etoiles_s2','assets/scene_02/etoiles_s2.png');
        this.load.image('branche_01_s2','assets/scene_02/branche_01_s2.png');
        this.load.image('crystal_paralaxe','assets/scene_02/crystal_paralaxe_s2.png');
        this.load.image('mush_para_01','assets/scene_02/mush_paralaxe_01_s2.png');
        this.load.image('mush_para_02','assets/scene_02/mush_paralaxe_02_s2.png');
        this.load.image('foreground','assets/scene_02/crystal_mush_foreground.png');
        this.load.image('end','assets/end.png');
        this.load.image('particles_end','assets/particules_end.png');
        this.load.image('plateforme_s2','assets/scene_02/plateforme_s2.png');
    }

    create(){

        this.add.image(0,0,'background_s2').setOrigin(0);
        this.add.image(-300,-250,'etoiles_s2').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-250,'mush_para_02').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-200,-150,'mush_para_01').setOrigin(0).setScrollFactor(0.5);
        this.add.image(1350,350,'branche_01_s2').setOrigin(0);
        this.add.image(-100,600,'crystal_paralaxe').setOrigin(0).setScrollFactor(0.7);
        this.add.image(0,0,'foreground').setOrigin(0);
        const map = this.make.tilemap({key: 'scene_02_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        
        

       

        

        groupeBullets = this.physics.add.group();

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

        particles_bullet = this.add.particles('particles_bullet');
        emitter_particles_bullet = particles_bullet.createEmitter({
            x:0,
            y:0,
            speed: 30,
            lifespan: 1500,
            frequency: 50,
            quantity: 3,
            scale: { start: 1, end: 0.2 },
            blendMode: 'ADD',
        });

        player = this.physics.add.sprite(150,861,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        const lever_s2 = map.createLayer('lever_s2', tileset,0,0);
        
        
        const wall_s2 = map.createLayer('wall_s2', tileset,0,0);

        lever_s2.setCollisionByExclusion(-1, true);
        
        wall_s2.setCollisionByExclusion(-1, true);

        block = this.physics.add.sprite(3130,860,'plateforme_s2').setSize(90,70)/*.setOffset(40,0)*/;
        block.body.setAllowGravity(false);
        block.setCollideWorldBounds(true);
        block.body.immovable = true;

        particles_end_s2 = this.add.particles('particles_end');
        emitter_particles_end_s2 = particles_end_s2.createEmitter({
            x:3850,
            y:700,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 0.5 },
            blendMode: 'ADD',
        });

        target_enemy_01.x = 1466;
        target_enemy_01.y = 1400;

        

        enemy_01 = this.physics.add.sprite(target_enemy_01.x,1400,'enemy');/*.setSize(90,70);*/
        enemy_01.body.setAllowGravity(true);
        enemy_01.setCollideWorldBounds(true);
        enemy_01.setScale(0.6);
        enemy_01.setSize(140,242);

        zone_enemy_01 = this.add.zone(1150, 1385).setSize(800, 200);
        this.physics.world.enable(zone_enemy_01);
        zone_enemy_01.body.setAllowGravity(false);
        zone_enemy_01.body.moves = false;

        target.x = 1410;
        target.y = 932;

        enemy_02 = this.physics.add.sprite(1410,800,'enemy_02');/*.setSize(90,70);*/
        enemy_02.body.setAllowGravity(true);
        enemy_02.setCollideWorldBounds(true);
        enemy_02.setScale(0.6);

        zone_enemy_02 = this.add.zone(1410, 780).setSize(800, 300);
        this.physics.world.enable(zone_enemy_02);
        zone_enemy_02.body.setAllowGravity(false);
        zone_enemy_02.body.moves = false;


        const ground_02_s2 = map.createLayer('ground_02_s2', tileset, 0, 0);
        ground_02_s2.setCollisionByExclusion(-1, true);
        const ground_01_s2 = map.createLayer('ground_01_s2', tileset, 0, 0);
        const trap_s2 = map.createLayer('trap_s2', tileset, 0, 0);
        trap_s2.setCollisionByExclusion(-1, true);
        this.add.image(-190,180,'end').setOrigin(0);

        

        mush_poison = this.physics.add.sprite(enemy_02.x , enemy_02.y - 100,'mush_cloud').setScale(2);
        mush_poison.body.setAllowGravity(false);
        mush_poison.setAlpha(0);

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
            repeat: -1
        });

        

        

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 39 }),
            frameRate: 25,
            repeat: 0
        });

        this.anims.create({
            key: 'atk',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 40, end: 54 }),
            frameRate: 25,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_enemy',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 55, end: 64 }),
            frameRate: 5,
            repeat: -1
        });

        

        

        this.anims.create({
            key: 'walk_mush_02',
            frames: this.anims.generateFrameNumbers('enemy_02', { start: 0, end: 34 }),
            frameRate: 35,
            repeat: 0
        });

        this.anims.create({
            key: 'hide',
            frames: this.anims.generateFrameNumbers('enemy_02', { start: 35, end: 44 }),
            frameRate: 25,
            repeat: 0
        });

        this.anims.create({
            key: 'cloud',
            frames: this.anims.generateFrameNumbers('mush_cloud', { start: 0, end: 6 }),
            frameRate: 7,
            repeat: 0
        });

        
        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3840  , 1600);
        this.physics.world.setBounds(0, 0, 3840 , 1600);
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
        texteBanane = this.add.text(-350,-90, scoreCrystal,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        //textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);


        this.physics.add.overlap(player,zone_enemy_02,poison,null,this);
        this.physics.add.overlap(player,mush_poison,hit_player,null,this);
        this.physics.add.overlap(player,zone_enemy_02,anim_mush,null,this);
        this.physics.add.collider(enemy_01,ground_02_s2);
        this.physics.add.collider(enemy_02,ground_02_s2);
        this.physics.add.collider(lever_s2,player, leverOn_s2,null,this);
        this.physics.add.collider(ground_02_s2,player, climbOff,null,this);
        this.physics.add.collider(wall_s2,player, climbOn,null,this);
        this.physics.add.collider(block,player);

        this.physics.add.overlap(player, zone_enemy_01,agro_enemy_01,null,this);
        this.physics.add.overlap(player, enemy_01,lose_life,null,this);
        this.physics.add.collider(enemy_01,ground_02_s2);
        this.physics.add.overlap(groupeBullets,enemy_01,killEnemy_01,null,this);
        this.physics.add.collider(player,trap_s2, activeTrap,null,this);

        this.physics.add.collider(groupeBullets,ground_02_s2, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall_s2, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,trap_s2, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever_s2, destroy_bullet,null,this);

        

        this.input.on('pointerup', function () {
            tirer(player);
            //energy();
            emitter_particles_bullet.startFollow(bullet);
        }, this);


    }

    update(){

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        if(zone_enemy_01.body.touching.none && etat_enemy_01 == true){
            enemy_agro_01 = false;
            enemy_01.body.immovable = true; 
            this.physics.moveToObject(enemy_01, target_enemy_01, 200);
            if(player.x > enemy_01.x && spawn_enemy_01 == false){
                enemy_01.flipX = false;
                enemy_01.anims.play('walk',true);
            }
            if(player.x < enemy_01.x && spawn_enemy_01 == false){
                enemy_01.flipX = false;
                enemy_01.anims.play('walk',true);
            }
            if(enemy_01.x <= target_enemy_01.x && enemy_01.x >= target_enemy_01.x-3){
                enemy_01.anims.play('idle_enemy',true);
                spawn_enemy_01 = true;
                enemy_01.setVelocityX(0);
            }
            if(enemy_01.x >= target_enemy_01.x && enemy_01.x <= target_enemy_01.x +3){
                enemy_01.anims.play('idle_enemy',true);
                spawn_enemy_01 = true;
                enemy_01.setVelocityX(0);
            }
            
            if(enemy_01.x >= target_enemy_01.x+10 || enemy_01.x <= target_enemy_01.x-10){
                spawn_enemy_01 = false;
            }
        }

        if(invincibleEnemy_01 == true){ // relance du compteur d'invulné player //
            compteurEnemy_01-- ;
            if(compteurEnemy_01 == 0){
                enemy_01.setTint(0xffffff);
                compteurEnemy_01 = 100;
                invincibleEnemy_01 = false ;
            }
        }

        if(active_lever_02 == true){
            if(block.x >= 3130){
                block.setVelocityX(-200);
            }
            if(block.x <= 2500 ){
                block.setVelocityX(200);
            }
        }

        if(player.x >= 3780){
            this.scene.start("scene_03");
        }

        if(etat_poison == false && relance_poison > 0){ 
            relance_poison --;
            if(relance_poison <= 0 ){
                compteur_mush = 120;
                relance_poison = 120;
            }
        }


        zone_enemy_01.body.debugBodyColor = zone_enemy_01.body.touching.none ? 0x00ffff : 0xffff00;
        zone_enemy_02.body.debugBodyColor = zone_enemy_02.body.touching.none ? 0x00ffff : 0xffff00;

        
        if(zone_enemy_02.body.touching.none){
            etat_poison = false;
            enemy_02.anims.play('walk_mush_02',true);
            //tween_enemy_02.play();
            mush_poison.setAlpha(0);
            anim_mush_02 = true;
            if(enemy_02_direction_right == true){
                enemy_02.setVelocityX(20);
            }
            if(enemy_02.body.blocked.right){
                enemy_02.setVelocityX(-20);
                enemy_02.flipX = true;
                enemy_02_direction_right = false;
                enemy_02_direction_left = true
            }
            else if(enemy_02.body.blocked.left){
                enemy_02.setVelocityX(20);
                enemy_02.flipX = false;
                enemy_02_direction_left = false;
                enemy_02_direction_right = true;
            }
            //this.physics.moveToObject(enemy_02, target, 200);
        }
            if(compteur_cam == 0){
                compteur_cam = 250;
            }

        if(camera_block == true){
            const cam = this.cameras.main;
            if(compteur_cam > 0 && etat_cam == true){
                compteur_cam --;
                cam.pan(2800, 700, 2000);
                console.log(compteur_cam);
            }         
        }
        if(compteur_cam <= 0){
            this.cameras.main.pan(1781, 292, 2000);
            etat_cam = false;
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.anims.play('jump',true);
            emitter_particles_player.startFollow(player);
        }

        else if(keyQ.isDown){
            if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                console.log(wall_climb);
                player.anims.play('climb',true);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
                emitter_particles_player.startFollow(player);
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
                emitter_particles_player.startFollow(player);
            }
            else if (keyQ.isDown){
                player.setVelocityX(-350);
                player.flipX = true;
                player.anims.play('jump',true);
                emitter_particles_player.startFollow(player);
            }
        }
        else if (keyD.isDown){

            if(keyD.isDown && keyZ.isDown && player.body.blocked.right && wall_climb == true){
                player.setVelocityY(-250);
                player.setVelocityX(350);
                player.anims.play('climb',true);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                emitter_particles_player.startFollow(player);
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
                emitter_particles_player.startFollow(player);
            }
            else if (keyD.isDown){
                player.setVelocityX(350);
                player.flipX = false;
                player.anims.play('jump',true);
                emitter_particles_player.startFollow(player);
            }
            
        }
        else if (keyD.isUp && keyQ.isUp && keyZ.isUp && space.isUp){
            player.setVelocityX(0);
            //textX.setText(player.x);
            //textY.setText(player.y);
            player.setRotation(0);
            emitter_particles_player.stopFollow(player);
            player.anims.play('idle', true);
        }
        
    }
}

function climbOn(){
    wall_climb = true
}

function climbOff(){
    wall_climb = false
}

function leverOn_s2(){
    if(keyE.isDown && camera_block == false && active_lever_02 == false){
        active_lever_02 = true;
        camera_block = true;
    }
}



function poison(){
    this.physics.moveToObject(enemy_02, target, 200);
    etat_poison = true;
    if(compteur_mush == 0){
        mush_poison.anims.play('cloud',true);
        etat_poison = false;
        mush_poison.setAlpha(1);
    }
    else if(etat_poison == true ){
        compteur_mush --
        mush_poison.setAlpha(0);
    }
}

function hit_player(){
    
    if(etat_poison == false){
        playerHp -= 1
        console.log(playerHp);
        textHp.setText(playerHp);
    }
}

function anim_mush(){
    if(anim_mush_02 == true){
        enemy_02.anims.play('hide',true);
        anim_mush_02 = false;
        enemy_02_direction_right = true;
        if(enemy_02_direction_right == true){
            enemy_02.flipX = false;
        }
        
    }
}



function killEnemy_01(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
    if(invincibleEnemy_01 == false){
        enemyHp_01 -=1;
        enemy_01.setTint(0xff0000);
        invincibleEnemy_01 = true;
    }
    if(enemyHp_01 == 0){
        enemy_01.destroy(true,true);
        etat_enemy_01 = false;

    }
}

function agro_enemy_01 (){
    enemy_agro_01 = true;
    if (enemy_01.x > player.x && etat_enemy_01 == true){
        enemy_01.direction = 'right';
        enemy_01.flipX = true;
    }
    else if(enemy_01.x < player.x && etat_enemy_01 == true){
        enemy_01.direction = 'left';
        enemy_01.flipX = false;
    }
    if(player.x >= enemy_01.x && player.x <= enemy_01.x+100 && etat_enemy_01 == true){
        enemy_01.anims.play('atk',true);
        this.physics.moveToObject(enemy_01, player, 100);
    }
    else if(player.x <= enemy_01.x && player.x >= enemy_01.x-100 && etat_enemy_01 == true){
        enemy_01.anims.play('atk',true);
        this.physics.moveToObject(enemy_01, player, 100);
    }
    else if(zone_enemy_01.body.touching && enemy_agro_01 == true && etat_enemy_01 == true){
        enemy_01.body.immovable = false
        enemy_01.anims.play('walk',true);
        this.physics.moveToObject(enemy_01, player, 300);
    }
}

function lose_life(){
    
    if(invincible == false){
        playerHp -= 1;
        invincible = true;
        if(playerHp == 5){
            pdv_01.setAlpha(0.3);
            tween_pdv_01.stop();
            //bulletEnemy.destroy(true,true);
            //textHp.setText(playerHp);
        }
        else if(playerHp == 4){
            pdv_02.setAlpha(0.3);
            tween_pdv_02.stop();
            //bulletEnemy.destroy(true,true);
            //textHp.setText(playerHp);
        }
        else if(playerHp == 3){
            pdv_03.setAlpha(0.3);
            tween_pdv_03.stop();
            //bulletEnemy.destroy(true,true);
            //textHp.setText(playerHp);
        }
        else if(playerHp == 2){
            pdv_04.setAlpha(0.3);
            tween_pdv_04.stop();
            //bulletEnemy.destroy(true,true);
            //textHp.setText(playerHp);
        }
        else if(playerHp == 1){
            pdv_05.setAlpha(0.3);
            tween_pdv_05.stop();
            //bulletEnemy.destroy(true,true);
            //textHp.setText(playerHp);
        } 
    }
    
}

function tirer(player,pointer) {
    
    if (bulletOn == true){
        if(scoreCrystal >= 1){
            scoreCrystal -= 1
            //texteBanane.setText(scoreBanane);
        var coefDir;
        if (player.direction == 'left') { // determine la direction du joueur //
            coefDir = -1; 
        } else { 
            coefDir = 1
        }
        bullet = groupeBullets.create(player.x + (60 * coefDir), player.y - 55, 'banane').setScale(2); // permet de créer la carte à coté du joueur //
        // Physique de la carte //
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity = true;
        bullet.setVelocity(1500 * coefDir, -90); // vitesse en x et en y
        bulletOn = false;
        }
    }
}

function destroy_bullet(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
}

function activeTrap(){
    player.x = 150;
    player.y = 861;
    this.cameras.main.fadeIn(2000);
}