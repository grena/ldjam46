import Sprite = Phaser.GameObjects.Sprite;
import Scene = Phaser.Scene;
import Loading from "./Loading";
import W = Phaser.Input.Keyboard.KeyCodes.W;

const WIDTH = 38;
const HEIGHT = 30;

export default class Grass {
  scene: Scene;
  health: integer = 0;
  xPos: integer;
  yPos: integer;
  event: Phaser.Time.TimerEvent;
  loading: Loading;

  public sprite: Sprite;

  constructor(s: Scene, x: integer, y: integer, loading: Loading) {
    this.scene = s;
    this.loading = loading;
    this.xPos = x;
    this.yPos = y;

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

  onObjectClicked(): void {
    this.loading.show(1000, this.xPos + WIDTH/2, this.yPos + HEIGHT/2);
    this.event = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.health++;
        this.updateSprite();
      }
    });
  }

  onObjectUnclicked(): void {
    this.loading.hide();
    if (this.event) {
      this.event.destroy();
    }
  }
}
