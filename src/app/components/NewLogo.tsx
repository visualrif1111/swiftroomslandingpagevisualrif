import svgPaths from '../../imports/svg-okrgsue8py';

// Full Logo - For Desktop Navigation (complete horizontal layout)
export function FullLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: '240px', height: '49px' }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1275.91 260.663">
        <g>
          {/* Logo Icon Circle - Teal */}
          <path d={svgPaths.p1102ad70} fill="#218676" />
          <path d={svgPaths.pf36fc00} fill="#218676" />
          
          {/* SWIFTROOMS Text - Dark Gray */}
          <path d={svgPaths.p2821a400} fill="#324F57" />
          
          {/* WINDOWS | DOORS | GLASS ROOMS Text - Dark Gray */}
          <path d={svgPaths.p1ee45d00} fill="#324F57" />
        </g>
      </svg>
    </div>
  );
}

// Logo Icon Only - For Mobile Navigation (just the circular icon)
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: '44px', height: '44px' }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 262.015 260.663">
        <g>
          <path d={svgPaths.p1102ad70} fill="#218676" />
          <path d={svgPaths.pf36fc00} fill="#218676" />
        </g>
      </svg>
    </div>
  );
}

// Compact Logo - For Mobile Navigation Bar (icon + text, smaller)
export function CompactLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: '180px', height: '38px' }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1275.91 260.663">
        <g>
          {/* Logo Icon Circle - Teal */}
          <path d={svgPaths.p1102ad70} fill="#218676" />
          <path d={svgPaths.pf36fc00} fill="#218676" />
          
          {/* SWIFTROOMS Text - Dark Gray */}
          <path d={svgPaths.p2821a400} fill="#324F57" />
          
          {/* WINDOWS | DOORS | GLASS ROOMS Text - Dark Gray */}
          <path d={svgPaths.p1ee45d00} fill="#324F57" />
        </g>
      </svg>
    </div>
  );
}
