import SaloperieDirectOnGrass from "./SaloperieDirectOnGrass";
import Grass from "../Grass";
import Scene = Phaser.Scene;

export default class Champi extends SaloperieDirectOnGrass {
  grass: Grass;
  event: Phaser.Time.TimerEvent;

  static REPETITION_DU_GRIGNOTAGE = 10000;

  constructor(s: Scene, grass: Grass) {
    super(s, 0, 0, 'champi');

    const gapX = 20;
    this.sprite.x = grass.xPos + Math.random() * gapX - (gapX / 2);
    const gapY = 15;
    this.sprite.y = grass.yPos + Math.random() * gapY - (gapY / 2);

    this.grass = grass;

    // Décommenter pour enclencher le grignotage
    // this.planToAbime();
  }

  planToAbime() {
    this.event = this.scene.time.addEvent({
      delay: Champi.REPETITION_DU_GRIGNOTAGE,
      callback: this.grignoter.bind(this)
    });
  }

  timeToClean() {
    return 1000;
  }

  kill() {
    super.kill();
    this.scene.sound.play('champi-out');
  }

  grignoter() {
    if (this.grass.health > 0) {
      // this.scene.sound.play('taupe');
      this.grass.abime(false);
      this.planToAbime();
    }
  }
}
