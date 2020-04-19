import Scene = Phaser.Scene;
import SaloperieDirectOnGrass from "./SaloperieDirectOnGrass";
import Grass from "../Grass";

export default class Taupe extends SaloperieDirectOnGrass {

  static REPETITION_DU_GRIGNOTAGE = 5000;


  grass: Grass;
  event: Phaser.Time.TimerEvent;

  constructor(s: Scene, grass: Grass) {
    super(s, grass.xPos + 5, grass.yPos + 5, 'taupe');

    this.grass = grass;

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

  timeToClean() {
    return 2000;
  }
}
