<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=header&text=Epigram&fontSize=80&fontColor=5534DA&animation=fadeIn"/>
</div>

## 🖐️ 프로젝트 소개
<div align="center">
  <blockquote>매일매일 짧은 격언, 재치 있는 문구(에피그램)를 공유하고 기록하는 프로젝트
  </blockquote>
  </br>
</div>

<div align="center">
  <p>
    <strong>날마다 에피그램</strong> 하루 한 번씩 새로운 에피그램(Epigram)을 작성하고, 다른 사람들과 함께 공유함으로써 일상 속 작은 영감을 주고받는 것을 목표로 합니다.
  </p>
  <nav>
    <a href="#서비스소개">📅 서비스 소개</a></br>
    <a href="#진행과정">🔥 Epigram 팀의 경험</a></br>
    <a href="#프로젝트구조">🔧 프로젝트 구조</a></br>
    <a href="#팀원소개">🧑 팀원소개</a>
  </nav>
</div>

<h2 id="서비스소개">📅 서비스 소개</h2>

<div align="center">
  <section>
  </section>
  </br>
  <section>
  </section>
  </br>
  <section>
  </section>
  </br>
  <section>
  </section>
</div>

<h2 id="진행과정">🔥 Epigram 팀의 경험</h2>

### 📜 Epigram 팀의 이슈 관리

### ✏️ Epigram 팀의 기록

<div align="center">
  <p>⏬아래 링크를 클릭하시면 Epigram을 어떻게 만들었는지 알 수 있습니다.⏬</p>
  <a href="https://dolomite-donkey-8b6.notion.site/Epigram-1b0995a2c17480d096dbe2da15037e4f">⏩Epigram 팀의 Notion 구경하기⏪</a>
</div>

<h2 id="프로젝트구조">🔧 프로젝트 구조</h2>

### ⚙️ API 흐름 도식화

<div align="center">

</div>


### 🗂️ 디렉토리 구조

```bash

```

### 💎 주요 기술 스택

|기술 이름|선정 이유|
|---|---|
|![Static Badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) |컴포넌트 기반 설계 방식인 리액트 라이브러리를 활용하여 SSR과 CSR를 혼합해서 사용하기 위해 선정한 프레임워크입니다.|
|![Static Badge](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)|Props 타입 지정으로 인한 런타임 오류 감소, vscode 자동 완성 기능 등 타입 안정성을 통한 코드 품질 개선을 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/React--Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)|UI 상태와 서버 상태를 분리하고, api 데이터에 대한 Promise를 집약적으로 관리하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/State%20Management-Zustand-FF9900?logo=zustand)|전역 UI 상태를 관리하기 위해 선정했습니다. 현재 프로젝트에서는 모달의 상태를 zustand로 관리합니다.|
|![Static Badge](https://img.shields.io/static/v1?style=for-the-badge&message=Axios&color=5A29E4&logo=Axios&logoColor=FFFFFF&label=)|axios instance의 interceptor 기능을 통한 중복 코드 최소화 등을 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)|폼의 상태를 집약적으로 관리하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/-Zod-3E67B1?style=flat&logo=zod&logoColor=white)|폼의 유효성 정의 및 타입 추출이 용이하고, API request 타입정의 및 safeParse()메소드를 통한 API 응답 데이터 타입 검증을 하기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/es_toolkit-0080FF?style=flat-square&logo=es_toolkit&logoColor=blue&style=for-the-badge)|유틸리티 기능을 선언형으로 작성함으로써 코드 가독성을 향상시키기 위해 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)|유틸리티 클래스 사용으로 클래스 네이밍 고민 감소, 디자인 시스템이 미흡 시 유연한 대응이 가능하기에 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)|Next.js와의 완벽한 통합 및 소규모 웹 애플리케이션에서 무료 플랜을 제공해주기 때문에 선정했습니다.|
|![Static Badge](https://img.shields.io/badge/framer_motion-ffca28?style=for-the-badge&logo=framer&logoColor=%23ffffff&color=%237178f6)|FRAMER MOTION 기반 애니메이션 라이브러리를 사용함으로써 손 쉽게 애니메이션을 적용하고, 보다 풍부한 UX를 제공하기 위해 사용했습니다.|
|![Static Badge](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)|단위 및 통합 테스트를 시행하기 위해 선정한 라이브러리입니다.|
|![Static Badge](https://img.shields.io/badge/Storybook-FF4785?logo=Storybook&logoColor=white)|UI 컴포넌트들을 시각화 문서로 관리하기 위해 선정한 라이브러리입니다.|
|![Static Badge](https://img.shields.io/badge/Playwright-end_to_end_tests-blue)|E2E 테스트를 빠르게 수행하고, 크로스 브라우징 및 디바이스 기기의 테스트를 자동화하기 위해 선정한 라이브러리입니다.|

<h2 id="팀원소개">🧑 팀원 소개</h2>

<markdown-accessiblity-table>
 <table align="center">
   <tbody>
   <tr height="150px">
    <td align="center" width="150px">
     <a href="https://github.com/ToKyun02">
     <img src="https://avatars.githubusercontent.com/Tokyun02" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/sang-seok">
     <img src="https://avatars.githubusercontent.com/sang-seok" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/sori4606">
     <img src="https://avatars.githubusercontent.com/sori4606" style="max-width: 100%;"></a>
    </td>
   </tr>
   <tr height="50px">
    <td align="center" width="150px">
     <a href="https://github.com/Tokyun02">김도균</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/sang-seok">박상석</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/sori4606">송형진</a>
    </td>
   </tr>
      <tr height="150px">
    <td align="center" width="150px">
     <a href="https://github.com/jaehyeongjung">
     <img src="https://avatars.githubusercontent.com/jaehyeongjung" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/rak517">
     <img src="https://avatars.githubusercontent.com/rak517" style="max-width: 100%;"></a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/CJewon">
     <img src="https://avatars.githubusercontent.com/CJewon" style="max-width: 100%;"></a>
    </td>
   </tr>
      <tr height="50px">
    <td align="center" width="150px">
     <a href="https://github.com/jaehyeongjung">정재형</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/rak517">최성락</a>
    </td>
    <td align="center" width="150px">
     <a href="https://github.com/CJewon">최제원</a>
    </td>
   </tr>
  </tbody>
 </table>
</markdown-accessiblity-table>



<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=footer&fontSize=80" />
</div>