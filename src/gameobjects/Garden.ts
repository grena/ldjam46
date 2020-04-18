import Scene = Phaser.Scene;
import Grass from "./Grass";
import Taupe from "./saloperies/Taupe";

export default class Garden {
  private scene: Scene;
  public xPos: integer;
  public yPos: integer;

  public grassBlocs: Grass[];

  private nextTaupeApparition: number = 0;
  private fenetreApparitionTaupe: integer[] = [10000, 20000]; // Une taupe apparait toutes les 10 à 20 secondes.

  constructor(s: Scene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.grassBlocs = [];
  }

  render() {
    this.grassBlocs.forEach((grass) => {
      this.scene.add.existing(grass.sprite);
    })
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
}
