import { n as __exportAll, t as createComponent } from "./compiler_DEu_fMre.mjs";
import { S as createAstro, f as renderHead, u as renderTemplate } from "./server_BdhT9hyi.mjs";
import { t as renderScript } from "./script_lhLDvlu9.mjs";
/* empty css              */
//#region src/pages/dashboard/renters.astro
var renters_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Renters,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Renters = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Renters;
	if (!Astro.cookies.get("token")) return Astro.redirect("/");
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Renters | RentSafe</title>${renderHead($$result)}</head><body><div class="layout" id="app-layout"><div class="sidebar-overlay" id="sidebar-overlay"></div><aside class="sidebar"><div class="brand"><div class="logo">R</div> RentSafe</div><nav><a href="/dashboard"><i class="nav-icon" data-lucide="layout-dashboard"></i><span>Dashboard</span></a><a href="/dashboard/cars"><i class="nav-icon" data-lucide="car-front"></i><span>Cars</span></a><a href="/dashboard/rentals"><i class="nav-icon" data-lucide="calendar-days"></i><span>Rentals</span></a><a class="is-active" href="/dashboard/renters"><i class="nav-icon" data-lucide="users"></i><span>Renters</span></a><a href="/dashboard/blacklist"><i class="nav-icon" data-lucide="shield-alert"></i><span>Blacklist</span></a></nav><button class="sidebar-logout" id="logout-btn" type="button"><i class="nav-icon" data-lucide="log-out"></i><span>Logout</span></button></aside><main class="main"><div class="topbar"><div class="topbar-left"><button class="mobile-toggle" id="sidebar-toggle" aria-label="Toggle navigation">☰</button><div class="title">Renters</div></div><button class="btn btn-primary" id="show-form-btn">Add Renter</button></div><section class="card form-panel" id="form-wrap" hidden><div class="section-heading"><div><span class="eyebrow">Renter profile</span><h2>Add renter</h2></div><button class="icon-button" id="close-form-btn" type="button" aria-label="Close form">×</button></div><form id="renter-form"><div class="two-col"><label>Full name<input name="fullName" placeholder="Full name" required></label><label>Mobile number<input name="phone" placeholder="Mobile number" required></label></div><div class="two-col"><label>Facebook profile<input name="facebook" placeholder="Profile link or username"></label><label>Valid ID<input name="validId" placeholder="ID information"></label></div><label>Address<textarea name="address" placeholder="Complete address" required></textarea></label><div class="form-actions"><button class="btn btn-secondary" id="cancel-form-btn" type="button">Cancel</button><button class="btn btn-primary" type="submit">Save Renter</button></div></form></section><section class="card table-card"><div class="section-heading"><div><span class="eyebrow">Customer directory</span><h2>Renters</h2></div><span class="record-count" id="record-count"></span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Renter</th><th>Contact</th><th>Address</th><th>Facebook</th><th>Record status</th></tr></thead><tbody id="renter-body"></tbody></table></div><div class="pagination" id="renter-pagination"></div></section></main></div>${renderScript($$result, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/renters.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/renters.astro", void 0);
var $$file = "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/renters.astro";
var $$url = "/dashboard/renters";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/renters@_@astro
var page = () => renters_exports;
//#endregion
export { page };
