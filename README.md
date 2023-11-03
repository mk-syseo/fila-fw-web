# FILA FRONTEND LIBRARY
소스코드를 clone한 후, VS Code를 실행합니다.

### 패키지 설치하기
소스코드 clone이 완료되었다면 아래 가이드를 따라 VS Code의 터미널을 실행한다.
👉🏻 VS Code 상단 [Terminal] → [New Terminal] 또는 Ctrl + Shift + ` (backtick) 

실행한 터미널에 아래 명령어를 입력하여 필요한 패키지를 다운로드받아 설치한다.
- npm install


### 실행하기
패키지 설치가 완료되면 로컬 환경에서 프로젝트를 실행해본다. 명령어가 정상적으로 실행되면 접속할 수 있는 로컬 주소가 출력되며 브라우저에 이 주소를 입력하여 이동한다.
- npm run dev


### 빌드하기
수정한 소스가 정상적으로 동작하는지 보기 위해서 빌드를 수행하고 preview로 로컬 서버를 실행합니다.
- npm run build
- npm run preview

fila-cm-web, fila-hr-web 등 라이브러리를 참조하는 프로젝트의 환경변수에서 아래 환경변수를 수정해줍니다.
- VITE_REMOTE_LIB=http://localhost:8099

로컬 실행 시 👉🏻 /env/.env 수정
