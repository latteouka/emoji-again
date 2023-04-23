import { Func } from "../libs/func";
import { Canvas } from "../core/canvas";
import { Object3D } from "three/src/core/Object3D";
import { Item } from "./Item";

export class MainScene extends Canvas {
  private _con: Object3D;

  constructor(opt: { el: HTMLCanvasElement }) {
    super(opt);

    this._con = new Object3D();
    this.mainScene.add(this._con);

    const item = new Item();

    this._con.add(item);

    this._resize();
  }

  protected _update(): void {
    super._update();

    this._render();
  }

  private _render(): void {
    this.renderer.setClearColor("#000", 1);
    this.renderer.render(this.mainScene, this.cameraPers);
  }

  _resize(): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    this.renderSize.width = w;
    this.renderSize.height = h;

    this._updateOrthCamera(this.cameraOrth, w, h);

    this.cameraPers.fov = 90;
    this._updatePersCamera(this.cameraPers, w, h);

    const pixelRatio = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();
  }
}
