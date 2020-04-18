import Scene = Phaser.Scene;
import Grass from "./Grass";

export default class Garden {
  private scene: Scene;
  public xPos: integer;
  public yPos: integer;

  public grassBlocs: Grass[];

  constructor(s: Scene, x: integer, y: integer) {
    this.scene = s;
    this.xPos = x;
    this.yPos = y;
    this.grassBlocs = [];
  }

  render() {
    this.grassBlocs.forEach((grass) => {
      this.scene.add.existing(grass.getSprite());
    })
  }
}
