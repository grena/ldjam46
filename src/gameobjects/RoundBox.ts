import Graphics = Phaser.GameObjects.Graphics;
import Scene = Phaser.Scene;
import MainScene from "../scene/MainScene";

export default class RoundBox {
  graphics: Graphics;
  scene: Scene;
  bgColor;

  constructor(scene: Phaser.Scene, bgcolor: number|null) {
    this.scene = scene;
    this.bgColor = bgcolor;
  }

  draw(width, height) {
    this.graphics.clear();
    if (this.bgColor) {
      this.graphics.fillStyle(this.bgColor, 1);
      this.graphics.fillRect(1, 1, width, height);
    }
    this.graphics.lineStyle(1, 0xffedd4, 1);
    this.graphics.moveTo(2.5, 0.5);
    this.graphics.lineTo(width - 0.5, 0.5);
    this.graphics.lineTo(width + 1.5, 2.5);
    this.graphics.lineTo(width + 1.5, height - 0.5);
    this.graphics.lineTo(width - 0.5, height + 1.5);
    this.graphics.lineTo(2.5, height + 1.5);
    this.graphics.lineTo(0.5, height - 0.5);
    this.graphics.lineTo(0.5, 2.5);
    this.graphics.lineTo(2.5, 0.5);
    this.graphics.stroke();
  }

  create() {
    this.graphics = this.scene.add.graphics({x: 0, y: 0, fillStyle: {
      color: 0x00ffff,
      alpha: 1
    }});
    this.graphics.setDepth(MainScene.getRenderOrder('TOOLTIP'));
  }

  setDepth(depth) {
    this.graphics.setDepth(depth);
  }

  setPosition(xPos: integer, yPos: integer) {
    return this.graphics.setPosition(xPos, yPos);
  }

  setAlpha(number: number) {
    this.graphics.alpha = number;
  }

  destroy() {
    this.graphics.destroy();
  }
}
