import { Font } from "@react-pdf/renderer";

const allVariants = {
  ExtraLight: { fontWeight: 200, fontStyle: "normal" },
  ExtraLightItalic: { fontWeight: 200, fontStyle: "italic" },
  Light: { fontWeight: 300, fontStyle: "normal" },
  LightItalic: { fontWeight: 300, fontStyle: "italic" },
  Regular: { fontWeight: 400, fontStyle: "normal" },
  Italic: { fontWeight: 400, fontStyle: "italic" },
  Medium: { fontWeight: 500, fontStyle: "normal" },
  MediumItalic: { fontWeight: 500, fontStyle: "italic" },
  SemiBold: { fontWeight: 600, fontStyle: "normal" },
  SemiBoldItalic: { fontWeight: 600, fontStyle: "italic" },
  Bold: { fontWeight: 700, fontStyle: "normal" },
  BoldItalic: { fontWeight: 700, fontStyle: "italic" },
  ExtraBold: { fontWeight: 800, fontStyle: "normal" },
  ExtraBoldItalic: { fontWeight: 800, fontStyle: "italic" },
} as const;

export type FontVariant = keyof typeof allVariants;

const fonts = [
  "Karla", "NotoSerif", "Poppins",
  "Merriweather", "Montserrat", "Quicksand",
  "CrimsonPro", "Lato", "Nunito", "Manrope"
] as const;
export type FontFamily = typeof fonts[number];

export type FontRequirements = Partial<Record<FontFamily, FontVariant[]>>;

export const registerRequiredFonts = (requirements: FontRequirements): void => {
  for (const [font, variants] of Object.entries(requirements)) {
    Font.register({
      family: font,
      fonts: variants.map(name => ({
        ...allVariants[name],
        src: `/fonts/${font}/${font}-${name}.ttf`,
      })),
    });
  }
};
