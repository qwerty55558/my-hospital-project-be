# My Hospital Project - Backend API

안과 전문 병원 홍보용 웹사이트의 백엔드 API 서버입니다.

## Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL (Supabase)
- **ORM**: TypeORM
- **Documentation**: Swagger (OpenAPI 3.0)
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```
### Running the app

```bash
# development (watch mode)
npm run start:dev

# production
npm run build
npm run start:prod
```

### API Documentation

서버 실행 후 아래 URL에서 Swagger 문서를 확인할 수 있습니다:

- Swagger UI: http://localhost:3000/docs
- OpenAPI JSON: http://localhost:3000/docs-json

## API Endpoints

### Doctors (의료진)

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/doctors`                 | 의사 목록 조회      |
| GET    | `/doctors/representatives` | 대표 의사 목록 조회 |
| GET    | `/doctors/:id`             | 의사 단건 조회      |
| POST   | `/doctors`                 | 의사 생성           |
| PATCH  | `/doctors/:id`             | 의사 정보 수정      |
| DELETE | `/doctors/:id`             | 의사 삭제           |

### Posts (병원 소식)

| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| GET    | `/posts`                  | 게시글 목록 조회 (페이지네이션) |
| GET    | `/posts/categories/count` | 카테고리별 게시글 수 조회       |
| GET    | `/posts/:id`              | 게시글 단건 조회 (조회수 증가)  |
| POST   | `/posts`                  | 게시글 생성                     |
| PATCH  | `/posts/:id`              | 게시글 수정                     |
| DELETE | `/posts/:id`              | 게시글 삭제                     |

**Query Parameters (GET /posts)**

- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10, 최대: 100)
- `category`: 카테고리 필터 (`공지`, `뉴스`, `이벤트`, `건강정보`, `채용`)

### Consultations (온라인 상담)

| Method | Endpoint                      | Description         |
| ------ | ----------------------------- | ------------------- |
| GET    | `/consultations`              | 상담 목록 조회      |
| GET    | `/consultations/status/count` | 상태별 상담 수 조회 |
| GET    | `/consultations/:id`          | 상담 단건 조회      |
| POST   | `/consultations`              | 상담 신청           |
| PATCH  | `/consultations/:id/answer`   | 상담 답변 등록      |
| DELETE | `/consultations/:id`          | 상담 삭제           |

**Query Parameters (GET /consultations)**

- `status`: 상태 필터 (`pending`, `answered`, `closed`)

## Data Models

### Doctor

- `id`, `name`, `position`, `specialty`, `profileImage`
- `education`, `career`, `certifications`
- `isRepresentative`, `createdAt`

### Post

- `id`, `category`, `title`, `content`, `summary`, `thumbnailUrl`
- `authorId`, `isPinned`, `isPublished`, `viewCount`
- `createdAt`, `updatedAt`, `publishedAt`

### Consultation

- `id`, `name`, `phone`, `doctorId`, `doctorName`
- `category`, `content`, `privacyAgreed`
- `status`, `answer`, `answeredAt`
- `createdAt`, `updatedAt`

## Project Structure

```
src/
├── doctors/          # 의료진 모듈
├── posts/            # 병원 소식 모듈
├── consultations/    # 온라인 상담 모듈
├── app.module.ts     # 루트 모듈
└── main.ts           # 엔트리포인트
```

## Implementation Status

### Completed

- [x] 의료진(doctors) CRUD + 대표의사 필터
- [x] 병원소식(posts) CRUD + 페이지네이션 + 카테고리 필터
- [x] 온라인상담(consultations) CRUD + 답변 기능
- [x] Swagger API 문서화
- [x] Supabase PostgreSQL 연동

### Todo

- [ ] 진료안내(services) 모듈
- [ ] 장비(equipments) 모듈
- [ ] 미디어 업로드 기능
- [ ] 인증/권한 관리

## License

UNLICENSED
