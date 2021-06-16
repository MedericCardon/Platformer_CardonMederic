var player;
var playerHp = 5;
var cursors;
var space;
var keyE;
var keyZ;
var keyQ;
var keyS;
var keyD;
var elevator_ground;
var tween_elevator_ground;
var tween_elevator_cage;
var wall_climb = false;
var elevator = false;

var compteurBullet = 50;
var bulletOn = true;
var groupeBullets;
var bullet;

var textX;
var textY;
var textHp;

var scoreCrystal = 18;
var texteBanane;

var fall_block;
var fall_condition = true;

var enemy;
var etat_enemy = true;
var zone_enemy;
var enemy_agro = false;


var particles_player;
var emitter_particles_player;

var particles_bullet;
var emitter_particles_bullet;

var particles_end;
var emitter_particles_end;

var centre_pdv;
var pdv_01;
var pdv_02;
var pdv_03;
var pdv_04;
var pdv_05;

var tween_pdv_01;
var tween_pdv_02;
var tween_pdv_03;
var tween_pdv_04;
var tween_pdv_05;

var ligne_energie;
var barre_energie_01;
var barre_energie_02;
var barre_energie_03;
var barre_energie_04;
var barre_energie_05;
var barre_energie_06;
var barre_energie_07;
var barre_energie_08;
var barre_energie_09;

var compteur = 150; // par défaut: 150 //
var invincible = false;

var compteurEnemy = 100; // par défaut: 150 //
var invincibleEnemy = false;
var enemyHp = 2;

var target_enemy = new Phaser.Math.Vector2();
var spawn_enemy = false;

var zone_levier_01;
var etat_zone_levier = false;

var pressE;

var crystal_loot;
var tween_crystal_loot;

class scene_01 extends Phaser.Scene{
    constructor(){
        super("scene_01");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_01_placeholder', 'scene_01.json');
        this.load.spritesheet('player','assets/spritesheet_player.png',{ frameWidth: 146.666667, frameHeight: 173 });
        this.load.spritesheet('ennemi','assets/ennemi.png',{ frameWidth: 212, frameHeight: 282 });
        this.load.image('banane','assets/banane_01.png');
        this.load.image('background','assets/background_scene_01.png');
        this.load.image('etoiles','assets/etoiles.png');
        this.load.image('fall_block','assets/fall_block.png');
        this.load.image('particles_player','assets/particles_singe.png');
        this.load.image('particles_bullet','assets/particles_bullet.png');
        this.load.image('particles_end','assets/particules_end.png');
        this.load.image('paralax_01','assets/champ_paralax_01.png');
        this.load.image('paralax_02','assets/background_crystal.png');
        this.load.image('paralax_03','assets/paralax_03.png');
        this.load.image('branche_01','assets/branche_01.png');
        this.load.image('branche_02','assets/branche_02.png');
        this.load.image('champ_01','assets/champ_01.png');
        this.load.image('end','assets/end.png');
        this.load.image('pressE','assets/pressE.png');
        this.load.image('crystal_loot','assets/crystal_loot.png');
        

        this.load.image('centre','assets/HUD-assets/centre.png');
        this.load.image('pdv1','assets/HUD-assets/pdv_01.png');
        this.load.image('pdv2','assets/HUD-assets/pdv_02.png');
        this.load.image('pdv3','assets/HUD-assets/pdv_03.png');
        this.load.image('pdv4','assets/HUD-assets/pdv_04.png');
        this.load.image('pdv5','assets/HUD-assets/pdv_05.png');
        this.load.image('ligne_energie','assets/HUD-assets/ligne_energie.png');
        this.load.image('barre_01','assets/HUD-assets/barre_01.png');
        this.load.image('barre_02','assets/HUD-assets/barre_02.png');
        this.load.image('barre_03','assets/HUD-assets/barre_03.png');
        this.load.image('barre_04','assets/HUD-assets/barre_04.png');
        this.load.image('barre_05','assets/HUD-assets/barre_05.png');
        this.load.image('barre_06','assets/HUD-assets/barre_06.png');
        this.load.image('barre_07','assets/HUD-assets/barre_07.png');
        this.load.image('barre_08','assets/HUD-assets/barre_08.png');
        this.load.image('barre_09','assets/HUD-assets/barre_09.png');
  


    }

