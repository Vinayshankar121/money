import { radiansPerSecondToRPM, rpmToRadiansPerSecond } from "../src/utils/math26";

const rpm = radiansPerSecondToRPM(Math.PI);
const rad = rpmToRadiansPerSecond(60);
console.log("ok", rpm, rad);
