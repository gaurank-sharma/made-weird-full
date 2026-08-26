const TAGLINES = [
  'FREE SHIPPING OVER ₹1499',
  'NORMAL WAS NEVER THE PLAN',
  'PRINTED IN INDIA, ONE LAYER AT A TIME',
  'NEW DROP EVERY FRIDAY',
  'PERFECTLY UNNECESSARY SINCE DAY ONE'
];

const MarqueeBar = () => (
  <div className="overflow-hidden border-b-[3px] border-foreground bg-brand-red py-2.5 text-brand-red-foreground">
    <div className="marquee-track">
      {[0, 1].map((loop) => (
        <div key={loop} className="flex shrink-0 items-center">
          {TAGLINES.map((line) => (
            <span key={line + loop} className="whitespace-nowrap px-6 text-[0.72rem] font-black uppercase tracking-[0.24em]">
              {line} <span className="px-3">✱</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default MarqueeBar;
