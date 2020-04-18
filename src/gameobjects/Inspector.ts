import Scene = Phaser.Scene;
import Graphics = Phaser.GameObjects.Graphics;

const Y = 300;
const X_ARRIVAL = 235;
const SPEED = 20;
const TIME_AFTER_PHOTO = 1000;
const TIME_BEFORE_PHOTO = 2000;

export default class Inspector {
  scene: Scene;
  graphics: Graphics;
  photoTime: number;

  constructor(scene: Scene) {
    this.scene = scene;
    this.graphics = this.scene.add.graphics({
      x: 20,
      y: 20,
      fillStyle: {
        color: 0x00ff00,
        alpha: 1
      }
    });
    this.graphics.fillRect(0, 0, 30, 40);
  }

  prepareVenue(remainingDuration: number) {
    this.photoTime = this.scene.time.now + remainingDuration;
  }

  render() {
    const now = this.scene.time.now;
    const timeToArrive = this.photoTime - TIME_BEFORE_PHOTO;
    const timeToGo = this.photoTime + TIME_AFTER_PHOTO;
    let x = X_ARRIVAL;
    if (now > timeToArrive && now < timeToGo) {
      // Do nothing, you're on the right place
    } else if (now < timeToArrive) {
      const remaining = timeToArrive - now;
      x = X_ARRIVAL + remaining / SPEED;
    } else if (now > timeToGo) {
      const remaining = timeToGo - now;
      x = X_ARRIVAL + remaining / SPEED;
    }

    this.graphics.setPosition(x, Y);
  }
}