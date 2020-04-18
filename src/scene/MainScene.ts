import Scene = Phaser.Scene;
import {js as EasyStar} from 'easystarjs';
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Point = Phaser.Geom.Point;
import Sprite = Phaser.GameObjects.Sprite;
import Grass from "../gameobjects/Grass";
import Garden from "../gameobjects/Garden";
import Loading from "../gameobjects/Loading";
import Inspector from "../gameobjects/Inspector";
import ThunesCompteur from "../gameobjects/ThunesCompteur";
import Factor from "../gameobjects/Factor";
import Tooltip from "../gameobjects/Tooltip";
import Balloon from "../Balloon";

export default class MainScene extends Scene {
  private easystar: EasyStar;
  private garden: Garden;
  private loading: Loading;
  private inspector: Inspector;
  public thunesCompteur: ThunesCompteur;
  factor: Factor;
  tooltip: Tooltip;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.easystar = new EasyStar();
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/grass.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('background', 'assets/images/background.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('taupe', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('balloon', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('button-buy', 'assets/images/button-buy.png', { frameWidth: 38, frameHeight: 11 });
    this.load.spritesheet('barbele1', 'assets/images/barbele1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele2', 'assets/images/barbele2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele3', 'assets/images/barbele3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele4', 'assets/images/barbele4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele5', 'assets/images/barbele5.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele6', 'assets/images/barbele6.png', { frameWidth: 530, frameHeight: 360 });
    this.load.bitmapFont('Carrier Command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

    this.load.audio('build', 'assets/sfx/build.mp3');
    this.load.audio('mail', 'assets/sfx/mail.mp3');
    this.load.audio('photo', 'assets/sfx/photo.mp3');
    this.load.audio('taupe', 'assets/sfx/taupe.mp3');
    this.load.audio('ambient_city', 'assets/sfx/ambient_city.mp3');
    this.load.audio('grass1', 'assets/sfx/grass1.mp3');
    this.load.audio('grass2', 'assets/sfx/grass2.mp3');
    this.load.audio('grass3', 'assets/sfx/grass3.mp3');
    this.load.audio('grass4', 'assets/sfx/grass4.mp3');
    this.load.audio('grass5', 'assets/sfx/grass5.mp3');
    this.load.audio('grass6', 'assets/sfx/grass6.mp3');
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

        this.garden.grassBlocs.push(new Grass(this, xPos, yPos, this.loading, x, y))
      }
    }
    this.garden.render();

    this.inspector = new Inspector(this);
    this.time.addEvent({
      loop: true,
      callback: () => {
        this.inspector.prepareVenue(10000);
      },
      delay: 20000,
      startAt: 0,
    });

    this.factor = new Factor(this);
    this.time.addEvent({
       loop: true,
       callback: () => {
        this.factor.goDistribute();
     },
     delay: 11000,
     startAt: 0,
    });

    this.loading.initializeLoading();
    this.thunesCompteur = new ThunesCompteur(this);

    this.tooltip = new Tooltip(this);

    const balloon = new Balloon(this);
    balloon.send(0, false);

    this.sound.play('ambient_city');
  }

  update(time: number, delta: number): void {
    this.loading.render();
    this.garden.update(time);
    this.inspector.render();
  }

  private moveCharacterTo(point: Phaser.Geom.Point) {
  }

  private static getGridPoint(point: Point): Point {
    return new Point(Math.floor(point.x / 8), Math.floor(point.y / 8));
  }

  tookPhoto() {
    this.thunesCompteur.addThunes(this.garden.getPrice());
  }

  getPossibleEntries(): number[] {
    return this.garden.getPossibleEntries();
  }

  abimeGazonAt(x: number, y: number) {
    this.garden.abimePelouseAt(x, y);
  }

  showTooltip(txt: string, xPos?: number, yPos?: number) {
    xPos = xPos || Math.round(this.input.activePointer.x);
    yPos = yPos || Math.round(this.input.activePointer.y);
    this.tooltip.displayTextAt(txt, xPos, yPos);
  }

  hideTooltip() {
    this.tooltip.hideText();
  }
}
