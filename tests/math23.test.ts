import { clamp01, saturate } from "../src/utils/math23";

const clamped = clamp01(1.5);
const sat = saturate(-0.2);
console.log("ok", clamped, sat);