    create(){
        this.add.image(0,0,'background').setOrigin(0);
        this.add.image(-300,-250,'etoiles').setOrigin(0).setScrollFactor(0.1);
        this.add.image(-300,-200,'paralax_03').setOrigin(0).setScrollFactor(0.25);
        this.add.image(-180,-50,'paralax_01').setOrigin(0).setScrollFactor(0.5);
        this.add.image(-180,400,'paralax_02').setOrigin(0).setScrollFactor(0.7);
        //this.add.image(-150,-150,'paralax_02').setOrigin(0).setScrollFactor(0.7);
        this.add.image(850,400,'branche_01').setOrigin(0);
        this.add.image(2350,600,'branche_02').setOrigin(0);
        this.add.image(0,0,'champ_01').setOrigin(0);

        const map = this.make.tilemap({key: 'scene_01_placeholder'});
        const tileset = map.addTilesetImage('place_holder'/*nom fichier tiled*/, 'tiles');
        
        const elevator_cage = map.createLayer('elevator_cage',tileset,0,0);
        
        elevator_cage.setCollisionByExclusion(-1, true);
        

        groupeBullets = this.physics.add.group();
        //groupeBulletsEnemy = this.physics.add.group();

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

        



        player = this.physics.add.sprite(100,925,'player').setScale(1).setSize(90,70);//start: 100,925
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

        particles_end = this.add.particles('particles_end');
        emitter_particles_end = particles_end.createEmitter({
            x:4050,
            y:500,
            speed: 30,
            lifespan: 5000,
            frequency: 50,
            quantity: 2,
            scale: { start: 2, end: 0.5 },
            blendMode: 'ADD',
        });

        this.add.image(0,0,'end').setOrigin(0);

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

        target_enemy.x = 2815;
        target_enemy.y = 1181;

        enemy = this.physics.add.sprite(target_enemy.x,1000,'ennemi');
        enemy.body.setAllowGravity(true);
        enemy.setCollideWorldBounds(true);
        enemy.setScale(0.6);
        enemy.setSize(140,242);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 0, end: 39 }),
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



        zone_enemy = this.add.zone(3000, 1150).setSize(850, 100);
        this.physics.world.enable(zone_enemy);
        zone_enemy.body.setAllowGravity(false);
        zone_enemy.body.moves = false;

        

        const elevator_ground = map.createLayer('elevator_ground',tileset,0,0);
        const ground_01 = map.createLayer('ground_01', tileset, 0, 0);
        const ground_03 = map.createLayer('ground_03', tileset, 0, 0);
        const ground_02 = map.createLayer('ground_02', tileset, 0, 0);

        const trap_s1 = map.createLayer('trap_s1', tileset, 0, 0); 
        trap_s1.setCollisionByExclusion(-1, true);

        ground_01.setCollisionByExclusion(-1, true);
        
        fall_block = this.physics.add.sprite(2600,800,'fall_block');
        fall_block.setOrigin(0);
        fall_block.body.setAllowGravity(false);
        fall_block.body.immovable = true;
        fall_block.setSize(240,64);
        fall_block.setOffset(50,40);


        const lever = map.createLayer('lever',tileset,0,0);
        const wall = map.createLayer('wall', tileset, 0, 0);

        wall.setCollisionByExclusion(-1, true);
        elevator_ground.setCollisionByExclusion(-1, true);
        ground_02.setCollisionByExclusion(-1, true);
        lever.setCollisionByExclusion(-1, true);

        tween_elevator_ground = this.tweens.add({
            targets: elevator_ground,
            y: -724,
            duration: 3000,
            paused: true,
            yoyo : true,
            repeat: 0
        });

        tween_elevator_cage = this.tweens.add({
            targets: elevator_cage,
            y: -724,
            duration: 3000,
            paused: true,
            yoyo : true,
            repeat: 0
        });

        zone_levier_01 = this.add.zone(3770, 1190).setSize(64, 64);
        this.physics.world.enable(zone_levier_01);
        zone_levier_01.body.setAllowGravity(false);
        zone_levier_01.body.moves = false;

        pressE = this.add.sprite(3840,1110,'pressE').setAlpha(0);

        crystal_loot = this.add.sprite(1433,320,'crystal_loot');

        tween_crystal_loot = this.tweens.add({
            targets: crystal_loot,
            y:  280,
            duration: 3000,
            //paused: true,
            yoyo : true,
            repeat: -1,
        }); 

        this.physics.add.overlap(player, zone_enemy,agro_enemy,null,this);
        this.physics.add.overlap(player, enemy,lose_life,null,this);
        this.physics.add.collider(enemy,ground_02);
        this.physics.add.overlap(groupeBullets,enemy,killEnemy,null,this);


        this.physics.add.collider(groupeBullets,ground_02, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,trap_s1, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,lever, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,fall_block, destroy_bullet,null,this);
        this.physics.add.overlap(zone_levier_01,player,activLevier,null,this);
        this.physics.add.collider(elevator_ground,player);
        this.physics.add.collider(wall,player, climbOn,null,this);
        this.physics.add.collider(ground_02,player, climbOff,null,this);
        this.physics.add.collider(fall_block,player);
        this.physics.add.collider(player,trap_s1, activTrap_s1,null,this);


        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  4032  , 1280 );
        this.physics.world.setBounds(0, 0, 4032 , 1280);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(1000);
        
        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        //textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        //textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        //texteBanane = this.add.text(-350,-90, scoreBanane,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        //textHp = this.add.text(-350,-60, playerHp,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);

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

       

    this.input.on('pointerup', function () {
        tirer(player);
        energy();
        emitter_particles_bullet.startFollow(bullet);
    }, this);
   
}  

    update(){

        if (playerHp == 0){
            this.cameras.main.fadeIn(2000);
            player.x = 100;
            player.y = 800;
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
            //textHp.setText(playerHp);
        }

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(invincibleEnemy == true){ // relance du compteur d'invulné player //
            compteurEnemy-- ;
            if(compteurEnemy == 0){
                enemy.setTint(0xffffff);
                compteurEnemy = 100;
                invincibleEnemy = false ;
            }
        }

        if(player.x > 3980){
            this.scene.start("scene_02");
        }

        //zone_enemy.body.debugBodyColor = zone_enemy.body.touching.none ? 0x00ffff : 0xffff00;

        if(zone_enemy.body.touching.none && etat_enemy == true){
            enemy_agro = false;
            enemy.body.immovable = true; 
            enemy.setVelocityX(0);
            this.physics.moveToObject(enemy, target_enemy, 200);
            if(player.x > enemy.x && spawn_enemy == false){
                enemy.flipX = true;
                enemy.anims.play('walk',true);
            }
            if(player.x < enemy.x && spawn_enemy == false){
                enemy.flipX = true;
                enemy.anims.play('walk',true);
            }
            if(enemy.x >= target_enemy.x && enemy.x <= target_enemy.x +2){
                enemy.anims.play('idle_enemy',true);
                spawn_enemy = true;
            }
            if(enemy.x <= target_enemy.x && enemy.x >= target_enemy.x -2){
                enemy.anims.play('idle_enemy',true);
                spawn_enemy = true;
            }
            if(enemy.x >= target_enemy.x+10 || enemy.x <= target_enemy.x-10){
                spawn_enemy = false;
            }
        }

        if(zone_levier_01.body.touching.none){
            pressE.setAlpha(0);
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        /*if(bulletEnemyOn == false){ // relance du compteur des projectiles //
            compteurBulletEnemy -- ;
            if(compteurBulletEnemy == 0){
                compteurBulletEnemy  = 150;
                bulletEnemyOn = true ;
            }
        }*/
        
        if (Phaser.Input.Keyboard.JustDown(keyZ) && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.anims.play('jump',true);
            emitter_particles_player.startFollow(player);
        }
        
        else if(keyQ.isDown){
            if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
                player.anims.play('climb',true);
                player.setVelocityY(-250);
                player.setVelocityX(-350);
                //textX.setText(player.x);
                //textY.setText(player.y);
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
                //textX.setText(player.x);
                //textY.setText(player.y);
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



function killEnemy(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
    if(invincibleEnemy == false){
        enemyHp -=1;
        enemy.setTint(0xff0000);
        invincibleEnemy = true;
    }
    if(enemyHp == 0){
        enemy.destroy(true,true);
        etat_enemy = false;
        //zone_enemy.destroy(true,true);

    }
}


/*function shot_enemy(enemy) {
    
    if (bulletEnemyOn == true){
        var coefDirEnemy;
        if (enemy.direction == 'right') { // determine la direction du joueur //
            coefDirEnemy = -1; 
        } else { 
            coefDirEnemy = 1
        }
        bulletEnemy = groupeBulletsEnemy.create(enemy.x + (1 * coefDirEnemy), enemy.y - 20, 'banane').setScale(2); // permet de créer la carte à coté du joueur //
        // Physique de la carte //*/
        /*bulletEnemy.setCollideWorldBounds(false);
        bulletEnemy.body.allowGravity = true;
        bulletEnemy.setVelocity(600 * coefDirEnemy, -300); // vitesse en x et en y
        bulletEnemyOn = false;    
    }
}*/

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

function destroy_bullet(){
    bullet.destroy(true,true);
    emitter_particles_bullet.stopFollow(bullet);
}
/*function destroy_bullet_enemy(){
    bulletEnemy.destroy(true,true);
}*/




    /*enemy_agro = true;
    enemy.anims.play('walk',true);
    if (bulletEnemyOn == true && etat_bullet_enemy == true){
        var coefDirEnemy;
        if (enemy.direction == 'right') { // determine la direction du joueur //
            coefDirEnemy = -1; 
        } else { 
            coefDirEnemy = 1
        }
        bulletEnemy = groupeBulletsEnemy.create(enemy.x /*+ (1 * coefDirEnemy)*///, enemy.y /*- 20*/, 'banane').setScale(2); // permet de créer la carte à coté du joueur //
        // Physique de la carte //
       /* bulletEnemy.setCollideWorldBounds(false);
        bulletEnemy.body.allowGravity = true;
        bulletEnemy.setVelocity(600 * coefDirEnemy, -300); // vitesse en x et en y
        bulletEnemyOn = false;       
    }*/
    
    
function agro_enemy (){
    enemy_agro = true;
    if (enemy.x > player.x && etat_enemy == true){
        enemy.direction = 'right';
        enemy.flipX = true;
    }
    else if(enemy.x < player.x && etat_enemy == true){
        enemy.direction = 'left';
        enemy.flipX = false;
    }
    if(player.x >= enemy.x && player.x <= enemy.x+100 && etat_enemy == true){
        enemy.anims.play('atk',true);
        this.physics.moveToObject(enemy, player, 100);
    }
    else if(player.x <= enemy.x && player.x >= enemy.x-100 && etat_enemy == true){
        enemy.anims.play('atk',true);
        this.physics.moveToObject(enemy, player, 100);
    }
    else if(zone_enemy.body.touching && enemy_agro == true && etat_enemy == true){
        enemy.body.immovable = false
        enemy.anims.play('walk',true);
        this.physics.moveToObject(enemy, player, 300);
    }
}

function energy(){
    if (scoreCrystal >=17){
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
    else if(scoreCrystal >= 15){
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
    else if(scoreCrystal >= 13){
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
    else if(scoreCrystal >= 11){
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
    else if(scoreCrystal >= 9){
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
    else if(scoreCrystal >= 7){
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
    else if(scoreCrystal >=5){
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
    else if(scoreCrystal >=3){
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
    else if(scoreCrystal >=1){
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
}

function activLevier(){
    pressE.setAlpha(1);
    if(keyE.isDown){
        tween_elevator_ground.play();
        tween_elevator_cage.play();
    }
}

function activTrap_s1(){
    player.x = 100;
    player.y = 925;
    this.cameras.main.fadeIn(1000);
}


