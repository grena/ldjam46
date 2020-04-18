import Scene = Phaser.Scene;
import Text = Phaser.GameObjects.Text;

export default class ThunesCompteur {
  scene: Scene;
  argent: number;
  text: Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.argent = 200;

    this.text = new Text(this.scene, 450, 10, '', {
      fontSize: '15px',
      color: '#fff'
    });

    this.text.setText(this.argent + '$')

    this.scene.add.existing(this.text);
  }

  addThunes(number: number) {
    this.argent += number;
    this.text.setText(this.argent + '$');
  }
}