# ZapMath ⚡️

A lightning-fast web app that helps kids (and parents!) forge **automatic fluency** with
basic addition and multiplication facts.

---

## Why build it?

Research shows that when students can recall a fact in **≈ 1 second** (about
40–60 correct per minute on pencil-and-paper), they free up the mental bandwidth
needed for multi-step math. Counting strategies are fine as a bridge, but true
automaticity super-charges problem-solving.  
Sources: Ashcraft (1982), Crawford (2004), Hasselbring et al. (1988).  

---

## Core loop (Constant-Time-Delay)

1. Present **2–4 new facts** plus a handful of review facts.  
2. Kid has **3 s** to answer; if silent or wrong, show the correct answer.  
3. After each minute-long "flash round" compute Correct-Per-Minute (CPM).  
4. When CPM ≥ mastery threshold **two sessions in a row**, unlock the next set.

*(The fact order, review spacing, and mastery targets live in
[`progression.json`](./progression.json) so you can tweak pedagogy without code
changes.)*

---

## Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Front-end | React + Vite | quick reloads & hooks are Cursor-friendly |
| Logic | TypeScript | strict types for progression & latency metrics |
| Back-end | FastAPI (Python) | simple endpoints + async websockets for live stats |
| Data | LocalStorage → Supabase (future) | offline first, then optional cloud sync |

> _Planned_: switch to a React-Native wrapper so ZapMath works offline on road
> trips.

---

## Getting started (dev)

> **Prerequisites:** Docker Desktop (or podman), VS Code + "Dev Containers" extension  
> _No global Python or Node installs needed._

```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/ZapMath.git
cd ZapMath

# 2. Open in VS Code
code .

# 3. Click "Reopen in Container" when prompted
#    – VS Code builds the image (first run ≈ 2-3 min).

# 4. The development environment will automatically:
#    - Install all dependencies
#    - Start the frontend dev server (http://localhost:5173)
#    - Start the backend server (http://localhost:8000)
#    - Enable hot-reloading for both

# 5. Run tests
# In the container terminal:
cd frontend && npm test  # Frontend tests
cd ../api && pytest      # Backend tests
```

## Development Workflow

1. **Frontend Development**:
   - Edit files in `frontend/src/`
   - Tests in `frontend/__tests__/`
   - Hot-reloading enabled

2. **Backend Development**:
   - Edit files in `api/`
   - Tests in `api/tests/`
   - Hot-reloading enabled

3. **CI/CD**:
   - GitHub Actions runs tests on push/PR
   - Checks both frontend and backend tests

## Project Structure

```
/
├─ api/                   # FastAPI back-end
│  ├─ main.py             # /health route returns {"status":"ok"}
│  └─ tests/test_health.py
├─ frontend/              # React + Vite
│  ├─ src/App.tsx         # renders "ZapMath"
│  └─ __tests__/App.test.tsx
├─ progression.json       # fact sets & mastery targets
├─ .github/workflows/ci.yml
├─ Dockerfile             # multi-stage: build React, serve with FastAPI
├─ docker-compose.yml     # one service 'app'
├─ .devcontainer/devcontainer.json
├─ requirements.txt       # back-end deps
└─ README.md              # this file
```
