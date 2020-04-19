import Sprite = Phaser.GameObjects.Sprite;
import Graphics = Phaser.GameObjects.Graphics;
import MainScene from "./scene/MainScene";
import Saloperie from "./gameobjects/saloperies/Saloperie";

export default class Balloon implements Saloperie {
  kill() {
    this.sprite.destroy();
    this.shadowGraphics.destroy();
  }

  timeToClean(): number {
    return 2000;
  }

  scene: MainScene;
  sprite: Sprite;
  debugsGraphics: Graphics;
  shadowGraphics: Graphics;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  send(lineNumber: number) {
    let withRebond = false;
    if (this.scene.hasLeftBarriereAt(lineNumber)) {
      withRebond = true;
    }
    const debug = false;
    let diffShadow = 61;
    if (withRebond) {
      diffShadow += 10;
    }
    const yGap = lineNumber * 30;
    const gapInterTiles = 10;
    const fixyGap = -15 + gapInterTiles;
    const fixxGap = -23 + gapInterTiles;

    const randomY = Math.random() * (38 - 2 * gapInterTiles);
    const randomX = Math.random() * (30 - 2 * gapInterTiles);
    let positions = [
      [0 + fixxGap + randomX, 94 + yGap + fixyGap + randomY],
      [20 + fixxGap + randomX, 64 + yGap + fixyGap + randomY],
      [40 + fixxGap + randomX, 53 + yGap + fixyGap + randomY],
      [60 + fixxGap + randomX, 50 + yGap + fixyGap + randomY],
      [80 + fixxGap + randomX, 52 + yGap + fixyGap + randomY],
      [100 + fixxGap + randomX, 60 + yGap + fixyGap + randomY],
      [120 + fixxGap + randomX, 77 + yGap + fixyGap + randomY],
      [140 + fixxGap + randomX, 108 + yGap + fixyGap + randomY],
      [150 + fixxGap + randomX, 153 + yGap + fixyGap + randomY],
      [160 + fixxGap + randomX, 142 + yGap + fixyGap + randomY],
      [169 + fixxGap + randomX, 140 + yGap + fixyGap + randomY],
      [181 + fixxGap + randomX, 142 + yGap + fixyGap + randomY],
      [188 + fixxGap + randomX, 153 + yGap + fixyGap + randomY],
      [195 + fixxGap + randomX, 153 + yGap + fixyGap + randomY],
      [199 + fixxGap + randomX, 153 + yGap + fixyGap + randomY]
    ];
    if (withRebond) {
      positions = [
        [0 + fixxGap + randomX, 84 + yGap + fixyGap + randomY],
        [20 + fixxGap + randomX, 64 + yGap + fixyGap + randomY],
        [40 + fixxGap + randomX, 53 + yGap + fixyGap + randomY],
        [60 + fixxGap + randomX, 50 + yGap + fixyGap + randomY],
        [80 + fixxGap + randomX, 52 + yGap + fixyGap + randomY],
        [100 + fixxGap + randomX, 60 + yGap + fixyGap + randomY],
        [100 + fixxGap + randomX, 77 + yGap + fixyGap + randomY],
        [110 + fixxGap + randomX, 90 + yGap + fixyGap + randomY],
        [100 + fixxGap + randomX, 108 + yGap + fixyGap + randomY],
        [90 + fixxGap + randomX, 153 + yGap + fixyGap + randomY],
        [80 + fixxGap + randomX, 142 + yGap + fixyGap + randomY],
        [71 + fixxGap + randomX, 140 + yGap + fixyGap + randomY],
        [59 + fixxGap + randomX, 142 + yGap + fixyGap + randomY],
        [54 + fixxGap + randomX, 153 + yGap + fixyGap + randomY],
        [52 + fixxGap + randomX, 153 + yGap + fixyGap + randomY]
      ]
    }
    let startAt = 0;
    const diff = 150;
    this.sprite = this.scene.add.sprite(positions[0][0], positions[0][1], 'balloon');
    this.sprite.setDepth(MainScene.getRenderOrder('BALLOONS_' + lineNumber));
    this.shadowGraphics = this.scene.add.graphics({x: positions[0][0], y: positions[0][1] + diffShadow, fillStyle: {color: 0x000000, alpha: 0.3}});
    this.shadowGraphics.fillCircle(0, 0, 7);
    if (debug) {
      this.debugsGraphics = this.scene.add.graphics({x: 0, y: 0, lineStyle: {
        width: 1,
        color: 0x00ff00,
        alpha: 1
      }});
      this.debugsGraphics.moveTo(positions[0][0], positions[0][1]);
    }
    positions.forEach((position) => {
      this.scene.time.addEvent({
        delay: startAt,
        callback: () => {
          this.scene.tweens.add({
            targets: this.sprite,
            x: position[0],
            y: position[1],
            duration: diff
          });
          this.scene.tweens.add({
            targets: this.shadowGraphics,
            x: position[0] + 2,
            duration: diff,
          });
          if (debug) {
            this.debugsGraphics.lineTo(position[0], position[1]);
            this.debugsGraphics.stroke();
          }
        }
      });
      startAt += diff;
    });
    if (!withRebond) {
      this.scene.time.addEvent({
        delay: diff * 9,
        callback: () => {
          this.scene.abimeGazonAt(0, lineNumber);
          this.scene.sound.play('ballon1');
        }
      });
      this.scene.time.addEvent({
        delay: diff * 13,
        callback: () => {
          this.scene.addSaloperieOn(this, 1, lineNumber);
          this.scene.sound.play('ballon2');
        }
      });
    } else {
      this.scene.time.addEvent({
        delay: diff * 6,
        callback: () => {
          this.scene.sound.play('ballon1');
        }
      });
      this.scene.time.addEvent({
        delay: diff * 10,
        callback: () => {
          this.scene.sound.play('ballon1');
        }
      });
      this.scene.time.addEvent({
        delay: diff * 12,
        callback: () => {
          this.scene.sound.play('ballon2');
        }
      });
      this.scene.time.addEvent({
        delay: diff * 14,
        callback: () => {
          this.scene.sound.play('ballon2');
        }
      });
    }
  }
}
