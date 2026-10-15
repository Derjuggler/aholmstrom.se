// Cut-out portrait with a baked-in white border, floated beside the text, with hand-drawn
// doodles around it. The SVG is a 272 × 290 box; the image sits at (24, 24) and is 224 wide.
export function StickerPortrait({ src, alt, note }: { src: string; alt: string; note?: string }) {
  return (
    <figure className="relative mx-auto mt-4 mb-20 w-52 sm:float-right sm:mt-2 sm:mb-16 sm:ml-10 sm:w-56">
      <svg
        className="absolute -top-[10.7%] -left-[10.7%] w-[121.4%] overflow-visible"
        viewBox="0 0 272 290"
        aria-hidden={true}
      >
        <path
          d="M58 112C50 60 100 22 145 24C195 26 226 62 222 108C219 150 180 176 136 174C92 172 62 150 58 112Z"
          className="fill-primary"
        />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M64 70C90 18 180 6 214 48C236 76 236 116 226 136"
            className="stroke-foreground/60"
            strokeWidth="1.75"
          />
          <path
            d="M84 30L74 18M78 46L63 42M98 22L97 8"
            className="stroke-foreground"
            strokeWidth="2"
          />
          <path
            d="M240 14V36M229 25H251M232 17L248 33M248 17L232 33"
            className="stroke-primary"
            strokeWidth="2"
          />
          {note && (
            <path
              d="M112 268C138 268 152 254 141 236M141 236L150 240M141 236L140 246"
              className="stroke-foreground"
              strokeWidth="1.75"
            />
          )}
        </g>
        {note && (
          <text
            x="14"
            y="274"
            transform="rotate(-6 14 274)"
            className="fill-foreground font-hand text-[24px]"
          >
            {note}
          </text>
        )}
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="relative rotate-2 drop-shadow-[0_3px_6px_rgb(0_0_0/0.18)]"
        src={src}
        alt={alt}
        width={520}
        height={469}
      />
    </figure>
  )
}
