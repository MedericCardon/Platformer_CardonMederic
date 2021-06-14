etat_power_up_dash = true;

var tween_elevator_s5;
var tween_ground_elevator_s5;

var crystal_explo = false;
var keyA;

var particles_bullet_explo;
var emitter_particles_bullet_explo;

var door_explo_01;

var crystal_power_up;
var tween_crystal_explo;
var etat_explo = false;

var particles_end1_s5;
var emitter_particles_end1_s5;

var end_vers_s4 = false;

var activeDoor = false;

var compteur_cam_door = 250;
var etat_cam_door = true;
var camera_door = false;

var particles_door1;
var emitter_door1;


class scene_05 extends Phaser.Scene{
    constructor(){
        super("scene_05");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_05_placeholder', 'scene_05.json');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });
        this.load.spritesheet('enemy','assets/ennemi.png',{ frameWidth: 212, frameHeight: 282 });

        this.load.image('background_s5','assets/scene_05/background_s5.png');
        this.load.image('branches_s5','assets/scene_05/branche_s5.png');
        this.load.image('etoiles_s5','assets/scene_05/etoiles_s5.png');
        this.load.image('crystal_paralaxe_s5','assets/scene_05/crystal_paralaxe_s5.png');
        this.load.image('mush_para_01_s5','assets/scene_05/mush_para_01_s5.png');
        this.load.image('mush_para_02_s5','assets/scene_05/mush_para_02_s5.png');
        this.load.image('foreground_s5','assets/scene_05/foreground_s5.png');
        this.load.image('particles_bullet','assets/particles_bullet.png');
        this.load.image('banane','assets/banane_01.png');
        this.load.image('particles_bullet_explo','assets/particles_bullet_explo.png');
        this.load.image('crystal_explo','assets/crystal_02.png');
        this.load.image('particles_player','assets/particles_singe.png');
        this.load.image('door_explo','assets/door_explo.png');
        this.load.spritesheet('crystal_explo_anim','assets/scene_05/spriteSheet_crystal_explo.png',{ frameWidth: 150, frameHeight: 150 });
        this.load.image('end_s5','assets/scene_05/end_s5.png');
        this.load.image('particles_end','assets/particules_end.png');
    }

