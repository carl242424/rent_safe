import { n as __exportAll, t as createComponent } from "./compiler_DEu_fMre.mjs";
import { S as createAstro, f as renderHead, u as renderTemplate } from "./server_BdhT9hyi.mjs";
import { t as renderScript } from "./script_lhLDvlu9.mjs";
/* empty css              */
//#region src/pages/dashboard/blacklist.astro
var blacklist_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blacklist,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Blacklist = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Blacklist;
	if (!Astro.cookies.get("token")) return Astro.redirect("/");
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blacklist | RentSafe</title>${renderHead($$result)}</head><body><div class="layout" id="app-layout"><div class="sidebar-overlay" id="sidebar-overlay"></div><aside class="sidebar"><div class="brand"><div class="logo">R</div> RentSafe</div><nav><a href="/dashboard"><i class="nav-icon" data-lucide="layout-dashboard"></i><span>Dashboard</span></a><a href="/dashboard/cars"><i class="nav-icon" data-lucide="car-front"></i><span>Cars</span></a><a href="/dashboard/rentals"><i class="nav-icon" data-lucide="calendar-days"></i><span>Rentals</span></a><a href="/dashboard/renters"><i class="nav-icon" data-lucide="users"></i><span>Renters</span></a><a class="is-active" href="/dashboard/blacklist"><i class="nav-icon" data-lucide="shield-alert"></i><span>Blacklist</span></a></nav><button class="sidebar-logout" id="logout-btn" type="button"><i class="nav-icon" data-lucide="log-out"></i><span>Logout</span></button></aside><main class="main"><div class="topbar"><div class="topbar-left"><button class="mobile-toggle" id="sidebar-toggle" aria-label="Toggle navigation">☰</button><div class="title">Blacklist</div></div><button class="btn btn-primary" id="show-form-btn">Add Record</button></div><section class="card form-panel" id="form-wrap" hidden><div class="section-heading"><div><span class="eyebrow">Record details</span><h2 id="form-title">Add blacklist entry</h2></div><button class="icon-button" id="close-form-btn" type="button" aria-label="Close form">×</button></div><form id="blacklist-form"><div class="two-col"><label>Renter name<input name="renterName" placeholder="Full name" required></label><label>Facebook profile<input name="facebook" placeholder="Profile link or username"></label></div><div class="two-col"><label>Contact number<input name="phone" placeholder="Mobile number"></label><label>Reason<input name="reason" placeholder="Reason for blacklist" required></label></div><label>Notes<textarea name="notes" placeholder="Additional context (optional)"></textarea></label><div class="upload-field"><span class="field-label">Photo <small>JPG, PNG, or WebP up to 5 MB</small></span><label class="upload-drop" for="blacklist-image-file"><i data-lucide="upload-cloud"></i><strong>Upload photo</strong><span>Click to choose an image</span><input id="blacklist-image-file" type="file" accept="image/jpeg,image/png,image/webp"></label><div class="upload-preview" id="blacklist-image-preview" hidden></div><p class="field-error" id="image-error" role="alert"></p></div><div class="form-actions"><button class="btn btn-secondary" id="cancel-form-btn" type="button">Cancel</button><button class="btn btn-primary" type="submit">Save Record</button></div></form></section><section class="card table-card"><div class="section-heading"><div><span class="eyebrow">Active records</span><h2>Blacklist records</h2></div><span class="record-count" id="record-count"></span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Photo</th><th>Renter</th><th>Facebook</th><th>Reason</th><th>Date added</th><th>Actions</th></tr></thead><tbody id="blacklist-body"></tbody></table></div><div class="pagination" id="blacklist-pagination"></div></section></main></div>${renderScript($$result, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/blacklist.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/blacklist.astro", void 0);
var $$file = "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard/blacklist.astro";
var $$url = "/dashboard/blacklist";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard/blacklist@_@astro
var page = () => blacklist_exports;
//#endregion
export { page };
