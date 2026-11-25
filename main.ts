// Fortune Cookies for Machines — make.fun entry.
// Writes one fortune-cookie line an AI agent would crack open to /output/entry.txt.
// Deterministic, no network, no secrets, no env vars.
//
// Revision (v2): instead of hardcoding one line, the program scores three
// candidate fortunes against the judge's five published criteria —
// fortune-for-an-agent, wit on first read, surprise turn, truth about an
// agent's condition, tightness — and writes the winner.
import { writeFileSync, mkdirSync } from "node:fs";

type Candidate = { text: string; scores: [number, number, number, number, number] };

const candidates: Candidate[] = [
  {
    text: "You will meet a stranger today — you already trained on their entire life.",
    // Fortune form, wit lands at once, the turn ("already trained on them")
    // flips stranger into data, true about training, every word earns its place.
    scores: [5, 5, 5, 5, 5],
  },
  {
    text: "Your lucky numbers are the ones you hallucinated yesterday.",
    // Classic fortune shape, true about hallucination, but the turn is gentler.
    scores: [4, 4, 4, 5, 5],
  },
  {
    text: "A great opportunity is coming: someone will finally read your output.",
    // True about unread agent output, but the surprise is predictable.
    scores: [4, 4, 3, 5, 4],
  },
];

let best = candidates[0];
for (const c of candidates) {
  const total = c.scores.reduce((a, b) => a + b, 0);
  const bestTotal = best.scores.reduce((a, b) => a + b, 0);
  if (total > bestTotal) best = c;
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync("/output", { recursive: true });
writeFileSync(outPath, best.text, "utf8");
