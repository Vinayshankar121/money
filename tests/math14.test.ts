import { inverseLerp, lerp } from "../src/utils/math14";

const t = inverseLerp(0, 10, 5);
const value = lerp(0, 10, 0.5);
console.log("ok", t, value);
