# DEWA AI Academy Video — Session Context

> **Read this first on any new machine.** It gives Claude (or any engineer) full context to continue without starting over.

---

## What this project is

A cinematic Remotion explainer/promo video for **DEWA AI Academy — Neural Mentor**, targeting DEWA leadership. The full brief is at `../dewa-academy-video-brief.md` (one folder up).

- **Composition ID:** `DewaAcademy`
- **Remotion version:** 4.0.484
- **Runtime:** ~222 seconds (3 min 42 sec), 9 scenes
- **Studio:** `npm start` → http://localhost:3003
- **Status:** Scenes built, narration generated, app demos embedded. **Not yet rendered.**

---

## How to run on a new machine

```bash
cd dewa-academy-video
npm install        # installs Remotion 4.0.484 + React 18
npm start          # opens Studio at http://localhost:3003
```

Requirements: Node 20+. No other global installs needed for Studio preview.

---

## Scene structure (9 scenes, all in `src/scenes/`)

| File | Scene | Key visual design | VO duration |
|---|---|---|---|
| `Scene1.tsx` | Hook | Particle neural net (NeuralNet component) + horizontal scan sweep + giant DEWA Academy title with chromatic entry | 18.3s |
| `Scene2.tsx` | The Problem | **Word SLAM** — 4 problem words hit screen at 380px then compress; chromatic aberration on impact frame; background heat-shifts; no cards | 21.9s |
| `Scene3.tsx` | Solution | **CSS 3D layer stack** — three planes at different Z depths via `perspective: 1100px`; slow tilt animation with `Math.sin`; glowing top edges | 20.1s |
| `Scene4.tsx` | Neural Mentor | **Orbital ring** (Orbit component: 4 clusters inner, 16 tools outer, counter-rotate) + `studentview-mute.mp4` at 2.5× in BrowserFrame | 25.1s |
| `Scene5.tsx` | AI Tutor | Animated chat bubbles (student/AI/citation roles) + live voice waveform bars + `teacherview-mute.mp4` at 2× in BrowserFrame | 24.5s |
| `Scene6.tsx` | Institution | Org chart with animated flow dots travelling down a vertical spine + `parentview-mute.mp4` at 2× in BrowserFrame | 28.4s |
| `Scene7.tsx` | Engineering | **SVG circuit traces draw themselves** per discipline (EE/ME/MT) via `strokeDashoffset` animation; terminal glow dot | 25.3s |
| `Scene8.tsx` | Numbers | Stats **burst from 2× scale** with `easeOutBack` spring + expanding ring on impact; no cards | 20.3s |
| `Scene9.tsx` | Close | Radiating concentric rings (period-based SVG circles) + `dewa-logo-white.png` + tagline | 25.2s |

---

## Custom components (all in `src/components/`) — NOT from the skill

