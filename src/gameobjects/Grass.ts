import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;
import Loading from "./Loading";
import RoundBox from "./RoundBox";
import SaloperieDirectOnGrass from "./saloperies/SaloperieDirectOnGrass";
import Saloperie from "./saloperies/Saloperie";
import ParticleEmitterManager = Phaser.GameObjects.Particles.ParticleEmitterManager;
import ParticleEmitter = Phaser.GameObjects.Particles.ParticleEmitter;

const LEVEL_MAX = 4;

export default class Grass {
  static WIDTH = 38;
  static HEIGHT = 30;

  scene: Scene;
  health: integer;
  xPos: integer;
  yPos: integer;
  event: Phaser.Time.TimerEvent;
  loading: Loading;
  saloperies: Saloperie[];
  gridX;
  gridY;
  roundBox: RoundBox;
  particles: ParticleEmitterManager;
  emitter: ParticleEmitter;

  public sprite: Sprite;

  constructor(s: Scene, x: integer, y: integer, loading: Loading, gridX, gridY) {
    this.scene = s;
    this.loading = loading;
    this.xPos = x;
    this.yPos = y;
    this.saloperies = [];
    this.health = Math.floor(Math.random() *(LEVEL_MAX));
    this.gridX = gridX;
    this.gridY = gridY;
    this.roundBox = new RoundBox(this.scene, null);
  }

  create() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, 'grass', this.health);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', this.onObjectClicked.bind(this));
    this.sprite.on('pointerout', this.onPointerOut.bind(this));
    this.sprite.on('pointerup',this.onObjectUnclicked.bind(this));
    this.sprite.on('pointerover',this.onPointerIn.bind(this));

    this.roundBox.create();
    this.roundBox.setPosition(this.xPos, this.yPos);
    this.roundBox.draw(Grass.WIDTH - 2, Grass.HEIGHT - 2);
    this.roundBox.setAlpha(0);

    this.particles = new ParticleEmitterManager(this.scene, 'grass-particle');

    this.scene.add.existing(this.sprite);
    this.scene.add.existing(this.particles);
  }

  updateSprite(): void {
    this.sprite.setFrame(this.health);
  }

  addSaloperieDirectOnGrass(saloperie: SaloperieDirectOnGrass) {
    this.abime();
    this.saloperies.push(saloperie);
    this.scene.add.existing(saloperie.sprite);
  }

  addSaloperie(saloperie: Saloperie) {
    console.log('Saloperie added on ' + this.gridX + ', ' + this.gridY);
    this.abime();
    this.saloperies.push(saloperie);
  }

  entretien(): void {
    if (this.saloperies.length == 0) {
      this.emitParticles();
      this.health++;
      this.scene.sound.play('grass' + Phaser.Math.Between(1, 6));
      this.updateSprite();

      return;
    }

    let saloperie = this.saloperies[0];
    saloperie.kill();

    this.saloperies.shift();
  }

  emitParticles() {
    this.emitter = this.particles.createEmitter({
      "radial": true,
      "frequency": 1000,
      "gravityX": 0,
      "gravityY": 0,
      "maxParticles": 50,
      "timeScale": 1,
      "lifespan": {min: 500, max: 1500},
      "quantity": 50,
      "rotate": {start: 0, end: 360},
      "scale": {"ease": "Linear", "min": 0.5, "max": 2},
      "speed": {"min": 25, "max": 50},
      "emitZone": {
        "source": new Phaser.Geom.Rectangle(this.xPos, this.yPos, Grass.WIDTH, Grass.HEIGHT),
      }
    });
  }

  getEntretienDuration(): integer {
    if (this.saloperies.length == 0) {
      return 500; // entretien classique d'herbe
    }

    const saloperie = this.saloperies[0];

    return saloperie.timeToClean(); // sinon, temps d'entretien pour la saloperie.
  }

  onPointerIn(): void {
    this.roundBox.setAlpha(0.5);
  }

  onPointerOut(): void {
    this.loading.hide();
    this.roundBox.setAlpha(0);
    if (this.event) {
      this.event.destroy();
    }
  }

  onObjectClicked(): void {
    if ((this.health + 1 >= LEVEL_MAX)) {
      return;
    }

    this.roundBox.setAlpha(1);
    const time = this.getEntretienDuration();

    this.loading.show(time, this.xPos + Grass.WIDTH/2, this.yPos + Grass.HEIGHT/2);
    this.event = this.scene.time.addEvent({
      delay: time,
      callback: this.entretien.bind(this)
    });
  }

  onObjectUnclicked(): void {
    this.roundBox.setAlpha(0.5);
    this.loading.hide();
    if (this.event) {
      this.event.destroy();
    }
  }

  abime(playAnim = false) {
    if (this.health > 0) {
      this.health--;
      this.updateSprite();
      if (playAnim) {
        this.emitParticles();
      }
    }
  }

}
