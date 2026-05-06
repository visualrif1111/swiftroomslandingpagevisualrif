import imgMotionImg from "figma:asset/d76e6c1b22e3f7ed8fc8e68c24b7ccfae1eb3155.png";
import imgMotionImg1 from "figma:asset/265343b936147e3cea1b239d59964ed5e2657d8a.png";
import imgMotionImg2 from "figma:asset/d6422ad60ba0d7acbef896831a31188dca8bc66a.png";
import imgMotionImg3 from "figma:asset/a873a74894e42cdff9ecd2c1fb02a14d38a18687.png";
import imgMotionImg4 from "figma:asset/0f08c2480ba1dad0ecba17dddf82fcfe35766557.png";

function MotionImg() {
  return (
    <div className="absolute h-[319.321px] left-[199px] top-[148px] w-[469.003px]" data-name="motion.img">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[146.88%] left-0 max-w-none top-[-16.11%] w-full" src={imgMotionImg} />
      </div>
    </div>
  );
}

function MotionImg1() {
  return (
    <div className="absolute h-[319.321px] left-[699.93px] top-[148px] w-[469.003px]" data-name="motion.img">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[110.16%] left-0 max-w-none top-[0.16%] w-full" src={imgMotionImg1} />
      </div>
    </div>
  );
}

function MotionImg2() {
  return (
    <div className="absolute h-[319.321px] left-[1200.87px] top-[148px] w-[469.003px]" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMotionImg2} />
    </div>
  );
}

function MotionImg3() {
  return (
    <div className="h-[319.321px] relative shrink-0 w-[469.003px]" data-name="motion.img">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[220.31%] left-[-0.03%] max-w-none top-[-76.92%] w-full" src={imgMotionImg3} />
      </div>
    </div>
  );
}

function MotionDiv1() {
  return <div className="bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[319.321px] opacity-85 shrink-0 to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0.5)] w-[469.003px]" data-name="motion.div" />;
}

function Span() {
  return (
    <div className="bg-[#007969] content-stretch flex h-[22.951px] items-start px-[11.975px] py-[3.992px] relative rounded-[33483234px] shadow-[0px_9.979px_14.968px_0px_rgba(0,0,0,0.1),0px_3.992px_5.987px_0px_rgba(0,0,0,0.1)] shrink-0 w-[58.033px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.966px] not-italic relative shrink-0 text-[11.975px] text-white">Doors</p>
    </div>
  );
}

function MotionH() {
  return (
    <div className="absolute h-[29.936px] left-[23.95px] top-[23.95px] w-[421.105px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[29.936px] left-0 not-italic text-[23.949px] text-white top-0">Bi-Fold Doors</p>
    </div>
  );
}

function MotionP() {
  return (
    <div className="absolute h-[51.89px] left-[23.95px] opacity-70 top-[71.85px] w-[421.105px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[25.945px] left-0 not-italic text-[15.966px] text-[rgba(255,255,255,0.9)] top-0 w-[403.143px] whitespace-pre-wrap">Premium folding doors that seamlessly connect indoor and outdoor spaces.</p>
    </div>
  );
}

function MotionButton() {
  return (
    <div className="absolute bg-white h-[43.907px] left-[23.95px] rounded-[9.979px] shadow-[0px_9.979px_14.968px_0px_rgba(0,0,0,0.1),0px_3.992px_5.987px_0px_rgba(0,0,0,0.1)] top-[133.72px] w-[125.234px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[23.949px] left-[62.95px] not-italic text-[#007969] text-[15.966px] text-center top-[8.98px]">Get A Quote</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[201.572px] relative shrink-0 w-[469.003px]" data-name="Container">
      <MotionH />
      <MotionP />
      <MotionButton />
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[319.321px] items-start left-[1701.8px] overflow-clip rounded-[15.966px] shadow-[0px_9.979px_14.968px_-2.994px_rgba(0,0,0,0.1),0px_3.992px_5.987px_-3.992px_rgba(0,0,0,0.1)] top-[148px] w-[469.003px]" data-name="motion.div">
      <MotionImg3 />
      <MotionDiv1 />
      <Span />
      <Container />
    </div>
  );
}

function MotionImg4() {
  return (
    <div className="absolute h-[319.321px] left-[2202.74px] top-[148px] w-[469.003px]" data-name="motion.img">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[146.88%] left-0 max-w-none top-[-6.94%] w-full" src={imgMotionImg4} />
      </div>
    </div>
  );
}

function MotionImg5() {
  return (
    <div className="absolute h-[319.321px] left-[2703.68px] top-[148px] w-[469.003px]" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMotionImg} />
    </div>
  );
}

function MotionImg6() {
  return (
    <div className="absolute h-[319.321px] left-[3204.61px] top-[148px] w-[469.003px]" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMotionImg1} />
    </div>
  );
}

function MotionImg7() {
  return (
    <div className="absolute h-[319.321px] left-[3705.55px] top-[148px] w-[469.003px]" data-name="motion.img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMotionImg2} />
    </div>
  );
}

function MotionDiv2() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[199px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[469px]" data-name="motion.div" />;
}

function MotionH1() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">UPVC Windows and Doors</p>
    </div>
  );
}

function MotionP1() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[419px] whitespace-pre-wrap">Low-maintenance UPVC windows and doors with exceptional durability, thermal efficiency, and security features.</p>
    </div>
  );
}

