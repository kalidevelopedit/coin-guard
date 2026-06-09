import neonLogoPath from "@assets/ChatGPT_Image_Feb_27,_2026,_08_02_14_PM_1772197338732.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-10", img: "h-28" },
  md: { container: "h-16", img: "h-44" },
  lg: { container: "h-20", img: "h-52" },
  xl: { container: "h-28", img: "h-72" },
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizeMap[size];

  return (
    <span className={`inline-flex items-center overflow-hidden ${s.container} ${className}`}>
      <img
        src={neonLogoPath}
        alt="CoinGuard"
        className={`${s.img} w-auto object-contain dark:mix-blend-screen dark:brightness-125 invert dark:invert-0`}
        data-testid="logo-img"
      />
    </span>
  );
}
