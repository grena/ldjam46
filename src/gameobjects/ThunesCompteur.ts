import Scene = Phaser.Scene;
import Text = Phaser.GameObjects.Text;

export default class ThunesCompteur {
  scene: Scene;
  argent: number;
  text: Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.argent = 200;
  }

  create() {
    this.text = new Text(this.scene, 450, 10, '', {
      fontSize: '20px',
      color: '#fff'
    });

    this.text.setText(this.argent + '$')

    this.scene.add.existing(this.text);
  }

  addThunes(number: number) {
    this.argent += number;
    this.text.setText(this.argent + '$');

    this.displayMoneyChange(number);
  }

  displayMoneyChange(number) {
    const duration = 800;
    const color = number > 0 ? '#00ff35' : '#ff1c00';
    const sign = number > 0 ? '+' : '';

    let text = new Text(this.scene, this.text.x + 8, this.text.y + 18, sign + number + "$",
      {
        fontSize: '15px',
        color: color
      });

    this.scene.add.existing(text);

    const destY = text.y + 20;

    this.scene.tweens.add({
      targets: [this.text],
      ease: 'Ease.out',
      y: this.text.y + 5,
      duration: 50,
      repeat: 0,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: [text],
      ease: 'Ease.out',
      y: destY,
      duration: duration,
      repeat: 0,
      yoyo: false,
    });

    this.scene.time.addEvent({
      delay: duration,
      callback: this.endMoneyChange.bind(this, [text])
    });
  }

  endMoneyChange(args) {
    let text: Text = args[0];
    text.destroy();
  }
}
