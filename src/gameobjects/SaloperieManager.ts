import Balloon from "../Balloon";
import Factor from "./Factor";
import MainScene from "../scene/MainScene";

export default class SaloperieManager {
  scene: MainScene;
  factors: Factor[] = [];
  isStopped = false;

  static timeRecurrenceSoleilFenetre: integer = 8000;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  start() {
    if (this.isStopped) {
      return;
    }
    console.log('Next saloperie in ' + this.timeToNextSaloperie());
    this.scene.time.addEvent({
      delay: this.timeToNextSaloperie(),
      callback: () => {
        this.throwSaloperie();
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
    this.isStopped
  }

  private timeToNextSaloperie() {
    // Protections max = 6 + 6 + 4 = 16
    return 3500 + (16 - this.scene.countProtections()) * 150;
  }
}
