import Balloon from "../Balloon";
import Factor from "./Factor";
import MainScene from "../scene/MainScene";

export default class SaloperieManager {
  scene: MainScene;
  timeToNextSaloperie:number;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.timeToNextSaloperie = 10000;
  }

  start() {
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
    const id = Math.floor(Math.random() * 3);
    // const id: number = 2;
    switch(id) {
      case 0: this.digReneLaTaupe(); break;
      case 1: this.callFactor(); break;
      case 2: this.throwRandomBalloon();
    }
  }

  private digReneLaTaupe() {
    this.scene.digRandomReneLaTaupe();
  }

  private callFactor() {
    const factor = new Factor(this.scene);
    factor.goDistribute();
  }

  private throwRandomBalloon() {
    const balloon = new Balloon(this.scene);
    balloon.send(Math.floor(Math.random() * 6));
  }
}