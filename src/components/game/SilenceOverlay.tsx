interface SilenceOverlayProps {
  active: boolean;
  exiting: boolean;
}

const SilenceOverlay = ({ active, exiting }: SilenceOverlayProps) => {
  if (!active && !exiting) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50
        flex items-center justify-center
        bg-background/75
        ${active ? 'animate-silence-in' : 'animate-silence-out'}
      `}
    >
      <span className="text-4xl font-serif-display font-light text-foreground tracking-wide-ritual select-none">
        Silence.
      </span>
    </div>
  );
};

export default SilenceOverlay;
