import PdfViewer from "./components/PdfViewer";
import styled from "styled-components";
import "./globalStyle.css";
import { useEffect, useState, ChangeEvent } from "react";
import { parsePdfFile } from "./util/parsePdfFile";
import PDFTableView from "./components/PDFTableView";
import type { Rows } from "./components/PDFTableView";

function App() {
  const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageTexts, setPageTexts] = useState<Rows[]>([]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file);
      setPdfFileUrl(fileUrl);
    } else {
      alert("PDF 파일만 업로드 가능합니다.");
    }
  };

  useEffect(() => {
    const loadPdfData = async () => {
      if (pdfFileUrl) {
        const extractedPageTexts = await parsePdfFile(pdfFileUrl);
        setPageTexts(extractedPageTexts || []);
      }
    };

    loadPdfData();
  }, [pdfFileUrl]);

  return (
    <Container>
      <LeftSection>
        {pdfFileUrl ? (
          <PdfViewer
            pdfFile={pdfFileUrl}
            numPages={numPages}
            pageNumber={pageNumber}
            setNumPages={setNumPages}
            setPageNumber={setPageNumber}
          />
        ) : (
          <UploadSection onFileChange={handleFileChange} />
        )}
      </LeftSection>
      <RightSection>
        {pdfFileUrl && (
          <PDFTableView pageNumber={pageNumber} pageTexts={pageTexts} />
        )}
      </RightSection>
    </Container>
  );
}

const UploadSection = ({
  onFileChange,
}: {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <Upload>
    <UploadText>PDF 파일을 업로드 해주세요.</UploadText>
    <Input type="file" accept="application/pdf" onChange={onFileChange} />
  </Upload>
);

export default App;

const Container = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid grey;
`;

const RightSection = styled.div`
  width: 50vw;
  height: 100vh;
  overflow: scroll;
`;

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 2px dashed #007bff;
  border-radius: 10px;
  background-color: #f0f8ff;
  width: 80%;
  max-width: 400px;
  text-align: center;
  gap: 20px;
`;

const UploadText = styled.h3`
  font-size: 20px;
  color: #333;
  margin: 0;
`;

const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #007bff;
  border-radius: 5px;
  background-color: #fff;
  color: #007bff;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
    border-color: #0056b3;
  }
`;
