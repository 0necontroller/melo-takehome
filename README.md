# InterviewAI 🎙️✨

InterviewAI is a modern, premium web application designed to help recruiters and hiring managers generate thoughtful, role-specific interview questions with detailed evaluation criteria powered by AI.

The application integrates with **Google Gemini Flash** using the **Vercel AI SDK** and provides a sleek, interactive, and highly responsive user interface with native-feeling animations and persistence.

---

## 🚀 Key Features

- **AI-Powered Question Generation**: Enter any job title (e.g., _Customer Success Manager_, _Software Engineer_, _UX Designer_) to get 3 targeted interview questions.
- **Evaluation Criteria**: Each generated question comes with custom "What to look for" guidelines to help interviewers evaluate candidate responses.
- **Generation History**: A slide-out History Drawer on the right stores past generations in local storage. Users can quickly:
  - Reload a past job generation back into the active view.
  - Delete individual history records or clear the entire history.
  - Expand/collapse detailed questions per history entry.
- **Try a Role**: Interactive chips to quickly try pre-configured popular roles.
- **Premium UX/UI**: Styled with a beautiful, minimalist aesthetic using Tailind CSS and smooth interactive animations powered by `motion/react` (formerly framer-motion).
- **Robust Client Queries**: Uses **TanStack Query (React Query)** for efficient, asynchronous data fetching and state management.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Vercel AI SDK](https://sdk.ai.bytedance.com/) & `@ai-sdk/google` (Gemini)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [motion/react](https://github.com/motiondivision/motion)
- **Query State**: [TanStack Query v5](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📋 Environment Variables Setup

Before running the application, you need to configure your environment variables.

1. Copy the example environment file to create a `.env.local` or `.env` file:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and populate the variables from [.env.example](file:///.env.example):

| Variable                 | Description                                  | Default / Example                                                 |
| :----------------------- | :------------------------------------------- | :---------------------------------------------------------------- |
| `NEXT_PUBLIC_SERVER_URL` | The URL of the local API / Auth server       | `http://localhost:8001`                                           |
| `GEMINI_API_KEY`         | Your Google Gemini API Key                   | _Get yours from [Google AI Studio](https://aistudio.google.com/)_ |
| `TEST_USER_EMAIL`        | Email used to simulate authentication/logout | `test@example.com`                                                |
| `TEST_USER_PASSWORD`     | Password used to simulate authentication     | `testpassword`                                                    |
| `NODE_ENV`               | Application environment state                | `development`                                                     |

> [!IMPORTANT]
> Make sure to get a valid Gemini API Key from Google AI Studio and place it in your `GEMINI_API_KEY` variable for the AI generation to work.

---

## 💻 Local Development

This project uses `pnpm` as its package manager. Follow the steps below to set up and run the project locally.

### 1. Install Dependencies

Run the following command in the root directory to install all packages:

```bash
pnpm install
```

### 2. Run the Development Server

Start the Next.js dev server:

```bash
pnpm dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

### 3. Build for Production

To build the application for production deployment:

```bash
pnpm build
```

To run the built production application:

```bash
pnpm start
```

### 4. Code Formatting & Quality

To check types and enforce linting rules:

```bash
# Type-check the project
npx tsc --noEmit

# Lint the codebase
pnpm lint
```
