import RoundBox from "./RoundBox";
import MainScene from "../scene/MainScene";
import total = Phaser.Display.Canvas.CanvasPool.total;
import ParticleEmitterManager = Phaser.GameObjects.Particles.ParticleEmitterManager;
import ParticleEmitter = Phaser.GameObjects.Particles.ParticleEmitter;

export default class Gauge {
  scene: MainScene;
  border: RoundBox;
  juice: RoundBox;

  particles: ParticleEmitterManager;
  emitter: ParticleEmitter;

  xPos = 500;
  yPos = 160;
  height = 6 * 6 * 3;
  width = 10;

  constructor(scene: MainScene) {
    this.scene = scene;

    this.border = new RoundBox(this.scene, 0xffffff);
    this.juice = new RoundBox(this.scene, 0x508657);

    this.border.create();
    this.border.draw(this.width, this.height);
    this.border.setPosition(this.xPos, this.yPos);
    this.border.setAlpha(1);

    this.juice.create();

    this.border.setDepth(MainScene.getRenderOrder('BORDER'));
    this.juice.setDepth(MainScene.getRenderOrder('JUICE'));

    this.particles = new ParticleEmitterManager(this.scene, 'grass-particle');
    this.particles.setDepth(MainScene.getRenderOrder('PARTICLES'));
    this.scene.add.existing(this.particles);

    this.scene.garden.setGardenHealthListener(this.fillTheJuice.bind(this))
  }

  fillTheJuice(gardenHealth) {
    let juiceY = this.yPos + (this.height - gardenHealth);
    this.juice.draw(this.width, gardenHealth);
    this.juice.setPosition(this.xPos, juiceY);
    this.juice.setAlpha(1);

    this.emitParticles(this.xPos, this.yPos + (this.height - gardenHealth), this.width, gardenHealth);

    this.scene.tweens.add({
      targets: [this.juice.graphics],
      ease: 'Linear',
      y: juiceY + 2,
      duration: 120,
      repeat: 0,
      yoyo: true,
    });
  }

  emitParticles(x, y, width, height) {
    this.emitter = this.particles.createEmitter({
      "radial": true,
      "frequency": 1000,
      "gravityX": 0,
      "gravityY": 50,
      "alpha": {min: 0.3, max: 0.8},
      "maxParticles": 10,
      "timeScale": 1,
      "lifespan": {min: 350, max: 1200},
      "quantity": 10,
      "rotate": {start: 0, end: 50},
      "scale": {"ease": "Linear", "start": 1, "end": 0.5},
      "speed": {"min": 1, "max": 5},
      "emitZone": {
        "source": new Phaser.Geom.Rectangle(x, y, width, height),
      }
    });
  }
}
