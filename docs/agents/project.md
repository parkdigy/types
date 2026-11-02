# 프로젝트 구조와 개발 참고

2026-11-02 기준 소스와 설정을 분석했다. 실제 파일이 바뀌면 현재 코드를 우선하고 이 문서도 갱신한다.

`@pdg/types`는 타입 유틸리티 패키지다. `src/index.ts`가 8개 모듈을 재내보내며 현재 공개 항목은 모두 타입이다. 서비스, UI 또는 런타임 기능은 없다.

| 경로 | 역할 |
| --- | --- |
| `src/Compare.ts` | 값 포함, 빈 객체·배열, 유니온 관련 타입 |
| `src/Data.ts`, `src/Function.ts`, `src/Letter.ts` | 레이블·값, 함수, 문자 관련 타입 |
| `src/Null.ts` | nullable 속성 키와 속성 선택 |
| `src/ObjectArray.ts` | 객체·배열, 펼치기, 읽기 전용 제거 등 타입 |
| `src/PickOmit.ts`, `src/Spread.ts` | 속성 선택·제외 및 객체 스프레드 관련 타입 |
| `src/index.ts` | 위 모듈의 공개 진입점 |
| `test/template.test.ts` | 문자열 변환 샘플 테스트. 공개 타입 검증은 없음 |
| `examples/` | 독립 npm 프로젝트. 현재 콘솔 출력 샘플이며 루트 패키지 연결 없음 |
| `tsconfig.json`, `tsconfig.test.json`, `jest.config.ts` | 소스 선언 생성·타입 검사 및 ts-jest 테스트 설정 |
| `package.json`, `rollup.config.js` | 배포 진입점·스크립트 및 별도 Rollup 설정 |
| `dist/` | Git 추적 중인 생성 선언 파일. 직접 수정하지 않음 |

## 빌드와 검증

Node 버전은 `.nvmrc`의 `24.22.1`이다. `tsconfig.json`은 `src/`를 대상으로 ES2017, ESNext, `moduleResolution: bundler`, `strict`, `verbatimModuleSyntax`, `emitDeclarationOnly`를 사용한다. `npm run tsc`는 `tsc --noEmit`이며 테스트와 예제는 검사하지 않는다. `npm run lint`는 `src/**/*.ts`만 검사한다. Jest는 Node 환경에서 ts-jest를 사용하지만 현재 테스트는 타입 API를 다루지 않는다. 타입 변경 시 컴파일 성공 및 `@ts-expect-error` 등 거부 사례를 포함한 타입 검사를 별도로 구성한다.

`npm run build`는 `watchman:del` → `test` → `lint` → `tsc` 순서로 실행한다. 마지막 `tsc`는 선언 파일만 생성한다. Watchman 오류 시 `npm test -- --runInBand --watchman=false`, `npm run lint`, `./node_modules/.bin/tsc`를 별도로 실행해 대체 검증할 수 있으나 표준 빌드 통과와 구분한다. `dist/`는 Git에서 추적 중이므로 생성 후 diff를 확인한다.

`rollup.config.js`는 별도 설정이며 현재 `build` 스크립트에서 실행되지 않는다. 이 설정은 `dist/*`를 삭제한 후 CJS·ESM 번들과 선언 파일을 만들도록 구성돼 있으므로 사용 전 기존 생성물과 부작용을 확인한다. `npm run dev`는 `examples/`의 `tsx src/example.ts`를 단발 실행한다.

## 배포 설정 주의점

- `package.json`의 `types`와 `exports.types`는 `dist/index.d.ts`를 가리킨다. `main`·`exports.require`와 `module`·`exports.import`는 각각 `dist/index.js`, `dist/index.esm.js`를 가리키지만 표준 빌드는 JS 파일을 생성하지 않는다. 현재 공개 API는 타입 전용이므로 런타임 진입점의 지원 여부를 임의로 가정하지 않는다.
- Rollup으로 JS를 생성하더라도 `type: module` 패키지의 CJS `.js` 경로는 Node에서 ESM으로 해석된다. 모듈 형식이나 배포 경로를 변경할 때는 실제 tarball을 설치해 지원 대상의 타입 해석과 `import`·`require` 동작을 확인한다.
- `files`는 `dist`와 `README.md`를 포함한다. `npm pack --dry-run`으로 배포 목록을 확인한다. 루트 `package-lock.json`과 예제 잠금 파일은 Git 제외 대상이다.
- `npm run pub`는 설치·빌드·공개 게시를 수행한다. 끝의 `|| true` 때문에 종료 코드만으로 성공을 판단할 수 없다. `git:commit`은 전체 변경을 스테이징하며 `reset:gitignore`, `reinstall:module`도 작업 트리나 의존성에 영향을 주므로 일반 검증에 사용하지 않는다.

## 분석 시 확인

Node `v24.22.1`, npm `11.19.1`과 기존 의존성으로 `npm run tsc`, `npm run lint`, `npm test -- --runInBand --watchman=false`가 통과했다. 테스트는 1개다. 임시 npm 캐시를 사용한 `npm pack --dry-run --json`에는 README, package.json과 선언 파일 9개가 포함되고 JS 파일은 없었다. 표준 빌드, 패키지 설치 후 소비 환경, npm 게시는 확인하지 않았다. 이 결과는 이후 변경의 검증을 대신하지 않는다.
