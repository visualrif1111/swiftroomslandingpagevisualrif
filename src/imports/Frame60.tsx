import svgPaths from "./svg-3kwpila3ms";
import imgRectangle1 from "figma:asset/807b2cdc5354cc2eee9b096b60d3beacf38c5a96.png";
import imgRectangle3 from "figma:asset/8699321a6da9aae992840e537dce4eac9100d7a2.png";
import { imgRectangle, imgRectangle2 } from "./svg-dmaui";

function Group() {
  return (
    <div className="absolute inset-[7.26%_79.15%_6.71%_1.34%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 262.015 260.663">
        <g id="Group">
          <path d={svgPaths.p1102ad70} fill="var(--fill-0, #218676)" id="Vector" />
          <path d={svgPaths.pf36fc00} fill="var(--fill-0, #218676)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[4.62%_2.51%_6.04%_0.4%]" data-name="Group">
      <div className="absolute inset-[4.62%_2.51%_6.04%_0.4%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[306.74px_48.92px] mask-size-[978.74px_103.73px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle1} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[20.76%_3.89%_45%_23.24%]" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[4.62%_2.51%_6.04%_0.4%]" data-name="Group">
      <div className="absolute inset-[4.62%_2.51%_6.04%_0.4%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[305.79px_175.72px] mask-size-[982.78px_52.03px]" data-name="Rectangle" style={{ maskImage: `url('${imgRectangle2}')` }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle3} />
        </div>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-[62.61%_3.66%_20.22%_23.17%]" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute contents inset-[7.26%_3.66%_6.71%_1.34%]" data-name="Layer 1">
      <Group />
      <ClipPathGroup />
      <ClipPathGroup1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <Layer />
    </div>
  );
}