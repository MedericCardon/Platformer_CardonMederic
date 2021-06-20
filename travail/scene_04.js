
var shift_block_01_s4;
var shift_block_02_s4;
var shift_block_03_s4;



var particles_end1_s4;
var emitter_particles_end1_s4;

var end_s4 = false;

var door_explo;

var particles_door;
var emitter_door;

var crystal_loot_s4;
var tween_crystal_loot_s4;

var loot_s4 = true;



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

        this.load.image('background_s4','assets/scene_04/background_s4.png');
        this.load.image('branches_s4','assets/scene_04/branche_s4.png');
        this.load.image('etoiles_s4','assets/scene_04/etoiles_s4.png');
        this.load.image('crystal_paralaxe_s4','assets/scene_04/crystal_paralaxe_s4.png');
        this.load.image('mush_para_01_s4','assets/scene_04/mush_para_01_s4.png');
        this.load.image('mush_para_02_s4','assets/scene_04/mush_para_02_s4.png');
        this.load.image('foreground_s4','assets/scene_04/foreground_s4.png');
        this.load.image('plateforme_s4','assets/scene_04/plateforme_s4.png');
        this.load.image('end_01_s4','assets/scene_04/end_01_s4.png');
        this.load.image('particles_end','assets/particules_end.png');
        this.load.image('particles_player','assets/particles_singe.png');
        this.load.spritesheet('crystal_explo_anim','assets/scene_05/spriteSheet_crystal_explo.png',{ frameWidth: 150, frameHeight: 150 });
        this.load.image('particles_bullet','assets/particles_bullet.png');
        this.load.image('banane','assets/banane_01.png');
        this.load.image('particles_bullet_explo','assets/particles_bullet_explo.png');
        this.load.image('crystal_explo','assets/crystal_02.png');
        this.load.image('door_explo1','assets/door_explo1.png');
        this.load.image('end','assets/end.png');
    }

    create(){
        

        this.add.image(0,0,'background_s4').setOrigin(0);
        this.add.image(-300,-200,'etoiles_s4').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-800,'mush_para_02_s4').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-200,-800,'mush_para_01_s4').setOrigin(0).setScrollFactor(0.5);
        this.add.image(-110,-450,'crystal_paralaxe_s4').setOrigin(0).setScrollFactor(0.7);
        this.add.image(0,0,'branches_s4').setOrigin(0);

        particles_player = this.add.particles('particles_player');
        emitter_particles_player = particles_player.createEmitter({
            x:750,
            y:-20,
            speed: 30,
            lifespan: 4500,
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

        particles_door = this.add.particles('particles_bullet_explo');
        emitter_door = particles_door.createEmitter({
            angle: { start: 0, end: 360, steps: 16 },
            lifespan: 400,
            speed: 400,
            quantity: 32,
            scale: { start: 8, end: 0 },
            blendMode: 'ADD',
            on: false
        });

        const map = this.make.tilemap({key: 'scene_04_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        
        player = this.physics.add.sprite(74,2077,'player').setScale(1).setSize(90,70);//start_01 : 74,2077 start_02 : 750,157
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        door_explo = this.physics.add.sprite(3264,1984,'door_explo1').setSize(70,230);
        door_explo.body.setAllowGravity(false);
        door_explo.setCollideWorldBounds(true);
        door_explo.body.immovable = true;

        

        particles_end1_s4 = this.add.particles('particles_end');
        emitter_particles_end1_s4 = particles_end1_s4.createEmitter({
            x:3600,
            y:2000,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 1 },
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

        particles_01 = this.add.particles('particles_bullet')
            particles_01.createEmitter({
            lifespan: { min: 500, max: 600 },
            angle: { start: 0, end: 360, steps: 16 },
            speed: 200,
            quantity: 64,
            scale: { start: 3, end: 0.2 },
            frequency: 100,
            on:false,
            blendMode: 'ADD'
        });

        

        this.add.image(0,0,'end_01_s4').setOrigin(0);



        this.add.image(0,0,'foreground_s4').setOrigin(0);
        const ground_02_s4 = map.createLayer('ground_02_s4', tileset,0,0);
        const ground_01_s4 = map.createLayer('ground_01_s4', tileset,0,0);
        const trap_s4 = map.createLayer('trap_s4', tileset,0,0);
        const wall_s4 = map.createLayer('wall_s4', tileset,0,0);

        ground_02_s4.setCollisionByExclusion(-1, true);
        wall_s4.setCollisionByExclusion(-1, true);
        trap_s4.setCollisionByExclusion(-1, true);
        
        this.add.image(-445,1500,'end').setOrigin(0);

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

        

        

        

        groupeBullets = this.physics.add.group();


        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);


        shift_block_01_s4 = this.physics.add.sprite(1216,1344,'plateforme_s4').setSize(90,60);
        shift_block_01_s4.body.setAllowGravity(false);
        shift_block_01_s4.setCollideWorldBounds(true);
        shift_block_01_s4.body.immovable = true;

        shift_block_02_s4 = this.physics.add.sprite(1750,1600,'plateforme_s4').setSize(90,60);
        shift_block_02_s4.body.setAllowGravity(false);
        shift_block_02_s4.setCollideWorldBounds(true);
        shift_block_02_s4.body.immovable = true;

        shift_block_03_s4 = this.physics.add.sprite(1152,1856,'plateforme_s4').setSize(90,60);
        shift_block_03_s4.body.setAllowGravity(false);
        shift_block_03_s4.setCollideWorldBounds(true);
        shift_block_03_s4.body.immovable = true;

        crystal_loot_s4 = this.physics.add.sprite(2620,1280,'crystal_loot');
        crystal_loot_s4.body.setAllowGravity(false);

        tween_crystal_loot_s4 = this.tweens.add({
            targets: crystal_loot_s4,
            y:  1250,
            duration: 3000,
            yoyo : true,
            repeat: -1,
        }); 


        this.physics.add.collider(trap_s4,player, activeTrap_s4,null,this);
        this.physics.add.overlap(player,crystal_loot_s4,lootCrystal_s4,null,this);
        this.physics.add.overlap(door_explo,groupeBullets,openDoor1,null,this);
        this.physics.add.collider(groupeBullets,ground_02_s4, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s4, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall_s4, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,door_explo, destroy_bullet,null,this);

        this.physics.add.collider(groupeBullets,ground_02_s4, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,ground_01_s4, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,wall_s4, destroy_bullet_explo,null,this);
        this.physics.add.collider(groupeBullets,door_explo, destroy_bullet_explo,null,this);

        
        this.physics.add.collider(door_explo,player);
        this.physics.add.collider(shift_block_01_s4,player);
        this.physics.add.collider(shift_block_02_s4,player);
        this.physics.add.collider(shift_block_03_s4,player);
        this.physics.add.collider(wall_s4,player, climbOn,null,this);
        this.physics.add.collider(ground_02_s4,player, climbOff,null,this);
        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  3584  , 2176);
        this.physics.world.setBounds(0, 0, 3584 , 2176);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        if(end2 == true){
            player.x = 74;
            player.y = 2077;
        }

        if (end1 == true){
            player.x = 760;
            player.y = 100;
        }

        if(end_vers_s4 == true){
            player.x = 760;
            player.y = 100;
        }

        this.input.on('pointerup', function () {
            if(bulletOn == true && sound_shot == true){
                var shot = this.sound.add('shot');
                shot.play({volume: 0.2});
            }
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

        if(loot_s4 == false){
            crystal_loot_s4.destroy(true,true);
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

        if (playerHp == 0){
            this.cameras.main.fadeIn(2000);
            this.cameras.main.shake(100);
            if(end2 == true){
                player.x = 74;
                player.y = 2077;
            }
        
            if (end1 == true){
                player.x = 760;
                player.y = 100;
            }
        
            if(end_vers_s4 == true){
                player.x = 760;
                player.y = 100;
            }
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

        if(door_explo.x >= 3539){
            door_explo.destroy(true,true);
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 160;
                bulletOn = true ;
            }
        }

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
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

        if(player.y == 35 && player.x >=685 && player.x <= 787){
            this.scene.start("scene_05");
            end_s4 = true;
        }

        if(player.x == 3539 && player.y == 2077){
            this.scene.start("scene_06");
        }

        if (shift_block_01_s4.x <= 1217){
            shift_block_01_s4.setVelocityX(200);
        }
        else if (shift_block_01_s4.x > 1750){
            shift_block_01_s4.setVelocityX(-200);
        }

        if (shift_block_02_s4.x >= 1750){
            shift_block_02_s4.setVelocityX(-200);
        }
        else if (shift_block_02_s4.x <= 1217){
            shift_block_02_s4.setVelocityX(200);
        }

        if (shift_block_03_s4.x <= 1217){
            shift_block_03_s4.setVelocityX(250);
        }
        else if (shift_block_03_s4.x > 1750){
            shift_block_03_s4.setVelocityX(-250);
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
            var jump = this.sound.add('jump');
            jump.play();
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
                dash = true;
                emitter_particles_player.startFollow(player);
            }
            else if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                console.log(wall_climb);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
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
                dash = true;
                emitter_particles_player.startFollow(player);
            }

            else if(keyD.isDown && keyZ.isDown && player.body.blocked.right && wall_climb == true){
                player.setVelocityY(-250);
                player.setVelocityX(350);
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

function climbOn(){
    console.log(wall_climb);
    wall_climb = true
}

function climbOff(){
    wall_climb = false
}

function activeTrap_s4(){
    this.cameras.main.fadeIn(2000);
    this.cameras.main.shake(100);
    if(end2 == true){
        player.x = 74;
        player.y = 2077;
    }

    if (end1 == true){
        player.x = 760;
        player.y = 100;
    }

    if(end_vers_s4 == true){
        player.x = 760;
        player.y = 100;
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


function tire_explo_s4(player,pointer) {
    if(etat_explo == true){
        if (bulletOn == true){
            if(scoreCrystal >= 1){
                scoreCrystal -= 1
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

function destroy_bullet(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
}

function destroy_bullet_explo(){
    bullet.destroy(true,true);
    emitter_particles_bullet_explo.stopFollow(bullet);
}

function openDoor1(){
    if(crystal_explo == true){
        console.log("ok");
        door_explo.body.setAllowGravity(true);
        door_explo.setCollideWorldBounds(true);
        door_explo.body.immovable = false;
        door_explo.setVelocityX(500);
        particles_door.emitParticleAt(door_explo.x,door_explo.y);   
    }
}

function lootCrystal_s4(){
    loot_s4 = false;
    crystal_loot_s4.destroy(true,true);
    scoreCrystal = 9;
    particles_01.emitParticleAt(crystal_loot_s4.x, crystal_loot_s4.y);
}

function lose_life(){
    
    if(invincible == false){
        this.cameras.main.shake(100);
        playerHp -= 1;
        invincible = true;
    }   
}