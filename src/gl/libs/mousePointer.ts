import { Point } from "../core/point";
import { Update } from "../core/update";
import { Util } from "../libs/util";
import type { VoidFunction } from "../type";

export class MousePointer {
  private static _instance: MousePointer;

  public x: number = window.innerWidth * 0.5;
  public y: number = window.innerHeight * 0.5;

  public old: Point = new Point();

  public normal: Point = new Point();
  public easeNormal: Point = new Point();

  public start: Point = new Point();
  public moveDist: Point = new Point();

  public dist = 0;
  public isDown = false;

  private _updateHandler: VoidFunction;

  constructor() {
    this.setListeners();

    this._updateHandler = this._update.bind(this);
    Update.instance.add(this._updateHandler);
  }

  public setListeners() {
    window.addEventListener("pointerdown", (e: PointerEvent) => {
      this._eDown(e);
    });
    window.addEventListener("pointerup", () => {
      this._eUp();
    });
    window.addEventListener("pointermove", (e: PointerEvent) => {
      this._eMove(e);
    });
  }
  public removeListeners() {
    window.removeEventListener("pointerdown", (e: PointerEvent) => {
      this._eDown(e);
    });
    window.removeEventListener("pointerup", () => {
      this._eUp();
    });
    window.removeEventListener("pointermove", (e: PointerEvent) => {
      this._eMove(e);
    });
  }

  public static get instance(): MousePointer {
    if (!this._instance) {
      this._instance = new MousePointer();
    }
    return this._instance;
  }

  private _eDown(e: PointerEvent): void {
    this.isDown = true;
    this._eMove(e);

    this.start.x = this.x;
    this.start.y = this.y;
  }

  private _eUp(): void {
    this.isDown = false;
  }

  private _eMove(e: PointerEvent): void {
    // calculate dist first
    const dx = this.old.x - this.x;
    const dy = this.old.y - this.y;
    this.dist = Math.sqrt(dx * dx + dy * dy);

    // update old value to last value
    this.old.x = this.x;
    this.old.y = this.y;

    // update to new value
    this.x = e.clientX;
    this.y = e.clientY;
  }

  private _update(): void {
    if (this.isDown) {
      this.moveDist.x = this.start.x - this.x;
      this.moveDist.y = this.start.y - this.y;
    } else {
      this.moveDist.x += (0 - this.moveDist.x) * 0.25;
      this.moveDist.y += (0 - this.moveDist.y) * 0.25;
    }

    this.normal.x = Util.instance.map(this.x, -1, 1, 0, window.innerWidth);
    this.normal.y = Util.instance.map(this.y, -1, 1, 0, window.innerHeight);

    const ease = 0.1;
    this.easeNormal.x += (this.normal.x - this.easeNormal.x) * ease;
    this.easeNormal.y += (this.normal.y - this.easeNormal.y) * ease;
  }
}
