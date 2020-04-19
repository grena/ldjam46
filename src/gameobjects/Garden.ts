import Grass from "./Grass";
import Taupe from "./saloperies/Taupe";
import BarriereBottom from "./BarriereBottom";
import MainScene from "../scene/MainScene";
import Saloperie from "./saloperies/Saloperie";
import BarriereLeft from "./BarriereLeft";
import Fenetre from "./Fenetre";
import Champi from "./saloperies/Champi";

export default class Garden {
  private scene: MainScene;
  public xPos: integer;
  public yPos: integer;

  public grassBlocs: Grass[];
  public barrieresBottom: BarriereBottom[];
  public barrieresLeft: BarriereLeft[];
  public fenetre: Fenetre;

  private callbackHealthChanged: CallableFunction;

  constructor(scene: MainScene, x: integer, y: integer) {
    this.scene = scene;
    this.xPos = x;
    this.yPos = y;
    this.grassBlocs = [];
    this.barrieresBottom = [];
    this.barrieresLeft = [];

    const grassX = 38;
    const grassY = 30;

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        const xPos = (x * grassX) + this.xPos;
        const yPos = (y * grassY) + this.yPos;
        let grass = new Grass(this.scene, xPos, yPos, scene.getLoading(), x, y);
        grass.healthChangedListener = this.onGrassHealthChange.bind(this);

        this.grassBlocs.push(grass);
      }
    }

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

  onGrassHealthChange(grass: Grass) {
    let totalHealth = 0;
    this.grassBlocs.forEach(grass => {
      totalHealth += grass.health;
    });
    if (this.isWinCondition()) {
      this.scene.saloperieManager.stop();
    }

    if (this.callbackHealthChanged !== undefined) {
      this.callbackHealthChanged(totalHealth);
    }
  }

  setGardenHealthListener(callback: CallableFunction) {
    this.callbackHealthChanged = callback;
  }

  create() {
    this.grassBlocs.forEach((grass) => { grass.create(); });
    this.barrieresBottom.forEach((barriere) => { barriere.create(); });
    this.barrieresLeft.forEach((barriere) => { barriere.create(); });

    this.fenetre = new Fenetre(this.scene, this.grassBlocs);
    this.fenetre.barrieres.forEach((barriere) => { barriere.create(); });
  }

  getRandomGrassWithoutSaloperie(): Grass {
    const freeBlocks = this.grassBlocs.filter((grassBlock) => {
      return grassBlock.saloperies.length === 0;
    });

    if (freeBlocks.length === 0) {
      return null;
    }

    const index = Phaser.Math.Between(0, freeBlocks.length - 1);

    return freeBlocks[index];
  }

  digRandomReneLaTaupe() {
    let grassTile = this.getRandomGrassWithoutSaloperie();
    if (grassTile) {
      let taupe = new Taupe(this.scene, grassTile);
      this.scene.sound.play('taupe-in');

      grassTile.addSaloperieDirectOnGrass(taupe);
      this.scene.sound.play('taupe');
    }
  }

  displayRandomChampi() {
    let grassTile = this.getRandomGrassWithoutSaloperie();
    if (grassTile) {
      let champi = new Champi(this.scene, grassTile);
      this.scene.sound.play('champi-in');

      grassTile.addSaloperieDirectOnGrass(champi);
      // this.scene.sound.play('taupe');
    }
  }

  getPrice(): number {
    let result = 0;
    this.grassBlocs.forEach((grassBlock) => {
      result += grassBlock.health;
    });

    return Math.round(result / 2);
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
        grassBloc.abime(true);
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

  hasLeftBarriereAt(lineNumber: number) {
    let result = false;
    this.barrieresLeft.forEach((barriere) => {
      if (barriere.barriereNumber === lineNumber && barriere.barriereSprite.alpha > 0) {
        result = true;
      }
    });

    return result;
  }

  have5BottomBarrieres() {
    let result = 0;
    this.barrieresBottom.forEach((barriere) => {
      if (barriere.barriereSprite.alpha > 0) {
        result++;
      }
    });

    return result === 5;
  }

  isWinCondition() {
    return this.getPrice() >= 6 * 6 * 3 / 2;
  }

  countBarrieres() {
    let result = 0;
    this.barrieresBottom.forEach((barriere) => {
      if (barriere.barriereSprite.alpha > 0) {
        result++;
      }
    });

    this.barrieresLeft.forEach((barriere) => {
      if (barriere.barriereSprite.alpha > 0) {
        result++;
      }
    });

    this.fenetre.barrieres.forEach((barriere) => {
      if (barriere.barriereSprite.alpha > 0) {
        result++;
      }
    });

    return result;
  }

  hasAllBottomBarriere() {
    let result = 0;
    this.barrieresBottom.forEach((barriere) => {
      if (barriere.barriereSprite.alpha > 0) {
        result++;
      }
    });

    return result === 6;
  }
}
