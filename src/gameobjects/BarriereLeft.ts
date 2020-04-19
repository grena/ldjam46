import Sprite = Phaser.GameObjects.Sprite;
import MainScene from "../scene/MainScene";
import RoundBox from "./RoundBox";

export default class BarriereLeft {
  static price = 10;

  scene: MainScene;
  xPos: integer;
  yPos: integer;
  barriereNumber: number;

  isBuilt: boolean;
  public sprite: Sprite;
  barriereSprite: Sprite;
  roundBox: RoundBox;

  constructor(s: MainScene, x: integer, y: integer, i: number) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.isBuilt = false;
    this.barriereNumber = i;
    this.roundBox = new RoundBox(this.scene, null);
  }

  create() {
    const detection_height = 15;
    const detection_width = 37;

    this.sprite = new Sprite(this.scene, this.xPos - 2, this.yPos + 1, 'button-buy');
    this.sprite.alpha = 0.5;
    this.sprite.width = detection_width;
    this.sprite.height = detection_height;
    this.barriereSprite = new Sprite(this.scene, 0, 0, 'parpaing' + (this.barriereNumber));
    this.barriereSprite.setOrigin(0, 0);
    this.barriereSprite.alpha = 0;

    this.roundBox.create();
    this.roundBox.setPosition(this.xPos - 3, this.yPos);
    this.roundBox.draw(detection_width, detection_height);
    this.roundBox.setAlpha(0);

    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', this.onObjectClicked.bind(this));
    this.sprite.on('pointerout', this.onPointerOut.bind(this));
    this.sprite.on('pointerover',this.onPointerIn.bind(this));

    this.scene.add.existing(this.sprite);
    this.scene.add.existing(this.barriereSprite);
  }

  onObjectClicked(): void {
    if (this.isBuilt) return;

    if (this.scene.thunesCompteur.argent >= BarriereLeft.price) {
      this.scene.sound.play('build');
      this.isBuilt = true;
      this.barriereSprite.alpha = 1;
      this.scene.thunesCompteur.addThunes(-BarriereLeft.price);
      this.sprite.destroy();
      this.roundBox.destroy();
      this.scene.hideTooltip();
    }
  }

  onPointerIn(): void {
    this.scene.sound.play('button');
    this.sprite.alpha = 1;
    this.roundBox.setAlpha(1);
    this.scene.showTooltip('Buy a barrier', this.xPos - 20, this.yPos + 18);
  }

  onPointerOut(): void {
    this.sprite.alpha = 0.5;
    this.roundBox.setAlpha(0);
    this.scene.hideTooltip();
    this.sprite.setFrame(0);
  }
}
