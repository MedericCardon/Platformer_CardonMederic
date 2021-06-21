var bouton_01;
var bouton_02;

var crystal_01;
var crystal_02;
var crystal_03;
var crystal_04;
var crystal_05;
var crystal_06;
var crystal_07;
var crystal_08;
var crystal_09;
var crystal_10;
var crystal_centre;

var tween_crystal_01;
var tween_crystal_02;
var tween_crystal_03;
var tween_crystal_04;
var tween_crystal_05;
var tween_crystal_06;
var tween_crystal_07;
var tween_crystal_08;
var tween_crystal_09;
var tween_crystal_10;
var tween_crystal_centre;

class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }
    init(data){

    }

    preload(){
        this.load.image('background_menu','assets/ecran_acceuil/background_ecran.png');
        this.load.image('bouton_01','assets/ecran_acceuil/bouton_01.png');
        this.load.image('bouton_02','assets/ecran_acceuil/bouton_02.png');
        this.load.image('titre','assets/ecran_acceuil/mako.png');
        this.load.image('crystal_01','assets/ecran_acceuil/crystal_01.png');
        this.load.image('crystal_02','assets/ecran_acceuil/crystal_02.png');
        this.load.image('crystal_03','assets/ecran_acceuil/crystal_03.png');
        this.load.image('crystal_04','assets/ecran_acceuil/crystal_04.png');
        this.load.image('crystal_05','assets/ecran_acceuil/crystal_05.png');
        this.load.image('crystal_06','assets/ecran_acceuil/crystal_06.png');
        this.load.image('crystal_07','assets/ecran_acceuil/crystal_07.png');
        this.load.image('crystal_08','assets/ecran_acceuil/crystal_08.png');
        this.load.image('crystal_09','assets/ecran_acceuil/crystal_09.png');
        this.load.image('crystal_10','assets/ecran_acceuil/crystal_10.png');
        this.load.image('crystal_centre','assets/ecran_acceuil/crystal_centre.png');

        this.load.audio('sound','assets/sound/sound_01.wav');
        this.load.audio('switch_button','assets/sound/vintage_radio_button_006.wav');
    }

    create(){

        var music = this.sound.add('sound');
        music.loop = true;
        music.play();

        this.add.image(0,0,'background_menu').setOrigin(0);

        // ----- Logo jeu ----- //

        crystal_centre = this.add.sprite(335,3,'crystal_centre').setOrigin(0);

        crystal_01 = this.add.sprite(0,0,'crystal_01').setOrigin(0);

        tween_crystal_01 = this.tweens.add({
            targets: crystal_01,
            x: -10,
            y: 5,
            duration: 1500,
            yoyo : true,
            repeat: -1
        });

        crystal_02 = this.add.sprite(0,0,'crystal_02').setOrigin(0);

        tween_crystal_02 = this.tweens.add({
            targets: crystal_02,
            y: 10,
            duration: 1800,
            yoyo : true,
            repeat: -1
        });

        crystal_03 = this.add.sprite(0,0,'crystal_03').setOrigin(0);

        tween_crystal_03 = this.tweens.add({
            targets: crystal_03,
            y: 10,
            x: 5,
            duration: 1500,
            yoyo : true,
            repeat: -1
        });

        crystal_04 = this.add.sprite(0,0,'crystal_04').setOrigin(0);

        tween_crystal_04 = this.tweens.add({
            targets: crystal_04,
            x: 10,
            duration: 1800,
            yoyo : true,
            repeat: -1
        });

        crystal_05 = this.add.sprite(0,0,'crystal_05').setOrigin(0);

        tween_crystal_05 = this.tweens.add({
            targets: crystal_05,
            x: 10,
            y: -2,
            duration: 1500,
            yoyo : true,
            repeat: -1
        });

        crystal_06 = this.add.sprite(0,0,'crystal_06').setOrigin(0);

        tween_crystal_06 = this.tweens.add({
            targets: crystal_06,
            y: -10,
            x: 3,
            duration: 1800,
            yoyo : true,
            repeat: -1
        });

        crystal_07 = this.add.sprite(0,0,'crystal_07').setOrigin(0);

        tween_crystal_07 = this.tweens.add({
            targets: crystal_07,
            y: -10,
            duration: 1500,
            yoyo : true,
            repeat: -1
        });

        crystal_08 = this.add.sprite(0,0,'crystal_08').setOrigin(0);

        tween_crystal_08 = this.tweens.add({
            targets: crystal_08,
            y: -10,
            x: -5,
            duration: 1800,
            yoyo : true,
            repeat: -1
        });

        crystal_09 = this.add.sprite(0,0,'crystal_09').setOrigin(0);

        tween_crystal_09 = this.tweens.add({
            targets: crystal_09,
            x: -10,
            y: -3,
            duration: 1500,
            yoyo : true,
            repeat: -1
        });

        crystal_10 = this.add.sprite(0,0,'crystal_10').setOrigin(0);

        tween_crystal_10 = this.tweens.add({
            targets: crystal_10,
            x: -10,
            duration: 1800,
            yoyo : true,
            repeat: -1
        });

        this.add.image(448,130,'titre');

        // ----- boutons on mouse over ----- //
        
        bouton_01 = this.physics.add.sprite(448,386,'bouton_01').setInteractive();
        bouton_01.body.setAllowGravity(false);
        bouton_01.body.immovable = true;
        bouton_01.setCollideWorldBounds(true);

        bouton_02 = this.physics.add.sprite(448,400,'bouton_02').setAlpha(0).setInteractive();
       bouton_02.body.setAllowGravity(false);
        bouton_02.body.immovable = true;
        bouton_02.setCollideWorldBounds(true);

        bouton_01.on('pointerover', function (pointer) {

            bouton_01.setAlpha(0);
            bouton_02.setAlpha(1);
    
        });
        

        bouton_01.on('pointerout', function (pointer) {

            bouton_01.setAlpha(1);
            bouton_02.setAlpha(0);
    
        });

        bouton_02.on('pointerover', function (pointer) {

            bouton_01.setAlpha(0);
            bouton_02.setAlpha(1);
    
        });
        

        bouton_02.on('pointerout', function (pointer) {

            bouton_01.setAlpha(1);
            bouton_02.setAlpha(0);
    
        });

        bouton_02.on('pointerup', function () {
            this.scene.start("scene_01");
            var button = this.sound.add('switch_button');
            button.play();
        }, this);

        
        // ----- camera ----- //
        
        this.cameras.main.setBounds(0, 0,  896  , 448 );
        this.physics.world.setBounds(0, 0, 896 , 448);
        this.cameras.main.fadeIn(1000);
    }

    update(){

    }
} 

