import { Resize } from "./resize";
import { Update } from "./update";

export class MyDisplay {
  public el: HTMLElement;
  private _updateHandler: () => void;
  private _resizeHandler: () => void;

  constructor(opt: { el: HTMLElement }) {
    this.el = opt.el;

    this._updateHandler = this._update.bind(this);
    Update.instance.add(this._updateHandler);

    this._resizeHandler = this._resize.bind(this);
    Resize.instance.add(this._resizeHandler);
  }

  protected _update(): void {
    // for binding
  }

  protected _resize(): void {
    // for binding
  }
}