function MotionButton1() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[202px] left-[193px] top-[265px] w-[470px]" data-name="Container">
      <MotionH1 />
      <MotionP1 />
      <MotionButton1 />
    </div>
  );
}

function MotionDiv3() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[700px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[469px]" data-name="motion.div" />;
}

function MotionH2() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Skylights and Garden Rooms</p>
    </div>
  );
}

function MotionP2() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[418px] whitespace-pre-wrap">Premium roof windows and skylights that flood interiors with natural light.</p>
    </div>
  );
}

function MotionButton2() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[202px] left-[700px] top-[265px] w-[469px]" data-name="Container">
      <MotionH2 />
      <MotionP2 />
      <MotionButton2 />
    </div>
  );
}

function MotionDiv4() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[1201px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[466px]" data-name="motion.div" />;
}

function MotionH3() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Aluminum Sliding Doors</p>
    </div>
  );
}

function MotionP3() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[370px] whitespace-pre-wrap">Sleek sliding doors with smooth operation, perfect for balconies and terraces.</p>
    </div>
  );
}

function MotionButton3() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[202px] left-[1197px] top-[265px] w-[470px]" data-name="Container">
      <MotionH3 />
      <MotionP3 />
      <MotionButton3 />
    </div>
  );
}

function MotionDiv5() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[1699px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[470px]" data-name="motion.div" />;
}

function MotionH4() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Bi-Fold Doors</p>
    </div>
  );
}

function MotionP4() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[404px] whitespace-pre-wrap">Premium folding doors that seamlessly connect indoor and outdoor spaces.</p>
    </div>
  );
}

function MotionButton4() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[202px] left-[1699px] top-[265px] w-[470px]" data-name="Container">
      <MotionH4 />
      <MotionP4 />
      <MotionButton4 />
    </div>
  );
}

function MotionDiv6() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[2201px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[470px]" data-name="motion.div" />;
}

function MotionH5() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Aluminum Windows</p>
    </div>
  );
}

function MotionP5() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[400px] whitespace-pre-wrap">Energy-efficient aluminum windows with superior thermal insulation and modern design.</p>
    </div>
  );
}

function MotionButton5() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[202px] left-[2201px] top-[265px] w-[470px]" data-name="Container">
      <MotionH5 />
      <MotionP5 />
      <MotionButton5 />
    </div>
  );
}

function MotionDiv7() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[2703px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[470px]" data-name="motion.div" />;
}

function MotionH6() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">UPVC Windows and Doors</p>
    </div>
  );
}

function MotionP6() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[419px] whitespace-pre-wrap">Low-maintenance UPVC windows and doors with exceptional durability, thermal efficiency, and security features.</p>
    </div>
  );
}

function MotionButton6() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[202px] left-[2703px] top-[265px] w-[470px]" data-name="Container">
      <MotionH6 />
      <MotionP6 />
      <MotionButton6 />
    </div>
  );
}

function MotionDiv8() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[3205px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[470px]" data-name="motion.div" />;
}

function MotionH7() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Skylights and Garden Rooms</p>
    </div>
  );
}

function MotionP7() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[418px] whitespace-pre-wrap">Premium roof windows and skylights that flood interiors with natural light.</p>
    </div>
  );
}

function MotionButton7() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[202px] left-[3205px] top-[265px] w-[470px]" data-name="Container">
      <MotionH7 />
      <MotionP7 />
      <MotionButton7 />
    </div>
  );
}

function MotionDiv9() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.9)] h-[320px] left-[3707px] opacity-85 to-[rgba(0,0,0,0)] top-[147px] via-1/2 via-[rgba(0,0,0,0.5)] w-[468px]" data-name="motion.div" />;
}

function MotionH8() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[24px] w-[422px]" data-name="motion.h3">
      <p className="absolute font-['Exo:Medium',sans-serif] leading-[30px] left-0 not-italic text-[24px] text-white top-0">Aluminum Sliding Doors</p>
    </div>
  );
}

function MotionP8() {
  return (
    <div className="absolute h-[52px] left-[24px] opacity-70 top-[72px] w-[422px]" data-name="motion.p">
      <p className="absolute font-['Barlow:Regular',sans-serif] leading-[26px] left-0 not-italic text-[16px] text-[rgba(255,255,255,0.9)] top-0 w-[370px] whitespace-pre-wrap">Sleek sliding doors with smooth operation, perfect for balconies and terraces.</p>
    </div>
  );
}

function MotionButton8() {
  return (
    <div className="absolute bg-white h-[44px] left-[24px] rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[134px] w-[125.5px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:Medium',sans-serif] leading-[24px] left-[63px] not-italic text-[#007969] text-[16px] text-center top-[9px]">Get A Quote</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[202px] left-[3707px] top-[265px] w-[470px]" data-name="Container">
      <MotionH8 />
      <MotionP8 />
      <MotionButton8 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <MotionImg />
      <MotionImg1 />
      <MotionImg2 />
      <MotionDiv />
      <MotionImg4 />
      <MotionImg5 />
      <MotionImg6 />
      <MotionImg7 />
      <MotionDiv2 />
      <Container1 />
      <MotionDiv3 />
      <Container2 />
      <MotionDiv4 />
      <Container3 />
      <MotionDiv5 />
      <Container4 />
      <MotionDiv6 />
      <Container5 />
      <MotionDiv7 />
      <Container6 />
      <MotionDiv8 />
      <Container7 />
      <MotionDiv9 />
      <Container8 />
    </div>
  );
}