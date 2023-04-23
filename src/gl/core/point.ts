export class Point {
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public copy(p: Point) {
    this.x = p.x;
    this.y = p.y;
  }
}
