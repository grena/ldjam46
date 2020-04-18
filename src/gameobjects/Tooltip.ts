import Scene = Phaser.Scene;
import BitmapText = Phaser.GameObjects.BitmapText;
import RoundBox from "./RoundBox";

export default class Tooltip {
  scene: Scene;
  text: BitmapText;
  graphics: RoundBox;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.graphics = new RoundBox(scene, 0x312e2f);
    this.scene.add.existing(this.graphics);
    this.text = scene.add.bitmapText(100, 100, 'Carrier Command', '', 5);
    this.graphics.alpha = 0;
    this.text.alpha = 0;
  }

  displayTextAt(txt: string, x, y) {
    this.graphics.setPosition(x, y);
    this.graphics.draw(txt.length * 6 + 1, 9);
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