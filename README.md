# ⚖️ My Simple Esqwaya

**An interactive case law study platform for law undergraduates in Ghana and Africa.**

My Simple Esqwaya (*Esq. — the title for lawyers + making it simple*) helps law students move beyond rote memorisation by giving them a structured, visual, and gamified way to study case law — organised by subject, connected by principle, and tested through quizzes.

> Built as a prototype at the Lovable AI Hackathon · Foundation for a Final Year Project

🔗 **Live Demo**: [mysimpleesqwaya.lovable.app](https://mysimpleesqwaya.lovable.app)

---

## The Problem

Law students in Ghana rely heavily on physical textbooks and case books with no digital tools tailored to their curriculum. Cases across different subjects (Company Law, Contract Law, Tort Law) share overlapping principles but are studied in complete isolation. There is no structured, accessible, and engaging way to study case law digitally for the African law student.

---

## What My Simple Esqwaya Does

### 📁 Case Directory
Browse and search a structured database of legal cases filtered by area of law. Each case is broken down into:
- **Parties** — who was involved
- **Facts** — what happened
- **Held** — the court's decision
- **Ratio Decidendi** — the binding legal reasoning
- **Obiter Dicta** — additional remarks
- **Key Legal Principle** — the takeaway rule

### 🔗 Case Relationship Map
An interactive visual graph showing how cases connect across different areas of law — based on shared principles, legislation, or legal outcomes. See how *Salomon v Salomon* (Company Law) relates to cases in Contract Law through the concept of legal personality.

### 🎮 Study & Quiz Mode
Gamified flashcard system to reinforce memory of:
- Case names and principles
- Legal terminology
- Acts, clauses and articles
- Streak tracking and scoring

---

## Scope (Current Version)

| Area of Law | Status |
|---|---|
| Company Law | ✅ Included |
| Contract Law | ✅ Included |
| Tort Law | ✅ Included |
| Constitutional Law | 🔜 Future version |
| Criminal Law | 🔜 Future version |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Build Tool | Vite |
| Deployment | Lovable / Vercel |

---

## Running Locally

Make sure you have **Node.js and npm** installed — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate into the project
cd mysimple-esqwaya

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The app will be running at `http://localhost:8080`

---

## Other Ways to Edit

**Lovable (recommended for prompting)**
Visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and continue building by prompting. All changes sync automatically to this repo.

**Edit directly on GitHub**
Navigate to any file → click the pencil icon → make your changes → commit.

**GitHub Codespaces**
Click the green **Code** button on the repo → Codespaces tab → New Codespace. Edit and push from the browser.

---

## Deploying

Open [Lovable]
## Roadmaptps://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) 

**Share → Publish** to push a live update instantly.

To connect a custom domain: **Project → Settings → Domains → Connect Domain**
[Read the docs →](https://docs.lovable.dev/features/custom-domain)

- [ ] Expand case database to 50+ cases
- [ ] Add mobile-responsive layout
- [ ] Leaderboard for quiz scores
- [ ] User authentication (save progress)
- [ ] Ghana-specific case law integration
- [ ] Full React Native mobile app

---

## About

My Simple Esqwaya is a project aimed at improving legal education across Africa.

---

*"The law is not an end in itself, nor does it provide ends. It is preeminently a means to serve what we think is right." — William J. Brennan*
