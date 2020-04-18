import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Point = Phaser.Geom.Point;
import Sprite = Phaser.GameObjects.Sprite;
import GroupConfig = Phaser.GameObjects.Group;

export default class PlayerMoveOnClick extends Scene {
  private easystar: EasyStar;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new EasyStar();
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/test.png', { frameWidth: 38, frameHeight: 30 });
  }

  create(settings: SettingsObject) {
  }

  update(time: number, delta: number): void {
  }

  private moveCharacterTo(point: Phaser.Geom.Point) {
  }

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }
}
