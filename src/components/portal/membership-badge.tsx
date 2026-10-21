/**
 * The membership badge as members will embed it. Production serves this same drawing as
 * /badge/[slug].svg, with system serif fonts because web fonts don't load inside <img> SVGs.
 */
export type BadgeStyle = "light" | "dark" | "compact";

export function MembershipBadge({ style, year, active = true }: { style: BadgeStyle; year: number; active?: boolean }) {
  const dark = style === "dark";
  const bg = dark ? "#0b1210" : "#f9fbfa";
  const fg = dark ? "#edf1ef" : "#101815";
  const sub = dark ? "#98a19c" : "#5c6662";
  const ok = active ? (dark ? "#85d0b3" : "#1a5d48") : sub;
  const border = dark ? "#28302d" : "#b8c0bc";

  if (style === "compact") {
    return (
      <svg width="72" height="72" viewBox="0 0 72 72" role="img" aria-label={active ? "Verified MetBA member" : "MetBA membership not current"}>
        <rect x="0.5" y="0.5" width="71" height="71" rx="4" fill={bg} stroke={border} />
        <text x="36" y="36" textAnchor="middle" fontFamily="'Libre Caslon Display', Georgia, serif" fontSize="19" fill={fg}>
          MetBA
        </text>
        <g transform="translate(26 45)">
          <circle cx="10" cy="7" r="7" fill="none" stroke={ok} strokeWidth="1.4" />
          {active ? <path d="M6.8 7.2l2.2 2.2 4.2-4.4" fill="none" stroke={ok} strokeWidth="1.6" strokeLinecap="round" /> : null}
        </g>
      </svg>
    );
  }

  return (
    <svg width="236" height="64" viewBox="0 0 236 64" role="img" aria-label={active ? "Verified MetBA member" : "MetBA membership not current"}>
      <rect x="0.5" y="0.5" width="235" height="63" rx="4" fill={bg} stroke={border} />
      <g transform="translate(14 14)">
        <circle cx="18" cy="18" r="17" fill="none" stroke={fg} strokeWidth="1" />
        <path d="M18 8v20M10 13h16M11 13l-4 8h8zM25 13l-4 8h8zM14 28h8" fill="none" stroke={fg} strokeWidth="1.1" strokeLinejoin="round" />
      </g>
      <text x="60" y="29" fontFamily="'Libre Caslon Display', Georgia, serif" fontSize="18" fill={fg}>
        Metaverse Bar Association
      </text>
      <g transform="translate(60 37)">
        <circle cx="6" cy="6" r="5.5" fill="none" stroke={ok} strokeWidth="1.2" />
        {active ? <path d="M3.6 6.1l1.7 1.7 3.2-3.3" fill="none" stroke={ok} strokeWidth="1.4" strokeLinecap="round" /> : null}
        <text x="17" y="10" fontFamily="'Libre Franklin', Arial, sans-serif" fontSize="11.5" fontWeight="600" fill={ok}>
          {active ? `Verified member · ${year}` : "Membership not current"}
        </text>
      </g>
    </svg>
  );
}
