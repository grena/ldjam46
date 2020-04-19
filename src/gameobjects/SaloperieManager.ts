import Balloon from "../Balloon";
import Factor from "./Factor";
import MainScene from "../scene/MainScene";

export default class SaloperieManager {
  scene: MainScene;
  timeToNextSaloperie: number;
  factors: Factor[] = [];
  isStopped = false;

  static timeRecurrenceSoleilFenetre: integer = 8000;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.timeToNextSaloperie = 10000;
  }

  start() {
    if (this.isStopped) {
      return;
    }
    this.scene.time.addEvent({
      delay: this.timeToNextSaloperie,
      callback: () => {
        this.throwSaloperie();
        if (this.timeToNextSaloperie > 3000) {
          this.timeToNextSaloperie -= 500;
        }
        this.start();
      }
    })
  }

  private throwSaloperie() {
    const id = Math.floor(Math.random() * 4);
    // const id: number = 1;
    switch(id) {
      case 0: this.digReneLaTaupe(); break;
      case 1: this.callFactor(); break;
      case 2: this.throwRandomBalloon(); break;
      case 3: this.displayRandomChamp(); break;
    }
  }

  private digReneLaTaupe() {
    this.scene.digRandomReneLaTaupe();
  }

  private displayRandomChamp() {
    this.scene.displayRandomChamp();
  }

  private callFactor() {
    const factor = new Factor(this.scene);
    this.factors.push(factor);
    factor.create();
    factor.goDistribute();
  }

  private throwRandomBalloon() {
    const balloon = new Balloon(this.scene);
    balloon.send(Math.floor(Math.random() * 6));
  }

  hasAFactorInside() {
    let result = false;
    this.factors.forEach((factor) => {
      result = result || factor.isInsideTheGarden();
    });

    return result;
  }

  stop() {
    this.isStopped = true;
  }
}
