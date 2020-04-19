import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;
import Grass from "./Grass";
import BlendModes = Phaser.BlendModes;
import ParticleEmitterManager = Phaser.GameObjects.Particles.ParticleEmitterManager;
import ParticleEmitter = Phaser.GameObjects.Particles.ParticleEmitter;

export default class Fenetre {

  tickSunBurn: integer = 5000;
  carreau1Broken: boolean = false;
  carreau2Broken: boolean = false;
  carreau3Broken: boolean = false;
  carreau4Broken: boolean = false;

  particles: ParticleEmitterManager;
  emitter: ParticleEmitter;

  sprite1: Sprite;
  sprite2: Sprite;
  sprite3: Sprite;
  sprite4: Sprite;

  grass1: Grass;
  grass2: Grass;
  grass3: Grass;
  grass4: Grass;

  scene: Scene;

  event: Phaser.Time.TimerEvent;
  isTimeToBurn: boolean = true;

  constructor(scene: Scene, grassBlocs: Grass[]) {
    this.scene = scene;

    this.grass1 = grassBlocs[24];
    this.grass2 = grassBlocs[30];
    this.grass3 = grassBlocs[25];
    this.grass4 = grassBlocs[31];

    this.sprite1 = new Sprite(this.scene, 0, 0, 'carreau1');
    this.sprite1.setOrigin(0, 0);
    this.sprite2 = new Sprite(this.scene, 0, 0, 'carreau2');
    this.sprite2.setOrigin(0, 0);
    this.sprite3 = new Sprite(this.scene, 0, 0, 'carreau3');
    this.sprite3.setOrigin(0, 0);
    this.sprite4 = new Sprite(this.scene, 0, 0, 'carreau4');
    this.sprite4.setOrigin(0, 0);

    this.sprite1.alpha = 0.05;
    this.sprite2.alpha = 0.05;
    this.sprite3.alpha = 0.05;
    this.sprite4.alpha = 0.05;

    this.sprite1.blendMode = BlendModes.ADD;
    this.sprite2.blendMode = BlendModes.ADD;
    this.sprite3.blendMode = BlendModes.ADD;
    this.sprite4.blendMode = BlendModes.ADD;

    this.scene.add.existing(this.sprite1);
    this.scene.add.existing(this.sprite2);
    this.scene.add.existing(this.sprite3);
    this.scene.add.existing(this.sprite4);

    this.particles = new ParticleEmitterManager(this.scene, 'smoke-particle');
    this.scene.add.existing(this.particles);

    this.event = this.scene.time.addEvent({
      delay: this.tickSunBurn,
      callback: this.doSunBurn.bind(this)
    });

    this.scene.tweens.add({
      targets: [this.sprite1, this.sprite2, this.sprite3, this.sprite4],
      alpha: 0.4,
      duration: this.tickSunBurn,
      repeat: -1,
      yoyo: true,
      // onRepeat: this.doSunBurn.bind(this)
    });
  }

  emitParticlesOnGrass(grass: Grass) {
    this.emitter = this.particles.createEmitter({
      "radial": true,
      "frequency": 1000,
      "gravityX": 0,
      "gravityY": -25,
      "alpha": {min: 0.3, max: 0.8},
      "maxParticles": 15,
      "timeScale": 1,
      "lifespan": {min: 250, max: 2500},
      "quantity": 15,
      "rotate": {start: 0, end: 270},
      "scale": {"ease": "Linear", "start": 0.8, "end": 0.1},
      "speed": {"min": 1, "max": 5},
      "emitZone": {
        "source": new Phaser.Geom.Rectangle(grass.xPos, grass.yPos, Grass.WIDTH, Grass.HEIGHT),
      }
    });
  }

  doSunBurn(tween, target) {
    if (this.isTimeToBurn) {
      console.log("BURN");
      if (!this.carreau1Broken && this.grass1.health > 0) {
        this.grass1.abime();
        this.emitParticlesOnGrass(this.grass1);
      }

      if (!this.carreau2Broken && this.grass2.health > 0) {
        this.grass2.abime();
        this.emitParticlesOnGrass(this.grass2);
      }

      if (!this.carreau3Broken && this.grass3.health > 0) {
        this.grass3.abime();
        this.emitParticlesOnGrass(this.grass3);
      }

      if (!this.carreau4Broken && this.grass4.health > 0) {
        this.grass4.abime();
        this.emitParticlesOnGrass(this.grass4);
      }
    }

    this.isTimeToBurn = !this.isTimeToBurn;

    this.event = this.scene.time.addEvent({
      delay: this.tickSunBurn,
      callback: this.doSunBurn.bind(this)
    });
  }
}
