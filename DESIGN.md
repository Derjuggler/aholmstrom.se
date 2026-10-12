---
name: aholmstrom.se
description: Större än IT. Varmt papper, en gul accent och en figur där teknik, människor och processer möts.
colors:
  paper: "#f4f0e8"
  card: "#fbfaf6"
  sand: "#ebe6db"
  ink: "#14130f"
  ink-soft: "#5e5a50"
  rule: "rgba(20, 19, 15, 0.18)"
  signal: "#f2b01e"
  signal-text: "#8a6200"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.5
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.18em"
rounded:
  card: "28px"
  pill: "999px"
---

## Idén

Sajtens budskap är att informationssäkerhet är större än IT. Det syns i startsidans figur: tre lika stora cirklar (teknik, människor, processer) som överlappar. Beroendena finns i överlappen, och informationssäkerhet står där alla tre möts. Säkerhet är ett organisatoriskt problem som kräver organisatoriska lösningar, inte ett tekniskt problem med en teknisk lösning.

## Färg

- **Paper** är sidans grund, med ett nästan osynligt rutnät på startsidan.
- **Card** och **Sand** är ytor ovanpå papperet.
- **Ink** är text och primära knappar (16:1 mot papper).
- **Ink soft** är dämpad text (6:1).
- **Signal (gul)** används bara som yta: cirklar, kort och markeringar. Aldrig som textfärg på papper. För gul text (hover, aktiv länk) används **signal-text**.

## Typografi

Instrument Serif för rubriker, med en kursiv betoning per rubrik. Hanken Grotesk för brödtext och för små versala etiketter med vid spärrning.

## Form

Rundade kort (28 px), pillformade knappar, hårfina linjer, prickraster som enstaka detalj. Rubriker i serif väger alltid 400.

## Var saker finns

- Text och länkar på startsidan: `content/index.md`
- Form och färg: `quartz/styles/custom.scss` och `theme` i `quartz.config.yaml`
- Se `EDITING.md` för hur text uppdateras.
