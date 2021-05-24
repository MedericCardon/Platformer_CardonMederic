var tween_plateform_move;

class scene_02 extends Phaser.Scene{
    constructor(){
        super("scene_02");
    }
    init(data){

    }

    preload(){
        this.load.image('tiles', 'assets/place_holder.png');
        this.load.tilemapTiledJSON('scene_02_placeholder', 'scene_02.json');
        this.load.image('player','assets/player.png');

    }

    create(){
        const map = this.make.tilemap({key: 'scene_02_placeholder'});
        const tileset = map.addTilesetImage('place_holder_scene_02'/*nom fichier tiled*/, 'tiles');
        const water_s2 = map.createLayer('water_s2', tileset, 0, 0);
        const ground_02_s2 = map.createLayer('ground_02_s2', tileset, 0, 0);
        const ground_01_s2 = map.createLayer('ground_01_s2', tileset, 0, 0);
        const wall_s2 = map.createLayer('wall_s2', tileset,0,0);
        const block = map.createLayer('block', tileset,0,0);

        ground_02_s2.setCollisionByExclusion(-1, true);
        wall_s2.setCollisionByExclusion(-1, true);
        block.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(2300,100,'player').setScale(1.7).setSize(40,100).setOffset(8,5);
        player.body.setAllowGravity(true);
        player.setCollideWorldBounds(true);

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

        this.physics.add.collider(ground_02_s2,player, climbOff,null,this);
        this.physics.add.collider(player,ground_02_s2);
        this.physics.add.collider(wall_s2,player, climbOn,null,this);
        this.physics.add.collider(block,player);

        tween_plateform_move = this.tweens.add({
            targets: block,
            x: -300,
            duration: 2000,
            //paused: true,
            yoyo : true,
            repeat: -1
        });
        

    }

    update(){

        if(keyQ.isDown && player.body.blocked.left && wall_climb == true){
            player.setVelocityY(-200);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'left';
            player.flipX = true;
            
        }
        else if (keyQ.isDown)  {
            player.setVelocityX(-350);
            player.setBounce(0.1);
            textX.setText(player.x);
            textY.setText(player.y);
            player.direction = 'left';
            player.flipX = true;
            
        }
        else if(keyD.isDown && player.body.blocked.right && wall_climb == true){
            player.setVelocityY(-200);
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
            
        }
        else if(Phaser.Input.Keyboard.JustDown(keyS)){
            player.setVelocityY(900);
            textX.setText(player.x);
            textY.setText(player.y);
            
        }
        else  {
            player.setVelocityX(0);
            textX.setText(player.x);
            textY.setText(player.y);
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