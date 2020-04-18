import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;

export default class Saloperie {
  scene: Scene;
  timeToClean = 1000;
  xPos: integer;
  yPos: integer;
  spriteName: string;

  public sprite: Sprite;

  constructor(s: Scene, x: integer, y: integer, spriteName: string) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.spriteName = spriteName;

    this.initializeSprite();
  }

  initializeSprite() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, this.spriteName);
    this.sprite.setOrigin(0, 0);
  }

  kill() {
    this.sprite.destroy();
  }
}
