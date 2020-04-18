import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Point = Phaser.Geom.Point;
import Sprite = Phaser.GameObjects.Sprite;
import Grass from "../gameobjects/Grass";
import Garden from "../gameobjects/Garden";
import Loading from "../gameobjects/Loading";
import Inspector from "../gameobjects/Inspector";

export default class MainScene extends Scene {
  private easystar: EasyStar;
  private garden: Garden;
  private loading: Loading;
  private inspector: Inspector;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new EasyStar();
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/grass.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('background', 'assets/images/background.png', { frameWidth: 530, frameHeight: 360 });
  }

  create(settings: SettingsObject) {
    this.garden = new Garden(this, 137, 140);
    var grassX = 38;
    var grassY = 30;

    var bgSprite = new Sprite(this, 0, 0, 'background');
    bgSprite.setOrigin(0, 0);

    this.add.existing(bgSprite);

    this.loading = new Loading(this);

    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        var xPos = (x * grassX) + this.garden.xPos;
        var yPos = (y * grassY) + this.garden.yPos;

        this.garden.grassBlocs.push(new Grass(this, xPos, yPos, this.loading))
      }
    }
    this.garden.render();

    this.inspector = new Inspector(this);
    this.inspector.prepareVenue(10000);

    this.loading.initializeLoading();

  }

  update(time: number, delta: number): void {
    this.loading.render();
    this.inspector.render();
  }

  private moveCharacterTo(point: Phaser.Geom.Point) {
  }

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }
}
