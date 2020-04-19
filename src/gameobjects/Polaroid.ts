import ParticleEmitterManager = Phaser.GameObjects.Particles.ParticleEmitterManager;
import ParticleEmitter = Phaser.GameObjects.Particles.ParticleEmitter;
import Grass from "./Grass";
import MainScene from "../scene/MainScene";
import RoundBox from "./RoundBox";
import Sprite = Phaser.GameObjects.Sprite;
import Text = Phaser.GameObjects.Text;

export default class Polaroid {

  xPos: integer = 410;
  yPos: integer = 65;

  box: RoundBox;
  text: Text;

  particles: ParticleEmitterManager;
  emitter: ParticleEmitter;

  money: integer;

  grass1: Grass;
  grass2: Grass;
  grass3: Grass;
  grass4: Grass;

  scene: MainScene;

  grassSprites: Sprite[];

  event: Phaser.Time.TimerEvent;
  isTimeToBurn: boolean = true;

  constructor(scene: MainScene, grassBlocs: Grass[], money: integer) {
    this.scene = scene;
    this.grassSprites = [];
    this.money = money;

    this.box = new RoundBox(this.scene, 0xffffff);
    this.box.create();
    this.box.setPosition(this.xPos, this.yPos);
    this.box.draw(65, 80);
    this.box.setAlpha(1);
    this.box.setDepth(MainScene.getRenderOrder('POLAROID'));

    const scale = 0.25;
    const xGardenOffset = this.scene.garden.xPos * scale;
    const yGardenOffset = this.scene.garden.yPos * scale;
    const xOffset = 5;
    const yOffset = 5;

    grassBlocs.forEach((grass) => {
      let s = new Sprite(this.scene, grass.sprite.x * scale + this.xPos - xGardenOffset + xOffset, grass.sprite.y * scale + this.yPos - yGardenOffset + yOffset, 'grass', grass.health);
      s.setScale(scale, scale);
      s.setOrigin(0, 0);
      s.setDepth(MainScene.getRenderOrder('GRASS'));
      this.grassSprites.push(s);
    });

    this.grassSprites.forEach(s => {
      this.scene.add.existing(s);
    });

    const xTextOffset = 10;
    const yTextOffset = 58;

    this.text = new Text(this.scene, this.xPos + xTextOffset, this.yPos + yTextOffset, '', {
      fontSize: '15px',
      color: '#000'
    });

    this.text.setText('+' + this.money + '$');
    this.text.setDepth(MainScene.getRenderOrder('GRASS'));
    this.scene.add.existing(this.text);

    this.particles = new ParticleEmitterManager(this.scene, 'stars-particle');
    this.particles.setDepth(MainScene.getRenderOrder('PARTICLES'));
    this.scene.add.existing(this.particles);

    this.emitParticles();

    this.event = this.scene.time.addEvent({
      delay: 5000,
      callback: this.disappear.bind(this)
    });
  }

  disappear() {
    this.box.destroy();
    this.grassSprites.forEach((s) => s.destroy());
    this.text.destroy();
    this.particles.destroy();
  }

  emitParticles() {
    this.emitter = this.particles.createEmitter({
      "radial": true,
      "frequency": 1000,
      "gravityX": 0,
      "gravityY": -5,
      "alpha": {min: 0.3, max: 0.8},
      "maxParticles": 20,
      "timeScale": 1,
      "lifespan": {min: 800, max: 3500},
      "quantity": 15,
      "rotate": {start: 0, end: 50},
      "scale": {"ease": "Linear", "start": 1, "end": 0.5},
      "speed": {"min": 1, "max": 5},
      "emitZone": {
        "source": new Phaser.Geom.Rectangle(this.xPos, this.yPos, 65, 85),
      }
    });
  }
}
