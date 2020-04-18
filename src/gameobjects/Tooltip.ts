import Scene = Phaser.Scene;
import BitmapText = Phaser.GameObjects.BitmapText;
import Graphics = Phaser.GameObjects.Graphics;

export default class Tooltip {
  scene: Scene;
  text: BitmapText;
  graphics: Graphics;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics({
      x: 0,
      y: 0,
      fillStyle: {
        color: 0x312e2f,
        alpha: 1
      },
      lineStyle: {
        color: 0xffedd4,
        width: 1,
      }
    });
    this.text = scene.add.bitmapText(100, 100, 'Carrier Command', '', 5);
    this.graphics.alpha = 0;
    this.graphics.alpha = 1;
  }

  displayTextAt(txt: string, x, y) {
    this.graphics.clear();
    const width = txt.length * 6;
    const height = 9;
    this.graphics.setPosition(x, y);
    this.graphics.fillRect(1, 1, width, height);
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
    this.text.setPosition(x + 3, y + 3);
    this.text.setText(txt);
    this.graphics.alpha = 1;
    this.text.alpha = 1;
  }

  hideText() {
    this.graphics.alpha = 0;
    this.text.alpha = 0;
  }
}