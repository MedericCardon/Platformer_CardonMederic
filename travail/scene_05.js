
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

var enemy_s5;
var zone_enemy_s5;
var tween_enemy_s5;
var anim_mush_02_s5 = true;

var mush_poison_s5;
var etat_poison_s5 = true;
var compteur_mush_s5 = 0;
var relance_poison_s5 = 120;
var target_mush_s5 = new Phaser.Math.Vector2();

var enemy_s5_direction_right = true;
var enemy_s5_direction_left = false;


var enemy_03_s5;
var zone_enemy_03_s5;
var enemy_03_agro_s5 = false;
var etat_enemy_03_s5 = true;
var compteurEnemy_03_s5 = 100; // par défaut: 150 //
var invincibleEnemy_03_s5 = false;
var enemyHp_03_s5 = 2;
var anims_enemy_03_s5 = true;

var enemy_03_right_s5 = true;
var enemy_03_left_s5 = false;

var groupeBulletsEnemy_03_s5;
var etat_bullet_enemy_03_s5 = true;
var bulletEnemy_03_s5;
var compteurBulletEnemy_03_s5 = 150;
var bulletEnemyOn_03_s5 = true;

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
        this.load.spritesheet('mush_cloud','assets/nuage_toxique.png',{ frameWidth: 197, frameHeight: 197 });
        this.load.spritesheet('enemy_02','assets/mush_02.png',{ frameWidth: 150, frameHeight: 316 });
        this.load.spritesheet('enemy_03','assets/mush_03.png',{ frameWidth: 183, frameHeight: 288 });
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
        groupeBulletsEnemy_03_s5 = this.physics.add.group();
       
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

        particles = this.add.particles('particles_bullet')
            particles.createEmitter({
            //frame: 'particles_bullet',
            x: 600, y: 450,
            lifespan: { min: 500, max: 600 },
            angle: { start: 0, end: 360, steps: 64 },
            speed: 50,
            quantity: 64,
            scale: { start: 10, end: 0.2 },
            frequency: 32,
            on:false,
            blendMode: 'ADD'
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

        player = this.physics.add.sprite(3061,797,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;//start1 : 90,349, start2 : 550,2013
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

        target_mush_s5.x = 1940;
        target_mush_s5.y = 2141;

        enemy_s5 = this.physics.add.sprite(1940,2041,'enemy_02');/*.setSize(90,70);*/
        enemy_s5.body.setAllowGravity(true);
        enemy_s5.setCollideWorldBounds(true);
        enemy_s5.setScale(0.6);

        zone_enemy_s5 = this.add.zone(1940, 2041).setSize(1000, 300);
        this.physics.world.enable(zone_enemy_s5);
        zone_enemy_s5.body.setAllowGravity(false);
        zone_enemy_s5.body.moves = false;

        enemy_03_s5 = this.physics.add.sprite(2400,900,'enemy_03');/*.setSize(90,70);*/
        enemy_03_s5.body.setAllowGravity(true);
        enemy_03_s5.setCollideWorldBounds(true);
        enemy_03_s5.setScale(0.6);
        enemy_03_s5.setSize(140,242);

        this.anims.create({
            key: 'walk_enemy_03',
            frames: this.anims.generateFrameNumbers('enemy_03', { start: 0, end: 19}),
            frameRate: 15,
            repeat: 0
        });

        zone_enemy_03_s5 = this.add.zone(2400, 925).setSize(1000, 200);
        this.physics.world.enable(zone_enemy_03_s5);
        zone_enemy_03_s5.body.setAllowGravity(false);
        zone_enemy_03_s5.body.moves = false;

        

        this.add.image(0,0,'foreground_s5').setOrigin(0);
        const elevator_s5 = map.createLayer('elevator_s5', tileset,0,0);
        const ground_elevator_s5 = map.createLayer('ground_elevator_s5', tileset,0,0);
        const ground_02_s5 = map.createLayer('ground_02_s5', tileset,0,0);
        const ground_01_s5 = map.createLayer('ground_01_s5', tileset,0,0);
        const trap_s5 = map.createLayer('trap_s5', tileset,0,0);
        const wall_s5 = map.createLayer('wall_s5', tileset,0,0);
        const lever_s5 = map.createLayer('lever_s5', tileset,0,0);

        mush_poison_s5 = this.physics.add.sprite(enemy_s5.x , enemy_s5.y - 75,'mush_cloud').setScale(1.5);
        mush_poison_s5.body.setAllowGravity(false);
        mush_poison_s5.setAlpha(0);

        this.add.image(0,0,'end_s5').setOrigin(0);
        

        ground_02_s5.setCollisionByExclusion(-1, true);
        wall_s5.setCollisionByExclusion(-1, true);
        trap_s5.setCollisionByExclusion(-1, true);
        elevator_s5.setCollisionByExclusion(-1, true);
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
            repeat: -1
        });

        this.anims.create({
            key: 'jump_crystal',
            frames: this.anims.generateFrameNumbers('player', { start: 88, end: 93 }),
            frameRate: 8,
            repeat: -1
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
            frames: this.anims.generateFrameNumbers('player', { start: 76, end: 81 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'crystal',
            frames: this.anims.generateFrameNumbers('crystal_explo_anim', { start: 0, end: 5 }),
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
        
        this.physics.add.overlap(groupeBulletsEnemy_03_s5,player, lose_life,null,this);
        this.physics.add.collider(ground_02_s5,enemy_03_s5);
        this.physics.add.overlap(groupeBullets,enemy_03_s5, killEnemy03_s5,null,this);
        this.physics.add.overlap(player, zone_enemy_03_s5,agro_enemy_03_s5,null,this);
        this.physics.add.overlap(player, zone_enemy_03_s5,shot_enemy_s5,null,this);

        this.physics.add.overlap(player,zone_enemy_s5,poison_s5,null,this);
        this.physics.add.overlap(player,mush_poison_s5,hit_player_s5,null,this);
        this.physics.add.overlap(player,zone_enemy_s5,anim_mush_s5,null,this);

        this.physics.add.overlap(door_explo_01,groupeBullets,openDoor,null,this);
        this.physics.add.overlap(crystal_power_up,player,activeExplo,null,this);
        this.physics.add.overlap(groupeBullets,door_explo_01, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_02_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall_s5, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever_s5, destroy_bullet,null,this);

        this.physics.add.overlap(groupeBullets,door_explo_01, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,ground_02_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,wall_s5, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,lever_s5, destroy_bullet_explo,null,this);

        this.physics.add.collider(lever_s5,player, activeElevator_s5,null,this);
        
        this.physics.add.collider(wall_s5,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s5,player, climbOff,null,this);
        this.physics.add.collider(ground_02_s5,enemy_s5);
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
                energy();
                emitter_particles_bullet.startFollow(bullet);
            }
            
            else {
                tire_explo(player);
                energy();
                emitter_particles_bullet_explo.startFollow(bullet);
            }
        }, this);

        crystal_power_up.anims.play('crystal');

        if(end_s4 == true){
            player.x = 550;//550
            player.y = 2013;//2013
        }

        barre_energie_01 = this.physics.add.sprite(0,550,'barre_01').setScrollFactor(0);
        barre_energie_01.body.setAllowGravity(false);
        barre_energie_01.setScale(1);

        barre_energie_02 = this.physics.add.sprite(-37,550,'barre_02').setScrollFactor(0);
        barre_energie_02.body.setAllowGravity(false);
        barre_energie_02.setScale(1);

        barre_energie_03 = this.physics.add.sprite(-74,550,'barre_03').setScrollFactor(0);
        barre_energie_03.body.setAllowGravity(false);
        barre_energie_03.setScale(1);

        barre_energie_04 = this.physics.add.sprite(-111,550,'barre_04').setScrollFactor(0);
        barre_energie_04.body.setAllowGravity(false);
        barre_energie_04.setScale(1);

        barre_energie_05 = this.physics.add.sprite(-148,550,'barre_05').setScrollFactor(0);
        barre_energie_05.body.setAllowGravity(false);
        barre_energie_05.setScale(1);

        barre_energie_06 = this.physics.add.sprite(-185,550,'barre_06').setScrollFactor(0);
        barre_energie_06.body.setAllowGravity(false);
        barre_energie_06.setScale(1);

        barre_energie_07 = this.physics.add.sprite(-222,550,'barre_07').setScrollFactor(0);
        barre_energie_07.body.setAllowGravity(false);
        barre_energie_07.setScale(1);

        barre_energie_08 = this.physics.add.sprite(-259,550,'barre_08').setScrollFactor(0);
        barre_energie_08.body.setAllowGravity(false);
        barre_energie_08.setScale(1);

        barre_energie_09 = this.physics.add.sprite(-296,550,'barre_09').setScrollFactor(0);
        barre_energie_09.body.setAllowGravity(false);
        barre_energie_09.setScale(1);

        ligne_energie = this.physics.add.sprite(-140,550,'ligne_energie').setScrollFactor(0);
        ligne_energie.body.setAllowGravity(false);
        ligne_energie.setScale(1);

        centre_pdv = this.physics.add.sprite(-250,-70,'centre').setScrollFactor(0);
        centre_pdv.body.setAllowGravity(false);
        centre_pdv.setScale(1.3);

        pdv_01 = this.physics.add.sprite(-280,-97,'pdv1').setScrollFactor(0);
        pdv_01.body.setAllowGravity(false);
        pdv_01.setScale(1.3);

        tween_pdv_01 = this.tweens.add({
            targets: pdv_01,
            x: -285,
            duration: 1000,
            yoyo : true,
            repeat: -1
        });

        pdv_02 = this.physics.add.sprite(-245,-105,'pdv2').setScrollFactor(0);
        pdv_02.body.setAllowGravity(false);
        pdv_02.setScale(1.3);

        tween_pdv_02 = this.tweens.add({
            targets: pdv_02,
            y: -110,
            duration: 1000,
            yoyo : true,
            repeat: -1
        });

        pdv_03 = this.physics.add.sprite(-225,-80,'pdv3').setScrollFactor(0);
        pdv_03.body.setAllowGravity(false);
        pdv_03.setScale(1.3);

        tween_pdv_03 = this.tweens.add({
            targets: pdv_03,
            x: -220,
            duration: 1000,
            yoyo : true,
            repeat: -1
        });

        pdv_04 = this.physics.add.sprite(-245,-45,'pdv4').setScrollFactor(0);
        pdv_04.body.setAllowGravity(false);
        pdv_04.setScale(1.3);

        tween_pdv_04 = this.tweens.add({
            targets: pdv_04,
            y: -40,
            duration: 1000,
            yoyo : true,
            repeat: -1
        });

        pdv_05 = this.physics.add.sprite(-280,-55,'pdv5').setScrollFactor(0);
        pdv_05.body.setAllowGravity(false);
        pdv_05.setScale(1.3);

        tween_pdv_05 = this.tweens.add({
            targets: pdv_05,
            x: -285,
            duration: 1000,
            yoyo : true,
            repeat: -1
        });
    }
    

    update(){

        if(invincibleEnemy_03_s5 == true){ // relance du compteur d'invulné player //
            compteurEnemy_03_s5-- ;
            if(compteurEnemy_03_s5 == 0){
                enemy_03_s5.setTint(0xffffff);
                compteurEnemy_03_s5 = 100;
                invincibleEnemy_03_s5 = false ;
            }
        }

        if(bulletEnemyOn_03_s5 == false){ // relance du compteur des projectiles //
            compteurBulletEnemy_03_s5 -- ;
            if(compteurBulletEnemy_03_s5 == 0){
                compteurBulletEnemy_03_s5  = 150;
                bulletEnemyOn_03_s5 = true ;
            }
        }

        if(zone_enemy_03_s5.body.touching.none){
            if(anims_enemy_03_s5 == true){
                enemy_03_agro_s5 = false;
                enemy_03_s5.body.immovable = true; 
                enemy_03_s5.anims.play('walk_enemy_03',true);

                if(enemy_03_right_s5 == true){
                    enemy_03_s5.setVelocityX(70);
                    enemy_03_s5.flipX = false;
                }
                if(enemy_03_s5.body.blocked.right){
                    enemy_03_s5.setVelocityX(-70);
                    enemy_03_s5.flipX = true;
                    enemy_03_right_s5 = false;
                    enemy_03_left_s5 = true
                }
                else if(enemy_03_s5.x < 1888){
                    enemy_03_s5.setVelocityX(70);
                    enemy_03_s5.flipX = false;
                    enemy_03_left_s5 = false;
                    enemy_03_right_s5 = true;
                }
            }
        }

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false;
            }
        }

        if(etat_poison_s5 == false && relance_poison_s5 > 0){ 
            relance_poison_s5 --;
            if(relance_poison_s5 <= 0 ){
                compteur_mush_s5 = 120;
                relance_poison_s5 = 120;
            }
        }

        if(zone_enemy_s5.body.touching.none){
            etat_poison_s5 = false;
            enemy_s5.anims.play('walk_mush_02',true);
            //tween_enemy_02.play();
            mush_poison_s5.setAlpha(0);
            anim_mush_02_s5 = true;
            if(enemy_s5_direction_right == true){
                enemy_s5.setVelocityX(20);
            }
            if(enemy_s5.body.blocked.right){
                enemy_s5.setVelocityX(-20);
                enemy_s5.flipX = true;
                enemy_s5_direction_right = false;
                enemy_s5_direction_left = true
            }
            else if(enemy_s5.body.blocked.left){
                enemy_s5.setVelocityX(20);
                enemy_s5.flipX = false;
                enemy_s5_direction_left = false;
                enemy_s5_direction_right = true;
            }
        }

        if(etat_explo == true){
            crystal_power_up.destroy(true,true); 
        }

        if(playerHp == 5){
            pdv_01.setAlpha(1);
            pdv_02.setAlpha(1);
            pdv_03.setAlpha(1);
            pdv_04.setAlpha(1);
            pdv_05.setAlpha(1);
        }
        else if(playerHp == 4){
            pdv_01.setAlpha(0.3);
            pdv_02.setAlpha(1);
            pdv_03.setAlpha(1);
            pdv_04.setAlpha(1);
            pdv_05.setAlpha(1);
            tween_pdv_01.stop();

        }
        else if(playerHp == 3){
            pdv_01.setAlpha(0.3);
            pdv_02.setAlpha(0.3);
            pdv_03.setAlpha(1);
            pdv_04.setAlpha(1);
            pdv_05.setAlpha(1);
            tween_pdv_01.stop();
            tween_pdv_02.stop();

        }
        else if(playerHp == 2){
            pdv_01.setAlpha(0.3);
            pdv_02.setAlpha(0.3);
            pdv_03.setAlpha(0.3);
            pdv_04.setAlpha(1);
            pdv_05.setAlpha(1);
            tween_pdv_01.stop();
            tween_pdv_02.stop();
            tween_pdv_03.stop();

        }
        else if(playerHp == 1){
            pdv_01.setAlpha(0.3);
            pdv_02.setAlpha(0.3);
            pdv_03.setAlpha(0.3);
            pdv_04.setAlpha(0.3);
            pdv_05.setAlpha(1);
            tween_pdv_01.stop();
            tween_pdv_02.stop();
            tween_pdv_03.stop();
            tween_pdv_04.stop();
        } 
        else if(playerHp == 0){
            pdv_01.setAlpha(0.3);
            pdv_02.setAlpha(0.3);
            pdv_03.setAlpha(0.3);
            pdv_04.setAlpha(0.3);
            pdv_05.setAlpha(0.3);
            tween_pdv_01.stop();
            tween_pdv_02.stop();
            tween_pdv_03.stop();
            tween_pdv_04.stop();
            tween_pdv_05.stop();
        } 

        if (scoreCrystal == 9){
            barre_energie_01.setAlpha(1);
            barre_energie_02.setAlpha(1);
            barre_energie_03.setAlpha(1);
            barre_energie_04.setAlpha(1);
            barre_energie_05.setAlpha(1);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 8){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(1);
            barre_energie_03.setAlpha(1);
            barre_energie_04.setAlpha(1);
            barre_energie_05.setAlpha(1);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 7){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(1);
            barre_energie_04.setAlpha(1);
            barre_energie_05.setAlpha(1);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 6){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(1);
            barre_energie_05.setAlpha(1);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 5){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(1);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 4){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(0.3);
            barre_energie_06.setAlpha(1);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 3){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(0.3);
            barre_energie_06.setAlpha(0.3);
            barre_energie_07.setAlpha(1);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 2){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(0.3);
            barre_energie_06.setAlpha(0.3);
            barre_energie_07.setAlpha(0.3);
            barre_energie_08.setAlpha(1);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 1){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(0.3);
            barre_energie_06.setAlpha(0.3);
            barre_energie_07.setAlpha(0.3);
            barre_energie_08.setAlpha(0.3);
            barre_energie_09.setAlpha(1);
        }
        else if(scoreCrystal == 0){
            barre_energie_01.setAlpha(0.3);
            barre_energie_02.setAlpha(0.3);
            barre_energie_03.setAlpha(0.3);
            barre_energie_04.setAlpha(0.3);
            barre_energie_05.setAlpha(0.3);
            barre_energie_06.setAlpha(0.3);
            barre_energie_07.setAlpha(0.3);
            barre_energie_08.setAlpha(0.3);
            barre_energie_09.setAlpha(0.3);
        }

        etat_power_up_dash = true;

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
                compteurBullet = 160;
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


        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            emitter_particles_player.startFollow(player);
            if(crystal_explo == false){
                player.anims.play('jump',true);
            }
            else{
                player.anims.play('jump_crystal',true);
            }
        }

        else if(keyQ.isDown){
            if(keyQ.isDown && space.isDown && etat_dash == true && etat_power_up_dash == true){
                dashOn();
                player.setVelocityX(-800);
                textDash.setText(compteur_dash);
                dash = true;
                emitter_particles_player.startFollow(player);
            }
            else if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                console.log(wall_climb);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
                emitter_particles_player.startFollow(player);
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
                emitter_particles_player.startFollow(player);
                if(crystal_explo == false){
                    player.anims.play('jump',true);
                }
                else{
                    player.anims.play('jump_crystal',true);
                }
            }
            else if (keyQ.isDown){
                player.setVelocityX(-350);
                player.flipX = true;
                emitter_particles_player.startFollow(player);
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
                emitter_particles_player.startFollow(player);
            }

            else if(keyD.isDown && keyZ.isDown && player.body.blocked.right && wall_climb == true){
                player.setVelocityY(-250);
                player.setVelocityX(350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                emitter_particles_player.startFollow(player);
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
                player.setVelocityX(350);
                player.flipX = false;
                emitter_particles_player.startFollow(player);
                if(crystal_explo == false){
                    player.anims.play('jump',true);
                }
                else{
                    player.anims.play('jump_crystal',true);
                }
            }
            else if (keyD.isDown){
                player.setVelocityX(350);
                player.flipX = false;
                emitter_particles_player.startFollow(player);
                if(crystal_explo == false){
                    player.anims.play('jump',true);
                }
                else{
                    player.anims.play('jump_crystal',true);
                }
            }
            
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
        

    }
}

