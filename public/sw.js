importScripts("/scram-custom/scramjet.all.js");

self.addEventListener("message", (event) => {
    if (event.data === "claim") {
        self.clients.claim();
    }
});

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

async function handleRequest(event) {
    const url = new URL(event.request.url);

    // Block video hover previews (storyboards)
    if (url.pathname.includes("/storyboard")) {
        return new Response(null, { status: 204 });
    }

    await scramjet.loadConfig();
    if (scramjet.route(event)) {
        return scramjet.fetch(event);
    }
    return fetch(event.request);
}

self.addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event));
});