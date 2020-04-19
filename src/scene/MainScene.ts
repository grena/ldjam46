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
import Polaroid from "../gameobjects/Polaroid";
import TimerEvent = Phaser.Time.TimerEvent;
import Gauge from "../gameobjects/Gauge";
import ParticleEmitterManager = Phaser.GameObjects.Particles.ParticleEmitterManager;

export default class MainScene extends Scene {
  public garden: Garden;
  private loading: Loading;
  private inspector: Inspector;
  public thunesCompteur: ThunesCompteur;
  tooltip: Tooltip;
  saloperieManager: SaloperieManager;
  inspectorLoops: TimerEvent;
  gauge: Gauge;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
    this.loading = new Loading(this);
    this.garden = new Garden(this, 137, 140);
    this.inspector = new Inspector(this);
    this.thunesCompteur = new ThunesCompteur(this);
    this.tooltip = new Tooltip(this);
    this.saloperieManager = new SaloperieManager(this);
  }

  preload() {
  }

  static getRenderOrder(elem: string): number {
    const RENDER_ORDER = [
      'BACKGROUND',
      'POLAROID',
      'GRASS',
      'BORDER',
      'JUICE',

      'BALLOONS_0',
      'LEFT_WALL_0',
      'BALLOONS_1',
      'LEFT_WALL_1',
      'BALLOONS_2',
      'LEFT_WALL_2',
      'BALLOONS_3',
      'LEFT_WALL_3',
      'BALLOONS_4',
      'LEFT_WALL_4',
      'BALLOONS_5',
      'LEFT_WALL_5',
      'SCHOOL_BARRIERE',
      'WINDOW',
      'PARTICLES',
      'WALL_BOTTOM',
      'FACTOR',
      'INSPECTOR',
      'FLASH',
      'BUTTONS',
      'LOADING',
      'TOOLTIP',
    ];

    return RENDER_ORDER.indexOf(elem);
  }

  create(settings: SettingsObject) {
    this.addBackground();
    this.garden.create();
    this.loading.create();
    this.inspector.create();
    this.thunesCompteur.create();
    this.tooltip.create();

    this.startInspectorLoops();
    this.saloperieManager.start();
    this.saloperieManager.startNonSaloperies();
    this.gauge = new Gauge(this);
  }

  update(time: number, delta: number): void {
    this.loading.update();
    this.inspector.update();
  }

  tookPhoto() {
    if (this.garden.isWinCondition()) {
      this.win();
    }
    this.thunesCompteur.addThunes(this.garden.getPrice());
    new Polaroid(this, this.garden.grassBlocs, this.garden.getPrice());
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

  displayRandomChamp() {
    this.garden.displayRandomChampi();
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
    bgSprite.setDepth(MainScene.getRenderOrder('BACKGROUND'));

    const schoolBarriere = new Sprite(this, 0, 0, 'school_barriere');
    schoolBarriere.setOrigin(0, 0);
    this.add.existing(schoolBarriere);
    schoolBarriere.setDepth(MainScene.getRenderOrder('SCHOOL_BARRIERE'));
  }

  getLoading() {
    return this.loading;
  }

  private startInspectorLoops() {
    this.inspectorLoops = this.time.addEvent({
      loop: true,
      callback: () => {
        this.inspector.prepareVenue(10000);
      },
      delay: 20000,
      startAt: 0,
    });
  }

  canBuildTheLastBottomBarriere() {
    return !this.saloperieManager.hasAFactorInside() || !this.garden.have5BottomBarrieres();
  }

  private win() {
    this.saloperieManager.stop();
    this.inspectorLoops.destroy();

    let particles = new ParticleEmitterManager(this, 'stars-particle');
    particles.setDepth(MainScene.getRenderOrder('PARTICLES'));
    this.add.existing(particles);

    this.confettis(particles);

    [
      [10, 60, 'Congrat\'s, you win!', 15],
      [20, 80, 'You got the most beautiful', 10],
      [40, 90, 'grass in the world!', 10]
    ].forEach((txtdata, i) => {
      const shadow = this.add.bitmapText(txtdata[0] as number, (txtdata[1] as number) - 100 * (i + 1), 'Carrier Command Black', txtdata[2] as string, txtdata[3] as number);
      shadow.setRotation(Math.PI * - 0.05);
      shadow.setDepth(MainScene.getRenderOrder('TOOLTIP'));
      this.tweens.add({
        targets: shadow,
        y: (txtdata[1] as number) + 2,
        delay: 500 + i * 300 - 2
      });

      const whiteText = this.add.bitmapText(txtdata[0] as number, (txtdata[1] as number) - 100 * (i + 1), 'Carrier Command', txtdata[2] as string, txtdata[3] as number);
      whiteText.setRotation(Math.PI * - 0.05);
      whiteText.setDepth(MainScene.getRenderOrder('TOOLTIP'));
      this.tweens.add({
        targets: whiteText,
        y: txtdata[1],
        delay: 500 + i * 300
      });

    });

  }

  confettis(particles) {
    let emitter = particles.createEmitter({
      "radial": true,
      "frequency": 250,
      "gravityX": 0,
      "gravityY": 50,
      "alpha": {min: 0.3, max: 0.8},
      "maxParticles": 8000,
      "timeScale": 1,
      "lifespan": {min: 500, max: 4000},
      "quantity": 30,
      "rotate": {start: 0, end: 50},
      "scale": {"ease": "Linear", "start": 1, "end": 0.5},
      "speed": {"min": 1, "max": 5},
      "emitZone": {
        "source": new Phaser.Geom.Rectangle(0, 0, 530, 1),
      }
    });
  }

  countProtections() {
    return this.garden.countBarrieres();
  }

  hasAllBottomBarriere() {
    return this.garden.hasAllBottomBarriere()
  }
}
