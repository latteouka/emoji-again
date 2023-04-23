export class Func {
  private static _instance: Func;

  public static get instance(): Func {
    if (!this._instance) {
      this._instance = new Func();
    }
    return this._instance;
  }

  public ratio(): number {
    return window.devicePixelRatio || 1;
  }

  public px(num: number): string {
    return `${num}px`;
  }

  public useScreen(): boolean {
    return screen != undefined;
  }

  public sw(): number {
    return window.innerWidth;
  }

  public sh(): number {
    return window.innerHeight;
  }

  public screenOffsetY(): number {
    return (window.innerHeight - this.sh()) * 0.5;
  }
}
