import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function Lightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrev,
  title
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  const url = typeof currentImg === "string" ? currentImg : currentImg.url || currentImg.image;
  const caption = typeof currentImg === "object" ? currentImg.title || currentImg.alt || title : title;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none">
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between text-white z-10 bg-black/85 border-b border-white/10">
          <div>
            {caption && <h4 className="text-sm font-semibold tracking-wide">{caption}</h4>}
            <p className="text-xs text-ink-300">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main image */}
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-16">
          <motion.img
            key={url}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            src={url}
            alt={caption || "Gallery"}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </AnimatePresence>
  );
}

export function Stepper({ steps = [], currentStep = 0, onStepClick }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-ink-100 dark:bg-ink-800 -z-0" />
        
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.id || idx}
              onClick={() => isCompleted && onStepClick && onStepClick(idx)}
              className={cn(
                "relative z-10 flex flex-col items-center group",
                isCompleted && onStepClick && "cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-gold-500 border-gold-500 text-ink-900 shadow-md shadow-gold-500/20"
                    : isCurrent
                    ? "bg-ink-900 dark:bg-white border-gold-500 text-white dark:text-ink-900 shadow-lg scale-110 ring-4 ring-gold-500/20"
                    : "bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-700 text-ink-400"
                )}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] font-semibold mt-2 text-center max-w-[80px] hidden sm:block",
                  isCurrent
                    ? "text-gold-600 dark:text-gold-400"
                    : isCompleted
                    ? "text-ink-800 dark:text-ink-200"
                    : "text-ink-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
