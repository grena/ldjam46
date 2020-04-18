import Scene = Phaser.Scene;
import Saloperie from "./Saloperie";

export default class Taupe extends Saloperie{
  constructor(s: Scene, x: integer, y: integer) {
    const xOffset = 5;
    const yOffset = 5;

    super(s, x + xOffset, y + yOffset, 'taupe');

    this.timeToClean = 2000;
  }
}
