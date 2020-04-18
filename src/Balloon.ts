import Scene = Phaser.Scene;
import Sprite = Phaser.GameObjects.Sprite;

export default class Baloon {
  scene: Scene;
  sprite: Sprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  send(lineNumber: number, withRebond: boolean) {
    const yGap = lineNumber * 30;
    let positions = [
      [0, 84 + yGap],
      [20, 64 + yGap],
      [40, 53 + yGap],
      [60, 50 + yGap],
      [80, 52 + yGap],
      [100, 60 + yGap],
      [120, 77 + yGap],
      [140, 108 + yGap],
      [150, 153 + yGap],
      [160, 150 + yGap],
      [169, 148 + yGap],
      [181, 150 + yGap],
      [188, 153 + yGap],
      [190, 153 + yGap]
    ];
    if (withRebond) {
      positions = [
        [0, 84 + yGap],
        [20, 64 + yGap],
        [40, 53 + yGap],
        [60, 50 + yGap],
        [80, 52 + yGap],
        [100, 60 + yGap],
        [120, 77 + yGap],
        [110, 90 + yGap],
        [100, 108 + yGap],
        [90, 153 + yGap],
        [80, 150 + yGap],
        [71, 148 + yGap],
        [59, 150 + yGap],
        [54, 153 + yGap],
        [52, 153 + yGap]
      ]
    }
    let startAt = 0;
    const diff = 150;
    this.sprite = this.scene.add.sprite(positions[0][0], positions[0][1], 'balloon');
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
        }
      })
      startAt += diff;
    })
  }
}
