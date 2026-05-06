import imgComponent40 from "figma:asset/543f4bf8a25135f8a5309f98469cc735abb51163.png";
import imgComponent41 from "figma:asset/fb642fa8b0498c0c18344a88c44a5659d3d9a1a7.png";
import imgScreenshot20260225At2141361 from "figma:asset/d5f8b1fa2f31142d3146b34b31993458dfa20d62.png";

function Heading() {
  return (
    <div className="h-[120.706px] relative shrink-0 w-[651.742px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Exo:Medium',sans-serif] leading-[120.706px] left-[325.2px] not-italic text-[#1c1c1e] text-[120.706px] text-center top-[2.51px] tracking-[0.8841px]">Our Gallery</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[120.706px] items-center justify-center left-[1050px] pr-[0.039px] top-[237px] w-[3057.885px]" data-name="Container">
      <Heading />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[70.412px] left-[1050px] top-[397.94px] w-[3057.885px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Barlow:Regular',sans-serif] leading-[70.412px] left-[1530.6px] not-italic text-[#3a3a3c] text-[50.294px] text-center top-0 tracking-[-1.1297px]">Feel free to browse our work</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[70.412px] left-0 top-0 w-[263.337px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[70.412px] left-[131.98px] not-italic text-[#008873] text-[45.265px] text-center top-0 tracking-[-1.1051px]">@swiftrooms</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[50.294px] left-[283.44px] top-[10.06px] w-[324.397px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[50.294px] left-[161.49px] not-italic text-[#008873] text-[35.206px] text-center top-0 tracking-[-0.3782px]">• Follow us for more</p>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[70.412px] left-[2275.02px] top-[508.59px] w-[607.852px]" data-name="Link">
      <Text />
      <Text1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute left-[1743.41px] size-[1675.814px] top-[730px]" data-name="Component 40">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgComponent40} />
          <div className="absolute bg-[rgba(0,0,0,0)] inset-0" />
        </div>
      </div>
      <div className="absolute left-[3443.07px] size-[784.557px] top-[1176.88px]" data-name="Component 41">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover opacity-70 size-full" src={imgComponent41} />
          <div className="absolute bg-[rgba(0,0,0,0)] inset-0" />
        </div>
      </div>
      <div className="absolute left-[936px] size-[782px] top-[1179px]" data-name="Screenshot 2026-02-25 at 21.41.36 1">
        <div className="absolute inset-0 opacity-60 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[105.31%] left-[-2.69%] max-w-none top-[-2.67%] w-[105.42%]" src={imgScreenshot20260225At2141361} />
        </div>
      </div>
      <Container />
      <Paragraph />
      <Link />
      <div className="absolute left-[397px] size-[477px] top-[1329px]" data-name="Component 42">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover opacity-30 size-full" src={imgComponent41} />
          <div className="absolute bg-[rgba(0,0,0,0)] inset-0" />
        </div>
      </div>
      <div className="absolute left-[4289px] size-[477px] top-[1331px]" data-name="Component 43">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover opacity-20 size-full" src={imgComponent41} />
          <div className="absolute bg-[rgba(0,0,0,0)] inset-0" />
        </div>
      </div>
    </div>
  );
}