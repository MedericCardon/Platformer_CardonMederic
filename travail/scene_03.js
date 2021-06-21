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
var compteurEnemy_03 = 100; // par défaut: 100 //
var invincibleEnemy_03 = false;
var enemyHp_03 = 2;
var anims_enemy_03 = true;

var power_up_dash;
var etat_power_up_dash = false;
var dash = false;
var tween_power_up;
var compteur_dash = 50;
var etat_dash = true;
var relance_dash = 150;
var anims_power_up_dash = true;

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

var tween_crystal_chute_01;
var tween_crystal_chute_02;
var tween_crystal_chute_03;

var enemy_03_right = true;
var enemy_03_left = false;

var groupeBulletsEnemy_03;
var etat_bullet_enemy_03 = true;
var bulletEnemy_03;
var compteurBulletEnemy_03 = 150;
var bulletEnemyOn_03 = true;

var particles_crystal_dash;
var emitter_crystal_dash;

var tuto_dash;
var tween_tuto_dash;
var zone_tuto_dash;

var press_e_02;
var zone_levier_02;

var press_e_03;
var zone_levier_03;

var particles_bullet;
var emitter_particles_bullet;

class scene_03 extends Phaser.Scene{
    constructor(){
        super("scene_03");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_03_placeholder', 'scene_03.json');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });
        this.load.spritesheet('enemy','assets/ennemi.png',{ frameWidth: 212, frameHeight: 282 });
        this.load.spritesheet('enemy_02','assets/mush_02.png',{ frameWidth: 150, frameHeight: 216 });
        this.load.spritesheet('enemy_03','assets/mush_03.png',{ frameWidth: 183, frameHeight: 288 });
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
        this.load.image('espace','assets/scene_03/ESPACE.png');
        this.load.image('end_02','assets/scene_03/end_02_s3.png');
        this.load.image('particles_end','assets/particules_end.png');
        this.load.image('particles_player','assets/particles_singe.png');
        this.load.image('crystal_chute','assets/crystal_chute.png');
        this.load.image('banane','assets/banane_01.png');
        this.load.spritesheet('dash_power_up','assets/spriteSheet_crystal_dash.png',{ frameWidth: 150, frameHeight: 150 });
        this.load.image('particles_bullet','assets/particles_bullet.png');
        this.load.image('press_e','assets/press_e.png');
    }

