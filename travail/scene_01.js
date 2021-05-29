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
var active_lever = false;
var wall_climb = false;
var elevator = false;

var compteurBullet = 50;
var bulletOn = true;
var groupeBullets;
var bullet;

var textX;
var textY;
var textHp;

var scoreBanane = 100;
var texteBanane;

var fall_block;
var fall_condition = true;

var enemy;
var etat_enemy = true;
var zone_enemy;
var enemy_agro = false;
var groupeBulletsEnemy;
var etat_bullet_enemy = true;
var bulletEnemy;
var compteurBulletEnemy = 150;
var bulletEnemyOn = true;
var tween_enemy;

var particles_player;
var emitter_particles_player;

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
        //this.load.spritesheet('player_climb','assets/spriteSheet_climb.png',{ frameWidth: 110, frameHeight: 173 });
        this.load.spritesheet('ennemi','assets/ennemi.png',{ frameWidth: 154, frameHeight: 238 });
        this.load.image('banane','assets/banane_01.png');
        this.load.image('background','assets/background_scene_01.png');
        //this.load.image('background_01','assets/background_01.png');
        //this.load.image('background_02','assets/background_02.png');
        this.load.image('branche_01','assets/branche_01.png');
        this.load.image('etoiles','assets/etoiles.png');
        this.load.image('fall_block','assets/fall_block.png');
        this.load.image('particles_player','assets/particles_singe.png');

    }

    create(){
        this.add.image(0,0,'background').setOrigin(0);
        this.add.image(0,-55,'etoiles').setOrigin(0).setScrollFactor(0.9);
        //this.add.image(0,-50,'background_02').setOrigin(0).setScrollFactor(0.8);
        //this.add.image(0,-50,'background_01').setOrigin(0).setScrollFactor(0.7);
        this.add.image(850,400,'branche_01').setOrigin(0);

        const map = this.make.tilemap({key: 'scene_01_placeholder'});
        const tileset = map.addTilesetImage('place_holder'/*nom fichier tiled*/, 'tiles');
        const water = map.createLayer('water', tileset, 0, 0); 
        const elevator_cage = map.createLayer('elevator_cage',tileset,0,0);

        water.setCollisionByExclusion(-1, true);
        elevator_cage.setCollisionByExclusion(-1, true);

        groupeBullets = this.physics.add.group();
        groupeBulletsEnemy = this.physics.add.group();

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



        player = this.physics.add.sprite(2220,700,'player').setScale(1).setSize(90,70)/*.setOffset(40,0)*/;
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

        enemy = this.physics.add.sprite(2100,1000,'ennemi');
        enemy.body.setAllowGravity(true);
        enemy.setCollideWorldBounds(true);
        enemy.setScale(0.7);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('ennemi', { start: 0, end: 31 }),
            frameRate: 25,
            repeat: 0
        });


        /*tween_enemy = this.tweens.add({
            targets: enemy,
            x:2400,
            duration:2000,
            yoyo:true,
            repeat : -1,
        });*/

        zone_enemy = this.add.zone(2200, 1124).setSize(450, 100);
        this.physics.world.enable(zone_enemy);
        zone_enemy.body.setAllowGravity(false);
        zone_enemy.body.moves = false;


        const ground_01 = map.createLayer('ground_01', tileset, 0, 0);
        const ground_03 = map.createLayer('ground_03', tileset, 0, 0);

        const elevator_ground = map.createLayer('elevator_ground',tileset,0,0);
        const ground_02 = map.createLayer('ground_02', tileset, 0, 0);
        const end = map.createLayer('end', tileset, 0, 0);
        
        
        fall_block = this.physics.add.sprite(2010,800,'fall_block');
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
        end.setCollisionByExclusion(-1, true);
        

        
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

        this.physics.add.overlap(player, zone_enemy,agro_enemy,null,this);
        //this.physics.add.overlap(player, zone_enemy,test,null,this);
        this.physics.add.collider(groupeBulletsEnemy,ground_02, destroy_bullet_enemy,null,this);
        this.physics.add.collider(groupeBulletsEnemy,wall, destroy_bullet_enemy,null,this);
        this.physics.add.collider(groupeBulletsEnemy,water, destroy_bullet_enemy,null,this);
        this.physics.add.collider(groupeBulletsEnemy,fall_block, destroy_bullet_enemy,null,this);
        this.physics.add.collider(groupeBulletsEnemy,lever, destroy_bullet_enemy,null,this);

        this.physics.add.collider(groupeBullets,ground_02, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,ground_01, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,wall, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,water, destroy_bullet,null,this);
        this.physics.add.collider(groupeBullets,fall_block, destroy_bullet,null,this);

        this.physics.add.collider(end,player,changeScene,null,this);
        this.physics.add.collider(groupeBulletsEnemy,player, lose_life,null,this);
        this.physics.add.collider(lever,player,leverOn,null,this);
        this.physics.add.collider(elevator_ground,player);
        this.physics.add.collider(enemy,ground_02);
        this.physics.add.collider(enemy,fall_block,killEnemy,null,this);
        this.physics.add.collider(wall,player, climbOn,null,this);
        this.physics.add.collider(ground_02,player, climbOff,null,this);
        
        this.physics.add.collider(fall_block,player,kill_fallBlock,null,this);
        this.physics.add.collider(ground_02,fall_block,enable_fallBlock,null,this);

        
        

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  5000  , 1310 );
        this.physics.world.setBounds(0, 0, 5000 , 1310);
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


    /*var cannonHead = this.add.image(130, 416, 'player').setDepth(1);
    var cannon = this.add.image(130, 464, 'player').setDepth(1);
    var bullet = this.physics.add.sprite(cannon.x, cannon.y - 50, 'banane').setScale(2);
    var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
    var line = new Phaser.Geom.Line();
    var angle = 0;

    bullet.disableBody(true, true);

    this.input.on('pointermove', function (pointer) {
        angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
        cannonHead.rotation = angle;
        Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y -50, angle,98);
        gfx.clear().strokeLineShape(line);
    }, this);*/

    this.input.on('pointerup', function () {
        tirer(player);
    }, this);
  
}  

    update(){



        zone_enemy.body.debugBodyColor = zone_enemy.body.touching.none ? 0x00ffff : 0xffff00;

        if(zone_enemy.body.touching.none && etat_enemy == true){
            enemy_agro = false;
            console.log("agro false")
            enemy.body.immovable = true; 
            enemy.setVelocityX(0);
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        if(bulletEnemyOn == false){ // relance du compteur des projectiles //
            compteurBulletEnemy -- ;
            if(compteurBulletEnemy == 0){
                compteurBulletEnemy  = 150;
                bulletEnemyOn = true ;
            }
        }
        if(keyQ.isDown){
            if(keyQ.isDown && keyZ.isDown && player.body.blocked.left && wall_climb == true){
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
                player.setBounce(0.1);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'left';
                player.flipX = true;
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
            }
            else if (keyD.isDown) {
                player.setVelocityX(350);
                textX.setText(player.x);
                textY.setText(player.y);
                player.direction = 'right';
                player.flipX = false;
                player.anims.play('run', true);
                emitter_particles_player.startFollow(player);
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
            emitter_particles_player.stopFollow(player);
            player.anims.play('idle', true);
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

function leverOn(){
    if(keyE.isDown && active_lever == false){
        tween_elevator_ground.play();
        tween_elevator_cage.play();
    }
}

function tirer(player,pointer) {
    
    if (bulletOn == true){
        if(scoreBanane >= 1){
            scoreBanane -= 1
            texteBanane.setText(scoreBanane);
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

function kill_fallBlock (){
    if(keyS.isDown && fall_condition == true){
        fall_block.body.setAllowGravity(true);
        fall_block.body.immovable = false;
        
    }
}

function enable_fallBlock(){
    fall_block.body.setAllowGravity(false);
    fall_block.body.immovable = true;
}

function killEnemy(){
    enemy.setVisible(false);
    enemy.setScale(0);
    etat_enemy = false;
    etat_bullet_enemy = false;
    enemy.anims.stop('walk',true);
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
    if (playerHp <= 0){
        player.x = 100;
        player.y = 100;
        playerHp = 5;
        textHp.setText(playerHp);
    }
    else if(playerHp >= 1){
        playerHp -= 1;
        bulletEnemy.destroy(true,true);
        textHp.setText(playerHp);
    }
}

function destroy_bullet(){
    bullet.destroy(true,true);
}
function destroy_bullet_enemy(){
    bulletEnemy.destroy(true,true);
}

function changeScene(){
    this.scene.start("scene_02");
}

function agro_enemy (){
    enemy_agro = true;
    enemy.anims.play('walk',true);
    if (bulletEnemyOn == true && etat_bullet_enemy == true){
        var coefDirEnemy;
        if (enemy.direction == 'right') { // determine la direction du joueur //
            coefDirEnemy = -1; 
        } else { 
            coefDirEnemy = 1
        }
        bulletEnemy = groupeBulletsEnemy.create(enemy.x /*+ (1 * coefDirEnemy)*/, enemy.y /*- 20*/, 'banane').setScale(2); // permet de créer la carte à coté du joueur //
        // Physique de la carte //
        bulletEnemy.setCollideWorldBounds(false);
        bulletEnemy.body.allowGravity = true;
        bulletEnemy.setVelocity(600 * coefDirEnemy, -300); // vitesse en x et en y
        bulletEnemyOn = false;        
    }
    if (enemy.x > player.x){
        enemy.direction = 'right';
        enemy.flipX = true;
        //console.log("right");
    }
    else if(enemy.x < player.x){
        enemy.direction = 'left';
        enemy.flipX = false;
        //console.log("left");
    }
    if(zone_enemy.body.touching && enemy_agro == true && etat_enemy == true){
        enemy.body.immovable = false
        this.physics.moveToObject(enemy, player, 200);
    }
}



