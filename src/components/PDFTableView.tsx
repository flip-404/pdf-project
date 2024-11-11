import styled from "styled-components";

interface RowData {
  yPos: number;
  leftRow: string;
  rightRow: string;
}

export interface Rows {
  yPosGroup: RowData[];
}

interface PDFTableViewProps {
  pageNumber: number;
  pageTexts: Rows[];
}

function PDFTableView({ pageNumber, pageTexts }: PDFTableViewProps) {
  const selectedPage = pageTexts[pageNumber - 1] || { yPosGroup: [] };

  return (
    <Container>
      <Page>{renderRows(selectedPage)}</Page>
    </Container>
  );
}

function renderRows({ yPosGroup }: Rows) {
  return (
    <Table>
      {yPosGroup.map((row) => (
        <TableRow key={row.yPos}>
          <TableCell>{row.leftRow}</TableCell>
          <TableCell>{row.rightRow}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default PDFTableView;

const Container = styled.div`
  margin-top: 60px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: scroll;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
  word-wrap: break-word;
  white-space: normal;
  width: 50%; /* 각 셀의 너비를 1:1 비율로 설정 */
`;
