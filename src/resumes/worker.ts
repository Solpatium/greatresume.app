import { createPdf } from "./createPdf";

addEventListener(
    "message",
    (event: MessageEvent<string>) => {
        console.time("render worker")
        createPdf(JSON.parse(event.data)).toBlob()
            .then(postMessage)
            .catch(console.error)
            .finally(() => console.timeEnd("render worker"));
    }
);

