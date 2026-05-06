import svgPaths from "./svg-grahy2no78";

function Group() {
  return (
    <div className="absolute contents inset-[0.09%_0]" data-name="Group">
      <div className="absolute inset-[5.75%_9.73%_14.48%_21.97%]" data-name="Vector">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 422.362 493.356">
          <path d={svgPaths.p3acf9600} fill="var(--fill-0, #007969)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0.09%_0]" data-name="Vector">
        <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 618.432 617.342">
          <path d={svgPaths.p171d0500} fill="var(--fill-0, #007969)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[618.432px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[834.57px] size-[618.432px] top-[44.57px]" data-name="Container">
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