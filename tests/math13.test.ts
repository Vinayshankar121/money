import { stdDev, variance } from "../src/utils/math13";

const varValue = variance([1, 2, 3]);
const stdValue = stdDev([1, 2, 3]);
console.log("ok", varValue, stdValue);
