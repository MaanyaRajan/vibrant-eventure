
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Flower } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls, Stage, OrbitControls } from "@react-three/drei";

interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  colors: string[];
  price: string;
}

const eventThemes: Record<string, Theme[]> = {
  wedding: [
    {
      id: "classic-elegance",
      name: "Classic Elegance",
      description: "Timeless sophistication with refined decor, neutral color palette, and elegant floral arrangements.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["White and ivory color palette", "Elegant table settings", "Chandelier lighting", "Classical music ensemble", "Champagne tower"],
      colors: ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#D0D0D0", "#B8B8B8"],
      price: "$3,999"
    },
    {
      id: "rustic-romance",
      name: "Rustic Romance",
      description: "Charming countryside feel with natural elements, wooden accents, and vintage-inspired details.",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Wooden arch and furniture", "Mason jar decorations", "Wildflower arrangements", "String lights", "Burlap accents"],
      colors: ["#D2B48C", "#8B4513", "#F5DEB3", "#556B2F", "#A0522D"],
      price: "$3,499"
    },
    {
      id: "garden-bliss",
      name: "Garden Bliss",
      description: "Lush botanical setting with vibrant florals, greenery, and natural beauty.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Floral archways", "Garden lounge areas", "Botanical table settings", "Fairy lights", "Petal pathways"],
      colors: ["#7CB342", "#AED581", "#FBC02D", "#E91E63", "#8D6E63"],
      price: "$4,299"
    },
    {
      id: "modern-minimalist",
      name: "Modern Minimalist",
      description: "Clean lines, contemporary decor, and sophisticated simplicity for the modern couple.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Geometric accents", "Monochromatic color scheme", "Acrylic and glass elements", "Architectural lighting", "Contemporary floral designs"],
      colors: ["#212121", "#616161", "#9E9E9E", "#BDBDBD", "#FFFFFF"],
      price: "$3,799"
    },
    {
      id: "fairytale-fantasy",
      name: "Fairytale Fantasy",
      description: "Magical, dreamlike ambiance with whimsical details for a storybook wedding.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Cascading floral installations", "Crystal accents", "Dramatic lighting", "Luxurious drapery", "Ornate gold details"],
      colors: ["#B39DDB", "#E1BEE7", "#FFCDD2", "#FFE0B2", "#C5CAE9"],
      price: "$4,899"
    },
  ],
  birthday: [
    {
      id: "vintage-carnival",
      name: "Vintage Carnival",
      description: "Nostalgic carnival atmosphere with classic games, retro decor, and whimsical elements.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Classic carnival games", "Popcorn and cotton candy stations", "Striped tents", "Vintage ticket booths", "Carousel elements"],
      colors: ["#FF5252", "#FFEB3B", "#42A5F5", "#66BB6A", "#FFFFFF"],
      price: "$2,499"
    },
    {
      id: "tropical-paradise",
      name: "Tropical Paradise",
      description: "Vibrant island-inspired celebration with lush greenery, exotic flowers, and beachy vibes.",
      image: "https://images.unsplash.com/photo-1464347971179-68f71ee5a2d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Palm leaf decor", "Tiki bar", "Tropical fruit displays", "Bamboo accents", "Flower leis"],
      colors: ["#4CAF50", "#FFEB3B", "#FF9800", "#00BCD4", "#E91E63"],
      price: "$2,299"
    },
    {
      id: "glamorous-gold",
      name: "Glamorous Gold",
      description: "Luxurious gold-themed celebration with elegant décor and sophisticated ambiance.",
      image: "https://images.unsplash.com/photo-1470753323753-3f8091bb0232?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Gold sequin table linens", "Champagne tower", "Crystal chandeliers", "Metallic balloon installations", "Luxury photo booth"],
      colors: ["#FFD700", "#F5F5F5", "#000000", "#757575", "#C9B037"],
      price: "$2,899"
    },
    {
      id: "neon-nights",
      name: "Neon Nights",
      description: "Electrifying celebration with vibrant neon colors, LED lights, and high-energy atmosphere.",
      image: "https://images.unsplash.com/photo-1530071100468-90a35b86b681?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Neon signage", "Glow-in-the-dark elements", "LED dance floor", "Blacklight reactive decor", "Colorful smoke effects"],
      colors: ["#00FFFF", "#FF00FF", "#FFFF00", "#00FF00", "#FF0000"],
      price: "$2,699"
    },
    {
      id: "cosmic-adventure",
      name: "Cosmic Adventure",
      description: "Out-of-this-world space-themed celebration with galactic decor and futuristic elements.",
      image: "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Star projections", "Nebula wall installations", "Astronaut photo props", "Floating planet decor", "Cosmic cocktails"],
      colors: ["#3F51B5", "#7986CB", "#5C6BC0", "#512DA8", "#000000"],
      price: "$2,399"
    },
  ],
  corporate: [
    {
      id: "tech-innovation",
      name: "Tech Innovation",
      description: "Cutting-edge environment with digital elements, interactive stations, and futuristic design.",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Interactive LED walls", "Digital networking stations", "Holographic displays", "Clean, minimalist design", "Smart tech integration"],
      colors: ["#0D47A1", "#2196F3", "#BBDEFB", "#FFFFFF", "#212121"],
      price: "$5,999"
    },
    {
      id: "classic-professional",
      name: "Classic Professional",
      description: "Refined, traditional corporate atmosphere with elegant decor and sophisticated ambiance.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Polished wooden elements", "Leather accents", "Custom branded materials", "Executive seating areas", "Professional lighting"],
      colors: ["#212121", "#5D4037", "#0D47A1", "#795548", "#EEEEEE"],
      price: "$4,799"
    },
    {
      id: "creative-collaboration",
      name: "Creative Collaboration",
      description: "Vibrant, collaborative environment with artistic elements and inspiring design.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Colorful lounge areas", "Collaboration stations", "Artistic installations", "Graffiti wall", "Vibrant branding elements"],
      colors: ["#FF5722", "#FFC107", "#8BC34A", "#00BCD4", "#673AB7"],
      price: "$4,599"
    },
    {
      id: "sustainable-future",
      name: "Sustainable Future",
      description: "Eco-friendly design with natural elements, sustainable materials, and green initiatives.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Living walls", "Sustainable decor", "Reclaimed furniture", "Natural lighting emphasis", "Plant-based catering options"],
      colors: ["#2E7D32", "#81C784", "#FFF59D", "#A5D6A7", "#3E2723"],
      price: "$5,299"
    },
    {
      id: "industrial-chic",
      name: "Industrial Chic",
      description: "Modern, loft-style environment with raw materials, metal accents, and urban design elements.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Exposed brick and concrete", "Metal fixtures", "Edison bulb lighting", "Pipe and wood furniture", "Minimalist graphic elements"],
      colors: ["#455A64", "#607D8B", "#CFD8DC", "#263238", "#ECEFF1"],
      price: "$4,399"
    },
  ],
  anniversary: [
    {
      id: "romantic-reminiscence",
      name: "Romantic Reminiscence",
      description: "Intimate, nostalgic celebration with personal memorabilia and romantic touches.",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Memory lane photo gallery", "Custom timeline display", "Nostalgic music selection", "Love letter station", "Anniversary cake display"],
      colors: ["#E91E63", "#F8BBD0", "#FCE4EC", "#FFEBEE", "#C2185B"],
      price: "$2,799"
    },
    {
      id: "enchanted-evening",
      name: "Enchanted Evening",
      description: "Magical nighttime celebration with twinkling lights, elegant decor, and romantic ambiance.",
      image: "https://images.unsplash.com/photo-1530214879133-81492e005003?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Fairy light canopy", "Starry night projections", "Lantern pathways", "Moonlit dance floor", "Celestial table settings"],
      colors: ["#303F9F", "#5C6BC0", "#9FA8DA", "#C5CAE9", "#FFFFFF"],
      price: "$3,199"
    },
    {
      id: "globe-trotters",
      name: "Globe Trotters",
      description: "Travel-themed celebration highlighting the journey of your life together.",
      image: "https://images.unsplash.com/photo-1496072935825-c83cbd585c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Destination table themes", "Vintage map decor", "Passport favor books", "Travel photo booth", "International food stations"],
      colors: ["#795548", "#D7CCC8", "#BCAAA4", "#8D6E63", "#EFEBE9"],
      price: "$2,999"
    },
    {
      id: "platinum-celebration",
      name: "Platinum Celebration",
      description: "Luxurious, high-end affair with silver and platinum accents, crystal elements, and elegant atmosphere.",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Crystal chandeliers", "Mirrored table accents", "Silver leaf details", "Premium champagne service", "Platinum themed cake"],
      colors: ["#9E9E9E", "#E0E0E0", "#BDBDBD", "#757575", "#F5F5F5"],
      price: "$3,599"
    },
    {
      id: "retro-revival",
      name: "Retro Revival",
      description: "Fun, nostalgic celebration themed around the decade of your marriage.",
      image: "https://images.unsplash.com/photo-1496072935825-c83cbd585c4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      features: ["Era-appropriate music", "Vintage decor elements", "Decade-inspired menu", "Retro entertainment", "Time capsule activity"],
      colors: ["#FF5722", "#FFC107", "#8BC34A", "#03A9F4", "#E91E63"],
      price: "$2,599"
    },
  ],
};

