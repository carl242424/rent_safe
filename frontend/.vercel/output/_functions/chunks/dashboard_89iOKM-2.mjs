import { n as __exportAll, t as createComponent } from "./compiler_DEu_fMre.mjs";
import { S as createAstro, d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_BdhT9hyi.mjs";
import { t as renderScript } from "./script_lhLDvlu9.mjs";
/* empty css              */
//#region src/components/DashboardShell.astro
createAstro("https://astro.build");
var $$DashboardShell = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DashboardShell;
	const { title, description, activePage } = Astro.props;
	return renderTemplate`<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | RentSafe</title>${renderHead($$result)}</head><body><div class="app-layout" id="app-layout"><div class="sidebar-overlay" id="sidebar-overlay"></div><aside class="sidebar" aria-label="Main navigation"><div class="brand"><div class="logo">R</div><div><strong>RentSafe</strong><span>Rental operations</span></div></div><div class="nav-label">Workspace</div><nav>${[
		{
			href: "/dashboard",
			label: "Dashboard",
			icon: "layout-dashboard",
			key: "dashboard"
		},
		{
			href: "/dashboard/cars",
			label: "Cars",
			icon: "car-front",
			key: "cars"
		},
		{
			href: "/dashboard/rentals",
			label: "Rentals",
			icon: "calendar-days",
			key: "rentals"
		},
		{
			href: "/dashboard/renters",
			label: "Renters",
			icon: "users",
			key: "renters"
		},
		{
			href: "/dashboard/blacklist",
			label: "Blacklist",
			icon: "shield-alert",
			key: "blacklist"
		}
	].map((item) => renderTemplate`<a${addAttribute({ "is-active": activePage === item.key }, "class:list")}${addAttribute(item.href, "href")}><i class="nav-icon"${addAttribute(item.icon, "data-lucide")}${addAttribute(`${item.label} icon`, "aria-label")}></i><span>${item.label}</span></a>`)}</nav><div class="sidebar-footer"><span class="status-dot"></span><span>System online</span></div><button class="sidebar-logout" id="logout-btn" type="button"><i class="nav-icon" data-lucide="log-out"></i><span>Logout</span></button></aside><main class="main"><header class="page-header"><div class="header-title"><button class="mobile-toggle" id="sidebar-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button><div><div class="breadcrumb">Workspace <span>/</span> ${title}</div><h1>${title}</h1>${description && renderTemplate`<p>${description}</p>`}</div></div><div class="header-actions">${renderSlot($$result, $$slots["actions"])}<div class="user-menu"><div class="avatar">A</div><div class="user-copy"><strong>Administrator</strong><span>Admin account</span></div></div></div></header><div class="page-content">${renderSlot($$result, $$slots["default"])}</div></main></div>${renderScript($$result, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/components/DashboardShell.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/components/DashboardShell.astro", void 0);
//#endregion
//#region src/pages/dashboard.astro
var dashboard_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Dashboard,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Dashboard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Dashboard;
	if (!Astro.cookies.get("token")) return Astro.redirect("/");
	return renderTemplate`${renderComponent($$result, "DashboardShell", $$DashboardShell, {
		"title": "Dashboard",
		"description": "A clear view of your rental operation today.",
		"activePage": "dashboard"
	}, { "default": async ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="stats" id="stats-grid"></section><section class="recent card"><h2>Recent Rentals</h2><div class="table-wrap"><table><thead><tr><th>Renter</th><th>Vehicle</th><th>Duration</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead><tbody id="recent-body"></tbody></table><div class="pagination" id="recent-pagination"></div></div></section>${renderScript($$result, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts")}` })}`;
}, "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard.astro", void 0);
var $$file = "C:/Users/Carl/Desktop/Personal Projects/RentSafe/frontend/src/pages/dashboard.astro";
var $$url = "/dashboard";
//#endregion
//#region \0virtual:astro:page:src/pages/dashboard@_@astro
var page = () => dashboard_exports;
//#endregion
export { page };
