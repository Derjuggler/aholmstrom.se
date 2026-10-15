---
name: aholmstrom.se
description: Smal kolumn, monospace-rubriker och en gul accent. Strukturen kommer från hudovich.com, tonen är varmare.
colors:
  background: '#f7f4ee'
  card: '#fcfbf8'
  secondary: '#ebe6db'
  foreground: '#14130f'
  muted-foreground: '#5e5a50'
  border: '#e0d9cb'
  primary: '#f2b01e'
  dark-background: '#171612'
  dark-card: '#1c1b16'
  dark-foreground: '#ebe6db'
typography:
  heading: 'Geist Mono, 600'
  body: 'Geist, 16px, line-height 1.6'
  label: 'Geist Mono, 13px, versaler, vid spärrning'
rounded:
  default: '0.5rem'
  badge: '999px'
---

## Idén

En enkel och lugn sida i en smal kolumn (704 px). Strukturen följer [hudovich.com](https://github.com/ahudovich/hudovich.com): en kort presentation överst och sedan sektioner med små versala etiketter, tunna kort och textlänkar med gul understrykning. Budskapet "informationssäkerhet är större än IT" bärs av texten, inte av en figur.

## Färg

- Varm pappersbakgrund i ljust läge och varm mörkgrå i mörkt läge. Temat följer systemet och går att växla med knappen i headern eller med tangenten T.
- **Primary (gul)** används för knappar, understrykningar, aktiv menylänk och badges. Text på gul yta är alltid ink (`#14130f`), aldrig vit.
- Brödtext är dämpad (`muted-foreground`). Rubriker och länkar står i `foreground`.

## Typografi

Geist Mono för rubriker, meny, knappar och etiketter. Geist (sans) för brödtext, så att längre stycken är lätta att läsa.

## Komponenter

`src/components/ui/`: Card (kant och ring vid hover, pil uppe till höger), Badge, Button och TextLink. Markdown-sidor stylas av `.prose` i `src/app/global.css`.

## Var saker finns

- All text: `content/` (se `EDITING.md`)
- Färger och typografiska skalor: `src/app/global.css`
- Meny: `src/lib/site.ts`
- Startsidans layout: `src/components/home/Home.tsx`
