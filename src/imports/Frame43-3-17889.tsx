import svgPaths from "./svg-o50xv7ccn5";

function Group() {
  return (
    <div className="absolute inset-[2.17%_44.51%_92.76%_44.47%]" data-name="Group">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 44.3328 44.2547">
        <g id="Group">
          <path d={svgPaths.p162e5bc0} fill="var(--fill-0, #007969)" id="Vector" />
          <path d={svgPaths.p271ff000} fill="var(--fill-0, #007969)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#f7f7f7] h-[82px] left-0 top-0 w-[402px]" />
      <Group />
      <div className="absolute bg-[#007969] h-[3.122px] left-[326px] top-[31px] w-[33.09px]" />
      <div className="absolute bg-[#007969] h-[3.122px] left-[326px] top-[39px] w-[33.09px]" />
      <div className="absolute bg-[#007969] h-[3.122px] left-[326px] top-[47px] w-[33.09px]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Group1 />
    </div>
  );
}