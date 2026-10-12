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

## På startsidan

Texten ligger mellan HTML-taggarna i `content/index.md`. Ändra bara texten, lämna taggarna och klassnamnen:

- Rubrik: raden med `<h1>`. `&shy;` betyder en tillåten avstavning, `<em>IT.</em>` är den kursiva betoningen.
- Ingress: `<p class="home-lede">`.
- Knappar: `<a class="action-primary" ...>` och `action-secondary`.
- Korten: varje `<a class="card ...">`. Titeln står i `<strong>`, beskrivningen i `<span class="card-desc">`.
- Synsätt: `<p class="home-quote">`.
- Avslutande uppmaning: `<section class="home-cta">`.
- Figurens ord (Teknik, Människor, Processer, Informationssäkerhet) och bildtexten ligger i blocket `home-fig`. Ändra också texten i `aria-label` så att den stämmer, den läses upp för den som använder skärmläsare.

Tomma rader inuti HTML-blocket kan förstöra layouten. Lägg inga till.

## Förhandsgranska lokalt (valfritt)

```
npm ci
npx quartz plugin install
npx quartz build --serve
```

Öppna sedan http://localhost:8080.

## Byta färg eller typsnitt

Färgerna står i `:root` överst i `quartz/styles/custom.scss` och under `theme` i `quartz.config.yaml`. Gul (`--signal`) används bara som yta, aldrig som textfärg på papper.
