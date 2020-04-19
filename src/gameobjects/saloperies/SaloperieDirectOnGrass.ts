import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;

export default abstract class SaloperieDirectOnGrass implements Saloperie {
  scene: Scene;
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

  timeToClean(): number {
    throw new Error('Implemente cette methode mon cochon');
  }
}
