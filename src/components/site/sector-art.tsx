/**
 * Illustrations animées par secteur — dessinées en SVG, avec un courant
 * électrique qui circule (animation CSS `current-line`) et des touches
 * lumineuses. Remplacent des photos en donnant une identité vivante au site.
 */

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const currentProps = {
  stroke: "#F5A623",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  fill: "none",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 240"
      aria-hidden="true"
      className="h-full w-full text-sky-300/80"
    >
      {children}
    </svg>
  );
}

export function ResidentialArt() {
  return (
    <Frame>
      {/* Maison */}
      <path d="M120 128 L200 62 L280 128" {...strokeProps} />
      <path d="M138 118 V196 H262 V118" {...strokeProps} />
      <rect x="222" y="146" width="40" height="50" rx="2" {...strokeProps} />
      <rect x="158" y="146" width="36" height="32" rx="2" {...strokeProps} />
      {/* Éclair dans la fenêtre */}
      <path
        d="M180 150 L172 163 H177 L171 174 L184 160 H178 L184 150 Z"
        fill="#F5A623"
        className="glow-pulse"
      />
      {/* Cheminée */}
      <path d="M244 90 V72 H258 V102" {...strokeProps} />
      {/* Courant qui alimente la maison */}
      <path
        d="M12 196 H90 Q104 196 108 184 L118 160"
        {...currentProps}
        className="current-line"
      />
      <path d="M12 196 H390" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </Frame>
  );
}

export function CommercialArt() {
  const windows: [number, number, number][] = [
    [150, 76, 0], [186, 76, 1.1], [222, 76, 0.4],
    [150, 112, 0.7], [186, 112, 0], [222, 112, 1.6],
    [150, 148, 1.3], [186, 148, 0.2], [222, 148, 0.9],
  ];
  return (
    <Frame>
      {/* Immeuble */}
      <rect x="132" y="56" width="126" height="140" rx="4" {...strokeProps} />
      <path d="M132 76 H258" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Porte */}
      <rect x="182" y="170" width="26" height="26" {...strokeProps} />
      {/* Fenêtres qui s'allument */}
      {windows.map(([x, y, delay], i) => (
        <rect
          key={i}
          x={x}
          y={y + 10}
          width="20"
          height="16"
          rx="2"
          fill="#F5A623"
          className="window-glow"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* Enseigne */}
      <path d="M280 96 H316 V120 H280 Z" {...strokeProps} />
      <path d="M280 108 H316" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Courant */}
      <path
        d="M12 196 H120 Q130 196 132 186 V170"
        {...currentProps}
        className="current-line"
      />
      <path d="M12 196 H390" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </Frame>
  );
}

export function IndustrialArt() {
  return (
    <Frame>
      {/* Toit en dents de scie */}
      <path
        d="M120 196 V120 L164 92 V120 L208 92 V120 L252 92 V196"
        {...strokeProps}
      />
      {/* Cheminée + fumée */}
      <path d="M270 196 V76 H292 V196" {...strokeProps} />
      <circle cx="281" cy="58" r="6" {...strokeProps} className="glow-pulse" opacity="0.7" />
      {/* Porte de quai */}
      <rect x="150" y="150" width="44" height="46" {...strokeProps} />
      <path d="M150 166 H194 M150 182 H194" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Voyant lumineux */}
      <circle cx="226" cy="140" r="7" fill="#F5A623" className="glow-pulse" />
      {/* Courant triphasé */}
      <path
        d="M12 196 H108 Q118 196 120 186 V176"
        {...currentProps}
        className="current-line"
      />
      <path
        d="M12 184 H96"
        {...currentProps}
        className="current-line"
        style={{ animationDelay: "0.5s" }}
        opacity="0.7"
      />
      <path d="M12 196 H390" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </Frame>
  );
}
