import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Plane,
  ShoppingBag,
  Hospital,
  Building,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Lightbox } from "../../components/ui/Lightbox";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { siteConfig } from "../../config/site";
import { luxuryImages } from "../../config/images";

export function LocationsPage() {
  const locations = [
    {
      id: "bahria-town",
      title: "Bahria Town Lahore",
      subtitle: "Sector C, Jasmine Block & Grand Heights",
      image: luxuryImages.bahriaTown,
      tagline: "Gated luxury, world-class landmarks, and peaceful living",
      description: "Bahria Town is Asia’s premier master-planned private community. Featuring 24/7 dedicated gated security, lush manicured parks, underground power cabling with zero loadshedding, the awe-inspiring Grand Jamia Mosque, Eiffel Tower replica, and upscale dining on Sector C commercial boulevard.",
      highlights: [
        { name: "Grand Jamia Mosque (3rd Largest in World)", time: "4 Mins" },
        { name: "Eiffel Tower Theme Park & Carnival", time: "3 Mins" },
        { name: "Greenvalley Premium Hypermarket", time: "5 Mins" },
        { name: "Bahria International Hospital", time: "4 Mins" },
        { name: "Allama Iqbal International Airport", time: "35 Mins via Ring Road" }
      ],
      features: [
        "100% Gated Security & Constant Police Patrolling",
        "Walking distance to gourmet cafes, Gloria Jeans & Second Cup",
        "Direct access to Lahore Ring Road Southern Loop"
      ]
    },
    {
      id: "johar-town",
      title: "Johar Town Lahore",
      subtitle: "Block G3, Commercial Avenue · Near Emporium",
      image: luxuryImages.joharTown,
      tagline: "Central city heartbeat, shopping capitals, and gourmet dining",
      description: "Positioned right in Lahore’s central corridor, Johar Town connects you within minutes to the city’s largest shopping mall (Emporium Mall), Lahore Expo Centre, leading universities, and specialized medical hospitals. Ideal for business executives, delegates, and families.",
      highlights: [
        { name: "Emporium Mall by Nishat", time: "3 Mins" },
        { name: "Lahore Expo Centre", time: "4 Mins" },
        { name: "Doctors Hospital & Medical Center", time: "4 Mins" },
        { name: "G1 / G3 Food Street & Fine Dining", time: "2 Mins" },
        { name: "Canal Bank Expressway Access", time: "3 Mins" }
      ],
      features: [
        "Central connectivity to Gulberg, DHA, and Model Town",
        "Surrounded by over 100+ local & international dining brands",
        "High-density commercial hub for tech companies & multinationals"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50/40 dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Luxury Apartment Locations in Lahore | Bahria Town & Johar Town"
        description="Explore our serviced apartment locations in Bahria Town and Johar Town Lahore. Travel times, neighborhood guides, hospitals, malls, and direct airport connectivity."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Prime Destinations
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white">
            Our Prestigious Lahore Locations
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Hand-selected neighborhoods offering unparalleled safety, tranquility, and effortless citywide connectivity.
          </p>
        </div>

        {/* Location Spotlights */}
        <div className="space-y-16">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto h-full min-h-[350px]">
                  <img
                    src={loc.image}
                    alt={loc.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-ink-950/60" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="px-3 py-1 rounded-full bg-gold-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      Lahore Prime
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold mt-2">
                      {loc.title}
                    </h2>
                    <p className="text-xs text-gold-300">{loc.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                      {loc.tagline}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
                      {loc.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      {loc.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-ink-700 dark:text-ink-200">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* Landmarks list */}
                    <div className="pt-4 border-t border-ink-100 dark:border-ink-800 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-ink-500">
                        Proximity & Distances
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {loc.highlights.map((h, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-2.5 rounded-xl bg-cream-50 dark:bg-ink-800/60 flex justify-between items-center"
                          >
                            <span className="text-ink-700 dark:text-ink-300 font-medium">{h.name}</span>
                            <span className="text-gold-600 font-bold ml-2 shrink-0">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to={`/apartments?location=${loc.id}`}>
                      <Button variant="gold" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        View Suites in {loc.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems = luxuryImages.gallery;

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "living", label: "Living Lounges" },
    { id: "bedroom", label: "Master Suites" },
    { id: "kitchen", label: "Designer Kitchens" },
    { id: "dining", label: "Dining & Bars" },
    { id: "bathroom", label: "Luxury Baths" },
    { id: "view", label: "Terrace & Views" },
    { id: "amenity", label: "Amenities" },
    { id: "lobby", label: "Lobbies & Concierge" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-ink-950 py-12 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="High-Resolution Photo Gallery | Zak Residence Lahore"
        description="Browse high-resolution photographs of our luxury serviced apartments, master bedrooms, designer kitchens, and rooftop terraces in Lahore."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
            <span>Visual Showcase</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-ink-900 dark:text-white">
            Photo & Architecture Gallery
          </h1>
          <p className="text-sm text-ink-600 dark:text-ink-400">
            Explore the bespoke Italian furnishings, ambient lighting, and panoramic views at Zak Residence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gold-500 text-white shadow-md"
                    : "bg-cream-50 dark:bg-ink-900 text-ink-600 dark:text-ink-300 hover:text-ink-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100 dark:bg-ink-800 cursor-pointer shadow-sm hover:shadow-luxury"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-xs font-bold">{item.title}</span>
                <span className="text-[10px] text-gold-300">Click to expand</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
      />
    </div>
  );
}
