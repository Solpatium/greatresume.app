import { createPdf } from "./createPdf";

// resume is stringified because proxy can't be serialized
export type WorkerRequest = { requestIndex: number, resumeJson: string; translations: Record<string, string> }
export type WorkerResponse = { blob: Blob, requestIndex: number };
let lastRequestIndex = 0;

// When multiple requests are made the response is send only for the last one.
addEventListener(
    "message",
    (event: MessageEvent<WorkerRequest>) => {
        lastRequestIndex = event.data.requestIndex;

        const timerName = `Created pdf blob #${lastRequestIndex}`;
        console.time(timerName)
        const translate = (value: string) => event.data.translations[value] ?? value;
        createPdf(JSON.parse(event.data.resumeJson), translate)
            .toBlob()
            .then(blob => {
                if (lastRequestIndex === event.data.requestIndex) {
                    postMessage({ blob, requestIndex: lastRequestIndex } as WorkerResponse);
                }
            })
            .catch(console.error)
            .finally(() => console.timeEnd(timerName));
    }
);

