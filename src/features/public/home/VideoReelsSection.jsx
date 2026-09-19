import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Video, Instagram, Compass, ExternalLink } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { luxuryImages } from "../../../config/images";
import { fadeUp, staggerContainer, defaultViewport } from "../../../lib/animations";

export function VideoReelsSection() {
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const videoTours = [
    {
      id: "tour-penthouse",
      title: "Royal Sky Penthouse · 4K Walkthrough",
      subtitle: "Bahria Town Lahore",
      duration: "1:45 min",
      views: "14.2K views",
      cover: luxuryImages.apartments.royalPenthouse[0],
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "tour-johar",
      title: "Executive 2BR Suite Tour near Emporium",
      subtitle: "Johar Town Lahore",
      duration: "1:20 min",
      views: "9.8K views",
      cover: luxuryImages.apartments.luxury2BR[0],
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "tour-sector-c",
      title: "Designer 1BR Suite & Espresso Bar",
      subtitle: "Sector C Bahria Town",
      duration: "0:58 min",
      views: "18.5K views",
      cover: luxuryImages.apartments.modern1BR[0],
      videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ink-950 text-white relative overflow-hidden">
      {/* Background Subtle Luxury Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              Virtual Experience
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
              Watch Walkthrough Tours & Reels
            </h2>
            <p className="text-sm text-ink-300">
              Immerse yourself in our apartments before you book. Real video tours captured on-site.
            </p>
          </div>

          <a
            href="https://instagram.com/zak_residence"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="outline"
              size="md"
              leftIcon={<Instagram className="w-4 h-4 text-gold-400" />}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              className="text-white border-gold-500/40 hover:bg-gold-500/10"
            >
              Watch Reels on @zak_residence
            </Button>
          </a>
        </motion.div>

        {/* Video Cards Grid */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {videoTours.map((tour) => (
            <motion.div
              key={tour.id}
              variants={fadeUp}
              onClick={() => setActiveVideoModal(tour)}
              className="group relative rounded-3xl overflow-hidden bg-ink-900 border border-ink-800 shadow-xl cursor-pointer hover:border-gold-500/50 hover:shadow-gold-glow transition-all duration-300 flex flex-col"
            >
              {/* Cover with Play Button */}
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                <img
                  src={tour.cover}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-ink-950/60" />

                {/* Floating Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold">
                  {tour.duration}
                </span>
              </div>

              {/* Title / Subtitle */}
              <div className="p-5 space-y-1">
                <div className="text-[11px] font-bold text-gold-400 uppercase tracking-wider">
                  {tour.subtitle} · {tour.views}
                </div>
                <h3 className="font-heading text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                  {tour.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <Modal
        isOpen={Boolean(activeVideoModal)}
        onClose={() => setActiveVideoModal(null)}
        title={activeVideoModal?.title}
        subtitle={activeVideoModal?.subtitle}
        size="lg"
      >
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
            src={activeVideoModal?.videoSrc}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      </Modal>
    </section>
  );
}
