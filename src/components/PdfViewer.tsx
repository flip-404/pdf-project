import { Document, Page, pdfjs } from "react-pdf";
import "core-js/full/promise/with-resolvers.js";
import "pdfjs-dist/webpack";
import { useState } from "react";
import styled from "styled-components";
import LeftArrowIcon from "../assets/leftArrow.svg";
import RightArrowIcon from "../assets/rightArrow.svg";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  pdfFile?: string;
  numPages: number | null;
  pageNumber: number;
  setNumPages: (numPages: number) => void;
  setPageNumber: (page: number) => void;
}

const PdfViewer = ({
  pdfFile,
  numPages,
  pageNumber,
  setNumPages,
  setPageNumber,
}: PdfViewerProps) => {
  const [pageScale, setPageScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleScaleChange = (increment: boolean) => {
    setPageScale((prevScale) =>
      increment ? Math.min(prevScale + 0.5, 3) : Math.max(prevScale - 0.5, 1)
    );
  };

  const handlePageChange = (direction: "prev" | "next") => {
    let newPageNumber: number;

    if (direction === "prev") {
      newPageNumber = Math.max(pageNumber - 1, 1);
    } else if (direction === "next" && numPages) {
      newPageNumber = Math.min(pageNumber + 1, numPages);
    } else {
      newPageNumber = pageNumber;
    }

    setPageNumber(newPageNumber);
  };

  return (
    <Container>
      <HeaderBar>
        Page {pageNumber} of {numPages}
        <ScaleControl>
          <ControlButton onClick={() => handleScaleChange(true)}>
            확대
          </ControlButton>
          <ControlButton onClick={() => handleScaleChange(false)}>
            축소
          </ControlButton>
        </ScaleControl>
      </HeaderBar>
      <PdfContainer>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            scale={pageScale}
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </PdfContainer>
      <NavButton onClick={() => handlePageChange("prev")}>
        <img src={LeftArrowIcon} alt="Previous" />
      </NavButton>
      <NavButton onClick={() => handlePageChange("next")}>
        <img src={RightArrowIcon} alt="Next" />
      </NavButton>
    </Container>
  );
};

export default PdfViewer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PdfContainer = styled.div`
  margin-top: 60px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  overflow: auto;
`;

const HeaderBar = styled.div`
  position: fixed;
  width: 50%;
  top: 0;
  z-index: 999;
  height: 60px;
  background-color: #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 20px;
  font-size: 16px;
`;

const NavButton = styled.button`
  all: unset;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 10;

  &:first-of-type {
    left: 10px;
  }
  &:last-of-type {
    right: 10px;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const ScaleControl = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background-color: #fff;
  border: 2px solid #007bff;
  color: #007bff;
  padding: 5px 15px;
  font-size: 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
    border-color: #0056b3;
  }

  &:active {
    background-color: #0056b3;
    color: white;
  }
`;
