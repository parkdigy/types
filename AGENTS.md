# 에이전트 코딩 가이드

## 프로젝트

`@pdg/types`는 TypeScript 타입 유틸리티 패키지다. `src/index.ts`가 비교, 객체·배열, 선택·제외 등의 타입을 다시 내보낸다. 현재 공개 런타임 구현은 없다.

- 소스와 공개 진입점: `src/`, `src/index.ts`
- 테스트: `test/` (현재 샘플 테스트만 존재)
- 예제: `examples/src/` (별도 npm 프로젝트, 현재 샘플만 존재)
- 선언 파일: `dist/` (Git 추적 중인 생성물, 직접 편집하지 않음)
- 설정과 배포 시 주의점: [구조 문서](docs/agents/project.md)
- 반복 코딩 절차: [코딩 스킬](.agents/skills/npm-package-development/SKILL.md)

## 작업 원칙

1. 시작할 때 `git status --short`와 관련 소스·설정을 읽고 기존 변경을 보존한다.
2. 요청 범위만 수정하고, 공개 타입 변경은 진입점·선언 파일·타입 테스트·README·예제의 영향을 확인한다. 타입의 정상 사례와 거부해야 하는 사례를 컴파일러로 검증한다.
3. 문서와 작업 결과는 한글로 작성한다. 식별자와 명령은 원래 표기를 사용한다.
4. `dist/`는 생성물이다. 공개 타입 변경 시 선언 파일을 재생성하고 변경 내용을 검토한다. 배포 설정 변경 시 실제 패키지를 설치한 소비 환경에서 검증한다.
5. 커밋·푸시·npm 게시 명령은 요청받은 경우에만 실행한다. 특히 `npm run pub`는 실제 게시를 수행한다.

## 검증

`.nvmrc`의 Node와 npm을 사용한다. 의존성이 없으면 루트에서 `npm install`을 실행하고, 예제 실행 시 `examples/`에서도 별도로 설치한다. 잠금 파일은 Git 제외 대상이다.

```sh
npm run tsc
npm run lint
npm test -- --runInBand --watchman=false
```

`npm run tsc`는 `src/`만 검사하고, 현재 Jest 테스트는 공개 타입을 검증하지 않는다. 타입 변경에는 별도 타입 검사 사례를 추가한다. 선언 파일 변경이 필요하면 `./node_modules/.bin/tsc`로 생성한다. `npm run build`는 Watchman 재등록, Jest, lint, `tsc` 순서다. Watchman이 없거나 접근할 수 없다면 위 검사와 `./node_modules/.bin/tsc`를 별도로 실행하고 표준 빌드 전체가 통과했다고 보고하지 않는다. `rollup.config.js`는 현재 표준 빌드에 포함되지 않는다.

문서만 수정할 때는 링크·경로·명령이 실제 설정과 일치하는지 확인한다. 완료 보고에는 변경 내용, 실행한 검증과 결과, 미확인 사항을 남긴다.
