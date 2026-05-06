import svgPaths from "../../imports/svg-cc7odkwuhp";

interface SwiftRoomsLogoProps {
  size?: number;
  className?: string;
}

export function SwiftRoomsLogo({ size = 48, className = "" }: SwiftRoomsLogoProps) {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg 
        className="block w-full h-full" 
        fill="none" 
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 86.1052 85.9438"
      >
        <g>
          <path d={svgPaths.p39de3200} fill="#4DD4BF" />
          <path d={svgPaths.p3e72e080} fill="#4DD4BF" />
        </g>
      </svg>
    </div>
  );
}
