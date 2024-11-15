# PDF Viewer and Parser Application

## 프로젝트 설명

이 프로젝트는 PDF 파일을 웹에서 뷰잉하고, 특정 형식의 법률안 파일에서 신구조문을 파싱하여 이중 배열로 변환하는 웹 애플리케이션입니다. 사용자는 PDF 파일을 업로드하여 웹 페이지에서 PDF 내용을 확인할 수 있으며, PDF 내용 중 신구조문 테이블이 있는 경우 이를 파싱하여 좌우 배열 형태로 출력합니다.

## 주요 기능

1. **PDF 파일 업로드**: 사용자가 로컬 PDF 파일을 웹 애플리케이션에 업로드할 수 있습니다.
2. **PDF 뷰어**: 업로드된 PDF 파일의 내용을 웹 페이지에서 볼 수 있습니다.
3. **신구조문 파싱**: PDF에서 신구조문 표를 추출하여 이중 배열로 변환합니다. 각 배열의 왼쪽은 개정 전 텍스트, 오른쪽은 개정 후 텍스트입니다.

## 기술 스택

- **React.js**: 프론트엔드 프레임워크
- **pdfjs-dist**: PDF 파일의 뷰잉 및 파싱을 위한 라이브러리
- **Vite**: 개발 서버 및 번들러
- **TypeScript**: 정적 타입 체크

## 설치 및 실행 방법

```
git clone https://github.com/flip-404/pdf-project.git
cd pdf-project
yarn install
yarn dev
```

이후 http://localhost:3000에 접속하여 PDF 파일을 업로드하고 내용을 확인할 수 있습니다.
