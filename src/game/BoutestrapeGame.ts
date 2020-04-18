import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import PlayerMoveOnClick from "../scene/PlayerMoveOnClick";

export class BoutestrapeGame extends Game {
  constructor() {
    const REAL_WIDTH = 1200;
    const REAL_HEIGHT = 800;
    const PIXEL_ART_ZOOM = 2;
    const gameConfig: GameConfig = {
      type: Phaser.WEBGL,
      width: REAL_WIDTH / PIXEL_ART_ZOOM,
      height: REAL_HEIGHT / PIXEL_ART_ZOOM,
      render: {
        antialias: false,
        pixelArt: true,
        roundPixels: false,
      },
      backgroundColor: '#1b2632',
      zoom: PIXEL_ART_ZOOM,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      }
    };
    super(gameConfig);

    this.scene.add(PlayerMoveOnClick.toString(), PlayerMoveOnClick);
  }

  start() {
    super.start();
    // this.scene.start(PlayerMoveOnClick.toString());
    // this.scene.start(PlayerMoveZQSD.toString());
    this.scene.start(PlayerMoveOnClick.toString());

    // Deactivate right click
    const canvas = this.canvas;
    canvas.oncontextmenu = () => false;
  }
}
