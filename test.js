import { match } from "path-to-regexp";
const fn = match("/test{/bar}/route");
console.log(fn("/test/route"));
