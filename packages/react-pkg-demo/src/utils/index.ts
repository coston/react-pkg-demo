import fs from "fs";
import path from "path";

export const readFile = (filePath: string): string => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absolutePath, "utf8");
};

export function pickTextColorBasedOnBgColorSimple(
  bgColor: string,
  lightColor = "#fff",
  darkColor = "#000"
): string {
  const color = bgColor.startsWith("#") ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}
