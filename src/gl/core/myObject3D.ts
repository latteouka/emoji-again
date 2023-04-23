import { Update } from "./update";
import { Resize } from "./resize";
import { Object3D } from "three/src/core/Object3D";
import type { VoidFunction } from "../type";

export class MyObject3D extends Object3D {
  private _updateHandler: VoidFunction;
  private _layoutHandler: VoidFunction;

  constructor() {
    super();

    this._updateHandler = this._update.bind(this);
    Update.instance.add(this._updateHandler);

    this._layoutHandler = this._resize.bind(this);
    Resize.instance.add(this._layoutHandler);
  }

  protected _update(): void {
    // for binding
  }

  protected _resize(): void {
    // for binding
  }
}
