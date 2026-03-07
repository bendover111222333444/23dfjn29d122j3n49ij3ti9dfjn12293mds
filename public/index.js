"use strict";
const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const { ScramjetController } = $scramjetLoadController();
const scramjet = new ScramjetController({
	files: {
		wasm: "/scram-custom/b4dd3fcfb3153a32.wasm",
		all: "/scram-custom/scramjet.all.js",
		sync: "/scram-custom/scramjet.sync.js",
	},
});
scramjet.init();
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
form.addEventListener("submit", async (event) => {
	event.preventDefault();
	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}
	let url = search(address.value, searchEngine.value);
	// Force HTTPS
	if (url.startsWith("http://")) {
		url = url.replace("http://", "https://");
	}
	// Force www. on bare domains
	try {
		const u = new URL(url);
		const parts = u.hostname.split(".");
		if (parts.length === 2) {
			u.hostname = "www." + u.hostname;
			url = u.toString();
		}
	} catch(e) {}
	// Redirect Google searches to DuckDuckGo to avoid captchas
	if (url.includes("google.com/search")) {
		const query = new URL(url).searchParams.get("q");
		url = "https://duckduckgo.com/?q=" + encodeURIComponent(query);
	}
	let wispUrl = "wss://patient-feather-b579.sigmasigmaonthewallwhoisthe2.workers.dev/";
	await connection.setTransport("/libcurl/index.mjs", [
	    { websocket: wispUrl, replace: true },
	]);
	const frame = scramjet.createFrame();
	frame.frame.id = "sj-frame";
	document.body.appendChild(frame.frame);
	frame.go(url);
});
