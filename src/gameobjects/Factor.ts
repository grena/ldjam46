import Graphics = Phaser.GameObjects.Graphics;
import MainScene from "../scene/MainScene";

const STREET_RIGHT = 530;
const BOITE_A_LETTRES_X = 205;
const BOITE_A_LETTRES_Y = 95;
const Y = 320;

export default class Factor {
  scene: MainScene;
  graphics: Graphics;

  constructor(scene: MainScene) {
    this.scene = scene;
    this.graphics = this.scene.add.graphics({
      x: 0,
      y: Y,
      fillStyle: {
        color: 0x00ffff,
        alpha: 1
      }
    });
    this.graphics.fillRect(0, 0, 30, 40);
  }

  goDistribute() {
    const possibleEntries = this.scene.getPossibleEntries();
    const firstEntry = possibleEntries[0];
    const lastEntry = possibleEntries[possibleEntries.length - 1];

    const xEntry = 137 + 38 * firstEntry;
    const xOut = 137 + 38 * lastEntry;

    const DURATION_LEFT_TO_GARDEN = 2000;
    const STREET_TO_BOITE_AUX_LETTRES = 3000;
    const BOITE_AUX_LETTRS_TO_STREET = 3000;
    const DURATION_GARDEN_TO_RIGHT = 2000;

    const goRightStreet = () => {
      this.scene.tweens.add({
        targets: this.graphics,
        x: STREET_RIGHT,
        y: Y,
        duration: DURATION_GARDEN_TO_RIGHT,
        repeat: 0,
        yoyo: false,
        onComplete: () => {
          this.graphics.x = 0;
          this.graphics.y = Y;
        }
      })
    };

    const goBackStreet = () => {
      this.scene.tweens.add({
        targets: this.graphics,
        x: xOut,
        y: Y,
        duration: BOITE_AUX_LETTRS_TO_STREET,
        repeat: 0,
        yoyo: false,
        onComplete: goRightStreet
      });
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6, callback: () => {this.abimePelouse(0) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 2, callback: () => {this.abimePelouse(1) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 3, callback: () => {this.abimePelouse(2) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 4, callback: () => {this.abimePelouse(3) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 5, callback: () => {this.abimePelouse(4) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 6, callback: () => {this.abimePelouse(5) }});
    };

    const goBoiteALettres = () => {
      this.scene.tweens.add({
        targets: this.graphics,
        x: BOITE_A_LETTRES_X,
        y: BOITE_A_LETTRES_Y,
        duration: STREET_TO_BOITE_AUX_LETTRES,
        repeat: 0,
        yoyo: false,
        onComplete: goBackStreet
      });
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6, callback: () => {this.abimePelouse(5) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 2, callback: () => {this.abimePelouse(4) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 3, callback: () => {this.abimePelouse(3) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 4, callback: () => {this.abimePelouse(2) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 5, callback: () => {this.abimePelouse(1) }});
      this.scene.time.addEvent({delay: STREET_TO_BOITE_AUX_LETTRES / 6 * 6, callback: () => {this.abimePelouse(0) }});
    };

    this.scene.tweens.add({
      targets: this.graphics,
      x: xEntry,
      y: Y,
      duration: DURATION_LEFT_TO_GARDEN,
      repeat: 0,
      yoyo: false,
      onComplete: goBoiteALettres
    });
  }

  private abimePelouse(y: number) {
    const x = this.graphics.x;
    const tile = Math.round((x - 137) / 38);
    this.scene.abimeGazonAt(tile, y);
  }
}