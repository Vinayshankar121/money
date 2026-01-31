import { intercept, slope } from "../src/utils/math29";

const m = slope(0, 0, 2, 4);
const b = intercept(m, 2, 4);
console.log("ok", m, b);
