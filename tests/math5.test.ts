import { clamp, inRange } from "../src/utils/math5";

const clamped = clamp(10, 0, 5);
const inside = inRange(3, 0, 5);
console.log("ok", clamped, inside);