    create(){

        this.add.image(0,0,'background_s5').setOrigin(0);
        this.add.image(-300,-200,'etoiles_s5').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-800,'mush_para_02_s5').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-200,-800,'mush_para_01_s5').setOrigin(0).setScrollFactor(0.5);
        this.add.image(-100,-400,'crystal_paralaxe_s5').setOrigin(0).setScrollFactor(0.7);
        
        this.add.image(0,0,'branches_s5').setOrigin(0);

        
        const map = this.make.tilemap({key: 'scene_05_placeholder'});
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

        particles_bullet_explo = this.add.particles('particles_bullet_explo');
        emitter_particles_bullet_explo = particles_bullet_explo.createEmitter({
            x:0,
            y:0,
            speed: 30,
            lifespan: 1500,
            frequency: 50,
            quantity: 3,
            scale: { start: 1, end: 0.2 },
            blendMode: 'ADD',
        });

        particles_door1 = this.add.particles('particles_bullet_explo');
        emitter_door1 = particles_door1.createEmitter({
            angle: { start: 0, end: 360, steps: 16 },
            lifespan: 400,
            speed: 400,
            quantity: 32,
            scale: { start: 8, end: 0 },
            blendMode: 'ADD',
            on: false
        });

        player = this.physics.add.sprite(90,349,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;//start1 : 90,349, start2 : 550,2013
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        door_explo_01 = this.physics.add.sprite(1880,700,'door_explo').setSize(70,170);//870
        door_explo_01.body.setAllowGravity(false);
        door_explo_01.setCollideWorldBounds(true);
        door_explo_01.body.immovable = true;

        crystal_power_up = this.physics.add.sprite(2424,250,'crystal_explo_anim').setSize(50,50);
        crystal_power_up.body.setAllowGravity(false);
        crystal_power_up.setCollideWorldBounds(true);

        tween_crystal_explo= this.tweens.add({
            targets: crystal_power_up,
            y:  220,
            duration: 2500,
            yoyo: true,
            repeat: -1,
        }); 
        
        particles_end1_s5 = this.add.particles('particles_end');
        emitter_particles_end1_s5 = particles_end1_s5.createEmitter({
            x:750,
            y:2270,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 1 },
            blendMode: 'ADD',
        });

        

        this.add.image(0,0,'foreground_s5').setOrigin(0);
        const elevator_s5 = map.createLayer('elevator_s5', tileset,0,0);
        const ground_elevator_s5 = map.createLayer('ground_elevator_s5', tileset,0,0);
        const ground_02_s5 = map.createLayer('ground_02_s5', tileset,0,0);
        const trap_s5 = map.createLayer('trap_s5', tileset,0,0);
        const ground_01_s5 = map.createLayer('ground_01_s5', tileset,0,0);
        const wall_s5 = map.createLayer('wall_s5', tileset,0,0);
        const water_s5 = map.createLayer('water_s5', tileset,0,0);
        const lever_s5 = map.createLayer('lever_s5', tileset,0,0);


        
        
        this.add.image(0,0,'end_s5').setOrigin(0);
        

        ground_02_s5.setCollisionByExclusion(-1, true);
        wall_s5.setCollisionByExclusion(-1, true);
        trap_s5.setCollisionByExclusion(-1, true);
        elevator_s5.setCollisionByExclusion(-1, true);
        water_s5.setCollisionByExclusion(-1, true);
        ground_elevator_s5.setCollisionByExclusion(-1, true);
        lever_s5.setCollisionByExclusion(-1, true);

        tween_elevator_s5= this.tweens.add({
            targets: elevator_s5,
            y:  -832,
            duration: 3000,
            paused: true,
            yoyo: true,
            repeat: 0,
        }); 

        tween_ground_elevator_s5= this.tweens.add({
            targets: ground_elevator_s5,
            y:  -832,
            duration: 3000,
            paused: true,
            yoyo : true,
            repeat: 0,
        }); 

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

        this.anims.create({
            key: 'run_crystal',
            frames: this.anims.generateFrameNumbers('player', { start: 41, end: 52 }),
            frameRate: 25,
            repeat: 0
        });
        this.anims.create({
            key: 'climb_crystal',
            frames: this.anims.generateFrameNumbers('player', { start: 53, end: 75 }),
            frameRate: 50,
            repeat: 0
        });
        this.anims.create({
            key: 'idle_crystal',
            frames: this.anims.generateFrameNumbers('player', { start: 76, end: 83 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'crystal',
            frames: this.anims.generateFrameNumbers('crystal_explo_anim', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        /*enemy_04 = this.physics.add.sprite(3300,2000,'enemy');/*.setSize(90,70);*/
        /*enemy_04.body.setAllowGravity(true);
        enemy_04.setCollideWorldBounds(true);
        enemy_04.setScale(0.6);
        enemy_04.setSize(140,242);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 39 }),
            frameRate: 25,
            repeat: 0
        });

        zone_enemy_04 = this.add.zone(2881, 2077).setSize(1000, 150);
        this.physics.world.enable(zone_enemy_04);
        zone_enemy_04.body.setAllowGravity(false);
        zone_enemy_04.body.moves = false;*/


        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        


        
        this.physics.add.overlap(door_explo_01,groupeBullets,openDoor,null,this);
        this.physics.add.overlap(crystal_power_up,player,activeExplo,null,this);
        this.physics.add.overlap(groupeBullets,door_explo_01, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_02_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,water_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever_s5, destroy_bullet,null,this);

        this.physics.add.overlap(groupeBullets,door_explo_01, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,ground_02_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,wall_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,water_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,lever_s5, destroy_bullet_explo,null,this);

        this.physics.add.collider(lever_s5,player, activeElevator_s5,null,this);
        
        this.physics.add.collider(wall_s5,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s5,player, climbOff,null,this);
        this.physics.add.collider(trap_s5,player, trap,null,this);
        this.physics.add.collider(elevator_s5,player);
        
        this.physics.add.collider(door_explo_01,player);
        this.physics.add.collider(door_explo_01,ground_02_s5);

        

        function openDoor(){
            if(crystal_explo == true && activeDoor == false){
                console.log("ok");
                door_explo_01.body.setAllowGravity(true);
                door_explo_01.setCollideWorldBounds(true);
                door_explo_01.body.immovable = false;
                door_explo_01.setVelocityX(-500);
                particles_door1.emitParticleAt(door_explo_01.x,door_explo_01.y);   
            }
        }
        
        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3584  , 2240);
        this.physics.world.setBounds(0, 0, 3584 , 2240);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texteBanane = this.add.text(-350,-90, scoreCrystal,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textDash = this.add.text(-350,-30, compteur_dash,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);

        this.input.on('pointerup', function () {
            if(crystal_explo == false){
                tirer(player);
                //energy();
                emitter_particles_bullet.startFollow(bullet);
            }
            
            else {
                tire_explo(player);
                //energy();
                emitter_particles_bullet_explo.startFollow(bullet);
            }
        }, this);

        crystal_power_up.anims.play('crystal');

        if(end_s4 == true){
            player.x = 1680;//550
            player.y = 925;//2013
        }
    }
    

    update(){

        if(compteur_cam_door == 0){
            compteur_cam_door = 250;
        }

    if( camera_door == true){
        const cam_door = this.cameras.main;
        if(compteur_cam_door > 0 && etat_cam_door == true){
            compteur_cam_door --;
            cam_door.pan(1883, 925, 2000);
        }         
    }
    if(compteur_cam_door <= 0){
        this.cameras.main.pan(2406, 285, 2000);
        etat_cam_door = false;
    }

        if(activeDoor == true){
            door_explo_01.setVelocityY(100)
            if(door_explo_01.y == 875){
                activeDoor = false;
            }
        }

        if(player.y >= 2200){
            this.scene.start("scene_04");
            end_vers_s4 = true;
        }

        if(door_explo_01.x < 1620){
            door_explo_01.destroy(true,true);
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyA) && etat_explo == true){
            if(crystal_explo == false){
                crystal_explo = true;
            }
            else {
                crystal_explo = false;
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
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
                if(crystal_explo == false){
                    player.anims.play('climb',true);
                }
                else{
                    player.anims.play('climb_crystal',true);
                }
            }
            else if (keyQ.isDown && player.body.blocked.down){
                player.setVelocityX(-350);
                player.setBounce(0.1);
                //textX.setText(player.x);
                //textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
                emitter_particles_player.startFollow(player);
                if(crystal_explo == false){
                    player.anims.play('run',true);
                }
                else{
                    player.anims.play('run_crystal',true);
                }
            }
            else if(keyZ.isDown && keyQ.isDown){
                player.setVelocityX(-350);
                player.flipX = true;
                if(crystal_explo == false){
                    player.anims.play('jump',true);
                }
                else{
                    player.anims.play('jump_crystal',true);
                }
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
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                if(crystal_explo == false){
                    player.anims.play('climb',true);
                }
                else{
                    player.anims.play('climb_crystal',true);
                }
            }
            else if (keyD.isDown && player.body.blocked.down) {
                player.setVelocityX(350);
                //textX.setText(player.x);
                //textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                emitter_particles_player.startFollow(player);
                if(crystal_explo == false){
                    player.anims.play('run',true);
                }
                else{
                    player.anims.play('run_crystal',true);
                }
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
            if(crystal_explo == false){
                player.anims.play('idle', true);
            }
            else{
                player.anims.play('idle_crystal', true);
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            if(crystal_explo == false){
                player.anims.play('jump',true);
            }
            else{
                player.anims.play('jump_crystal',true);
            }
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
    player.x = 90;
    player.y = 349;
}

function dashOn(){
    if(compteur_dash == 0){
        etat_dash = false;
    }
    else if(etat_dash == true ){
        compteur_dash --
    }
}

/*function agro_enemy_04 (){
    enemy_04_agro = true;
    enemy_04.anims.play('walk',true);
    if(zone_enemy_04.body.touching && enemy_04_agro == true){
        enemy_04.body.immovable = false;
        this.physics.moveToObject(enemy_04, player, 200);
    }
    if (enemy_04.x > player.x){
        enemy_04.direction = 'right';
        enemy_04.flipX = true;
    }
    else if(enemy_04.x < player.x){
        enemy_04.direction = 'left';
        enemy_04.flipX = false;
    }
}*/

function activeElevator_s5(){
    if(keyE.isDown){
        tween_elevator_s5.play();
        tween_ground_elevator_s5.play();
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


function tire_explo(player,pointer) {
    
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
        bullet = groupeBullets.create(player.x + (60 * coefDir), player.y - 55, 'crystal_explo').setScale(2); // permet de créer la carte à coté du joueur //
        // Physique de la carte //
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity = true;
        bullet.setVelocity(1800 * coefDir, -150); // vitesse en x et en y
        bulletOn = false;
        }
    }
}

function destroy_bullet(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
}

function destroy_bullet_explo(){
    bullet.destroy(true,true);
    emitter_particles_bullet_explo.stopFollow(bullet);
}


function activeExplo(){
    etat_explo = true;
    crystal_power_up.destroy(true,true);
    activeDoor = true;
    camera_door = true;
}

