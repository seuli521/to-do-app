# 📝 모던 스마트 할 일 목록 (To-Do App)

> 웹 표준 기술(HTML, CSS, Vanilla JavaScript)로 제작된 직관적이고 현대적인 스마트 할 일 관리 웹 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

- **📝 할 일 추가 & Enter 키 지원**: 새로운 할 일을 빠르게 입력하고 추가할 수 있습니다.
- **🚫 중복 입력 방지**: 이미 등록된 할 일을 다시 추가할 경우 경고 메시지를 표시합니다.
- **✅ 완료/미완료 상태 토글**: 체크박스를 통해 할 일의 완료 상태를 자유롭게 토글할 수 있으며, 취소선이 적용됩니다.
- **🗑️ 개별 & 일괄 삭제**: 특정 항목 삭제 버튼(`✕`) 및 **"완료 항목 삭제"** 일괄 정리 기능을 제공합니다.
- **🔍 3단계 필터링**: `전체` / `진행중` / `완료` 버튼을 통해 원하는 상태의 항목만 필터링하여 확인 가능합니다.
- **💾 LocalStorage 자동 저장**: 할 일 추가/삭제/완료 시 브라우저 내부 저장소에 실시간 저장되어 새로고침 후에도 데이터가 보존됩니다.
- **📊 실시간 통계 배지**: 전체 할 일 개수와 완료된 할 일 개수를 상단에 실시간으로 표시합니다.
- **🎉 축하 메시지 배너**: 등록된 모든 할 일을 완료하면 축하 메시지가 자동으로 나타납니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: HTML5, Vanilla CSS (Glassmorphism & Flexbox Layout), JavaScript (ES6+)
- **Storage**: Browser LocalStorage API

---

## 📁 프로젝트 구조 (Project Structure)

```text
To do/
├── index.html     # 애플리케이션 HTML 레이아웃
├── style.css      # 모던 카드 디자인 및 애니메이션 스타일시트
├── main.js        # DOM 조작, LocalStorage 관리 및 상태 로직
└── README.md      # 프로젝트 설명 문서
```

---

## 🚀 실행 방법 (Getting Started)

1. 이 저장소를 클론(Clone)하거나 다운로드합니다.
   ```bash
   git clone https://github.com/seuli521/to-do-app.git
   ```
2. `To do` 폴더의 `index.html` 파일을 웹 브라우저(Chrome, Edge 등)로 열어 바로 사용할 수 있습니다.

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.
