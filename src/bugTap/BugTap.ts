import { Game, getRandomNumber } from "../engine";

import Cursor from "./Cursor";

import BugManager from "./BugManager";
import FoodManager from "./FoodManager";

/**
 * @author Salinder Sidhu
 */
export default class BugTap extends Game {
  private static readonly MIN_BUGS_TO_SPAWN: number = 1;
  private static readonly MAX_BUGS_TO_SPAWN: number = 3;
  private static readonly MIN_SPAWN_INTERVAL: number = 800;
  private static readonly MAX_SPAWN_INTERVAL: number = 1500;

  private bugManager: BugManager;
  private foodManager: FoodManager;

  constructor(canvasId: string) {
    super(canvasId);

    this.bugManager = BugManager.getInstance(this.canvas, this.context);
    this.foodManager = FoodManager.getInstance(this.canvas, this.context);

    this.initGameObjects();
    this.initEventHandlers();

    this.spawnBugsRandomly();
  }

  /**
   * Create GameOjects and add them to the game.
   */
  private initGameObjects() {
    // Create a cursor to provide a visual indicator of the player's mouse
    const cursor = new Cursor(this.canvas, this.context);

    // Create food randomly spread near the center of the table
    const food = this.foodManager.generate(8);

    this.addGameObjects([cursor, ...food]);
  }

  /**
   * Initialize event handlers for the game.
   */
  private initEventHandlers() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
        this.togglePause();
      }
    });
  }

  /**
   * Spawn bugs continuously at random times.
   */
  private spawnBugsRandomly() {
    const spawnBugRandomly = () => {
      if (!this.isPaused()) {
        const numBugsToSpawn = getRandomNumber(
          BugTap.MIN_BUGS_TO_SPAWN,
          BugTap.MAX_BUGS_TO_SPAWN
        );
        Array(numBugsToSpawn)
          .fill(null)
          .forEach(() => {
            this.spawnBug();
          });
      }
      const spawnInterval = getRandomNumber(
        BugTap.MIN_SPAWN_INTERVAL,
        BugTap.MAX_SPAWN_INTERVAL
      );
      setTimeout(spawnBugRandomly, spawnInterval);
    };

    spawnBugRandomly();
  }

  /**
   * Spawn a bug and add it to the game.
   */
  private spawnBug() {
    const bug = this.bugManager.spawn(this.canvas);
    this.addGameObject(bug);
  }
}
