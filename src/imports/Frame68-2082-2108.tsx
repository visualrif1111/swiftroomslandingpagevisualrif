function MotionButton() {
  return (
    <div className="absolute bg-white h-[43.226px] left-[67px] overflow-clip rounded-[9.606px] shadow-[0px_15.009px_30.018px_-7.204px_rgba(0,0,0,0.25)] top-[177px] w-[208.578px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:SemiBold',sans-serif] leading-[19.212px] left-[103.5px] not-italic text-[#007969] text-[14.409px] text-center top-[12px]">Visit Showroom</p>
    </div>
  );
}

function MotionButton1() {
  return (
    <div className="absolute bg-[#007969] h-[43.226px] left-[434px] overflow-clip rounded-[9.606px] shadow-[0px_15.009px_30.018px_-7.204px_rgba(0,0,0,0.25)] top-[177px] w-[208.578px]" data-name="motion.button">
      <p className="-translate-x-1/2 absolute font-['Rajdhani:SemiBold',sans-serif] leading-[19.212px] left-[104px] not-italic text-[14.409px] text-center text-white top-[12px]">Get a Quote</p>
    </div>
  );
}

function Container() {
  return <div className="absolute left-[525px] size-[31.988px] top-[57px]" data-name="Container" />;
}

function Container1() {
  return <div className="absolute left-[156px] size-[31.988px] top-[57px]" data-name="Container" />;
}

function Frame() {
  return (
    <div className="absolute bg-white h-[375px] left-0 overflow-clip top-0 w-[704px]">
      <div className="absolute bg-white h-[375px] left-0 top-[-7px] w-[704px]" />
      <div className="absolute bg-[#007969] h-[375px] left-0 top-0 w-[350px]" />
      <MotionButton />
      <MotionButton1 />
      <Container />
      <Container1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Frame />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white relative size-full">
      <Group />
    </div>
  );
}