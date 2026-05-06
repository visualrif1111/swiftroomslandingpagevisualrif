import svgPaths from '../../imports/svg-ahi2mckeqz';

interface CadLogoProps {
  className?: string;
  style?: React.CSSProperties;
  strokeOnly?: boolean;
}

export function CadLogo({ className, style, strokeOnly }: CadLogoProps) {
  const commonProps = strokeOnly
    ? { fill: "none", stroke: "#007969", strokeWidth: "1" }
    : { fill: "var(--fill-0, #007969)" };

  return (
    <svg
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 613.215 613.234"
    >
      <g id="Layer 1">
        <path d={svgPaths.p5501680} {...commonProps} id="Vector" />
        <path d={svgPaths.p283f4d00} {...commonProps} id="Vector_2" />
        <path d={svgPaths.p2b80a100} {...commonProps} id="Vector_3" />
        <path d={svgPaths.p28198470} {...commonProps} id="Vector_4" />
        <path d={svgPaths.p2b88e00} {...commonProps} id="Vector_5" />
        <g id="Group">
          <path d={svgPaths.p17f3f000} {...commonProps} id="Vector_6" />
          <path d={svgPaths.p158a0c80} {...commonProps} id="Vector_7" />
        </g>
        <g id="Group_2">
          <path d={svgPaths.p37eb4400} {...commonProps} id="Vector_8" />
          <path d={svgPaths.p17b28640} {...commonProps} id="Vector_9" />
        </g>
        <g id="Group_3">
          <path d={svgPaths.p242f1a80} {...commonProps} id="Vector_10" />
          <path d={svgPaths.p14229700} {...commonProps} id="Vector_11" />
        </g>
        <g id="Group_4">
          <path d={svgPaths.p37775500} {...commonProps} id="Vector_12" />
          <path d={svgPaths.p3754f370} {...commonProps} id="Vector_13" />
        </g>
        <g id="Group_5">
          <path d={svgPaths.p304d1b00} {...commonProps} id="Vector_14" />
          <path d={svgPaths.p4364930} {...commonProps} id="Vector_15" />
        </g>
        <g id="Group_6">
          <path d={svgPaths.p283dda80} {...commonProps} id="Vector_16" />
          <path d={svgPaths.p361aab40} {...commonProps} id="Vector_17" />
        </g>
        <g id="Group_7">
          <path d={svgPaths.p129909c0} {...commonProps} id="Vector_18" />
          <path d={svgPaths.p1e2e4c80} {...commonProps} id="Vector_19" />
        </g>
        <g id="Group_8">
          <path d={svgPaths.p3d59c600} {...commonProps} id="Vector_20" />
          <path d={svgPaths.p3b321480} {...commonProps} id="Vector_21" />
        </g>
        <g id="Group_9">
          <path d={svgPaths.p2a159a00} {...commonProps} id="Vector_22" />
          <path d={svgPaths.p272f4d00} {...commonProps} id="Vector_23" />
        </g>
      </g>
    </svg>
  );
}
