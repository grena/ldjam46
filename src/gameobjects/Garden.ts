import Scene = Phaser.Scene;
import Grass from "./Grass";
import Taupe from "./saloperies/Taupe";
import BarriereBottom from "./BarriereBottom";
import MainScene from "../scene/MainScene";

export default class Garden {
  private scene: MainScene;
  public xPos: integer;
  public yPos: integer;

  public grassBlocs: Grass[];
  public barrieres: BarriereBottom[];

  private nextTaupeApparition: number = 0;
  private fenetreApparitionTaupe: integer[] = [25000, 40000]; // Une taupe apparait toutes les 10 à 20 secondes.

  constructor(s: MainScene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.grassBlocs = [];
    this.barrieres = [];

    for (let i=0; i < 6; i++) {
      let xPos = this.xPos + (i * Grass.WIDTH);
      let yPos = 315;

      this.barrieres.push(new BarriereBottom(this.scene, xPos, yPos, i));
    }
  }

  render() {
    this.grassBlocs.forEach((grass) => {
      this.scene.add.existing(grass.sprite);
    });

    this.barrieres.forEach((barriere) => {
      this.scene.add.existing(barriere.sprite);
      this.scene.add.existing(barriere.barriereSprite);
      this.scene.add.existing(barriere.text);
    });
  }

  update(time: number) {
    this.reneLaTaupe(time);
  }

  getRandomGrass(): Grass {
    const index = Phaser.Math.Between(0, this.grassBlocs.length - 1);

    return this.grassBlocs[index];
  }

  reneLaTaupe(time: number) {
    if (time > this.nextTaupeApparition) {
      this.nextTaupeApparition = time + Phaser.Math.Between(this.fenetreApparitionTaupe[0], this.fenetreApparitionTaupe[1]);
      let grassTile = this.getRandomGrass();
      let taupe = new Taupe(this.scene, grassTile.xPos, grassTile.yPos);

      grassTile.addSaloperie(taupe);
    }
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
    this.barrieres.forEach((barriere) => {
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
}
