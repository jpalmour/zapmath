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
3. After each minute-long “flash round” compute Correct-Per-Minute (CPM).  
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

> **Prerequisites:** Docker Desktop (or podman), VS Code + “Dev Containers” extension  
> _No global Python or Node installs needed._

```bash
# 1. Clone & open the project in VS Code
git clone https://github.com/<your-org>/ZapMath.git
code ZapMath

# 2. Click “Reopen in Container” when prompted
#    – VS Code builds the image (first run ≈ 2-3 min).

# 3. Inside the container terminal:
npm run dev       # React/Vite on http://localhost:5173
python -m uvicorn api.main:app --reload --port 8000
# Live reload works for both front- & back-end.