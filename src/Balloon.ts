import Scene = Phaser.Scene;
import Sprite = Phaser.GameObjects.Sprite;
import Graphics = Phaser.GameObjects.Graphics;

export default class Baloon {
  scene: Scene;
  sprite: Sprite;
  debugsGraphics: Graphics;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  send(lineNumber: number, withRebond: boolean) {
    const debug = false;

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
        [120 + fixxGap + randomX, 77 + yGap + fixyGap + randomY],
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
          if (debug) {
            this.debugsGraphics.lineTo(position[0], position[1]);
            this.debugsGraphics.stroke();
          }
        }
      });
      startAt += diff;
    })

  }
}
