import { decodePDFRawStream, PDFArray, PDFDict, PDFDocument, PDFHexString, PDFName, PDFRawStream, PDFStream, PDFString } from "pdf-lib"

// This module imports pdf-lib. It is a heavy library, therefore this module should be imported
// dynamically.

const fileName = "resume_data.json";

export const addEmbededData = async (sourcePdf: Blob, data: Record<any, any>, description: string): Promise<Blob> => {
  const pdf = await PDFDocument.load(await sourcePdf.arrayBuffer());
  await pdf.attach(new TextEncoder().encode(JSON.stringify(data)), fileName, {
    mimeType: 'application/json',
    description,
  })
  return new Blob([ await pdf.save()]);
}

export class DataExtractionError extends Error {}

const getEmbededFile = async (pdf: ArrayBuffer): Promise<Uint8Array> => {
  const parsed = await PDFDocument.load(pdf);

  const Names = parsed.catalog.lookup(PDFName.of('Names'), PDFDict)

  if (!Names.has(PDFName.of('EmbeddedFiles'))) {
    throw new DataExtractionError("PDF has no embeded files")
  }

  const EmbeddedFiles = Names.lookup(PDFName.of('EmbeddedFiles'), PDFDict)

  if (!EmbeddedFiles.has(PDFName.of('Names'))) {
    throw new DataExtractionError("PDF has no names.")
  }

  const EFNames = EmbeddedFiles.lookup(PDFName.of('Names'), PDFArray)

  for (let idx = 0, len = EFNames.size(); idx < len; idx += 2) {
    const name = EFNames.lookup(idx) as PDFHexString | PDFString;
    if (name.decodeText() === fileName) {
      const stream = EFNames.lookup(idx + 1, PDFDict)
        .lookup(PDFName.of('EF'), PDFDict)
        .lookup(PDFName.of('F'), PDFStream) as PDFRawStream;
      return decodePDFRawStream(stream).decode()
    }
  }

  throw new DataExtractionError("Resume data Not found.")
};

export const getEmbededData = async (pdf: ArrayBuffer): Promise<Record<any, any>> => {
  try {
    const file = new TextDecoder().decode(await getEmbededFile(pdf));
    return JSON.parse(file);
  } catch (e) {
    if (e instanceof DataExtractionError) {
      throw e;
    }
    if( e instanceof SyntaxError) {
      throw new DataExtractionError("Invalid JSON.", {cause: e});
    }
    throw new DataExtractionError("Something went wrong.", {cause: e});
  }
}