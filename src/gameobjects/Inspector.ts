import Graphics = Phaser.GameObjects.Graphics;
import MainScene from "../scene/MainScene";

const Y = 330;
const X_ARRIVAL = 235;
const SPEED = 20;
const TIME_AFTER_PHOTO = 1000;
const TIME_BEFORE_PHOTO = 2000;

export default class Inspector {
  scene: MainScene;
  graphics: Graphics;
  photoTime: number;
  hasTookPhoto: boolean;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  create() {
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
    console.log("L'inspecteur arrive dans " + (remainingDuration / 1000) + " s!");
    this.hasTookPhoto = false;
    this.photoTime = this.scene.time.now + remainingDuration;
  }

  update() {
    if (!this.photoTime) {
      return;
    }
    const now = this.scene.time.now;
    const timeToArrive = this.photoTime - TIME_BEFORE_PHOTO;
    const timeToGo = this.photoTime + TIME_AFTER_PHOTO;
    let x = X_ARRIVAL;
    if (now > timeToArrive && now < timeToGo) {
      if (now > this.photoTime && !this.hasTookPhoto) {
        this.tookPhoto();
      }
    } else if (now < timeToArrive) {
      const remaining = timeToArrive - now;
      x = X_ARRIVAL + remaining / SPEED;
    } else if (now > timeToGo) {
      const remaining = timeToGo - now;
      x = X_ARRIVAL + remaining / SPEED;
    }

    this.graphics.setPosition(x, Y);
  }

  private tookPhoto() {
    this.hasTookPhoto = true;
    this.scene.tookPhoto();
    this.scene.sound.play('photo');
  }
}
