import Sprite = Phaser.GameObjects.Sprite;
import MainScene from "../scene/MainScene";
import Text = Phaser.GameObjects.Text;

export default class BarriereBottom {
  static price = 100;

  scene: MainScene;
  xPos: integer;
  yPos: integer;

  isBuilt: boolean;
  public sprite: Sprite;
  public text: Text;

  constructor(s: MainScene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.isBuilt = false;

    this.initializeSprite();
  }

  initializeSprite() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, 'button-buy');
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
      this.scene.thunesCompteur.addThunes(-BarriereBottom.price);
    }
  }

  onPointerIn(): void {
    this.sprite.setFrame(1);
  }

  onPointerOut(): void {
    this.sprite.setFrame(0);
  }

  updateSprite(): void {
  }
}
