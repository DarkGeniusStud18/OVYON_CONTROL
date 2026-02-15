# Repository Guidelines

## Project Structure & Module Organization
OVYON Control is split into four main modules:
- `frontend/`: React + TypeScript + Vite UI (`src/pages`, `src/components`, `src/store`, `src/utils`).
- `backend/`: Node.js + TypeScript services (MQTT broker/handlers, device state manager, simulator, tests in `src/tests`).
- `ai_voice/`: Python voice/AI integration (`aion.py`, `aion_brain.py`, `requirements.txt`).
- `firmware/`: Arduino/ESP32 sketches by device type (`Lights/`, `Door/`, `Environment/`, `Plugs/`, `Window/`).

Keep build artifacts (`frontend/dist`, `backend/dist`) out of source edits unless a release explicitly requires them.

## Build, Test, and Development Commands
Run commands from each module directory:
- `cd frontend && npm run dev`: start Vite dev server.
- `cd frontend && npm run build`: type-check + production build.
- `cd frontend && npm run lint`: run ESLint on `ts/tsx`.
- `cd backend && npm run dev`: run backend with nodemon.
- `cd backend && npm run build`: compile backend TypeScript to `dist/`.
- `cd backend && npm run start`: run backend entrypoint via `ts-node`.
- `cd ai_voice && pip install -r requirements.txt`: install Python dependencies.
- `cd ai_voice && python aion.py` / `python aion_brain.py`: run voice agents.

## Coding Style & Naming Conventions
TypeScript is `strict` in both frontend and backend; do not bypass type errors.
- Use 2-space indentation and semicolons to match existing TS/TSX files.
- React components/pages: `PascalCase` (for example `Dashboard.tsx`, `PinModal.tsx`).
- Hooks/store utilities: `camelCase` with `use*` for hooks (for example `useStore.ts`).
- Backend service/module files use descriptive `camelCase` names (for example `messageHandler.ts`).

## Testing Guidelines
- Frontend tests use Vitest style APIs (`describe`, `it`, `expect`) as shown in `frontend/src/store/useStore.test.ts`.
- Backend includes integration-style system checks in `backend/src/tests/systemTest.ts`.
- Add tests next to the related module or under `backend/src/tests` and name files `*.test.ts` when practical.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit style, especially `feat:` (for example `feat: add ...`).
- Prefer `type(scope): short imperative summary` (for example `fix(mqtt): handle reconnect timeout`).
- Keep commits focused by module (`frontend`, `backend`, `firmware`, or `ai_voice`).
- PRs should include: purpose, affected modules, verification steps run, linked issue/task, and screenshots/videos for UI changes.
