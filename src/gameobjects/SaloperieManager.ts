import Balloon from "../Balloon";
import Factor from "./Factor";
import MainScene from "../scene/MainScene";

export default class SaloperieManager {
  scene: MainScene;
  factors: Factor[] = [];
  isStopped = false;

  static timeRecurrenceSoleilFenetre: integer = 2000;

  constructor(scene: MainScene) {
    this.scene = scene;
  }

  start() {
    if (this.isStopped) {
      return;
    }
    this.scene.time.addEvent({
      delay: this.timeToNextSaloperie(),
      callback: () => {
        this.throwSaloperie();
        this.start();
      }
    });
  }


  startNonSaloperies() {
    this.scene.time.addEvent({
      delay: 10000,
      callback: () => {
        this.throwNonSaloperie();
      },
      repeat: -1,
    });
  }

  private throwNonSaloperie() {
    const list = [];
    for (let i = 0; i < 6; i++) {
      if (this.scene.hasLeftBarriereAt(i)) {
        list.push({action: () => this.throwBallonAt(i), proba: 3});
      }
    }
    if (this.scene.hasAllBottomBarriere()) {
      list.push({action: () => this.callFactor(), proba: 1});
    }
    if (!list.length) {
      return;
    }

    let sum = 0;
    list.forEach((elem) => { sum += elem.proba; });
    const rand = Math.floor(Math.random() * sum);

    let vv = 0;
    let done = false;
    list.forEach((elem, i) => {
      if (done) {
        return;
      }
      if (vv >= rand) {
        const action = elem.action;
        action();
        done = true;
      }
      vv += elem.proba;
    });
  }

  private throwSaloperie() {
    console.log("Throw saloperie");
    const list = [
      {action: () => this.digReneLaTaupe(), proba: 1},
      {action: () => this.displayRandomChamp(), proba: 1},
    ];
    for (let i = 0; i < 6; i++) {
      if (!this.scene.hasLeftBarriereAt(i)) {
        list.push({action: () => this.throwBallonAt(i), proba: 0.7});
      }
    }
    if (!this.scene.hasAllBottomBarriere()) {
      list.push({action: () => this.callFactor(), proba: 3});
    }

    let sum = 0;
    list.forEach((elem) => { sum += elem.proba; });

    const rand = Math.floor(Math.random() * sum);

    let vv = 0;
    let done = false;
    list.forEach((elem, i) => {
      if (done) {
        return;
      }
      vv += elem.proba;
      if (rand <= vv) {
        const action = elem.action;
        action();
        done = true;
      }
    });
    if (!done) {
      debugger;
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

  private throwBallonAt(i) {
    const balloon = new Balloon(this.scene);
    balloon.send(i);
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

  private timeToNextSaloperie() {
    // Protections max = 6 + 6 + 4 = 16
    return 3500 + (16 - this.scene.countProtections()) * 150;
  }

}
