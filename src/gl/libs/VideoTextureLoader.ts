import {
  EventDispatcher,
  VideoTexture,
  ClampToEdgeWrapping,
  TextureLoader,
} from "three";

export declare interface VideoEvent {
  type: string;
  tex: VideoTexture;
}

export class VideoTextureLoader extends EventDispatcher {
  private url: string;
  private subImgURL?: string;
  private loaded: boolean;

  private videoElm: HTMLVideoElement;

  constructor(url: string, imgURL?: string) {
    super();

    this.url = url;
    this.subImgURL = imgURL;
    this.loaded = false;

    /*-------------------------------
			Load
		-------------------------------*/

    this.videoElm = document.createElement("video");
    this.videoElm.muted = true;
    this.videoElm.autoplay = true;
    this.videoElm.setAttribute("playsinline", "");

    this.videoElm.oncanplay = this.onVideoLoaded.bind(this);
    this.videoElm.oncanplaythrough = this.onVideoLoaded.bind(this);

    this.videoElm.src =
      this.url + "?v=" + Math.floor(Math.random() * 10000).toString();

    this.videoElm.onstalled = () => {
      this.createImageTexture();
    };

    this.videoElm.load();
  }

  private onVideoLoaded() {
    if (this.loaded) return;
    this.loaded = true;

    void this.videoElm.play();

    const tex = new VideoTexture(this.videoElm);
    // tex.image.width = tex.image.videoWidth;
    // tex.image.height = tex.image.videoHeight;
    tex.wrapS = ClampToEdgeWrapping;
    tex.wrapT = ClampToEdgeWrapping;
    tex.needsUpdate = true;

    this.dispatchEvent({
      type: "load",
      tex: tex,
    });

    const duration = this.videoElm.duration - 0.5;

    tex.onUpdate = () => {
      // repeat

      if (this.videoElm.currentTime >= duration) {
        this.videoElm.currentTime = 0;
        void this.videoElm.play();
      }
    };

    document.addEventListener("visibilitychange", () => {
      setTimeout(() => {
        void this.videoElm.play();
      }, 500);
    });
  }

  public createImageTexture() {
    if (this.subImgURL) {
      const loader = new TextureLoader();
      loader.crossOrigin = "use-credentials";

      loader.load(this.subImgURL, (tex) => {
        this.dispatchEvent({
          type: "load",
          texture: tex,
        });
      });
    }
  }

  public switchPlay(play: boolean) {
    if (play) {
      void this.videoElm.play();
    } else {
      this.videoElm.pause();
    }
  }
}
