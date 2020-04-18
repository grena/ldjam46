import Scene = Phaser.Scene;
import Saloperie from "./Saloperie";
import Grass from "../Grass";

export default class Taupe extends Saloperie{

  static REPETITION_DU_GRIGNOTAGE = 5000;


  grass: Grass;
  event: Phaser.Time.TimerEvent;

  constructor(s: Scene, grass: Grass) {
    const xOffset = 5;
    const yOffset = 5;
    super(s, grass.xPos + xOffset, grass.yPos + yOffset, 'taupe');

    this.grass = grass;
    this.timeToClean = 2000;

    this.planToAbime();
  }

  planToAbime() {
    this.event = this.scene.time.addEvent({
      delay: Taupe.REPETITION_DU_GRIGNOTAGE,
      callback: this.grignoter.bind(this)
    });
  }

  grignoter() {
    if (this.grass.health > 0) {
      this.scene.sound.play('taupe');
      this.grass.abime();
      this.planToAbime();
    }
  }

  kill() {
    super.kill();
    this.event.destroy();
  }
}
