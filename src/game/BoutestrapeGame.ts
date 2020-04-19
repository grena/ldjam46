import Game = Phaser.Game;
import GameConfig = Phaser.Types.Core.GameConfig;
import MainScene from "../scene/MainScene";
import SplashScreen from "../scene/SplashScreen";

export class BoutestrapeGame extends Game {
  constructor() {
    const REAL_WIDTH = 530 * 2;
    const REAL_HEIGHT = 360 * 2;
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
      backgroundColor: '#312e2f',
      zoom: PIXEL_ART_ZOOM,
      physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      }
    };
    super(gameConfig);

    this.scene.add(MainScene.toString(), MainScene);
    this.scene.add(SplashScreen.toString(), SplashScreen);
  }

  start() {
    super.start();
    // this.scene.start(PlayerMoveOnClick.toString());
    // this.scene.start(PlayerMoveZQSD.toString());
    this.scene.start(SplashScreen.toString());

    // Deactivate right click
    const canvas = this.canvas;
    canvas.oncontextmenu = () => false;
  }
}