    create(){

         // ----- background ----- //

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
        wall_s3.setCollisionByExclusion(-1, true);
        lever_3.setCollisionByExclusion(-1, true);
        lever_4.setCollisionByExclusion(-1, true);
        
        // ----- groupe projectile player & ennemi ----- //

        groupeBullets = this.physics.add.group();
        groupeBulletsEnemy_03 = this.physics.add.group();

        // ----- particules derriere player----- //

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

        // ----- tuto dash (power-up) ----- //

        tuto_dash = this.add.sprite(800,1657,'espace').setVisible(false);

        zone_tuto_dash = this.add.zone(800, 1700).setSize(200, 300);
        this.physics.world.enable(zone_tuto_dash);
        zone_tuto_dash.body.setAllowGravity(false);
        zone_tuto_dash.body.moves = false;

        tween_tuto_dash = this.tweens.add({
            targets: tuto_dash,
            y:  1670,
            duration: 1000,
            yoyo: true,
            repeat: -1,
        }); 

        // ----- player ----- //

        player = this.physics.add.sprite(109,797,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;//depart = 109,797
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        // ----- particules devant player ----- //

        particles_crystal_dash = this.add.particles('particles_player');
        emitter_crystal_dash = particles_crystal_dash.createEmitter({
            angle: { start: 0, end: 360, steps: 16 },
            lifespan: 500,
            speed: 500,
            quantity: 32,
            scale: { start: 5, end: 0 },
            blendMode: 'ADD',
            on: false
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

        // ----- chute de crystal ----- //


        crystal_chute_01 = this.physics.add.sprite(2300,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_01.body.setAllowGravity(false);

        tween_crystal_chute_01 = this.tweens.add({
            targets: crystal_chute_01,
            y:  2200,
            duration: 1800,
            repeat: -1,
        }); 

        crystal_chute_02 = this.physics.add.sprite(2450,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_02.body.setAllowGravity(false);

        tween_crystal_chute_02 = this.tweens.add({
            targets: crystal_chute_02,
            y:  2200,
            duration: 2000,
            repeat: -1,
        });

        crystal_chute_03 = this.physics.add.sprite(2600,1600,'crystal_chute').setScale(2).setSize(20,20);
        crystal_chute_03.body.setAllowGravity(false);

        tween_crystal_chute_03 = this.tweens.add({
            targets: crystal_chute_03,
            y:  2200,
            duration: 2200,
            repeat: -1,
        })

        // ----- zone de fin ----- //

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

        // ----- plateforme en mouvement ----- //

        plateforme_01 = this.physics.add.sprite(500,1100,'plateforme_s3').setSize(90,70);
        plateforme_01.body.setAllowGravity(false);
        plateforme_01.setCollideWorldBounds(true);
        plateforme_01.body.immovable = true;

        plateforme_02 = this.physics.add.sprite(950,900,'plateforme_s3').setSize(90,70);
        plateforme_02.body.setAllowGravity(false);
        plateforme_02.setCollideWorldBounds(true);
        plateforme_02.body.immovable = true;

        plateforme_03 = this.physics.add.sprite(2500,750,'plateforme_s3').setSize(90,70);
        plateforme_03.body.setAllowGravity(false);
        plateforme_03.setCollideWorldBounds(true);
        plateforme_03.body.immovable = true;

        plateforme_04 = this.physics.add.sprite(3200,755,'plateforme_02_s3').setSize(200,60);
        plateforme_04.body.setAllowGravity(false);
        plateforme_04.setCollideWorldBounds(true);
        plateforme_04.body.immovable = true;

        // ----- animation ----- //

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
            key: 'crystal_dash',
            frames: this.anims.generateFrameNumbers('dash_power_up', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_enemy_03',
            frames: this.anims.generateFrameNumbers('enemy_03', { start: 0, end: 19}),
            frameRate: 15,
            repeat: 0
        });

        // ----- block qui tombe ----- //

        fall_block_02 = this.physics.add.sprite(1088,764,'fall_block_02');
        fall_block_02.setOrigin(0);
        fall_block_02.body.setAllowGravity(false);
        fall_block_02.setSize(128,192);

        // ----- ennemi ----- //

        enemy_03 = this.physics.add.sprite(600,1500,'enemy_03');
        enemy_03.body.setAllowGravity(true);
        enemy_03.setCollideWorldBounds(true);
        enemy_03.setScale(0.6);
        enemy_03.setSize(140,242);

        zone_enemy_03 = this.add.zone(790, 1828).setSize(700, 200);
        this.physics.world.enable(zone_enemy_03);
        zone_enemy_03.body.setAllowGravity(false);
        zone_enemy_03.body.moves = false;

        // ----- ground + trap ----- //

        const ground_01_s3 = map.createLayer('ground_01_s3', tileset, 0, 0);
        const ground_02_s3 = map.createLayer('ground_02_s3', tileset, 0, 0);
        const ground_03_s3 = map.createLayer('ground_03_s3', tileset, 0, 0);
        const trap_s3 = map.createLayer('trap_s3', tileset,0,0);
        ground_01_s3.setCollisionByExclusion(-1, true);
        ground_02_s3.setCollisionByExclusion(-1, true);
        ground_03_s3.setCollisionByExclusion(-1, true);
        trap_s3.setCollisionByExclusion(-1, true);

        // ----- zone levier ----- //
        press_e_02 = this.add.sprite(1410,700,'press_e').setVisible(false);

        zone_levier_02 = this.add.zone(1517, 797).setSize(64, 64);
        this.physics.world.enable(zone_levier_02);
        zone_levier_02.body.setAllowGravity(false);
        zone_levier_02.body.moves = false;

        press_e_03 = this.add.sprite(3390,600,'press_e').setVisible(false);

        zone_levier_03 = this.add.zone(3310, 690).setSize(64, 64);
        this.physics.world.enable(zone_levier_03);
        zone_levier_03.body.setAllowGravity(false);
        zone_levier_03.body.moves = false;

        // ----- power-up dash ----- //

        power_up_dash = this.physics.add.sprite(170,1800,'dash_power_up');
        power_up_dash.body.setAllowGravity(false);
        power_up_dash.setCollideWorldBounds(true);
        power_up_dash.setSize(20,20);

        tween_power_up = this.tweens.add({
            targets: power_up_dash,
            y:  1700,
            duration: 3000,
            yoyo : true,
            repeat: -1,
        }); 

        // ----- keyboard ----- //

        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // ----- overlap ----- //

        this.physics.add.overlap(crystal_chute_01,player,lose_life,null,this);
        this.physics.add.overlap(crystal_chute_02,player,lose_life,null,this);
        this.physics.add.overlap(crystal_chute_03,player,lose_life,null,this);
        this.physics.add.overlap(zone_levier_02,player,leverOn3_s3,null,this);
        this.physics.add.overlap(zone_levier_03,player,leverOn4_s3,null,this);
        this.physics.add.overlap(groupeBullets,enemy_03, killEnemy03,null,this);
        this.physics.add.overlap(groupeBulletsEnemy_03,player, lose_life,null,this);
        this.physics.add.overlap(power_up_dash,player, activeDash,null,this);
        this.physics.add.overlap(player, zone_enemy_03,agro_enemy_03,null,this);
        this.physics.add.overlap(player, zone_enemy_03,shot_enemy,null,this);
        this.physics.add.overlap(player, zone_tuto_dash,tutoDash,null,this);  

        // ----- collider ----- //

        this.physics.add.collider(groupeBullets,ground_02_s3, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall_s3, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever_3, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever_4, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,fall_block_02, destroy_bullet,null,this);
        this.physics.add.collider(plateforme_01,player);
        this.physics.add.collider(plateforme_02,player);
        this.physics.add.collider(plateforme_03,player);
        this.physics.add.collider(plateforme_04,player);
        this.physics.add.collider(enemy_03,fall_block_02);
        this.physics.add.collider(fall_block_02,player);
        this.physics.add.collider(fall_block_02,ground_03_s3,disable_fallBlock_s2,null,this);
        this.physics.add.collider(player,ground_03_s3);
        this.physics.add.collider(fall_block_02,ground_02_s3,enable_fallBlock_02,null,this);  
        this.physics.add.collider(wall_s3,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s3,player, climbOff,null,this);
        this.physics.add.collider(ground_02_s3,enemy_03);
        this.physics.add.collider(trap_s3,player, trap_s2,null,this);
        

           
        // ----- camera ----- //

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3456  , 1984);
        this.physics.world.setBounds(0, 0, 3456 , 1984);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        // ----- tire (clic gauche) ----- //

        this.input.on('pointerup', function () {
            if(bulletOn == true && sound_shot == true){
                var shot = this.sound.add('shot');
                shot.play({volume: 0.2});
            }
            tirer(player);
            energy();
            emitter_particles_bullet.startFollow(bullet);
        }, this);

        // ----- barre d'energie ----- //

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

        // ----- points de vie ----- //

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

        // ----- interaction points de vie ----- //

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

        if (playerHp == 0){
            this.cameras.main.fadeIn(2000);
            this.cameras.main.shake(100);
            player.x = 109;
            player.y = 797;
            playerHp = 5;
            pdv_01.setAlpha(1);
            tween_pdv_01.play();
            pdv_02.setAlpha(1);
            tween_pdv_02.play();
            pdv_03.setAlpha(1);
            tween_pdv_03.play();
            pdv_04.setAlpha(1);
            tween_pdv_04.play();
            pdv_05.setAlpha(1);
            tween_pdv_05.play();
            scoreCrystal = 9;
        }

        // ----- interaction energie ----- //

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

        // ----- compteurs ----- //

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(invincibleEnemy_03 == true){ // relance du compteur d'invulné enemy //
            compteurEnemy_03-- ;
            if(compteurEnemy_03 == 0){
                enemy_03.setTint(0xffffff);
                compteurEnemy_03 = 100;
                invincibleEnemy_03 = false ;
            }
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 160;
                bulletOn = true ;
            }
        }

        // ----- divers ----- //

        if(zone_tuto_dash.body.touching.none){
            tuto_dash.setVisible(false);
        }

        if(zone_levier_02.body.touching.none){
            press_e_02.setVisible(false);
        }

        if(zone_levier_03.body.touching.none){
            press_e_03.setVisible(false);
        }
        
        if(anims_power_up_dash == true){
            power_up_dash.anims.play('crystal_dash',true);
        }

        if(anims_enemy_03 == true){
            enemy_03.play('walk_enemy_03',true);
        }
        
        // ----- compteur ennemi ----- //

        if(bulletEnemyOn_03 == false){ // relance du compteur des projectiles //
            compteurBulletEnemy_03 -- ;
            if(compteurBulletEnemy_03 == 0){
                compteurBulletEnemy_03  = 150;
                bulletEnemyOn_03 = true ;
            }
        }

        // ----- changement de scene ----- //

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

        // ----- mouvement des plateformes ----- //

        if(plateforme_01.y > 1099){
            plateforme_01.setVelocityY(-100);
        }
        else if(plateforme_01.y < 797 ){
            plateforme_01.setVelocityY(100);
        }

        if(plateforme_02.y < 901){
            plateforme_02.setVelocityY(100);
        }
        else if(plateforme_02.y > 1180 ){
            plateforme_02.setVelocityY(-100);
        }

        // ----- activation des leviers ----- //

        if(active_lever_3 == true){
            if(plateforme_03.x >= 2499){
                plateforme_03.setVelocityX(-200);
            }
            if(plateforme_03.x <= 1750 ){
                plateforme_03.setVelocityX(200);
            }
        }

        if(active_lever_4 == true){
            if(plateforme_04.y <= 755){
                plateforme_04.setVelocityY(200);
            }
            else if(plateforme_04.y == 1821)
                plateforme_04.setVelocity(0);
        }

        // ----- compteurs dash ----- //

        if(etat_dash == false && relance_dash > 0 && etat_power_up_dash == true){ 
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

       // ----- zone ennemi ----- //

        if(zone_enemy_03.body.touching.none){
            if(anims_enemy_03 == true){
                enemy_03_agro = false;
                enemy_03.body.immovable = true; 
                enemy_03.anims.play('walk_enemy_03',true);

                if(enemy_03_right == true){
                    enemy_03.setVelocityX(70);
                    enemy_03.flipX = false;
                }
                if(enemy_03.x > 1130){
                    enemy_03.setVelocityX(-70);
                    enemy_03.flipX = true;
                    enemy_03_right = false;
                    enemy_03_left = true
                }
                else if(enemy_03.body.blocked.left){
                    enemy_03.setVelocityX(70);
                    enemy_03.flipX = false;
                    enemy_03_left = false;
                    enemy_03_right = true;
                }
            }
        }

        // ----- controle clavier ----- //

        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.anims.play('jump',true);
            emitter_particles_player.startFollow(player);
            var jump = this.sound.add('jump');
            jump.play();
        }
        else if(keyQ.isDown){
            if(keyQ.isDown && space.isDown && etat_dash == true && etat_power_up_dash == true){
                dashOn();
                player.setVelocityX(-800);
                emitter_particles_player.startFollow(player);
            }
            else if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                player.anims.play('climb',true);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                player.direction = 'left';
                player.flipX = true;
                emitter_particles_player.startFollow(player);
            }
            else if (keyQ.isDown && player.body.blocked.down){
                player.anims.play('run', true);
                player.setVelocityX(-350);
                player.setBounce(0.1);

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
            if(keyD.isDown && space.isDown && etat_dash == true && etat_power_up_dash == true){
                dashOn();
                player.setVelocityX(800);
                emitter_particles_player.startFollow(player);
            }

            else if(keyD.isDown && keyZ.isDown && player.body.blocked.right && wall_climb == true){
                player.setVelocityY(-250);
                player.setVelocityX(350);
                player.anims.play('climb',true);
                player.direction = 'right';
                player.flipX = false;
                emitter_particles_player.startFollow(player);
            }
            else if (keyD.isDown && player.body.blocked.down) {
                player.setVelocityX(350);
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
            player.setRotation(0);
            emitter_particles_player.stopFollow(player);
            player.anims.play('idle', true);
        }
    }
}

// ----- fonctions ----- //

function climbOn(){
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
    press_e_02.setVisible(true);
    if(keyE.isDown && active_lever_3 == false){
        active_lever_3 = true;  
    }
}

function leverOn4_s3(){
    press_e_03.setVisible(true);
    if(keyE.isDown && active_lever_4 == false){
        active_lever_4 = true;
    }
}

function trap_s2(){
    this.cameras.main.fadeIn(2000);
    this.cameras.main.shake(100);
    player.y = 797;
    player.x = 109;
    
}

function agro_enemy_03 (){
    enemy_03_agro = true;
    if(anims_enemy_03 == true){
        enemy_03.anims.play('walk_enemy_03',true);
        if(zone_enemy_03.body.touching && enemy_03_agro == true){
            enemy_03.body.immovable = false;
            this.physics.moveToObject(enemy_03, player, 200);
            enemy_03_right = true;
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
    etat_power_up_dash = true;
    anims_power_up_dash = false;
    power_up_dash.destroy(true,true);
    particles_crystal_dash.emitParticleAt(power_up_dash.x,power_up_dash.y);
    tween_power_up.pause();
}

function shot_enemy(enemy) {
    if(anims_enemy_03 == true){
        if (bulletEnemyOn_03 == true){
            var coefDirEnemy;
            if (enemy_03.direction == 'right') { // determine la direction du joueur //
                coefDirEnemy = -1; 
            } else { 
                coefDirEnemy = 1
            }
            bulletEnemy_03 = groupeBulletsEnemy_03.create(enemy_03.x + (1 * coefDirEnemy), enemy_03.y - 20, 'banane').setScale(2).setSize(20,20); // permet de créer la carte à coté du joueur //
            // Physique de la carte //
            bulletEnemy_03.setCollideWorldBounds(false);
            bulletEnemy_03.body.allowGravity = true;
            bulletEnemy_03.setVelocity(400 * coefDirEnemy, -300); // vitesse en x et en y
            bulletEnemyOn_03 = false;    
        }
    }
}

function tutoDash(){
    if(etat_power_up_dash == true){
        tuto_dash.setVisible(true);
    }

}

function tirer(player,pointer) {
    
    if (bulletOn == true){
        if(scoreCrystal >= 1){
            scoreCrystal -= 1
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

function killEnemy03(){
    bullet.destroy(true,true);
    
    emitter_particles_bullet.stopFollow(bullet);
    if(invincibleEnemy_03 == false){
        enemyHp_03 -=1;
        enemy_03.setTint(0xff0000);
        invincibleEnemy_03 = true;
    }
    if(enemyHp_03 == 0){
        enemy_03.destroy(true,true);
        etat_enemy_03 = false;
        anims_enemy_03 = false;
        particles.emitParticleAt(enemy_03.x, enemy_03.y);

    }
}

function destroy_bullet(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
}

function lose_life(){
    
    if(invincible == false){
        playerHp -= 1;
        invincible = true;
        this.cameras.main.shake(100);
    }
    
}