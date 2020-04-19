import Graphics = Phaser.GameObjects.Graphics;
import MainScene from "../scene/MainScene";
import Sprite = Phaser.GameObjects.Sprite;

const Y = 330;
const X_ARRIVAL = 235;
const SPEED = 20;
const TIME_AFTER_PHOTO = 1000;
const TIME_BEFORE_PHOTO = 2000;

export default class Inspector {
  scene: MainScene;
  sprite: Sprite;
  photoTime: number;
  hasTookPhoto: boolean;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  create() {
    this.sprite = new Sprite(this.scene, -50, -50, 'inspector');
    this.sprite.setScale(2, 2);

    this.scene.add.existing(this.sprite);
    this.runAnimation();
  }

  private runAnimation() {
    this.sprite.anims.animationManager.create({
      key: 'RUN',
      frames: this.sprite.anims.animationManager.generateFrameNumbers('inspector', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    });
    this.sprite.anims.animationManager.create({
      key: 'PHOTO',
      frames: this.sprite.anims.animationManager.generateFrameNumbers('inspector', { start: 6, end: 6 }),
      frameRate: 5,
      repeat: -1
    });
    this.sprite.anims.play('RUN');
  }

  private stopAnimation() {
    this.sprite.anims.stop();
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
      this.sprite.anims.play('PHOTO');
      this.stopAnimation();
      if (now > this.photoTime && !this.hasTookPhoto) {
        this.tookPhoto();
      }
    } else if (now < timeToArrive) {
      if(!this.sprite.anims.isPlaying) this.sprite.anims.play('RUN');
      const remaining = timeToArrive - now;
      x = X_ARRIVAL + remaining / SPEED;
    } else if (now > timeToGo) {
      if(!this.sprite.anims.isPlaying) this.sprite.anims.play('RUN');
      const remaining = timeToGo - now;
      x = X_ARRIVAL + remaining / SPEED;
    }

    this.sprite.setPosition(x, Y);
  }

  private tookPhoto() {
    this.sprite.anims.play('RUN');
    this.hasTookPhoto = true;
    this.scene.tookPhoto();
    this.scene.sound.play('photo');
  }
}
