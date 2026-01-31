import { roundTo, toFixedNumber } from "../src/utils/math11";

const rounded = roundTo(3.14159, 2);
const fixed = toFixedNumber(2.71828, 3);
console.log("ok", rounded, fixed);
