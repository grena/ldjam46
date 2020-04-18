import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;

export default class Grass {
  scene: Scene;
  health: integer = 0;
  xPos: integer;
  yPos: integer;

  constructor(s: Scene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
  }

  getSprite(): Sprite {
    let sprite: Sprite;

    if (this.health == 0) {
      sprite = new Sprite(this.scene, this.xPos, this.yPos, 'grass_0');
    }

    sprite.setOrigin(0, 0);

    return sprite;
  }
}
