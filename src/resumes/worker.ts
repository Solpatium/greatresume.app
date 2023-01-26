import { createPdf } from "./createPdf";

// resume is stringified because proxy can't be serialized
export type WorkerMessage = {resumeJson: string; translations: Record<string, string>}

addEventListener(
    "message",
    (event: MessageEvent<WorkerMessage>) => {
        console.time("render worker")
        const translate = (value: string) => event.data.translations[value] ?? value;
        createPdf(JSON.parse(event.data.resumeJson), translate)
            .toBlob()
            .then(postMessage)
            .catch(console.error)
            .finally(() => console.timeEnd("render worker"));
    }
);

