export const initialCMS = {
  announcementBanner: {
    enabled: true,
    text: "✨ Exclusive Autumn Offer: Enjoy 15% OFF on 5+ nights stays with code LAHORESTAY · Free Airport Pickup included for Penthouses!",
    linkText: "Book Your Suite",
    linkUrl: "/apartments"
  },
  hero: {
    badge: "Boutique Serviced Luxury Living",
    title: "LIVE · STAY · FEEL HOME",
    subtitle: "Immerse yourself in Lahore's most prestigious fully-furnished serviced apartments in Bahria Town and Johar Town. Combining the comfort of home with 5-star hotel hospitality.",
    primaryCtaText: "Explore Suites",
    secondaryCtaText: "Virtual Tour"
  },
  stats: [
    { label: "Happy Guests Hosted", value: 1250, suffix: "+" },
    { label: "Luxury Suites", value: 8, suffix: " Units" },
    { label: "Prime Lahore Locations", value: 2, suffix: " Areas" },
    { label: "Average Guest Rating", value: 4.94, suffix: " / 5.0", isDecimal: true }
  ],
  stayOptions: [
    {
      id: "short-stay",
      title: "Short Stays",
      subtitle: "1 to 6 Nights",
      priceStarting: 9500,
      period: "per night",
      description: "Ideal for weekend getaways, attending weddings, or quick business trips to Lahore.",
      features: ["Complimentary high-speed WiFi", "Daily housekeeping available", "Smart keyless 24/7 self check-in", "Netflix & 4K Smart TV", "Full chef's kitchen & coffee bar"],
      ctaText: "Book Short Stay",
      isPopular: false
    },
    {
      id: "weekly-stay",
      title: "Weekly Stays",
      subtitle: "7 to 29 Nights",
      priceStarting: 10800,
      period: "per night (10% OFF)",
      description: "Perfect for visiting consultants, families on vacation, and overseas Pakistanis.",
      features: ["10% automated weekly discount", "Bi-weekly deep cleaning & linen change", "Dedicated underground parking bay", "Priority 24/7 concierge support", "Complimentary airport transfer option"],
      ctaText: "Book Weekly Stay",
      isPopular: true
    },
    {
      id: "monthly-stay",
      title: "Monthly / Long Stay",
      subtitle: "30+ Nights / Tenancy",
      priceStarting: 140000,
      period: "per month",
      description: "Turnkey luxury residential living with zero furnishing hassles and all-inclusive utilities.",
      features: ["Significant monthly cost savings", "Official registered Tenancy Agreement", "Dedicated residential relationship manager", "100% generator power backup included", "Flexible monthly payment schedule"],
      ctaText: "Explore Monthly Living",
      isPopular: false
    },
    {
      id: "corporate-stay",
      title: "Corporate Packages",
      subtitle: "Custom Business Accounts",
      priceStarting: 180000,
      period: "custom billing",
      description: "Tailored executive lodging solutions for multinational corporations and software houses.",
      features: ["Centralized monthly GST invoice", "Custom workstation & printer setup", "Dedicated high-speed fiber priority line", "Flexible cancellation & guest swaps", "Airport pickup & chauffeur billing"],
      ctaText: "Corporate Inquiries",
      isPopular: false
    }
  ],
  neighborhoods: {
    "bahria-town": {
      title: "Bahria Town Lahore",
      tagline: "Gated luxury, world-class landmarks, and peaceful living",
      highlights: [
        { name: "Grand Jamia Mosque", distance: "4 mins", type: "Landmark & Spiritual" },
        { name: "Eiffel Tower Replica & Theme Park", distance: "3 mins", type: "Entertainment" },
        { name: "Mall of Bahria & Greenvalley", distance: "5 mins", type: "Shopping & Grocery" },
        { name: "Bahria International Hospital", distance: "4 mins", type: "Healthcare" },
        { name: "Lahore Ring Road Interchange", distance: "8 mins", type: "Transit" },
        { name: "Allama Iqbal Airport (LHE)", distance: "35 mins", type: "Airport" }
      ]
    },
    "johar-town": {
      title: "Johar Town Lahore",
      tagline: "Central city heartbeat, shopping capitals, and gourmet dining",
      highlights: [
        { name: "Emporium Mall by Nishat", distance: "3 mins", type: "Shopping Mall" },
        { name: "Lahore Expo Centre", distance: "4 mins", type: "Convention Centre" },
        { name: "Doctors Hospital & Medical Center", distance: "4 mins", type: "Healthcare" },
        { name: "G1 / G3 Food Street & Cafes", distance: "2 mins", type: "Dining" },
        { name: "Canal Bank Expressway", distance: "3 mins", type: "Transit" },
        { name: "Allama Iqbal Airport (LHE)", distance: "25 mins", type: "Airport" }
      ]
    }
  },
  faqs: [
    {
      q: "How does the smart check-in process work?",
      a: "On the morning of your arrival, you will receive a secure digital door code via WhatsApp and inside your Guest Portal. Simply type your PIN into the smart digital door lock to enter anytime after 2:00 PM without waiting for keys or physical reception."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Pakistani Direct Bank Transfer (IBFT to Meezan Bank / HBL), JazzCash, Easypaisa, Pay at Check-in (for verified guests), and international bank wire transfers. You can easily upload your payment screenshot during checkout."
    },
    {
      q: "Is generator electricity backup available during loadshedding?",
      a: "Yes, 100%! All Zak Residence properties feature heavy-duty automated industrial generators and solar inverters that power all air conditioners, elevators, refrigerators, and lighting with zero disruption."
    },
    {
      q: "Are the apartments suitable for families and children?",
      a: "Absolutely. We pride ourselves on offering quiet, safe, family-friendly environments in gated residential neighborhoods with 24/7 security, elevator access, child cots upon request, and fully equipped kitchens."
    },
    {
      q: "What is your cancellation policy?",
      a: "We offer 100% free cancellation up to 48 hours before scheduled check-in time. For cancellations within 48 hours, a 1-night standard fee applies. Long-stay tenancies have a 30-day notice period."
    },
    {
      q: "Can I host a photoshoot or video shoot in the apartment?",
      a: "Commercial photoshoots and brand filming require prior written authorization and custom pricing. Please reach out to our team via WhatsApp or the contact form with your production details."
    }
  ]
};
