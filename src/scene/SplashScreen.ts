import Scene = Phaser.Scene;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import MainScene from "./MainScene";

export default class SplashScreen extends Scene {

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/grass.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('background', 'assets/images/background.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('school_barriere', 'assets/images/schoolbarriere.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('taupe', 'assets/images/taupe.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('champi', 'assets/images/champi.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('letters', 'assets/images/letters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('button-buy', 'assets/images/button-buy.png', { frameWidth: 37, frameHeight: 15 });
    this.load.spritesheet('button-buy-fenetre', 'assets/images/button-buy-fenetre.png', { frameWidth: 17, frameHeight: 15 });
    this.load.spritesheet('balloon0', 'assets/images/balloon0.png', { frameWidth: 14, frameHeight: 14 });
    this.load.spritesheet('balloon1', 'assets/images/balloon2.png', { frameWidth: 14, frameHeight: 14 });
    this.load.spritesheet('balloon2', 'assets/images/balloon3.png', { frameWidth: 14, frameHeight: 14 });
    this.load.spritesheet('balloon3', 'assets/images/balloon4.png', { frameWidth: 14, frameHeight: 14 });
    this.load.spritesheet('barbele1', 'assets/images/barbele1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele2', 'assets/images/barbele2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele3', 'assets/images/barbele3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele4', 'assets/images/barbele4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele5', 'assets/images/barbele5.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele6', 'assets/images/barbele6.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing0', 'assets/images/parpaing0.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing1', 'assets/images/parpaing1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing2', 'assets/images/parpaing2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing3', 'assets/images/parpaing3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing4', 'assets/images/parpaing4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing5', 'assets/images/parpaing5.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('carreau1', 'assets/images/carreau1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('carreau2', 'assets/images/carreau2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('carreau3', 'assets/images/carreau3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('carreau4', 'assets/images/carreau4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barricade3', 'assets/images/WindowTopLeft.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barricade4', 'assets/images/WindowTopRight.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barricade1', 'assets/images/WindowBottomLeft.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barricade2', 'assets/images/WindowBottomRight.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('inspector', 'assets/images/human3_pink.png', { frameWidth: 24, frameHeight: 27 });
    this.load.spritesheet('flash', 'assets/images/flash.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('humangreen', 'assets/images/human1_green.png', { frameWidth: 24, frameHeight: 25 });
    this.load.image('grass-particle', 'assets/images/grass-particle.png');
    this.load.image('smoke-particle', 'assets/images/smoke-particle.png');
    this.load.image('stars-particle', 'assets/images/stars.png');
    this.load.bitmapFont('Carrier Command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    this.load.bitmapFont('Carrier Command Black', 'assets/fonts/carrier_command_black.png', 'assets/fonts/carrier_command_black.xml');

    this.load.audio('build', 'assets/sfx/build.mp3');
    this.load.audio('mail', 'assets/sfx/mail.mp3');
    this.load.audio('photo', 'assets/sfx/photo.mp3');
    this.load.audio('taupe', 'assets/sfx/taupe.mp3');
    this.load.audio('ambient_city', 'assets/sfx/ambient_city.mp3');
    this.load.audio('grass1', 'assets/sfx/grass1.mp3');
    this.load.audio('grass2', 'assets/sfx/grass2.mp3');
    this.load.audio('grass3', 'assets/sfx/grass3.mp3');
    this.load.audio('grass4', 'assets/sfx/grass4.mp3');
    this.load.audio('grass5', 'assets/sfx/grass5.mp3');
    this.load.audio('grass6', 'assets/sfx/grass6.mp3');
    this.load.audio('button', 'assets/sfx/button.mp3');
    this.load.audio('crame', 'assets/sfx/crame.mp3');
    this.load.audio('ballon1', 'assets/sfx/ballon1.mp3');
    this.load.audio('ballon2', 'assets/sfx/ballon2.mp3');
    this.load.audio('kids1', 'assets/sfx/kids1.mp3');
    this.load.audio('kids2', 'assets/sfx/kids2.mp3');
  }

  create(settings: SettingsObject) {
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const sprite = this.add.sprite(x * 38 * 4, y * 30 * 4, 'grass', 3);
        sprite.setScale(4);
        sprite.setAlpha(0.5);
      }
    }

    this.add.bitmapText(20, 20, 'Carrier Command', 'Keep the grass alive', 20);
    [
      'You play Michel',
      'You participate to the famous world championship for the best gazon forever',
      'Keep your grass alive',
      'Blablabla (changer ce texte, hein)',
    ].forEach((txt, i) => {
      this.add.bitmapText(40, 200 + i * 10, 'Carrier Command', txt, 5);
    });
    this.add.bitmapText(40, 300, 'Carrier Command', 'Controls: left click only. Press it to begin.', 5);

    this.sound.play('ambient_city');
  }

  update(time: number, delta: number): void {
    if (this.input.activePointer.leftButtonDown()) {
      this.scene.start(MainScene.toString());
    }
  }
}
