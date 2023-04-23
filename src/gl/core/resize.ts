import { Rect } from "./rect";

type VoidFunction = () => void;

export class Resize {
  private static _instance: Resize;

  private _list: Array<VoidFunction> = [];

  private _timer = 0;

  public size = new Rect();
  public oldSize = new Rect();

  constructor() {
    window.addEventListener(
      "resize",
      () => {
        this._eResize();
      },
      false
    );
  }

  public static get instance(): Resize {
    if (!this._instance) {
      this._instance = new Resize();
    }
    return this._instance;
  }

  private _eResize(): void {
    this._setStageSize();

    if (this._timer === null) {
      clearInterval(this._timer);
      this._timer = 0;
    }

    this._timer = window.setTimeout(() => {
      this._call();
      this.oldSize.width = this.size.width;
      this.oldSize.height = this.size.height;
    }, 100);
  }

  private _setStageSize(): void {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
  }

  public add(f: VoidFunction) {
    this._list.push(f);
  }

  public remove(f: VoidFunction) {
    const arr: Array<VoidFunction> = [];
    this._list.forEach((val) => {
      if (val != f) {
        arr.push(val);
      }
    });
    this._list = arr;
  }

  private _call = () => {
    for (const item of this._list) {
      if (item != null) item();
    }
  };
}
