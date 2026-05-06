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
      <Container />
      <Paragraph />
      <Link />
    </div>
  );
}