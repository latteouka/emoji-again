import * as THREE from "three";
import type { VoidFunction } from "../type";

export class Update {
  private static _instance: Update;

  // count and elapsed time
  private _clock: THREE.Clock;
  public elapsed = 0;

  // use add function to participate in frame update
  private _updateList: Array<VoidFunction> = [];

  public play = true;

  constructor() {
    this._clock = new THREE.Clock();
    window.requestAnimationFrame(this._update);
  }

  public static get instance(): Update {
    if (!this._instance) {
      this._instance = new Update();
    }
    return this._instance;
  }

  public add(f: VoidFunction) {
    this._updateList.push(f);
  }

  public remove(f: VoidFunction) {
    const arr: Array<VoidFunction> = [];
    this._updateList.forEach((val) => {
      if (val != f) {
        arr.push(val);
      }
    });
    this._updateList = arr;
  }

  _update = () => {
    if (this.play) {
      this.elapsed = this._clock.getElapsedTime();
      for (const item of this._updateList) {
        if (item != null) item();
      }
      window.requestAnimationFrame(this._update);
    }
  };
}
