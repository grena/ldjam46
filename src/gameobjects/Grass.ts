import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;
import Loading from "./Loading";
import Saloperie from "./saloperies/Saloperie";

const WIDTH = 38;
const HEIGHT = 30;
const LEVEL_MAX = 4;

export default class Grass {
  scene: Scene;
  health: integer;
  xPos: integer;
  yPos: integer;
  event: Phaser.Time.TimerEvent;
  loading: Loading;
  saloperies: Saloperie[];

  public sprite: Sprite;

  constructor(s: Scene, x: integer, y: integer, loading: Loading) {
    this.scene = s;
    this.loading = loading;
    this.xPos = x;
    this.yPos = y;
    this.saloperies = [];
    this.health = Math.floor(Math.random() *(LEVEL_MAX);

    this.initializeSprite();
  }

  initializeSprite() {
    this.sprite = new Sprite(this.scene, this.xPos, this.yPos, 'grass', this.health);
    this.sprite.setOrigin(0, 0);
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', this.onObjectClicked.bind(this));
    this.sprite.on('pointerout', this.onObjectUnclicked.bind(this));
    this.sprite.on('pointerup',this.onObjectUnclicked.bind(this));
  }

  updateSprite(): void {
    this.sprite.setFrame(this.health);
  }

  addSaloperie(saloperie: Saloperie) {
    if (this.health > 0) {
      this.health--;
      this.updateSprite();
    }

    this.saloperies.push(saloperie);
    this.scene.add.existing(saloperie.sprite);
  }

  entretien(): void {
    if (this.saloperies.length == 0) {
      this.health++;
      this.updateSprite();

      return;
    }

    let saloperie = this.saloperies[0];
    saloperie.sprite.destroy();

    this.saloperies.shift();
  }

  getEntretienDuration(): integer {
    if (this.saloperies.length == 0) {
      return 500; // entretien classique d'herbe
    }

    const saloperie = this.saloperies[0];

    return saloperie.timeToClean; // sinon, temps d'entretien pour la saloperie.
  }

  onObjectClicked(): void {
    if ((this.health + 1 >= LEVEL_MAX)) {
      return;
    }
    const time = this.getEntretienDuration();

    this.loading.show(time, this.xPos + WIDTH/2, this.yPos + HEIGHT/2);
    this.event = this.scene.time.addEvent({
      delay: time,
      callback: this.entretien.bind(this)
    });
  }

  onObjectUnclicked(): void {
    this.loading.hide();
    if (this.event) {
      this.event.destroy();
    }
  }
}
