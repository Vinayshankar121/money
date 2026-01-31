import { nearlyEqual, signum } from "../src/utils/math25";

const signValue = signum(-3);
const close = nearlyEqual(0.3000001, 0.3);
console.log("ok", signValue, close);