function agro_enemy_03_s5 (){
    enemy_03_agro_s5 = true;
    if(anims_enemy_03_s5 == true){
        enemy_03_s5.anims.play('walk_enemy_03',true);
        if(zone_enemy_03_s5.body.touching && enemy_03_agro_s5 == true){
            enemy_03_s5.body.immovable = false;
            this.physics.moveToObject(enemy_03_s5, player, 200);
            enemy_03_right_s5 = true;
        }
        if (enemy_03_s5.x > player.x){
            enemy_03_s5.direction = 'right';
            enemy_03_s5.flipX = true;
        }
        else if(enemy_03_s5.x < player.x){
            enemy_03_s5.direction = 'left';
            enemy_03_s5.flipX = false;
        }
    }
}

function shot_enemy_s5() {
    if(anims_enemy_03_s5 == true){
        if (bulletEnemyOn_03_s5 == true){
            var coefDirEnemy_s5;
            if (enemy_03_s5.direction == 'right') { // determine la direction du joueur //
                coefDirEnemy_s5 = -1; 
            } else { 
                coefDirEnemy_s5 = 1
            }
            bulletEnemy_03_s5 = groupeBulletsEnemy_03_s5.create(enemy_03_s5.x + (1 * coefDirEnemy_s5), enemy_03_s5.y - 20, 'banane').setScale(2).setSize(20,20); // permet de créer la carte à coté du joueur //
            // Physique de la carte //
            bulletEnemy_03_s5.setCollideWorldBounds(false);
            bulletEnemy_03_s5.body.allowGravity = true;
            bulletEnemy_03_s5.setVelocity(400 * coefDirEnemy_s5, -300); // vitesse en x et en y
            bulletEnemyOn_03_s5 = false;    
        }
    }
}

