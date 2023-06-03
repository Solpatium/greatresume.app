import { ResumeModel } from "../models/v1";

declare global {
    interface Window { plausible?: any }
}

const tracked: Set<string> = new Set();

const track = (name: string, props: Record<string, any>, key: string) => {
    const fullKey = name+key;
    if (tracked.has(fullKey)) {
        return;
    }
    tracked.add(fullKey);
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) };
    window.plausible(name, { props });
}

export const countResumeDownload = (resume: ResumeModel, fileSize: number) => {
    // Probably some empty resumes.
    if (resume.sections.length < 2) {
        return;
    }
    const template = resume.appearance.template;
    const paperSize = resume.appearance.paperSize;
    const usedImage = !!resume.appearance.image;
    const sectionsCount = resume.sections.length;
    track("pdfDownload", { template, paperSize, usedImage, sectionsCount, fileSize }, template);
}