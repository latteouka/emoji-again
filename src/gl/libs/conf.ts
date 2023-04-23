export class Conf {
  private static _instance: Conf;

  public IS_BUILD = false;

  public FLG_PARAM: boolean = this.IS_BUILD ? false : true;
  public FLG_LOW_FPS: boolean = this.IS_BUILD ? false : false;
  public FLG_DEBUG_TXT: boolean = this.IS_BUILD ? false : false;
  public FLG_STATS: boolean = this.IS_BUILD ? false : true;

  public static get instance(): Conf {
    if (!this._instance) {
      this._instance = new Conf();
    }
    return this._instance;
  }
}
