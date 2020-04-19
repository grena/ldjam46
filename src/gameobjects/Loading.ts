import Scene = Phaser.Scene;
import Graphics = Phaser.GameObjects.Graphics;
import MainScene from "../scene/MainScene";

const RADIUS = 6;

export default class Loading {
  scene: Scene;
  graphics: Graphics;
  startTime: number;
  endTime: number;

  constructor(s: Scene) {
    this.scene = s;
  }

  create() {
    this.graphics = this.scene.add.graphics({
      x: 0,
      y: 0,
      lineStyle: {
        width: 1,
        color: 0x00ff00,
        alpha: 1
      }
    });
    this.graphics.setDepth(MainScene.getRenderOrder('LOADING'));
  }

  show(number: number, x: number, y: number) {
    this.startTime = this.scene.time.now;
    this.endTime = this.scene.time.now + number;
    this.graphics.x = x;
    this.graphics.y = y;
    this.graphics.alpha = 1;
  }

  hide() {
    this.graphics.alpha = 0;
  }

  update() {
    if (this.graphics.alpha <= 0) {
      return;
    }
    const now = this.scene.time.now;
    const duration = this.endTime - this.startTime;
    const percentage = (now - this.startTime) / duration;
    if (percentage > 1) {
      this.hide();
      return;
    }

    const LINEWIDTH = 6;

    this.graphics.clear();
    this.graphics.lineStyle(LINEWIDTH, 0x508657, 1);
    this.graphics.moveTo(0, -RADIUS);
    for (let angle = 0; angle <= Math.PI * 2 * percentage; angle += (Math.PI * 2 / 20)) {
      this.graphics.lineTo(Math.sin(angle) * RADIUS, - Math.cos(angle) * RADIUS);
    }
    this.graphics.stroke();

    const GAP = LINEWIDTH/2;
    this.graphics.beginPath();
    this.graphics.lineStyle(1, 0xffedd4, 1);
    this.graphics.moveTo(0, -(RADIUS + GAP));
    for (let angle = 0; angle <= Math.PI * 2 * percentage; angle += (Math.PI * 2 / 20)) {
      this.graphics.lineTo(Math.sin(angle) * (RADIUS + GAP), - Math.cos(angle) * (RADIUS + GAP));
    }
    this.graphics.stroke();

    this.graphics.beginPath();
    this.graphics.lineStyle(1, 0xffedd4, 1);
    this.graphics.moveTo(0, -(RADIUS - GAP));
    for (let angle = 0; angle <= Math.PI * 2 * percentage; angle += (Math.PI * 2 / 20)) {
      this.graphics.lineTo(Math.sin(angle) * (RADIUS - GAP), - Math.cos(angle) * (RADIUS - GAP));
    }
    this.graphics.stroke();
  }
}
