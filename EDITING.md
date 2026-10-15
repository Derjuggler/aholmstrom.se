# Uppdatera texten på sajten

All text ligger i markdown-filer under `content/`. Du ändrar text utan att röra design eller kod.

## Snabbast: direkt på GitHub

1. Öppna filen på GitHub, till exempel `content/index.md`.
2. Klicka på pennan (Edit this file).
3. Ändra texten och klicka Commit changes.
4. Sajten byggs och publiceras av sig själv, vanligen inom ett par minuter. Status syns under fliken Actions.

## Vilken fil styr vad

| Sida                     | Fil                                                                |
| ------------------------ | ------------------------------------------------------------------ |
| Startsidan               | `content/index.md`                                                 |
| Arbeta med mig           | `content/arbeta-med-mig/index.md`                                  |
| Dependency Mapper        | `content/dependency-mapper/index.md`                               |
| Forskning, Publikationer | `content/forskning/index.md`, `content/forskning/publikationer.md` |
| Om Anton                 | `content/om.md`                                                    |
| Kontakt                  | `content/kontakt.md`                                               |
| Engelska                 | `content/en/`                                                      |

En ny fil under `content/` blir en ny sida automatiskt. Till exempel blir `content/foo.md` sidan `/foo/`. Menyn ändras i `src/lib/site.ts`.

## På startsidan

All text på startsidan står i frontmatter (blocket mellan `---`) i `content/index.md`. Ändra texten efter kolon och behåll nycklarna och indraget. Står det ett kolon inne i texten måste raden omges av citattecken.

- `email`: adressen i knapparna, kontaktsektionen och sidfoten.
- `hero`: hälsning, namn, stycken (`intro`) och knappar.
- `services`, `projects`: korten. Ett nytt kort läggs till som en ny rad som börjar med `-`.
- `publications`: hur många som visas. Själva listan läses från `content/forskning/publikationer.md`, så en ny publikation läggs bara in där (`## år`, `### [titel](länk)` och sedan en rad med författare och källa).

## Porträtt

Lägg en kvadratisk bild som `public/avatar.jpg`. Då ersätter den initialerna på startsidan.

## Förhandsgranska lokalt (valfritt)

```
npm ci
npm run dev
```

Öppna sedan http://localhost:3000.

## Föreläsningsbilder

Fristående HTML-presentationer ligger i `public/slides/<kurs>/` och publiceras som de är på `/slides/<kurs>/`.
