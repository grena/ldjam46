import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;

export default class Grass {
  scene: Scene;
  health: integer = 0;
  xPos: integer;
  yPos: integer;

  public sprite: Sprite;

  constructor(s: Scene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;

    this.initializeSprite();
  }

  initializeSprite() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, 'grass', this.health);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown',this.onObjectClicked.bind(this));
  }

  updateSprite(): void {
    this.sprite.setFrame(this.health);
  }

  onObjectClicked(): void {
    this.health++;

    this.updateSprite();
  }
}
