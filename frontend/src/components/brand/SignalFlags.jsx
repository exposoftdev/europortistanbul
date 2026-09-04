const N = "#07255C", P = "#797AAF", S = "#EA580C", W = "#FFFFFF";

const flags = {
  E: (
    <>
      <rect width="60" height="20" fill={N} />
      <rect y="20" width="60" height="20" fill={S} />
    </>
  ),
  P: (
    <>
      <rect width="60" height="40" fill={P} />
      <rect x="15" y="10" width="30" height="20" fill={W} />
    </>
  ),
  I: (
    <>
      <rect width="60" height="40" fill={W} />
      <circle cx="30" cy="20" r="9" fill={N} />
    </>
  ),
  B: <path d="M0 0H60L44 20L60 40H0Z" fill={S} />,
  C: (
    <>
      {[N, W, S, W, N].map((c, i) => <rect key={i} y={i * 8} width="60" height="8" fill={c} />)}
    </>
  ),
  Z: (
    <>
      <path d="M0 0H60L30 20Z" fill={P} />
      <path d="M60 0V40L30 20Z" fill={N} />
      <path d="M60 40H0L30 20Z" fill={S} />
      <path d="M0 40V0L30 20Z" fill={W} />
    </>
  ),
};

export const SignalFlag = ({ letter, size = 60 }) => (
  <svg width={size} height={(size * 40) / 60} viewBox="0 0 60 40" className="rounded-[2px] border border-border" aria-label={`Signal flag ${letter}`}>
    {flags[letter]}
  </svg>
);

export const SignalFlagRow = ({ word = "EPIBCZ", size = 60 }) => (
  <div className="flex gap-2 flex-wrap" data-testid="signal-flags">
    {word.split("").map((l, i) => <SignalFlag key={i} letter={l} size={size} />)}
  </div>
);
