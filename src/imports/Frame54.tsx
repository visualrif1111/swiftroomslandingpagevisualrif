import svgPaths from "./svg-nrr0m0jpa1";

function Group() {
  return (
    <div className="absolute contents inset-[0.09%_0]" data-name="Group">
      <div className="absolute inset-[5.75%_9.73%_14.48%_21.97%]" data-name="Vector">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 83.1478 97.1241">
          <path d={svgPaths.p13a2f780} fill="var(--fill-0, #007969)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0.09%_0]" data-name="Vector">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 121.747 121.532">
          <path d={svgPaths.p1d365c00} fill="var(--fill-0, #007969)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[121.747px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[85px] size-[121.747px] top-[87px]" data-name="Container">
      <Icon />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Container />
    </div>
  );
}