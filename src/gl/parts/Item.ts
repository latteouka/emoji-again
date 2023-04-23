import * as THREE from "three";
import vertex from "../glsl/item.vert";
import fragment from "../glsl/item.frag";
import { MyObject3D } from "../core/myObject3D";
import { Update } from "../core/update";
import { Func } from "../libs/func";

export class Item extends MyObject3D {
  private _mesh: THREE.Mesh;
  constructor() {
    super();

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        u_time: { value: Update.instance.elapsed },
      },
      transparent: true,
    });

    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);
    this.add(this._mesh);
  }

  protected _update(): void {
    super._update();
  }

  protected _resize(): void {
    super._resize();
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);
  }
}
