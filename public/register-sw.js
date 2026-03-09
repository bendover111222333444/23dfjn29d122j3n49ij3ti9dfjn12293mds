"use strict";
const stockSW = "./sw.js";

const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");
		throw new Error("Your browser doesn't support service workers.");
	}

	// Unregister existing SW before every search for a clean slate
	const existing = await navigator.serviceWorker.getRegistration();
	if (existing) await existing.unregister();

	await navigator.serviceWorker.register(stockSW);

	if (!navigator.serviceWorker.controller) {
		const reg = await navigator.serviceWorker.ready;
		reg.active.postMessage("claim");
		await new Promise(resolve => {
			navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true });
		});
	}
}