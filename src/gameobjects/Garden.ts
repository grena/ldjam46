import Scene = Phaser.Scene;
import Grass from "./Grass";
import Taupe from "./saloperies/Taupe";
import BarriereBottom from "./BarriereBottom";
import MainScene from "../scene/MainScene";
import Saloperie from "./saloperies/Saloperie";
import BarriereLeft from "./BarriereLeft";

export default class Garden {
  private scene: MainScene;
  public xPos: integer;
  public yPos: integer;

  public grassBlocs: Grass[];
  public barrieresBottom: BarriereBottom[];
  public barrieresLeft: BarriereLeft[];

  private nextTaupeApparition: number = 0;
  private fenetreApparitionTaupe: integer[] = [25000, 40000]; // Une taupe apparait toutes les 10 à 20 secondes.

  constructor(s: MainScene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.grassBlocs = [];
    this.barrieresBottom = [];
    this.barrieresLeft = [];

    for (let i=0; i < 6; i++) {
      let xPos = this.xPos + (i * Grass.WIDTH);
      let yPos = 315;

      this.barrieresBottom.push(new BarriereBottom(this.scene, xPos, yPos, i));
    }

    for (let i = 0; i < 6; i++) {
      let xPos = 137 - 50;
      let yPos = this.yPos + (i * Grass.HEIGHT);

      this.barrieresLeft.push(new BarriereLeft(this.scene, xPos, yPos, i));
    }
  }

  render() {
    this.grassBlocs.forEach((grass) => {
      this.scene.add.existing(grass.sprite);
      this.scene.add.existing(grass.roundBox);
    });

    this.barrieresBottom.forEach((barriere) => {
      this.scene.add.existing(barriere.sprite);
      this.scene.add.existing(barriere.barriereSprite);
      this.scene.add.existing(barriere.roundBox);
    });

    this.barrieresLeft.forEach((barriere) => {
      this.scene.add.existing(barriere.sprite);
      this.scene.add.existing(barriere.barriereSprite);
      this.scene.add.existing(barriere.roundBox);
    });

    this.grassBlocs.forEach((grass) => {
      this.scene.add.existing((grass.particles));
    })
  }

  update(time: number) {
  }

  getRandomGrass(): Grass {
    const index = Phaser.Math.Between(0, this.grassBlocs.length - 1);

    return this.grassBlocs[index];
  }

  digRandomReneLaTaupe() {
    let grassTile = this.getRandomGrass();
    let taupe = new Taupe(this.scene, grassTile);

    grassTile.addSaloperieDirectOnGrass(taupe);
    this.scene.sound.play('taupe');
  }

  getPrice(): number {
    let result = 0;
    this.grassBlocs.forEach((grassBlock) => {
      result += grassBlock.health;
    });

    return result;
  }

  getPossibleEntries(): number[] {
    let result = [];
    this.barrieresBottom.forEach((barriere) => {
      if (barriere.barriereSprite.alpha <= 0) {
        result.push(barriere.barriereNumber);
      }
    });

    return result;
  }

  abimePelouseAt(x: number, y: number) {
    this.grassBlocs.forEach((grassBloc) => {
      if (grassBloc.gridX === x && grassBloc.gridY === y) {
        grassBloc.abime();
      }
    })
  }

  addSaloperieOn(saloperie: Saloperie, x: number, y: number) {
    this.grassBlocs.forEach((grassBloc) => {
      if (grassBloc.gridX === x && grassBloc.gridY === y) {
        grassBloc.addSaloperie(saloperie);
      }
    })
  }
}
