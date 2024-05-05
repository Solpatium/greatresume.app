import { type, string, Infer } from "superstruct";

export const sectionBase = type({
    title: string(),
    id: string(),
});