function killEnemy03_s5(){
    bullet.destroy(true,true);
    
    emitter_particles_bullet.stopFollow(bullet);
    if(invincibleEnemy_03_s5 == false){
        enemyHp_03_s5 -=1;
        enemy_03_s5.setTint(0xff0000);
        invincibleEnemy_03_s5 = true;
    }
    if(enemyHp_03_s5 == 0){
        enemy_03_s5.destroy(true,true);
        etat_enemy_03_s5 = false;
        anims_enemy_03_s5 = false;
        particles.emitParticleAt(enemy_03_s5.x, enemy_03_s5.y);
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

function poison_s5(){
    this.physics.moveToObject(enemy_s5, target_mush_s5, 200);
    etat_poison_s5 = true;
    if(compteur_mush_s5 == 0){
        mush_poison_s5.anims.play('cloud',true);
        etat_poison_s5 = false;
        mush_poison_s5.setAlpha(1);
    }
    else if(etat_poison_s5 == true ){
        compteur_mush_s5 --
        mush_poison_s5.setAlpha(0);
    }
}

function hit_player_s5(){
    
    if(etat_poison_s5 == false && invincible == false){
        playerHp -= 1
        textHp.setText(playerHp);
        invincible = true;
    }
}



function anim_mush_s5(){
    if(anim_mush_02_s5 == true){
        enemy_s5.anims.play('hide',true);
        anim_mush_02_s5 = false;
        enemy_s5_direction_right = true;
        if(enemy_s5_direction_right == true){
            enemy_s5.flipX = false;
        }
        
    }
}

function lose_life(){
    
    if(invincible == false){
        playerHp -= 1;
        invincible = true;
    }
    
}

