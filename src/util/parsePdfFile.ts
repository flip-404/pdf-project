import { pdfjs } from "react-pdf";

export interface RowGroup {
  leftRow: string;
  rightRow: string;
}

export interface ParsedPage {
  yPosGroup: { yPos: number; leftRow: string; rightRow: string }[];
}

export const parsePdfFile = async (
  fileUrl: string
): Promise<ParsedPage[] | null> => {
  try {
    const loadingTask = pdfjs.getDocument(fileUrl);
    const pdfDocument = await loadingTask.promise;
    const numPages = pdfDocument.numPages;

    const pageTexts: ParsedPage[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();

      const pageWidth = page.view[2];
      const middleX = pageWidth / 2;

      const yPosGroup: Record<number, RowGroup> = {};

      textContent.items.forEach((item) => {
        if ("transform" in item) {
          const xPos = item.transform[4];
          const yPos = item.transform[5];

          if (!yPosGroup[yPos]) {
            yPosGroup[yPos] = { leftRow: "", rightRow: "" };
          }

          if (xPos < middleX) {
            yPosGroup[yPos].leftRow += item.str;
          } else {
            yPosGroup[yPos].rightRow += item.str;
          }
        }
      });

      const sortedYPosGroup = Object.entries(yPosGroup)
        .sort(([yPosA], [yPosB]) => Number(yPosB) - Number(yPosA))
        .map(([yPos, group]) => ({ yPos: Number(yPos), ...group }));

      pageTexts.push({ yPosGroup: sortedYPosGroup });
    }

    return pageTexts;
  } catch (error) {
    console.error("PDF parsing error:", error);
    return null;
  }
};
