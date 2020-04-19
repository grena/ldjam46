import Sprite = Phaser.GameObjects.Sprite;
import MainScene from "../scene/MainScene";
import RoundBox from "./RoundBox";
import Balloon from "../Balloon";
import Graphics = Phaser.GameObjects.Graphics;
import Point = Phaser.Geom.Point;
import BarriereFenetre from "./BarriereFenetre";

export default class BarriereLeft {
  static price = 50;

  scene: MainScene;
  xPos: integer;
  yPos: integer;
  barriereNumber: number;

  isBuilt: boolean;
  public buySprite: Sprite;
  barriereSprite: Sprite;
  roundBox: RoundBox;
  shadow: Graphics;

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

    this.buySprite = new Sprite(this.scene, this.xPos - 2, this.yPos + 1, 'button-buy');
    this.buySprite.alpha = 0.5;
    this.buySprite.width = detection_width;
    this.buySprite.height = detection_height;
    this.barriereSprite = new Sprite(this.scene, 0, 0, 'parpaing' + (this.barriereNumber));
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

    this.shadow = this.scene.add.graphics({x: this.xPos, y: this.yPos, fillStyle: {color: 0x000000, alpha: 0.2}});
    this.shadow.setDepth(MainScene.getRenderOrder('BUTTONS'));
    this.shadow.fillPoints([
      new Point(50, 30),
      new Point(153 + Math.random() * 5, 10 + Math.random() * 5),
      new Point(153 + Math.random() * 5, -15 + Math.random() * 5),
      new Point(50, 0)
    ], true, true);
    this.shadow.setAlpha(0);

    this.scene.add.existing(this.buySprite);
    this.buySprite.setDepth(MainScene.getRenderOrder('BUTTONS'));
    this.scene.add.existing(this.barriereSprite);
    this.barriereSprite.setDepth(MainScene.getRenderOrder('LEFT_WALL_' + this.barriereNumber));
  }

  onObjectClicked(): void {
    if (this.isBuilt) return;

    if (this.scene.thunesCompteur.argent >= BarriereLeft.price) {
      this.scene.sound.play('build');
      this.isBuilt = true;
      this.barriereSprite.alpha = 1;
      this.scene.thunesCompteur.addThunes(-BarriereLeft.price);
      this.buySprite.destroy();
      this.roundBox.destroy();
      this.scene.hideTooltip();
      this.shadow.setAlpha(1);
      const balloon = new Balloon(this.scene);
      balloon.send(this.barriereNumber);
    } else {
      this.scene.brrrtThunes();
    }
  }

  onPointerIn(): void {
    this.scene.sound.play('button');
    this.buySprite.alpha = 1;
    this.roundBox.setAlpha(1);

    this.scene.showTooltip('Buy a barrier (-' + BarriereLeft.price + ')', this.xPos - 40, this.yPos + 18);
  }

  onPointerOut(): void {
    this.buySprite.alpha = 0.5;
    this.roundBox.setAlpha(0);
    this.scene.hideTooltip();
    this.buySprite.setFrame(0);
  }
}
