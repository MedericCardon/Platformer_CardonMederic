
var logo;
var tween_logo;

var texte;
var tween_texte;

var bouton_rejouer_01;
var tween_bouton_01;

var bouton_rejouer_02;
var tween_bouton_02;



class scene_06 extends Phaser.Scene{
    constructor(){
        super("scene_06");
    }
    init(data){

    }

    preload(){
        this.load.image('background_menu','assets/ecran_acceuil/background_ecran.png');
        this.load.image('logo','assets/logo_mako.png');
        this.load.image('texte','assets/texte_fin.png');
        this.load.image('bouton_rejouer_01','assets/bouton_rejouer_01.png');
        this.load.image('bouton_rejouer_02','assets/bouton_rejouer_2.png');
        this.load.audio('switch_button','assets/sound/vintage_radio_button_006.wav');
        
    }

    create(){
        this.add.image(0,0,'background_menu').setOrigin(0);
        logo = this.add.sprite(448,200,'logo');

        tween_logo = this.tweens.add({
            targets: logo,
            y: -200,
            duration: 12000,
            repeat: 0
        });

        texte = this.add.sprite(448,500,'texte');

        tween_texte = this.tweens.add({
            targets: texte,
            y: -200,
            duration: 12000,
            repeat: 0
        });

        bouton_rejouer_01 = this.physics.add.sprite(448,600,'bouton_rejouer_01').setInteractive();
        bouton_rejouer_01.body.setAllowGravity(false);
        bouton_rejouer_01.body.immovable = true;

        tween_bouton_01 = this.tweens.add({
            targets: bouton_rejouer_01,
            y: 224,
            duration: 14000,
            repeat: 0
        });

        bouton_rejouer_02 = this.physics.add.sprite(448,600,'bouton_rejouer_02').setAlpha(0).setInteractive();
        bouton_rejouer_02.body.setAllowGravity(false);
        bouton_rejouer_02.body.immovable = true;

        tween_bouton_02 = this.tweens.add({
            targets: bouton_rejouer_02,
            y: 224,
            duration: 14000,
            repeat: 0
        });

        bouton_rejouer_01.on('pointerover', function (pointer) {

            bouton_rejouer_01.setAlpha(0);
            bouton_rejouer_02.setAlpha(1);
    
        });

        bouton_rejouer_01.on('pointerout', function (pointer) {

            bouton_rejouer_01.setAlpha(1);
            bouton_rejouer_02.setAlpha(0);
    
        });

        bouton_rejouer_02.on('pointerover', function (pointer) {

            bouton_rejouer_01.setAlpha(0);
            bouton_rejouer_02.setAlpha(1);
    
        });
        

        bouton_rejouer_02.on('pointerout', function (pointer) {

            bouton_rejouer_01.setAlpha(1);
            bouton_rejouer_02.setAlpha(0);
    
        });

        bouton_rejouer_02.on('pointerup', function () {
            this.scene.start("scene_01");
            var button = this.sound.add('switch_button');
            button.play();
            rejouer = true;
        }, this);
    }

    update(){
        if(rejouer == true){
            rejouer = false;
        }

    }
}