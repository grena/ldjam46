import Graphics = Phaser.GameObjects.Graphics;

export default class RoundBox extends Graphics {
  bgColor;

  constructor(scene: Phaser.Scene, bgcolor: number|null) {
    super(scene);
    this.bgColor = bgcolor;
  }

  draw(width, height) {
    this.clear();
    if (this.bgColor) {
      this.fillStyle(this.bgColor, 1);
      this.fillRect(1, 1, width, height);
    }
    this.lineStyle(1, 0xffedd4, 1);
    this.moveTo(2.5, 0.5);
    this.lineTo(width - 0.5, 0.5);
    this.lineTo(width + 1.5, 2.5);
    this.lineTo(width + 1.5, height - 0.5);
    this.lineTo(width - 0.5, height + 1.5);
    this.lineTo(2.5, height + 1.5);
    this.lineTo(0.5, height - 0.5);
    this.lineTo(0.5, 2.5);
    this.lineTo(2.5, 0.5);
    this.stroke();
  }
}