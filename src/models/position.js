import { Tuple } from "./tuple"

export class Position extends Tuple {
  get x() { return this[0] }
  get y() { return this[1] }
  get z() { return this[2] }
  get w() { return this[3] }

  get isPoint()  { return this.w == 1 }
  get isVector() { return this.w == 0 }

  crossProduct(position) {
    if (!this.isVector || !position.isVector)
      throw new Error("Positions must be vectors")

    return new this.constructor(
      this.y * position.z - this.z * position.y,
      this.z * position.x - this.x * position.z,
      this.x * position.y - this.y * position.x,
      this.w
    )
  }

  reflect(normal) {
    if (!this.isVector || !normal.isVector)
      throw new Error("Positions must be vectors")

    return this.subtract(normal.multiplyBy(2).multiplyBy(this.dotProduct(normal)))
  }
}

export function Point(x, y, z) {
  return Position.of(x, y, z, 1)
}

export function Vector(x, y, z) {
  return Position.of(x, y, z, 0)
}
