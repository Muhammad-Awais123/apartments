import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Maximize2, Camera } from "lucide-react";
import { Lightbox } from "../../../components/ui/Lightbox";
import { luxuryImages } from "../../../config/images";
import { fadeUp, scaleIn, staggerContainer, defaultViewport } from "../../../lib/animations";

export function GalleryMasonrySection() {
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
    { id: "view", label: "Terrace & Views" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-ink-900">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              Visual Elegance
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
              Interior & Architecture Gallery
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-400">
              Take a photographic glimpse into the bespoke finishes, spacious living spaces, and sunset views of Zak Residence.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-cream-50 dark:bg-ink-800 p-1.5 rounded-2xl border border-ink-100 dark:border-ink-700">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gold-500 text-white shadow-sm"
                    : "text-ink-600 dark:text-ink-300 hover:text-ink-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-ink-100 dark:bg-ink-800 cursor-pointer shadow-sm hover:shadow-luxury"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-xs font-bold tracking-wide">{item.title}</p>
                <div className="flex items-center gap-1 text-gold-300 text-[11px] mt-0.5">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
        }
      />
    </section>
  );
}
