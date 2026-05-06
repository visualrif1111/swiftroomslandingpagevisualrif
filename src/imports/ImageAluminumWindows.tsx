import imgImageAluminumWindows from "figma:asset/0f08c2480ba1dad0ecba17dddf82fcfe35766557.png";

function Container() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-0 opacity-85 to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(0,0,0,0.5)] w-[470px]" data-name="Container" />;
}

function Heading() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[142px] w-[422px]" data-name="Heading 3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Aluminum Windows</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[190px] w-[422px]" data-name="Paragraph">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[400px] whitespace-pre-wrap">Energy-efficient aluminum windows with superior thermal insulation and modern design.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[252px] w-[125.5px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

export default function ImageAluminumWindows() {
  return (
    <div className="relative size-full" data-name="Image (Aluminum Windows)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[146.88%] left-0 max-w-none top-[-10.42%] w-full" src={imgImageAluminumWindows} />
      </div>
      <Container />
      <Heading />
      <Paragraph />
      <Button />
    </div>
  );
}