import Sprite = Phaser.GameObjects.Sprite;
import MainScene from "../scene/MainScene";
import RoundBox from "./RoundBox";

export default class BarriereFenetre {
  static price = 40;

  scene: MainScene;
  xPos: integer;
  yPos: integer;
  barriereNumber: number;

  isBuilt: boolean;
  public buySprite: Sprite;
  barriereSprite: Sprite;
  roundBox: RoundBox;
  callback: CallableFunction;

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
    const detection_width = 17;

    this.buySprite = new Sprite(this.scene, this.xPos - 2, this.yPos + 1, 'button-buy-fenetre');
    this.buySprite.alpha = 0.30;
    this.buySprite.width = detection_width;
    this.buySprite.height = detection_height;
    this.barriereSprite = new Sprite(this.scene, 0, 0, 'barricade' + this.barriereNumber);
    this.barriereSprite.setOrigin(0, 0);
    this.barriereSprite.alpha = 0;

    this.roundBox.create();
    this.roundBox.setPosition(this.xPos - 3, this.yPos);
    this.roundBox.draw(detection_width, detection_height);
    this.roundBox.setAlpha(0);

    this.buySprite.setOrigin(0, 0);
    this.buySprite.setInteractive();
    this.buySprite.on('pointerdown', this.onObjectClicked.bind(this));
    this.buySprite.on('pointerout', this.onPointerOut.bind(this));
    this.buySprite.on('pointerover',this.onPointerIn.bind(this));

    this.scene.add.existing(this.buySprite);
    this.buySprite.setDepth(MainScene.getRenderOrder('BUTTONS'));
    this.scene.add.existing(this.barriereSprite);
    this.barriereSprite.setDepth(MainScene.getRenderOrder('LEFT_WALL_' + this.barriereNumber));
  }

  setCallbackBuy(callback: CallableFunction) {
    this.callback = callback;
  }

  onObjectClicked(): void {
    if (this.isBuilt) return;

    if (this.scene.thunesCompteur.argent >= BarriereFenetre.price) {
      if (this.callback !== null) this.callback(this.barriereNumber);
      this.scene.sound.play('build');
      this.isBuilt = true;
      this.barriereSprite.alpha = 1;
      this.scene.thunesCompteur.addThunes(-BarriereFenetre.price);
      this.buySprite.destroy();
      this.roundBox.destroy();
      this.scene.hideTooltip();
    }
  }

  onPointerIn(): void {
    this.scene.sound.play('button');
    this.buySprite.alpha = 1;
    this.roundBox.setAlpha(1);
    this.scene.showTooltip('Buy a barrier (-' + BarriereFenetre.price + ')', this.xPos - 50, this.yPos + 18);
  }

  onPointerOut(): void {
    this.buySprite.alpha = 0.30;
    this.roundBox.setAlpha(0);
    this.scene.hideTooltip();
    this.buySprite.setFrame(0);
  }
}
