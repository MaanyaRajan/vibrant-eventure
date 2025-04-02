
import { motion } from "framer-motion";

interface EventureLogoProps {
  size?: "sm" | "md" | "lg";
  showFlowers?: boolean;
}

const EventureLogo = ({ size = "md", showFlowers = true }: EventureLogoProps) => {
  const logoSizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="relative inline-flex items-center">
      <h1 className={`font-bold font-display ${logoSizes[size]} bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text`}>
        Eventure
      </h1>
    </div>
  );
};

export default EventureLogo;
