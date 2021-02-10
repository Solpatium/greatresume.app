import puppeteer from "puppeteer";
import { IncomingMessage, ServerResponse } from "http";
import * as cache from "../../src/utils/cache";
import exampleResume from "../../src/models/example.json";

let browser: puppeteer.Browser | null = null;
const getPage = async (): Promise<puppeteer.Page> => {
  try {
    if (!browser) {
      browser = await puppeteer.launch({});
    }
    return await browser.newPage();
  } catch (e) {
    console.error(e);
    const oldBrowser = browser;
    browser = await puppeteer.launch({});
    await oldBrowser.close();
    return await browser.newPage();
  }
};

export default async (req: IncomingMessage & { body: any }, res: ServerResponse): Promise<void> => {
  const page = await getPage();
  const key = cache.add(req.body || exampleResume);
  await page.goto(`http://localhost:3000/preview?key=${key}`);
  await page.waitForFunction('window.status === "ready"');
  const pdf = await page.pdf({
    format: "A4",
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    printBackground: true,
  });
  await page.close();
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/pdf");
  res.end(pdf);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
