import svgPaths from "./svg-cc7odkwuhp";

function C() {
  return <div className="absolute h-[85.944px] left-[191.16px] top-[63.78px] w-[86.105px]" data-name="c" />;
}

function Icon() {
  return (
    <div className="absolute h-[85.944px] left-[81px] overflow-clip top-[63.84px] w-[86.105px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.1052 85.9438">
        <g id="Group">
          <path d={svgPaths.p39de3200} fill="var(--fill-0, #4DD4BF)" id="Vector" />
          <path d={svgPaths.p3e72e080} fill="var(--fill-0, #4DD4BF)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function K() {
  return (
    <div className="absolute bg-[#324f57] h-[214.462px] left-[-31px] rounded-[10.723px] top-[-13.84px] w-[457.531px]" data-name="k">
      <C />
      <Icon />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <K />
    </div>
  );
}