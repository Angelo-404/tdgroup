# Vercel Deploy Setup

## Branch deployment

Questo repo ha due branch di deployment:

- **`deploy-arcobaleno`** → Progetto Vercel "arcobaleno"
- **`deploy-tdgroup`** → Progetto Vercel "td-group"

## Passaggi

### 1. Push su GitHub

```bash
git remote add origin https://github.com/USERNAME/tdgroup.git
git branch -u origin/deploy-arcobaleno
git push -u origin deploy-arcobaleno
git push -u origin deploy-tdgroup
```

### 2. Crea due progetti su Vercel

**Progetto 1 — Arcobaleno:**
- Import dal branch `deploy-arcobaleno`
- Framework: Next.js (auto-rilevato)
- Build command: `CLIENTE=arcobaleno npm run build`
- Environment variables:
  ```
  CLIENTE=arcobaleno
  ```

**Progetto 2 — TD Group:**
- Import dal branch `deploy-tdgroup`
- Framework: Next.js (auto-rilevato)
- Build command: `CLIENTE=tdgroup npm run build`
- Environment variables:
  ```
  CLIENTE=tdgroup
  ```

### 3. Environment Variables su Vercel

Per ogni progetto, vai in **Settings > Environment Variables** e aggiungi:

```
Name: CLIENTE
Value: arcobaleno (oppure tdgroup)
Environments: Production, Preview, Development
```

### 4. Deploy

Auto-deploy on push al rispettivo branch.

## URL Finali

- Arcobaleno: `https://arcobaleno.vercel.app` (personalizzabile)
- TD Group: `https://tdgroup.vercel.app` (personalizzabile)

## Build locale di test

```bash
CLIENTE=arcobaleno npm run build
CLIENTE=tdgroup npm run build
```

Verificare che la build succeeda prima di pushare.
