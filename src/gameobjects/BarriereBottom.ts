import Sprite = Phaser.GameObjects.Sprite;
import MainScene from "../scene/MainScene";
import Text = Phaser.GameObjects.Text;

export default class BarriereBottom {
  static price = 100;

  scene: MainScene;
  xPos: integer;
  yPos: integer;
  barriereNumber: number;

  isBuilt: boolean;
  public sprite: Sprite;
  public text: Text;
  barriereSprite: Sprite;

  constructor(s: MainScene, x: integer, y: integer, i: number) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.isBuilt = false;
    this.barriereNumber = i;

    this.initializeSprite();
  }

  initializeSprite() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, 'button-buy');
    this.barriereSprite = new Sprite(this.scene, 0, 0, 'barbele' + (this.barriereNumber+1));
    this.barriereSprite.setOrigin(0, 0);
    this.barriereSprite.alpha = 0;
    this.text = new Text(this.scene, this.xPos + 10, this.yPos - 1, 'buy', {
      fontSize: '10px',
      color: '#000'
    });

    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', this.onObjectClicked.bind(this));
    this.sprite.on('pointerout', this.onPointerOut.bind(this));
    this.sprite.on('pointerover',this.onPointerIn.bind(this));
  }

  onObjectClicked(): void {
    if (this.isBuilt) return;

    if (this.scene.thunesCompteur.argent >= BarriereBottom.price) {
      this.isBuilt = true;
      this.barriereSprite.alpha = 1;
      this.scene.thunesCompteur.addThunes(-BarriereBottom.price);
      this.sprite.destroy();
      this.text.destroy();
    }
  }

  onPointerIn(): void {
    this.scene.showTooltip('Buy a barrier');
  }

  onPointerOut(): void {
    this.scene.hideTooltip();
    this.sprite.setFrame(0);
  }

  updateSprite(): void {
  }
}
