import svgPaths from "./svg-r1p2p2khs4";
import img4GexLogo3 from "figma:asset/5cd65b8dd83a95980f42df07cc16764bc2c77eb0.png";
import img5Vetro3 from "figma:asset/17f0f5e44208889069e3800833da01d1785f5802.png";

function Asset() {
  return (
    <div className="absolute h-[45px] left-[264px] overflow-clip top-[378px] w-[276px]" data-name="Asset 17 2">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 276 45">
        <g id="Layer 1">
          <path d={svgPaths.p1126b600} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute inset-[0_-0.01%_-0.01%_0]" data-name="Layer 1">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 258.016 49.0039">
        <g id="Layer 1">
          <path d={svgPaths.p3b69b00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Asset1() {
  return (
    <div className="absolute h-[49px] left-[629px] overflow-clip top-[375px] w-[258px]" data-name="Asset 21 2">
      <Layer />
    </div>
  );
}

function Layer1() {
  return (
    <div className="absolute contents inset-0" data-name="Layer 1">
      <svg className="absolute block inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 204.001 76">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p3a474e00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p172dd00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3ec52200} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p15ce6700} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p99eee00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p152e980} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p1d5e0930} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p1eced580} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p2a692e80} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p151ad200} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p2038f180} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p21b7e400} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p74fdcb0} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p26857500} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.pd018180} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.pf214280} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.p229af100} fill="var(--fill-0, white)" id="Vector_17" />
          <path d={svgPaths.p1f9c7b00} fill="var(--fill-0, white)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Asset2() {
  return (
    <div className="absolute h-[76px] left-[1918px] overflow-clip top-[370px] w-[204px]" data-name="Asset 22 2">
      <Layer1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute bg-[#007969] h-[355px] left-0 top-[195px] w-[2287px]" />
      <Asset />
      <Asset1 />
      <Asset2 />
      <div className="absolute h-[115px] left-[948px] top-[345px] w-[310px]" data-name="4. GEX_logo 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4GexLogo3} />
      </div>
      <div className="absolute h-[127px] left-[1342px] top-[339px] w-[493px]" data-name="5. VETRO 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5Vetro3} />
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Exo:Medium',sans-serif] h-[98px] justify-center leading-[0] left-[calc(50%-257px)] not-italic text-[36px] text-white top-[290px] w-[604px]">
        <p className="leading-[2.03] whitespace-pre-wrap">Brands That We Work With</p>
      </div>
    </div>
  );
}