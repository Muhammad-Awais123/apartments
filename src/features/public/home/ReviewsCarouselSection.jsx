import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Rating } from "../../../components/ui/Rating";
import { Input, Select } from "../../../components/ui/Input";
import { ImageUploader } from "../../../components/ui/ImageUploader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewsApi, apartmentsApi } from "../../../services/api";
import { formatDate } from "../../../lib/utils";
import { toast } from "sonner";
import { fadeUp, defaultViewport } from "../../../lib/animations";

export function ReviewsCarouselSection() {
  const queryClient = useQueryClient();
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Form State for new review submission
  const [formData, setFormData] = useState({
    apartmentId: "apt-101",
    guestName: "",
    guestLocation: "",
    title: "",
    comment: "",
    overallRating: 5,
    cleanlinessRating: 5,
    locationRating: 5,
    valueRating: 5,
    comfortRating: 5,
    serviceRating: 5,
    photos: []
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", "approved"],
    queryFn: () => reviewsApi.getReviews({ status: "approved" }),
  });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const createReviewMutation = useMutation({
    mutationFn: (data) => reviewsApi.createReview(data),
    onSuccess: () => {
      toast.success("Thank you! Your review has been submitted for moderation.");
      setWriteModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => {
      toast.error("Failed to submit review.");
    }
  });

  const helpfulMutation = useMutation({
    mutationFn: (id) => reviewsApi.voteHelpful(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Thank you for your feedback!");
    }
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.comment || !formData.title) {
      toast.error("Please fill in your name, review title, and comments.");
      return;
    }

    const selectedApt = apartments.find((a) => a.id === formData.apartmentId);

    createReviewMutation.mutate({
      apartmentId: formData.apartmentId,
      apartmentTitle: selectedApt?.title || "Luxury Suite",
      guestName: formData.guestName,
      guestLocation: formData.guestLocation || "Lahore, Pakistan",
      rating: formData.overallRating,
      ratingsBreakdown: {
        cleanliness: formData.cleanlinessRating,
        location: formData.locationRating,
        value: formData.valueRating,
        comfort: formData.comfortRating,
        service: formData.serviceRating
      },
      title: formData.title,
      comment: formData.comment,
      stayDate: "September 2026",
      isVerifiedGuest: true,
      photos: formData.photos.map((p) => (typeof p === "string" ? p : p.url))
    });
  };

  const nextSlide = () => {
    if (reviews.length > 2) {
      setCarouselIndex((prev) => (prev + 1) % (reviews.length - 1));
    }
  };

  const prevSlide = () => {
    if (reviews.length > 2) {
      setCarouselIndex((prev) => (prev - 1 + (reviews.length - 1)) % (reviews.length - 1));
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-50/50 dark:bg-ink-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Aggregate Rating & Write Review CTA */}
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
              <Star className="w-3.5 h-3.5 fill-gold-500" />
              Verified Guest Experiences
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
              Loved by Travelers Worldwide
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-gold-500 font-bold text-xl font-heading">
                <span>4.94</span>
                <Rating value={5} size="sm" showNumber={false} />
              </div>
              <span className="text-xs text-ink-500 dark:text-ink-400">
                Based on 120+ verified guest reviews
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="gold"
              size="md"
              onClick={() => setWriteModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Write a Review
            </Button>
            <div className="hidden sm:flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={prevSlide}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={nextSlide}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid / Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(carouselIndex, carouselIndex + 3).map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-ink-900 rounded-3xl p-6 border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              {/* Top info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                      alt={rev.guestName}
                      className="w-10 h-10 rounded-full object-cover border border-gold-400"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-1">
                        {rev.guestName}
                        {rev.isVerifiedGuest && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" title="Verified Resident" />
                        )}
                      </h4>
                      <p className="text-[11px] text-ink-400">
                        {rev.guestLocation} · {rev.stayDate}
                      </p>
                    </div>
                  </div>

                  <Rating value={rev.rating} size="sm" showNumber={false} />
                </div>

                <div>
                  <h5 className="font-heading text-sm font-bold text-ink-900 dark:text-white">
                    "{rev.title}"
                  </h5>
                  <p className="text-xs text-ink-600 dark:text-ink-300 mt-1 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                {/* Attached Review Photos */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex gap-2 pt-1 overflow-x-auto">
                    {rev.photos.map((photo, pIdx) => (
                      <img
                        key={pIdx}
                        src={photo}
                        alt="Guest stay"
                        className="w-16 h-12 rounded-lg object-cover border border-ink-100 shadow-sm"
                      />
                    ))}
                  </div>
                )}

                {/* Owner Reply */}
                {rev.ownerReply && (
                  <div className="p-3 rounded-2xl bg-cream-50 dark:bg-ink-800/80 border-l-2 border-gold-500 text-[11px] space-y-1">
                    <div className="flex items-center gap-1 font-bold text-gold-700 dark:text-gold-400">
                      <MessageSquare className="w-3 h-3" />
                      <span>Response from Zak Residence ({rev.ownerReply.date})</span>
                    </div>
                    <p className="text-ink-600 dark:text-ink-300 italic">
                      "{rev.ownerReply.text}"
                    </p>
                  </div>
                )}
              </div>

              {/* Helpful Votes Footer */}
              <div className="pt-3 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-xs text-ink-400">
                <span className="text-[11px] text-gold-600 dark:text-gold-400 font-semibold truncate max-w-[180px]">
                  {rev.apartmentTitle}
                </span>
                <button
                  onClick={() => helpfulMutation.mutate(rev.id)}
                  className="flex items-center gap-1 hover:text-gold-600 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpfulVotes || 0})</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      <Modal
        isOpen={writeModalOpen}
        onClose={() => setWriteModalOpen(false)}
        title="Share Your Zak Residence Experience"
        subtitle="Your review helps fellow travelers discover luxury living in Lahore."
        size="lg"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Apartment Stayed At"
              value={formData.apartmentId}
              onChange={(e) => setFormData({ ...formData, apartmentId: e.target.value })}
              options={apartments.map((a) => ({ value: a.id, label: a.title }))}
            />
            <Input
              label="Your Full Name"
              placeholder="e.g. Hamza Tariq"
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your City / Country"
              placeholder="e.g. London, UK or Karachi"
              value={formData.guestLocation}
              onChange={(e) => setFormData({ ...formData, guestLocation: e.target.value })}
            />
            <Input
              label="Review Headline"
              placeholder="e.g. Outstanding Penthouse with Terrace!"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Rating Breakdown */}
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-ink-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-ink-200">
              Rate Your Experience
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-ink-500 mb-1">Overall Stay</div>
                <Rating
                  value={formData.overallRating}
                  readOnly={false}
                  onChange={(val) => setFormData({ ...formData, overallRating: val })}
                  showNumber={false}
                />
              </div>
              <div>
                <div className="text-ink-500 mb-1">Cleanliness</div>
                <Rating
                  value={formData.cleanlinessRating}
                  readOnly={false}
                  onChange={(val) => setFormData({ ...formData, cleanlinessRating: val })}
                  showNumber={false}
                />
              </div>
              <div>
                <div className="text-ink-500 mb-1">Location</div>
                <Rating
                  value={formData.locationRating}
                  readOnly={false}
                  onChange={(val) => setFormData({ ...formData, locationRating: val })}
                  showNumber={false}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-300">
              Detailed Comments
            </label>
            <textarea
              rows={4}
              placeholder="Share details about the bed comfort, WiFi speed, amenities, and check-in experience..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-3 text-xs rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-900 dark:text-white focus:outline-none focus:border-gold-500"
              required
            />
          </div>

          {/* Photo Uploader */}
          <ImageUploader
            images={formData.photos}
            onChange={(photos) => setFormData({ ...formData, photos })}
            maxFiles={3}
            label="Attach Stay Photos (Optional)"
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setWriteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="md"
              isLoading={createReviewMutation.isPending}
            >
              Submit Review for Verification
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
