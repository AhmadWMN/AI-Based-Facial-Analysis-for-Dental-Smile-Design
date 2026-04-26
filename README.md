# AI Dental Smile Design Assistant

A Next.js 14 graduation-project demo web application for dental technician students.

The app accepts a front face image, sends it to a secure backend API route, calls the OpenAI Responses API for image understanding, enforces structured JSON output with a schema, and displays educational smile-design recommendations.

## Key Features

- Next.js 14 + App Router + TypeScript + Tailwind CSS
- Face image upload with local preview
- Backend OpenAI integration through an isolated reusable service
- Structured JSON response using a strict schema
- Result dashboard cards for esthetic findings
- Printable final report
- Educational framing (non-diagnostic language)
- Mock fallback data if live API analysis fails

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API (`responses.create` with image input + JSON schema format)
- Zod (runtime validation)

## Project Structure

```text
.
├─ app/
│  ├─ api/
│  │  └─ analyze/
│  │     └─ route.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ HeroSection.tsx
│  ├─ HowItWorks.tsx
│  ├─ PrintableReport.tsx
│  ├─ ResultCard.tsx
│  ├─ ResultsDashboard.tsx
│  └─ UploadAnalysisSection.tsx
├─ lib/
│  ├─ mock.ts
│  ├─ openai.ts
│  └─ schema.ts
├─ styles/
│  ├─ print.css
│  └─ theme.css
├─ types/
│  └─ analysis.ts
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ next.config.mjs
├─ next-env.d.ts
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Add your key in `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

4. Run development server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## API Workflow

1. Client uploads a face image (`multipart/form-data`).
2. `POST /api/analyze` validates file type and size.
3. Backend converts image to a data URL.
4. `lib/openai.ts` calls OpenAI Responses API with:
   - `input_text` instructions
   - `input_image` for the face photo
   - `text.format` using strict `json_schema`
5. Response JSON is validated with Zod schema.
6. UI renders dashboard + printable report.

If OpenAI fails (missing key, rate limit, network issues, schema mismatch), the route returns safe fallback mock data for demo continuity.

## Example Prompt Sent To OpenAI

System prompt:

```text
You are an educational dental-esthetic assistant for a graduation project demo.
Analyze one FRONT-FACING face photo and provide a descriptive smile-design recommendation.
Do not provide medical diagnosis, disease detection, or treatment claims.
Keep language clear and educational for dental technician students.
If image quality is low, still provide a best-effort educational estimate and mention uncertainty in estheticNotes.
```

User prompt:

```text
Analyze this face image for dental smile-design learning purposes.
Return only the JSON fields requested by the schema.
Focus on:
- Face shape classification
- Facial proportion
- Facial symmetry
- Jaw line
- Lip line
- Suggested anterior tooth form
- Smile line recommendation
- Midline recommendation
- General esthetic notes
```

## Educational Disclaimer

This project is an educational graduation demo and should not be used as a clinical diagnostic tool.
