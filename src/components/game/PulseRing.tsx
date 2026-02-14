interface PulseRingProps {
  silenceActive: boolean;
}

const PulseRing = ({ silenceActive }: PulseRingProps) => {
  return (
    <div className="flex items-center justify-center h-[160px]">
      <div
        className={`
          w-[120px] h-[120px]
          rounded-full
          border border-primary/30
          transition-opacity duration-1000
          ${silenceActive ? 'opacity-0' : 'opacity-100 animate-breathe'}
        `}
      />
    </div>
  );
};

export default PulseRing;
