uniform float u_time;

varying vec3 v_pos;
varying vec2 v_uv;

void main(void) {
  float time = u_time * 0.0001;

  gl_FragColor = vec4(v_uv, 0.0, 1.0);
}
