import { getCollection, setCollection, delay } from "./storage";

export const reviewsApi = {
  async getReviews(filters = {}) {
    await delay();
    let reviews = await getCollection("reviews");
    if (filters.apartmentId) {
      reviews = reviews.filter(r => r.apartmentId === filters.apartmentId);
    }
    if (filters.status && filters.status !== "all") {
      reviews = reviews.filter(r => r.status === filters.status);
    }
    if (filters.featuredOnly) {
      reviews = reviews.filter(r => r.isFeatured);
    }
    return reviews;
  },

  async createReview(reviewData) {
    await delay();
    const reviews = await getCollection("reviews");
    const newReview = {
      ...reviewData,
      id: `rev-${Date.now().toString().slice(-4)}`,
      status: "pending", // Requires admin moderation
      helpfulVotes: 0,
      createdAt: new Date().toISOString()
    };
    reviews.unshift(newReview);
    await setCollection("reviews", reviews);
    return newReview;
  },

  async updateReviewStatus(id, status) {
    await delay();
    const reviews = await getCollection("reviews");
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index].status = status;
    await setCollection("reviews", reviews);
    return reviews[index];
  },

  async replyToReview(id, replyText) {
    await delay();
    const reviews = await getCollection("reviews");
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index].ownerReply = {
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      text: replyText
    };
    await setCollection("reviews", reviews);
    return reviews[index];
  },

  async voteHelpful(id) {
    await delay(100);
    const reviews = await getCollection("reviews");
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index].helpfulVotes = (reviews[index].helpfulVotes || 0) + 1;
    await setCollection("reviews", reviews);
    return reviews[index];
  }
};