const ThemeModel = ({ colors }: { colors: string[] }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group position={[0, 0, 0]}>
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.1, 32]} />
          <meshStandardMaterial color={colors[0]} />
        </mesh>

        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
          <meshStandardMaterial color={colors[1]} />
        </mesh>

        {colors.slice(2).map((color, i) => (
          <group key={i} rotation={[0, (Math.PI * 2 * i) / 3, 0]}>
            <mesh position={[0.8, 0.3, 0]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[1.2, 0.8, 0]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color={colors[i % 2 ? 0 : 1]} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={colors[4]} />
        </mesh>
      </group>
    </>
  );
};

const Themes = () => {
  const { eventType = "wedding" } = useParams<{ eventType: string }>();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventType && eventThemes[eventType]) {
      setThemes(eventThemes[eventType]);
      setActiveTheme(0);
    }
  }, [eventType]);

  const nextTheme = () => {
    setActiveTheme((prev) => (prev + 1) % themes.length);
  };

  const prevTheme = () => {
    setActiveTheme((prev) => (prev - 1 + themes.length) % themes.length);
  };

  const scrollToTheme = (index: number) => {
    setActiveTheme(index);
  };

  const getEventTitle = () => {
    switch (eventType) {
      case "wedding":
        return "Wedding";
      case "birthday":
        return "Birthday";
      case "corporate":
        return "Corporate";
      case "anniversary":
        return "Anniversary";
      default:
        return "Event";
    }
  };

  const getThemeGradient = () => {
    switch (eventType) {
      case "wedding":
        return "wedding-gradient";
      case "birthday":
        return "birthday-gradient";
      case "corporate":
        return "corporate-gradient";
      case "anniversary":
        return "anniversary-gradient";
      default:
        return "wedding-gradient";
    }
  };

  const getThemePattern = () => {
    switch (eventType) {
      case "wedding":
        return "floral-pattern";
      case "birthday":
        return "lavender-pattern";
      case "corporate":
        return "sky-blue-pattern";
      case "anniversary":
        return "floral-pattern";
      default:
        return "floral-pattern";
    }
  };

  const getThemeColors = () => {
    switch (eventType) {
      case "wedding":
        return {
          primary: "text-floral-rose",
          secondary: "text-floral-pink",
          accent: "text-floral-lilac",
          bg: "from-floral-cream to-white",
          border: "border-floral-pink/30",
          button: "bg-floral-rose hover:bg-floral-rose/90",
          buttonText: "text-white",
          outline: "border-floral-rose text-floral-rose hover:bg-floral-rose/10"
        };
      case "birthday":
        return {
          primary: "text-floral-lavender",
          secondary: "text-floral-periwinkle",
          accent: "text-floral-lilac",
          bg: "from-white to-floral-lavender/10",
          border: "border-floral-lavender/30",
          button: "bg-floral-periwinkle hover:bg-floral-periwinkle/90",
          buttonText: "text-white",
          outline: "border-floral-periwinkle text-floral-periwinkle hover:bg-floral-periwinkle/10"
        };
      case "corporate":
        return {
          primary: "text-floral-skyblue",
          secondary: "text-floral-lightblue",
          accent: "text-floral-periwinkle",
          bg: "from-white to-floral-skyblue/10",
          border: "border-floral-lightblue/30",
          button: "bg-floral-skyblue hover:bg-floral-skyblue/90",
          buttonText: "text-white",
          outline: "border-floral-skyblue text-floral-skyblue hover:bg-floral-skyblue/10"
        };
      case "anniversary":
        return {
          primary: "text-floral-mint",
          secondary: "text-floral-sage",
          accent: "text-floral-skyblue",
          bg: "from-white to-floral-mint/10",
          border: "border-floral-mint/30",
          button: "bg-floral-mint hover:bg-floral-mint/90",
          buttonText: "text-gray-700",
          outline: "border-floral-mint text-floral-mint hover:bg-floral-mint/10"
        };
      default:
        return {
          primary: "text-floral-pink",
          secondary: "text-floral-rose",
          accent: "text-floral-lilac",
          bg: "from-floral-cream to-white",
          border: "border-floral-pink/30",
          button: "bg-floral-rose hover:bg-floral-rose/90",
          buttonText: "text-white",
          outline: "border-floral-rose text-floral-rose hover:bg-floral-rose/10"
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b ${themeColors.bg} text-gray-700`}>
      <Navigation />

      <section className={`pt-24 pb-12 bg-${getThemePattern()}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h1 
              className={`text-4xl md:text-5xl font-bold mb-4 font-display ${themeColors.primary}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {getEventTitle()} Themes
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our curated collection of themes to make your {eventType} event truly unique and memorable.
            </motion.p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Link to="/themes/wedding" className={`px-4 py-2 rounded-full ${eventType === "wedding" ? "bg-floral-pink text-white" : "bg-white/80 text-floral-pink border border-floral-pink/30"}`}>
              Weddings
            </Link>
            <Link to="/themes/birthday" className={`px-4 py-2 rounded-full ${eventType === "birthday" ? "bg-floral-lavender text-white" : "bg-white/80 text-floral-lavender border border-floral-lavender/30"}`}>
              Birthdays
            </Link>
            <Link to="/themes/corporate" className={`px-4 py-2 rounded-full ${eventType === "corporate" ? "bg-floral-skyblue text-white" : "bg-white/80 text-floral-skyblue border border-floral-skyblue/30"}`}>
              Corporate
            </Link>
            <Link to="/themes/anniversary" className={`px-4 py-2 rounded-full ${eventType === "anniversary" ? "bg-floral-mint text-gray-700" : "bg-white/80 text-floral-mint border border-floral-mint/30"}`}>
              Anniversaries
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {themes.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className={`h-[500px] bg-white/60 rounded-xl overflow-hidden backdrop-blur-sm ${themeColors.border} border shadow-lg shadow-${themeColors.primary.replace('text-', '')}/5`}>
                <Canvas camera={{ position: [0, 2, 5], fov: 40 }}>
                  <OrbitControls enableZoom={false} />
                  <PresentationControls
                    global
                    rotation={[0.1, 0.1, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <Stage environment="city" intensity={0.5}>
                      <ThemeModel colors={themes[activeTheme].colors} />
                    </Stage>
                  </PresentationControls>
                </Canvas>
              </div>

              <div className={`bg-white/80 p-8 rounded-xl ${themeColors.border} border backdrop-blur-sm shadow-lg shadow-${themeColors.primary.replace('text-', '')}/5`}>
                <div className="mb-6 flex justify-between items-center">
                  <button
                    onClick={prevTheme}
                    className={`p-2 rounded-full bg-white hover:${themeColors.button} hover:${themeColors.buttonText} transition-colors ${themeColors.border} border`}
                    aria-label="Previous theme"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <h2 className={`text-3xl font-bold font-display ${themeColors.primary}`}>
                    {themes[activeTheme].name}
                  </h2>
                  <button
                    onClick={nextTheme}
                    className={`p-2 rounded-full bg-white hover:${themeColors.button} hover:${themeColors.buttonText} transition-colors ${themeColors.border} border`}
                    aria-label="Next theme"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  {themes[activeTheme].description}
                </p>

                <div className="flex gap-2 mb-6">
                  {themes[activeTheme].colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={`Theme color ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className={`font-bold mb-3 ${themeColors.secondary}`}>Theme Features:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {themes[activeTheme].features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className={`h-5 w-5 ${themeColors.primary} mr-2 flex-shrink-0`} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t ${themeColors.border} pt-6`}>
                  <div>
                    <span className="block text-gray-500">Starting from</span>
                    <span className={`text-3xl font-bold ${themeColors.primary}`}>{themes[activeTheme].price}</span>
                  </div>
                  <div className="flex gap-3">
                    <Link to={`/booking?theme=${themes[activeTheme].id}`}>
                      <Button className={`${themeColors.button} ${themeColors.buttonText}`}>Book This Theme</Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className={`${themeColors.outline}`}>Get Quote</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={`py-12 ${getThemePattern()} bg-opacity-5`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-8 font-display ${themeColors.primary}`}>All {getEventTitle()} Themes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" ref={sliderRef}>
            {themes.map((theme, index) => (
              <motion.div
                key={theme.id}
                className={`cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                  activeTheme === index ? `ring-2 ring-${themeColors.primary.replace('text-', '')} ring-offset-2 ring-offset-white` : ""
                }`}
                whileHover={{ y: -10 }}
                onClick={() => scrollToTheme(index)}
              >
                <div className="relative h-48">
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold">{theme.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 ${getThemeGradient()} text-gray-800`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Ready to Bring Your Dream {getEventTitle()} to Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our expert event designers help you create an unforgettable experience
            with your favorite theme.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking">
              <Button size="lg" className={`${themeColors.button} ${themeColors.buttonText}`}>
                Book a Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className={`${themeColors.outline}`}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative flower elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.03 + Math.random() * 0.04,
              scale: 0.7 + Math.random() * 0.6
            }}
            animate={{ 
              y: [
                `${Math.random() * 100}%`, 
                `${Math.random() * 100 - 10}%`, 
                `${Math.random() * 100}%`
              ],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 20 + Math.random() * 30, 
              repeat: Infinity,
              repeatType: "mirror" as const
            }}
          >
            <Flower 
              size={40 + Math.random() * 60} 
              className={`${i % 2 === 0 ? themeColors.primary : i % 3 === 0 ? themeColors.secondary : themeColors.accent}`}
            />
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Themes;
