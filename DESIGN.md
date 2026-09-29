---
name: aholmstrom.se
description: Verksamhetens sektionsritning — personlig plattform och digital trädgård för Anton Holmström
colors:
  paper: "#efe0b4"
  paper-deep: "#e3cf97"
  ink: "#102f34"
  ink-soft: "#29464a"
  rule: "rgba(16, 47, 52, 0.26)"
  rule-strong: "rgba(16, 47, 52, 0.62)"
  brass: "#9a7124"
  risk: "#963e32"
  trace: "rgba(255, 250, 232, 0.36)"
typography:
  display:
    fontFamily: "Saira Semi Condensed, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 3.2vw, 4.2rem)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Saira Semi Condensed, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Azeret Mono, monospace"
    fontSize: "0.62rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  none: "0px"
spacing:
  unit: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "Saira Semi Condensed"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  button-secondary:
    backgroundColor: "rgba(255, 250, 232, 0.22)"
    textColor: "{colors.ink}"
    typography: "Saira Semi Condensed"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
---

## Overview

Den visuella världen för **aholmstrom.se** bygger på riktningen *Verksamhetens sektionsritning*. Sajten behandlas som en genomskärning av organisationen där arbetsuppgifter, människor, system och infrastruktur redovisas i en sammanhängande, läsbar teknisk konstruktion.

Världen avvisar standardmallen med porträtthjälte och generiska tjänstekort, liksom svarta "hacker-teman" med neonfärger. Istället etableras en varm, intellektuell och trovärdig arbetsyta präglad av ritlinne, kalkerlager, plotterbläck och diskreta mässingsmarkeringar.

## Colors

- **Paper (`#efe0b4`)**: Grundens varma kalkerfärg som ger en fysisk, boklig känsla.
- **Paper Deep (`#e3cf97`)**: Förstärkt nyans för avgränsade fält och aktiva element.
- **Petroleum Ink (`#102f34`)**: Huvudbläck för rubriker, primärkontroller och text.
- **Ink Soft (`#29464a`)**: Dämpad bläckton för sekundär information och struktur.
- **Drafting Rules (`rgba(16, 47, 52, 0.26 / 0.62)`)**: Konstruktionslinjer och tekniska ramar.
- **Brass (`#9a7124`)**: Precisionsaccent för metadata, sektionsnummer och tekniska beteckningar.
- **Risk / Oxblood (`#963e32`)**: En exklusiv signalfärg reserverad uteslutande för kritiska beroenden, felscenarier och primära handlingstriggare.
- **Trace (`rgba(255, 250, 232, 0.36)`)**: Transparent kalkeroverlay för bakgrunder och citatblock.

## Typography

Typografin speglar mötet mellan teknisk ritning och humaniora:
1. **Saira Semi Condensed**: Tät, konstruktiv och skarp displaytypografi för rubriker, sektionsrubriker och knappar.
2. **Literata**: Varm, läsbar serif med litterär stringens för brödtext, citat och personliga reflektioner. Kursiva inslag används för teser och emfas.
3. **Azeret Mono**: Ingenjörsmässiga stämplar, koordinater, registerkoder, statusmarkörer och metainformation.

## Layout

- **Konstruktionsgrid**: Moduler baserade på 24px rutnät som löper genom sidans bakgrund och element.
- **Ritningsindex**: Ett permanent navigationsträd till vänster som fungerar som arkiv- och ritningsregister på desktop och en tillgänglig låda på mobila enheter.
- **Sektionsdelning**: Horisontella dragningar med explicita ritningsstämplar (t.ex. `AH—01 / ÖVERSIKT`, `02 / ERBJUDANDE`, `03 / VERKTYG`).
- **Responsivitet**: Desktop använder tvåspaltig balanserad sektion för herovyn. Mobila skärmar staplar blocken utan att klippa eller bryta långa sammansatta svenska ord onaturligt.

## Elevation & Depth

Inga mjuka diffusa skuggor eller artificiella 3D-effekter tillåts. Djup skapas uteslutande genom:
- Hårda offset-skuggor (`4px 4px 0 var(--risk)`, `8px 8px 0 rgba(16, 47, 52, 0.08)`).
- Semi-transparenta kalkerlager (`var(--trace)`).
- Överlappande ritningsramar med precisionstjocklekar.

## Shapes

- Strikt rätvinkligt format: `border-radius: 0` på knappar, formulärfält, kort och modaler.
- Tekniska snitt och markeringar med pilar (`↗`, `→`) och statusprickar.

## Components

- **Hero & Verksamhetens beroendekedja**: Interaktiv principskiss där besökaren kan klicka på och hovra över beroendenivåer (Arbetsuppgift, Människa, System, Infrastruktur) för att spåra felscenarier och konsekvenskedjor.
- **Erbjudanderegister**: Tydliga radlänkade erbjudanden med riktningspilar och sektionskoder.
- **Dependency Mapper-läsare**: Tekniskt scenarioblock som illustrerar hur metoden synliggör flaskhalsar.
- **Kontaktband**: Monolitisk handlingstransversal i oxblood med distinkt kontrast.

## Do's and Don'ts

### Do
- Använd sammansatta svenska begrepp utan felaktig orddelning eller klippning.
- Låt den akademiska tyngden bevisa erbjudandet utan att låta som ett torrt CV.
- Håll ritningsstrukturen konsekvent och lugn.
- Reservera oxblood (`#963e32`) för risker och huvudsakliga interaktionspunkter.

### Don't
- Skapa inga generiska "konsultkort" med stockikoner.
- Använd inte neon, mörka "cyberhacker"-paletter eller digitala linsöverstrålningar.
- Använd inte mjuka generiska box-shadows eller rundade hörn (`border-radius > 0`).
- Publicera aldrig privata anteckningar utan `publish: true`.
