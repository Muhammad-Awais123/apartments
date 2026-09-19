import { luxuryImages } from "../../config/images";

export const initialReviews = [
  {
    id: "rev-001",
    apartmentId: "apt-101",
    apartmentTitle: "The Royal Sky Penthouse with Panoramic Terrace",
    bookingId: "ZAK-26-H89A1",
    guestName: "Hamza Tariq",
    guestLocation: "Karachi, Pakistan",
    avatar: luxuryImages.avatars.guest2,
    rating: 5,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 5,
      value: 5,
      comfort: 5,
      service: 5
    },
    title: "Unmatched Luxury in Lahore! Truly 5-Star Experience",
    comment: "I have stayed in countless luxury hotels across Pakistan and Dubai, but Zak Residence's Royal Penthouse sets a whole new benchmark. The private rooftop terrace views of Bahria Town at sunset were breathtaking. Fast WiFi, spotless bathrooms, and the smart lock made self check-in effortless. Will definitely book again on my next business trip!",
    stayDate: "August 2026",
    isVerifiedGuest: true,
    isFeatured: true,
    status: "approved", // approved, pending, rejected
    helpfulVotes: 24,
    photos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80"
    ],
    ownerReply: {
      date: "August 28, 2026",
      text: "Dear Hamza, thank you so much for your generous words! It was our pleasure hosting you, and we look forward to welcoming you back to your home in Lahore."
    },
    createdAt: "2026-08-27T14:30:00Z"
  },
  {
    id: "rev-002",
    apartmentId: "apt-102",
    apartmentTitle: "Executive 2BR Luxury Suite near Emporium Mall",
    bookingId: "ZAK-26-K42B8",
    guestName: "Dr. Ayesha Siddiqui",
    guestLocation: "London, UK",
    avatar: luxuryImages.avatars.guest1,
    rating: 5,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 5,
      value: 4,
      comfort: 5,
      service: 5
    },
    title: "Perfect location for visiting doctors and families",
    comment: "Stayed here for 2 weeks while consulting at Doctors Hospital Johar Town. The apartment is exceptionally quiet, safe, and modern. Having Emporium Mall just around the corner made dining and shopping super convenient. Housekeeping was prompt and polite.",
    stayDate: "July 2026",
    isVerifiedGuest: true,
    isFeatured: true,
    status: "approved",
    helpfulVotes: 18,
    photos: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
    ],
    ownerReply: null,
    createdAt: "2026-07-20T10:15:00Z"
  },
  {
    id: "rev-003",
    apartmentId: "apt-103",
    apartmentTitle: "Modern Designer 1BR Apartment in Sector C",
    bookingId: "ZAK-26-M19P3",
    guestName: "Bilal & Sarah Khan",
    guestLocation: "Islamabad, Pakistan",
    avatar: luxuryImages.avatars.guest4,
    rating: 5,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 5,
      value: 5,
      comfort: 5,
      service: 5
    },
    title: "Cozy, aesthetic, and sparkling clean",
    comment: "Loved the aesthetic interior and the Nespresso coffee bar! The bed was so plush, like sleeping on a cloud. Sector C Bahria Town has all the best cafes and supermarkets within 2 minutes walk. 10/10 stay!",
    stayDate: "August 2026",
    isVerifiedGuest: true,
    isFeatured: true,
    status: "approved",
    helpfulVotes: 12,
    photos: [],
    ownerReply: {
      date: "August 15, 2026",
      text: "Thank you Bilal! Glad you enjoyed the coffee bar and the Sector C vibe."
    },
    createdAt: "2026-08-14T19:00:00Z"
  },
  {
    id: "rev-004",
    apartmentId: "apt-104",
    apartmentTitle: "Urban Deluxe Studio Suite Johar Town",
    bookingId: "ZAK-26-T76L5",
    guestName: "Fatima Noor",
    guestLocation: "Dubai, UAE",
    avatar: luxuryImages.avatars.guest3,
    rating: 4.8,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 5,
      value: 5,
      comfort: 4,
      service: 5
    },
    title: "Best value studio in Lahore",
    comment: "The digital door lock made check-in seamless after my late flight from Dubai. Generator backup worked flawlessly during city power cuts. Highly recommended for solo travelers.",
    stayDate: "September 2026",
    isVerifiedGuest: true,
    isFeatured: true,
    status: "approved",
    helpfulVotes: 9,
    photos: [],
    ownerReply: null,
    createdAt: "2026-09-15T11:00:00Z"
  },
  {
    id: "rev-005",
    apartmentId: "apt-105",
    apartmentTitle: "Grand Presidential 3BR Residence Bahria Town",
    bookingId: "ZAK-26-R34X9",
    guestName: "Usman Raza",
    guestLocation: "Faisalabad, Pakistan",
    avatar: luxuryImages.avatars.guest2,
    rating: 5,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 5,
      value: 5,
      comfort: 5,
      service: 5
    },
    title: "Huge space, wonderful for large families",
    comment: "Our entire family of 6 had plenty of space. The kitchen had all the utensils and cookware we needed for breakfast. Very secure building with polite 24/7 security staff.",
    stayDate: "September 2026",
    isVerifiedGuest: true,
    isFeatured: false,
    status: "approved",
    helpfulVotes: 7,
    photos: [],
    ownerReply: null,
    createdAt: "2026-09-12T09:40:00Z"
  },
  {
    id: "rev-006",
    apartmentId: "apt-106",
    apartmentTitle: "Industrial Chic 1BR Loft Johar Town",
    bookingId: "ZAK-26-C88V0",
    guestName: "Omer Farooq",
    guestLocation: "Karachi, Pakistan",
    avatar: luxuryImages.avatars.guest4,
    rating: 5,
    ratingsBreakdown: {
      cleanliness: 5,
      location: 4,
      value: 5,
      comfort: 5,
      service: 5
    },
    title: "Super stylish loft, great acoustics",
    comment: "The double height ceiling gives it a real New York loft vibe right in Lahore. Loved working from here.",
    stayDate: "September 2026",
    isVerifiedGuest: true,
    isFeatured: false,
    status: "approved",
    helpfulVotes: 5,
    photos: [],
    ownerReply: null,
    createdAt: "2026-09-12T16:20:00Z"
  }
];