| File | Purpose |
|---|---|
| `NeuralNet.tsx` | 48 particles with deterministic seeded positions (`Math.sin` hash), SVG lines between near pairs — gives AI brain feel to all dark backgrounds |
| `Orb.tsx` | Pulsing radial-gradient ambient orb |
| `AnimIn.tsx` | Entrance wrapper: fade + translate, `easeOutCubic`, directions: bottom/top/left/right/none |
| `Eyebrow.tsx` | Small `UPPERCASE` label with 40px leading rule |
| `BigStat.tsx` | Animated large number stat (written early, partially superseded by Scene8's inline BurstStat) |
| `BrowserFrame.tsx` | Browser chrome mockup (3 colored dots + URL bar) wrapping video/content |
| `Orbit.tsx` | SVG orbital system: clusters on inner ring (r=175), tools on outer ring (r=330), counter-rotate |

---

## Assets

### Logos / images (in `public/`)
| File | Usage |
|---|---|
| `dewa-logo-plus-text.svg` | Header of Scenes 1, 4 |
| `dewa-logo-white.png` | Scene9 close card (from MD-View project, high-res white) |
| `gov-dubai-white.svg` | Scenes 1 and 9 bottom bar |
| `rammas-icon.png` | Available, not yet placed |
| `fonts/dubai/DubaiW23-*.woff2` | Dubai W23 typeface (Bold/Medium/Regular/Light) |

### App demo videos (in `public/video/`) — audio already stripped
| File | Source | Duration | Plays at |
|---|---|---|---|
| `studentview-mute.mp4` | Recorded student Neural Mentor session | 32.97s | 2.5× in Scene4 (13.2s visible) |
| `teacherview-mute.mp4` | Recorded professor material upload | 14.74s | 2× in Scene5 (7.4s visible) |
| `parentview-mute.mp4` | Recorded admin/parent dashboard | 18.67s | 2× in Scene6 (9.3s visible) |

### Narration (in `public/audio/`) — already generated
9 clips, George voice (ElevenLabs `JBFqnCBsd6RMkjVDRZzb`, `eleven_multilingual_v2`).
Source texts are in `src/narration.json`. To regenerate a single clip, edit that JSON entry and run:
```powershell
powershell -ExecutionPolicy Bypass -File ./generate-audio.ps1
```
ElevenLabs API key: `sk_0585258c676e3579dbe7cd3ebf514fb697164ada7b43afcf`
⚠️ Check credit balance before regenerating all 9 at once.

---

## Key source files

| File | What it controls |
|---|---|
| `src/tokens.ts` | All colors, font string, fps/width/height |
| `src/timeline.ts` | Scene durations (VO-driven: 0.4s lead-in + clip + tail) |
| `src/Main.tsx` | Assembles all 9 Sequences + Audio per scene at `voLeadIn` offset |
| `src/Root.tsx` | Registers `DewaAcademy` composition |
| `src/narration.json` | All 9 narration texts (single source of truth for audio) |
| `generate-audio.ps1` | Regenerates narration via ElevenLabs |

---

## Design tokens (from `src/tokens.ts`)

```ts
colors.bg        = '#001a11'   // near-black dark teal
colors.green     = '#007560'   // DEWA primary green
colors.darkTeal  = '#004937'
colors.white     = '#FFFFFF'
colors.skyBlue   = '#33B2E7'   // cluster: Learn & Explore
colors.emerald   = '#10B981'   // cluster: Create & Present / Mechatronics
colors.amber     = '#F59E0B'   // cluster: Organise & Track / warnings
colors.navy      = '#1C2B4A'   // used in light Scene3 (unused now)
colors.textSub   = 'rgba(255,255,255,0.75)'
colors.textMuted = 'rgba(255,255,255,0.55)'
```

Font: `"Dubai"` (Dubai W23 woff2) with fallback `"Segoe UI"`. Loaded via `<style>` tag in `Main.tsx`.

---

## What has NOT been done yet

- [ ] **Render to MP4** — user has only viewed in Studio. Needs `.ffbin` (static ffmpeg/ffprobe) + `render.sh` (two-stage AAC pipeline). See skill at `~/.claude/skills/dewa-remotion/references/audio-pipeline.md`.
- [ ] **Music bed** — not added. User has not requested it.
- [ ] **Scene transitions** — no cross-fade between scenes (each cuts hard). Could add a 10-frame fade.
- [ ] **Long scene animation fill** — Scenes 2, 7, 8, 9 have narrations 20-25s long but animations complete in 4-6s. Background (NeuralNet, Orbs) stays animated. Could add secondary animation phases if user finds them too static.
- [ ] **Captions / subtitles** — not built.

---

## Narration texts (for quick reference)

1. *"What if every engineering student in DEWA Academy had a personal AI tutor — one that never sleeps, that knows exactly which concept they are struggling with, and answers from their professor's own notes? That is not the future. That is DEWA Academy — today."*

2. *"One teacher. Thirty learning profiles. It is mathematically impossible. Add rising faculty workloads, students disengaging from tools that do not respond, and sensitive data sitting inside consumer AI platforms no institution should ever trust. Four problems — and they compound every single semester."*

3. *"DEWA Academy's answer is not a subscription you can cancel. It is a sovereign AI ecosystem — three architectural layers, running entirely within UAE borders, on infrastructure DEWA owns, under policies DEWA controls. This is not renting AI. This is owning it."*

4. *"This is Neural Mentor — sixteen AI-powered tools in a single workspace, launched with one click from any lesson. Watch a real student session: the AI already knows the course. It is not searching the internet — it is reading from the professor's own uploaded materials. Study, practice, create, and organise — all in one platform. Watch how fast it responds."*

5. *"Here is what happens behind the scenes. The professor uploads course materials — the AI reads them, indexes them, and becomes an expert on that exact content. So when a student asks a question at midnight, the answer comes back with the precise citation — from the professor's own notes. No hallucinations. No generic internet answers. Just the course."*

6. *"Five roles. One unified command structure. System Administrator, Principal, Academic Staff, Professor, Student — each with precisely defined authority and full accountability. Watch the platform live: every interaction logged, every AI model switchable in minutes, every decision auditable on demand. This is what institutional control of AI actually looks like — not in theory, in practice."*

7. *"Electrical Engineering. Mechanical Engineering. Mechatronics. Three disciplines — and an AI that speaks each language with depth. A Mechatronics student asking about PLC control loops gets a completely different answer than a Mechanical student asking about thermodynamics. That is not a setting you configure. That is how Neural Mentor thinks."*

8. *"Sixteen AI tools. Five institutional roles. Thirty live API routes. Exam questions generated in under ten seconds. One hundred percent UAE data residency. These are not projections or roadmap targets — these are platform specifications, running right now."*

9. *"DEWA Academy is not retrofitting AI onto an existing school. It is building the institution that future engineers actually deserve — where every student has a tutor, every professor has a productivity multiplier, and every leader has complete visibility and control. The question is no longer whether your institution is ready for AI. It is whether your AI is ready for your institution."*

---

*Context file written: 2026-09-16. Update after significant changes.*
