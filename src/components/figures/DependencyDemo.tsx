'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Column = 'task' | 'resource' | 'infra'

interface Node {
  id: string
  label: string
  column: Column
  dependsOn: string[]
}

// A made-up organisation. Work tasks depend on people and systems, which depend on infrastructure.
const nodes: Node[] = [
  { id: 'orders', label: 'Ta emot beställningar', column: 'task', dependsOn: ['erp', 'email'] },
  {
    id: 'payroll',
    label: 'Betala ut löner',
    column: 'task',
    dependsOn: ['payroll-admin', 'payroll-system'],
  },
  {
    id: 'support',
    label: 'Besvara kundfrågor',
    column: 'task',
    dependsOn: ['support-staff', 'email', 'erp'],
  },
  { id: 'support-staff', label: 'Kundtjänst', column: 'resource', dependsOn: [] },
  { id: 'payroll-admin', label: 'Löne\u00adhandläggare', column: 'resource', dependsOn: [] },
  { id: 'erp', label: 'Affärssystem', column: 'resource', dependsOn: ['datacentre', 'network'] },
  { id: 'payroll-system', label: 'Lönesystem', column: 'resource', dependsOn: ['cloud'] },
  { id: 'email', label: 'E-post', column: 'resource', dependsOn: ['cloud', 'network'] },
  { id: 'network', label: 'Nätverk', column: 'infra', dependsOn: [] },
  { id: 'datacentre', label: 'Serverhall', column: 'infra', dependsOn: [] },
  { id: 'cloud', label: 'Molntjänst', column: 'infra', dependsOn: [] },
]

const columns: { id: Column; label: string }[] = [
  { id: 'task', label: 'Arbetsuppgifter' },
  { id: 'resource', label: 'Människor och system' },
  { id: 'infra', label: 'Infrastruktur' },
]

const byId = new Map(nodes.map((node) => [node.id, node]))
const edges = nodes.flatMap((node) =>
  node.dependsOn.map((target) => ({ from: node.id, to: target })),
)

/** Everything that directly or indirectly depends on `failed`, including itself. */
function affectedBy(failed: string | null) {
  const hit = new Set<string>()
  if (!failed) return hit
  const queue = [failed]
  while (queue.length) {
    const id = queue.shift()!
    if (hit.has(id)) continue
    hit.add(id)
    for (const node of nodes) if (node.dependsOn.includes(id)) queue.push(node.id)
  }
  return hit
}

function list(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')} och ${items.at(-1)}`
}

interface Line {
  from: string
  to: string
  d: string
}

export function DependencyDemo() {
  const [failed, setFailed] = useState<string | null>(null)
  const [lines, setLines] = useState<Line[]>([])
  const boardRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())

  const affected = useMemo(() => affectedBy(failed), [failed])

  const measure = useCallback(() => {
    const board = boardRef.current
    if (!board) return
    const origin = board.getBoundingClientRect()
    const next = edges.flatMap(({ from, to }) => {
      const a = nodeRefs.current.get(from)?.getBoundingClientRect()
      const b = nodeRefs.current.get(to)?.getBoundingClientRect()
      if (!a || !b) return []
      const x1 = a.right - origin.left
      const y1 = a.top + a.height / 2 - origin.top
      const x2 = b.left - origin.left
      const y2 = b.top + b.height / 2 - origin.top
      const mid = (x1 + x2) / 2
      return [{ from, to, d: `M${x1} ${y1}C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}` }]
    })
    setLines(next)
  }, [])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    const board = boardRef.current
    if (!board) return
    const observer = new ResizeObserver(measure)
    observer.observe(board)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [measure])

  const stoppedTasks = nodes.filter((node) => node.column === 'task' && affected.has(node.id))
  const status = failed
    ? stoppedTasks.length
      ? `${byId.get(failed)!.label} är inte tillgänglig. ${stoppedTasks.length} av 3 arbetsuppgifter stannar: ${list(stoppedTasks.map((task) => task.label.toLowerCase()))}.`
      : `${byId.get(failed)!.label} är inte tillgänglig, men ingen arbetsuppgift stannar.`
    : 'Klicka på en person, ett system eller en del av infrastrukturen för att slå ut den.'

  return (
    <figure className="my-8 rounded border bg-card p-3 sm:p-4">
      <div className="mb-3 grid grid-cols-3 gap-x-5 sm:gap-x-12">
        {columns.map((column) => (
          <p
            key={column.id}
            className="font-mono text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase sm:text-xs"
          >
            {column.label}
          </p>
        ))}
      </div>

      <div ref={boardRef} className="relative grid grid-cols-3 gap-x-5 sm:gap-x-12">
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          aria-hidden={true}
        >
          {lines.map((line) => {
            const hit = affected.has(line.from) && affected.has(line.to)
            return (
              <path
                key={`${line.from}>${line.to}`}
                d={line.d}
                fill="none"
                className={cn('transition-colors', hit ? 'stroke-danger' : 'stroke-foreground/20')}
                strokeWidth={hit ? 2 : 1.25}
              />
            )
          })}
        </svg>

        {columns.map((column) => (
          <div key={column.id} className="relative flex flex-col justify-around gap-2.5">
            {nodes
              .filter((node) => node.column === column.id)
              .map((node) => {
                const isFailed = failed === node.id
                const isHit = affected.has(node.id)
                return (
                  <button
                    key={node.id}
                    ref={(element) => {
                      if (element) nodeRefs.current.set(node.id, element)
                    }}
                    type="button"
                    aria-pressed={isFailed}
                    onClick={() => setFailed(isFailed ? null : node.id)}
                    className={cn(
                      'cursor-pointer rounded border bg-background px-2 py-1.5 text-left text-xs leading-snug text-foreground transition-colors sm:px-2.5 sm:py-2 sm:text-sm',
                      'hover:border-ring',
                      isHit && 'border-danger/60 bg-danger/10',
                      isFailed &&
                        'border-danger bg-danger text-white hover:border-danger dark:text-background',
                    )}
                  >
                    {node.label}
                  </button>
                )
              })}
          </div>
        ))}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-t pt-3 text-sm">
        <p
          aria-live="polite"
          className={cn('max-w-prose', failed ? 'text-foreground' : 'text-muted-foreground')}
        >
          {status}
        </p>
        {failed && (
          <button
            type="button"
            onClick={() => setFailed(null)}
            className="cursor-pointer font-mono text-xs font-medium text-foreground underline decoration-primary underline-offset-4"
          >
            Återställ
          </button>
        )}
      </figcaption>
    </figure>
  )
}
