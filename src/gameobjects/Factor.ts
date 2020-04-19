import MainScene from "../scene/MainScene";
import Sprite = Phaser.GameObjects.Sprite;
import Tween = Phaser.Tweens.Tween;

const STREET_RIGHT = 540;
const BOITE_A_LETTRES_X = 215;
const BOITE_A_LETTRES_Y = 105;
const Y = 320;

export default class Factor {
  scene: MainScene;
  sprite: Sprite;
  tweenwalkfromLeft: Tween = null;
  goDownStreetTween: Tween = null;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  create() {
    this.sprite = this.scene.add.sprite(-30, Y, 'humangreen');
    this.sprite.setDepth(MainScene.getRenderOrder('FACTOR'));
    this.sprite.setScale(2);
    this.sprite.anims.animationManager.create({
      key: 'walk_front',
      frames: this.sprite.anims.animationManager.generateFrameNumbers('humangreen', { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1
    });
    this.sprite.anims.animationManager.create({
      key: 'walk_back',
      frames: this.sprite.anims.animationManager.generateFrameNumbers('humangreen', { start: 6, end: 11 }),
      frameRate: 12,
      repeat: -1
    });
    this.sprite.setScale(-2, 2);
    this.sprite.anims.play('walk_front');
  }

  goDistribute() {
    this.tweenwalkfromLeft = this.scene.tweens.add({
      targets: this.sprite,
      x: STREET_RIGHT,
      y: Y,
      duration: 15000,
      repeat: 0,
      yoyo: false,
      onUpdate: () => {
        const gapEntry = 10;
        const possibleEntries = this.scene.getPossibleEntries();
        possibleEntries.forEach((possibleEntrie) => {
          const left = 137 + 38 * possibleEntrie + gapEntry;
          const right = 137 + 38 * (possibleEntrie + 1) - gapEntry;
          if (this.sprite.x > left && this.sprite.x < right) {
            this.tweenwalkfromLeft.remove();
            this.tweenwalkfromLeft.stop();
            this.goBoiteAuxLettres();
          }
        });
      },
      onComplete: () => {
        this.sprite.destroy();
      }
    });
    if (this.scene.getPossibleEntries().length === 0) {
      this.scene.time.addEvent({
        callback: () => {
          this.throwCourrier();
        },
        delay: 3500 + Math.random() * 7500
      });
    }
  }

  goBoiteAuxLettres() {
    this.sprite.anims.play('walk_back');
    this.scene.tweens.add({
      targets: this.sprite,
      x: BOITE_A_LETTRES_X,
      y: BOITE_A_LETTRES_Y,
      duration: 4000,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.goDownStreet(0);
        this.scene.sound.play('mail');
      }
    });
    for (let i = 0; i < 6; i++) {
      this.scene.time.addEvent({delay: 4000 / 6 * (i + 1), callback: () => { this.abimePelouse( 5 - i) }});
    }
  }

  goDownStreet(progress: number) {
    this.sprite.anims.play('walk_front');
    if (progress === 0) {
      this.scene.tweens.add({
        targets: this.sprite,
        y: Y,
        duration: 4000,
        repeat: 0,
        yoyo: false
      });
    }
    if (this.goDownStreetTween !== null) {
      return;
    }
    this.goDownStreetTween = this.scene.tweens.add({
      targets: this.sprite,
      x: this.getOutY(),
      duration: 4000 * (1 - progress),
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.goRight();
      },
      onUpdate: () => {
        if (this.goDownStreetTween && this.goDownStreetTween.data && this.goDownStreetTween.data[0]) {
          const end = this.goDownStreetTween.data[0].end;
          if (end === 0) {
            return;
          }
          if (this.goDownStreetTween.data[0].end !== this.getOutY()) {
            const progress = this.goDownStreetTween.data[0].progress;
            this.goDownStreetTween.remove();
            this.goDownStreetTween.stop();
            this.goDownStreetTween = null;
            this.goDownStreet(progress);
          }
        }
      }
    });
    for (let i = 0; i < 6; i++) {
      this.scene.time.addEvent({delay: 4000 / 6 * (i + 1), callback: () => { this.abimePelouse( i) }});
    }
  }

  private getOutY() {
    const possibleEntries = this.scene.getPossibleEntries();
    const lastEntry = possibleEntries[possibleEntries.length - 1];
    return 137 + lastEntry * 38 + 38 / 2;
  }

  private goRight() {
    // 560px en 15s
    // length en
    const length = STREET_RIGHT - this.sprite.x;
    this.tweenwalkfromLeft = this.scene.tweens.add({
      targets: this.sprite,
      x: STREET_RIGHT,
      y: Y,
      duration: length * 15000 / 560,
      repeat: 0,
      yoyo: false,
      onComplete: () => {
        this.sprite.destroy();
      }
    });
  }

  private abimePelouse(atLine: number) {
    const x = this.sprite.x;
    const tile = Math.round((x - 137 - 38 / 2) / 38);
    this.scene.abimeGazonAt(tile, atLine);
  }

  isInsideTheGarden() {
    return this.sprite.x >= 137 && this.sprite.x < 365 && this.sprite.y >= 140 && this.sprite.y < 320;
  }

  private throwCourrier() {
    if (this.tweenwalkfromLeft) {
      this.tweenwalkfromLeft.pause();
      this.sprite.anims.pause();
      this.scene.time.addEvent({
        callback: () => {
          this.tweenwalkfromLeft.resume();
          this.sprite.anims.resume();
          const letter = this.scene.add.sprite(this.sprite.x, this.sprite.y + 10 + Math.random() * 30, 'letters', Math.floor(Math.random() * 4))
          if (Math.random() > 0.5) {
            letter.setScale(-1, 1);
          }
        },
        delay: 500
      });
    }
  }
}
