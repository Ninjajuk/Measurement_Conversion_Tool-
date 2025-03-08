interface HorizontalAdProps {
  position: "top" | "bottom";
  maxWidth?: string;
}

export const HorizontalAd = ({ position,maxWidth = "max-w-2xl" }: HorizontalAdProps) => {
  return (
    <div
      className={` ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full h-64  bg-opacity-80 flex items-center justify-center `}
    >
      <div className={`${maxWidth} w-full h-full glass rounded-lg flex items-center justify-center`}>
        <span className="text-sm text-muted-foreground">Advertisement</span>
      </div>
    </div>
  );
};
