import Scene = Phaser.Scene;
import BitmapText = Phaser.GameObjects.BitmapText;
import RoundBox from "./RoundBox";
import MainScene from "../scene/MainScene";

export default class Tooltip {
  scene: Scene;
  text: BitmapText;
  roundBox: RoundBox;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.roundBox = new RoundBox(scene, 0x312e2f);
  }

  create() {
    this.roundBox.create();
    this.text = this.scene.add.bitmapText(100, 100, 'Carrier Command', '', 5);
    this.text.setDepth(MainScene.getRenderOrder('TOOLTIP'));
    this.roundBox.setAlpha(0);
    this.text.alpha = 0;
  }

  displayTextAt(txt: string, x, y) {
    this.roundBox.setPosition(x, y);
    this.roundBox.draw(txt.length * 6 + 1, 9);
    this.text.setPosition(x + 3, y + 3);
    this.text.setText(txt);
    this.roundBox.setAlpha(1);
    this.text.alpha = 1;
  }

  hideText() {
    this.roundBox.setAlpha(0);
    this.text.alpha = 0;
  }
}