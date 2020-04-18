import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Point = Phaser.Geom.Point;
import Sprite = Phaser.GameObjects.Sprite;

export default class PlayerMoveOnClick extends Scene {
  private easystar: EasyStar;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new EasyStar();
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/test.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('background', 'assets/images/background.png', { frameWidth: 530, frameHeight: 360 });
  }

  create(settings: SettingsObject) {
    var paddingLeft = 137;
    var paddingTop = 140;

    var grassX = 38;
    var grassY = 30;

    var bgSprite = new Sprite(this, 0, 0, 'background');
    bgSprite.setOrigin(0, 0);

    this.add.existing(bgSprite);

    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        var xPos = (x * grassX) + paddingLeft;
        var yPos = (y * grassY) + paddingTop;

        var grass = new Sprite(this, xPos , yPos, 'grass');
        grass.setOrigin(0, 0);

        this.add.existing(grass);
      }
    }
  }

  update(time: number, delta: number): void {
  }

  private moveCharacterTo(point: Phaser.Geom.Point) {
  }

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }
}
