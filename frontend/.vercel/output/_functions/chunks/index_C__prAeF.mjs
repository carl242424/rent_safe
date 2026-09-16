import { n as __exportAll, t as createComponent } from "./compiler_DEu_fMre.mjs";
import { S as createAstro, f as renderHead, u as renderTemplate } from "./server_BdhT9hyi.mjs";
import { t as renderScript } from "./script_lhLDvlu9.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	if (Astro.cookies.get("token")) return Astro.redirect("/dashboard");
	return renderTemplate`<html lang="en" data-astro-cid-lcdefpme><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>RentSafe Admin Login</title>${renderHead($$result)}</head><body data-astro-cid-lcdefpme><div class="shell" data-astro-cid-lcdefpme><div class="card" data-astro-cid-lcdefpme><div class="brand" data-astro-cid-lcdefpme><div class="logo" data-astro-cid-lcdefpme>R</div><h1 data-astro-cid-lcdefpme>RentSafe</h1></div><form id="login-form" data-astro-cid-lcdefpme><label data-astro-cid-lcdefpme>Email or Username<input type="text" id="identifier" name="identifier" placeholder="admin@rentsafe.com" required data-astro-cid-lcdefpme></label><label data-astro-cid-lcdefpme>Password<div class="password-wrap" data-astro-cid-lcdefpme><input type="password" id="password" name="password" placeholder="Enter password" required data-astro-cid-lcdefpme><button type="button" class="toggle-btn" id="toggle-password" aria-label="Show password" data-astro-cid-lcdefpme>Show</button></div></label><button type="submit" id="login-button" data-astro-cid-lcdefpme>Log in</button><div class="error" id="login-error" data-astro-cid-lcdefpme></div></form></div></div>${renderScript($$result, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/index.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/index.astro", void 0);
var $$file = "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
