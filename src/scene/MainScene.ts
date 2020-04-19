import Scene = Phaser.Scene;
import SettingsObject = Phaser.Types.Scenes.SettingsObject;
import Sprite = Phaser.GameObjects.Sprite;
import Garden from "../gameobjects/Garden";
import Loading from "../gameobjects/Loading";
import Inspector from "../gameobjects/Inspector";
import ThunesCompteur from "../gameobjects/ThunesCompteur";
import Tooltip from "../gameobjects/Tooltip";
import SaloperieManager from "../gameobjects/SaloperieManager";
import Saloperie from "../gameobjects/saloperies/Saloperie";
import Group = Phaser.GameObjects.Group;

export const GROUP_BACKGROUND = 'background';

export default class MainScene extends Scene {
  private garden: Garden;
  private loading: Loading;
  private inspector: Inspector;
  public thunesCompteur: ThunesCompteur;
  tooltip: Tooltip;
  saloperieManager: SaloperieManager;
  groups: Group[];

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.groups = [];
    this.loading = new Loading(this);
    this.garden = new Garden(this, 137, 140);
    this.inspector = new Inspector(this);
    this.thunesCompteur = new ThunesCompteur(this);
    this.tooltip = new Tooltip(this);
    this.saloperieManager = new SaloperieManager(this);
  }

  preload() {
    this.load.spritesheet('grass', 'assets/images/grass.png', { frameWidth: 38, frameHeight: 30 });
    this.load.spritesheet('background', 'assets/images/background.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('taupe', 'assets/images/character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('button-buy', 'assets/images/button-buy.png', { frameWidth: 37, frameHeight: 15 });
    this.load.spritesheet('balloon', 'assets/images/balloon.png', { frameWidth: 14, frameHeight: 14 });
    this.load.spritesheet('barbele1', 'assets/images/barbele1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele2', 'assets/images/barbele2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele3', 'assets/images/barbele3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele4', 'assets/images/barbele4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele5', 'assets/images/barbele5.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('barbele6', 'assets/images/barbele6.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing0', 'assets/images/parpaing0.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing1', 'assets/images/parpaing1.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing2', 'assets/images/parpaing2.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing3', 'assets/images/parpaing3.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing4', 'assets/images/parpaing4.png', { frameWidth: 530, frameHeight: 360 });
    this.load.spritesheet('parpaing5', 'assets/images/parpaing5.png', { frameWidth: 530, frameHeight: 360 });
    this.load.image('grass-particle', 'assets/images/grass-particle.png');
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
    this.load.audio('button', 'assets/sfx/button.mp3');
  }

  create(settings: SettingsObject) {
    this.groups[GROUP_BACKGROUND] = this.add.group();
    this.addBackground();
    this.garden.create();
    this.loading.create();
    this.inspector.create();
    this.thunesCompteur.create();
    this.tooltip.create();

    this.startInspectorLoops();
    this.saloperieManager.start();

    this.sound.play('ambient_city');
  }

  update(time: number, delta: number): void {
    this.loading.update();
    this.inspector.update();
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

  digRandomReneLaTaupe() {
    this.garden.digRandomReneLaTaupe();
  }

  addSaloperieOn(saloperie: Saloperie, x: number, y: number) {
    this.garden.addSaloperieOn(saloperie, x, y);
  }

  hasLeftBarriereAt(lineNumber: number) {
    return this.garden.hasLeftBarriereAt(lineNumber);
  }

  private addBackground() {
    const bgSprite = new Sprite(this, 0, 0, 'background');
    bgSprite.setOrigin(0, 0);
    this.add.existing(bgSprite);
    this.groups[GROUP_BACKGROUND].add(bgSprite);
  }

  getLoading() {
    return this.loading;
  }

  private startInspectorLoops() {
    this.time.addEvent({
      loop: true,
      callback: () => {
        this.inspector.prepareVenue(10000);
      },
      delay: 20000,
      startAt: 0,
    });
  }
}
