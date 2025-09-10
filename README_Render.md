# OVRA — Cleaned for GitHub + Render
_Generated: 2025-09-10T01:01:37_

이 저장소는 Replit 의존성을 제거하고 Render 배포에 맞게 정리된 버전입니다.

## 폴더 구조 (요약)
- `client/` — Vite + React 프론트엔드
- `server/` — Express API (TypeScript, Drizzle ORM)
- `shared/` — 서버/클라이언트 공용 타입·스키마
- `dist/` — 빌드 결과 (CI/Render에서 생성됨)
- `.env.example` — 환경변수 예시

## 주요 변경점
- Replit 전용 파일 제거: `.replit`, `replit.md`, `.config/`, `.local/`, `attached_assets/`, `server/replitAuth.ts`(미사용)
- 개발/캐시 폴더 제거: `.git/`, `node_modules/`, `dist/`
- `vite.config.ts`에서 Replit 플러그인들을 **개발 환경에서만** 활성화되도록 패치

## 데이터베이스 (Replit DB → PostgreSQL)
- 기존 Replit DB는 사용하지 않습니다.
- 이 프로젝트는 `server/db.ts`에서 **PostgreSQL**을 사용합니다. Render PostgreSQL 또는 Neon 을 연결해 주세요.
- 필수 환경변수: `DATABASE_URL`, `SESSION_SECRET`

### 마이그레이션
Drizzle ORM을 사용합니다.
```bash
# 로컬(선택)
npm i
npm run db:push  # .env에 DATABASE_URL 설정 필요
```

## 로컬 개발
```bash
npm i
cp .env.example .env
# .env에 DATABASE_URL/SESSION_SECRET 설정
npm run dev
```
- 개발 모드에서는 Vite 미들웨어가 활성화되어 `http://localhost:5000`에서 API와 프론트 모두 제공합니다.

## 프로덕션 빌드 (로컬 테스트)
```bash
npm run build
NODE_ENV=production node dist/index.js
# http://localhost:5000
```

## Render 배포
1. GitHub에 이 폴더(`Ovra`)를 **새 저장소**로 푸시
2. Render → **New +** → **Web Service**
3. **Build Command**: `npm run build`
4. **Start Command**: `npm run start`
5. **Environment**: `Node`
6. **Env Vars**
   - `PORT = 5000` (Render가 자동 주입하는 PORT를 사용하므로 생략 가능)
   - `DATABASE_URL = (Render PostgreSQL의 연결 문자열)`
   - `SESSION_SECRET = (아무 32+자 랜덤 문자열)`
   - `OPENAI_API_KEY` (선택)
7. Render PostgreSQL을 생성했다면 대시보드의 **Internal Database URL**을 그대로 `DATABASE_URL`로 붙여넣으세요.

### 헬스 체크
- 서버는 `server/index.ts`에서 항상 `PORT`로 기동합니다.
- API: `/api/...` 엔드포인트
- 클라이언트 정적 리소스는 프로덕션에서 `dist/public`으로 빌드되어 Express에서 제공됩니다.

## 문제 해결
- **"DATABASE_URL must be set"**: Render 환경변수에 `DATABASE_URL`을 넣어주세요.
- **세션 에러**: `SESSION_SECRET` 누락 여부 확인, `sessions` 테이블은 Drizzle push로 생성됩니다.
- **빌드 실패 (Replit 플러그인)**: `vite.config.ts`가 dev 전용으로 패치되었는지 확인.
