var player;
var cursors;
var space;
var keyE;
var elevator_ground;
var tween_elevator_ground;
var tween_elevator_cage;
var active_lever = false;
var wall_climb = false;
var elevator = false;

var textX;
var textY;

class scene_01 extends Phaser.Scene{
    constructor(){
        super("scene_01");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_01_placeholder', 'scene_01.json');
        this.load.image('player','assets/player.png');
        this.load.image('ennemi','assets/ennemi.png');
        this.load.image('banane','assets/banane_01.png');
        this.load.image('background','assets/background_scene_01.png');
        this.load.image('background_01','assets/background_01.png');
        this.load.image('background_02','assets/background_02.png');
        this.load.image('branche_01','assets/branche_01.png');
        this.load.image('etoiles','assets/etoiles.png');

    }

    create(){
        this.add.image(0,0,'background').setOrigin(0);
        this.add.image(0,0,'etoiles').setOrigin(0).setScrollFactor(0.98);
        this.add.image(0,-50,'background_02').setOrigin(0).setScrollFactor(0.8);
        this.add.image(0,-50,'background_01').setOrigin(0).setScrollFactor(0.7);
        
        this.add.image(850,400,'branche_01').setOrigin(0);
        const map = this.make.tilemap({key: 'scene_01_placeholder'});
        const tileset = map.addTilesetImage('place_holder'/*nom fichier tiled*/, 'tiles');
        const water = map.createLayer('water', tileset, 0, 0); 
        const fall_block = map.createLayer('fall_block', tileset, 0, 0);
        const elevator_cage = map.createLayer('elevator_cage',tileset,0,0);

        water.setCollisionByExclusion(-1, true);
        fall_block.setCollisionByExclusion(-1, true);
        elevator_cage.setCollisionByExclusion(-1, true);

        

        player = this.physics.add.sprite(1500,740,'player').setScale(1.7).setSize(40,100).setOffset(8,5);
        player.body.setAllowGravity(true);
        //player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        const ground_01 = map.createLayer('ground_01', tileset, 0, 0);
        const elevator_ground = map.createLayer('elevator_ground',tileset,0,0);
        const ground_02 = map.createLayer('ground_02', tileset, 0, 0);
        

        
        
        
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





        this.physics.add.overlap(ground_01,player, climbOff,null,this);
        this.physics.add.collider(lever,player,leverOn,null,this);
        this.physics.add.collider(elevator_ground,player);
        
        this.physics.add.collider(ground_02,player, climbOff,null,this);
        this.physics.add.collider(wall,player, climbOn,null,this);
        this.physics.add.collider(fall_block,player);

        this.cameras.main.setZoom(0.55);
        this.cameras.main.setBounds(0, 0,  5000  , 1310 );
        this.physics.world.setBounds(0, 0, 5000 , 1310);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);
        
        cursors = this.input.keyboard.createCursorKeys();
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //boutonTire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        textX = this.add.text(-350,-150, player.x,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        textY = this.add.text(-350,-120, player.y,{font: '25px Georgia', fill: '#f0acdc' }).setScrollFactor(0);

    }

    update(){


        
        if(cursors.left.isDown && player.body.blocked.left && wall_climb == true){
            player.setVelocityY(-200);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else if (cursors.left.isDown)  {
            player.setVelocityX(-350);
            player.setBounce(0.1);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else if(cursors.right.isDown && player.body.blocked.right && wall_climb == true){
            player.setVelocityY(-200);
            textX.setText(player.x);
            textY.setText(player.y);
           
        }
        else if (cursors.right.isDown) {

            player.setVelocityX(350);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            player.setVelocityY(900);
            player.setBounce(0);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else  {
            player.setVelocityX(0);
            textX.setText(player.x);
            textY.setText(player.y);
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && player.body.blocked.down) {
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



