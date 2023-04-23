import GUI from "lil-gui";
import Stats from "stats.js";
import { Conf } from "./conf";
import { Update } from "../core/update";

export class Param {
  private static _instance: Param;

  public debug: HTMLElement = document.querySelector(".l-debug") as HTMLElement;
  public scrollRate = 0;

  private _dat: GUI | null = null;
  private _stats: Stats | null = null;

  public main = {
    progress: { value: 0, min: 0, max: 1 },
  };

  constructor() {
    if (Conf.instance.FLG_PARAM) {
      this.makeParamGUI();
    }

    if (Conf.instance.FLG_STATS) {
      this._stats = new Stats();
      document.body.appendChild(this._stats.dom);
    }

    Update.instance.add(() => {
      this._update();
    });
  }

  private _update(): void {
    if (this._stats != undefined) {
      this._stats.update();
    }
  }

  public static get instance(): Param {
    if (!this._instance) {
      this._instance = new Param();
    }
    return this._instance;
  }

  public makeParamGUI(): void {
    if (this._dat != undefined) return;

    this._dat = new GUI();
    this._add(this.main, "main");
  }

  private _add(obj: ObjectProps, folderName: string): void {
    if (!this._dat) return;

    const folder = this._dat.addFolder(folderName);
    let key: keyof ObjectProps;
    for (key in obj) {
      const value = obj[key];
      if (!value) return;

      if (value.use === undefined) {
        if (value.type === "color") {
          folder.addColor(value, "value").name(key);
        } else {
          if (value.list !== undefined) {
            folder.add(value, "value", value.list).name(key);
          } else {
            folder.add(value, "value", value.min, value.max).name(key);
          }
        }
      }
    }
  }
}

interface ObjectProps {
  [key: string]: {
    use?: string | undefined;
    type?: "color";
    list?: [] | undefined;
    value: number;
    min?: number;
    max?: number;
  };
}
