import Scene = Phaser.Scene;
import SaloperieDirectOnGrass from "./SaloperieDirectOnGrass";
import Grass from "../Grass";

export default class Taupe extends SaloperieDirectOnGrass {

  static REPETITION_DU_GRIGNOTAGE = 5000;

  grass: Grass;
  event: Phaser.Time.TimerEvent;

  constructor(s: Scene, grass: Grass) {
    super(s, 0, 0, 'taupe');

    const gapX = 20;
    this.sprite.x = grass.xPos + Math.random() * gapX - (gapX / 2);
    const gapY = 15;
    this.sprite.y = grass.yPos + Math.random() * gapY - (gapY / 2);

    this.grass = grass;

    this.planToAbime();
    this.runAnimation();
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
      this.grass.abime(false);
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

  private runAnimation() {
    this.sprite.anims.animationManager.create({
      key: 'ANIMATIONDELATAUPEDEOUF',
      frames: this.sprite.anims.animationManager.generateFrameNumbers('taupe', { frames: [0,0,0,0,0,1,0,1,0,2,2,2,2,2,2,2,3,2,3,2] }),
      frameRate: 5,
      repeat: -1
    });
    this.sprite.anims.play('ANIMATIONDELATAUPEDEOUF');
  }
}
