const steps = [
  { title: 'Kartlägg', text: 'Börja i arbetet. Vilka uppgifter måste fungera?' },
  {
    title: 'Koppla',
    text: 'Vilka människor, system och vilken infrastruktur kräver varje uppgift?',
  },
  { title: 'Simulera', text: 'Slå ut något och följ konsekvenserna upp till arbetet.' },
  {
    title: 'Besluta',
    text: 'Vad åtgärdas först, vilka risker accepteras och vilka reservrutiner behövs?',
  },
]

export function MethodSteps() {
  return (
    <ol className="my-8 grid gap-3 xs:grid-cols-2 sm:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded border bg-card p-3">
          <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
          <p className="mt-1 font-heading text-sm font-medium text-foreground">{step.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          {i < steps.length - 1 && (
            <span
              className="absolute top-1/2 -right-2.5 z-10 hidden size-4 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-mono text-[0.625rem] text-primary-foreground sm:flex"
              aria-hidden={true}
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
