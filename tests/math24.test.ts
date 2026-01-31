import { denormalize, normalize } from "../src/utils/math24";

const norm = normalize(5, 0, 10);
const denorm = denormalize(0.5, 0, 10);
console.log("ok", norm, denorm);
