import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Users,
  Maximize,
  Star,
  Heart,
  SlidersHorizontal,
  LayoutGrid,
  List,
  MapPin,
  Sparkles,
  Search,
  Filter,
  X,
  Check
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input, Select } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SEOHelmet } from "../../components/common/SEOHelmet";
import { useWishlistStore } from "../../store/wishlistStore";
import { formatPKR } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apartmentsApi } from "../../services/api";
import { siteConfig } from "../../config/site";

export default function ApartmentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLocation = searchParams.get("location") || "all";
  const initialStayType = searchParams.get("stayType") || "short";

  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [bedroomFilter, setBedroomFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stayTypeFilter, setStayTypeFilter] = useState(initialStayType);
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list' | 'map'
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { savedApartmentIds, toggleWishlist } = useWishlistStore();

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ["apartments"],
    queryFn: () => apartmentsApi.getApartments(),
  });

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const filteredApartments = useMemo(() => {
    return apartments
      .filter((apt) => {
        if (locationFilter !== "all" && apt.locationId !== locationFilter) return false;
        if (bedroomFilter !== "all" && apt.bedrooms !== Number(bedroomFilter)) return false;
        if (typeFilter !== "all" && !apt.type.toLowerCase().includes(typeFilter.toLowerCase())) return false;
        if (apt.nightlyPrice > maxPrice) return false;
        if (
          searchKeyword &&
          !apt.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
          !apt.locationName.toLowerCase().includes(searchKeyword.toLowerCase())
        )
          return false;
        if (
          selectedAmenities.length > 0 &&
          !selectedAmenities.every((am) => apt.amenities?.includes(am))
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.nightlyPrice - b.nightlyPrice;
        if (sortBy === "price_desc") return b.nightlyPrice - a.nightlyPrice;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    apartments,
    locationFilter,
    bedroomFilter,
    typeFilter,
    maxPrice,
    searchKeyword,
    selectedAmenities,
    sortBy
  ]);

  return (
    <div className="min-h-screen bg-cream-50/30 dark:bg-ink-950 py-10 px-4 sm:px-6 lg:px-8">
      <SEOHelmet
        title="Apartments & Penthouses in Lahore | Bahria Town & Johar Town"
        description="Filter and book from 8 luxury fully-furnished serviced apartments in Lahore. Instant live price calculation, nightly and monthly long-stay rates."
      />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink-100 dark:border-ink-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Reservations
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink-900 dark:text-white">
              Furnished Residences in Lahore
            </h1>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-400">
              Showing {filteredApartments.length} available suites in Bahria Town and Johar Town
            </p>
          </div>

          {/* View Toggles & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Filters ({selectedAmenities.length > 0 ? selectedAmenities.length : "All"})
            </Button>

            <div className="flex items-center bg-white dark:bg-ink-900 rounded-xl p-1 border border-ink-200 dark:border-ink-800 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-gold-500 text-white"
                    : "text-ink-500 hover:text-ink-900 dark:text-ink-400"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-gold-500 text-white"
                    : "text-ink-500 hover:text-ink-900 dark:text-ink-400"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout (Sidebar Filters + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } bg-white dark:bg-ink-900 p-6 rounded-3xl border border-ink-100 dark:border-ink-800 shadow-sm space-y-6 h-fit`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-ink-100 dark:border-ink-800">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold-500" />
                Refine Search
              </h3>
              <button
                onClick={() => {
                  setLocationFilter("all");
                  setBedroomFilter("all");
                  setTypeFilter("all");
                  setMaxPrice(35000);
                  setSelectedAmenities([]);
                  setSearchKeyword("");
                }}
                className="text-[11px] text-gold-600 font-semibold hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-300">
                Keyword
              </label>
              <Input
                placeholder="e.g. Penthouse, Sector C..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5" />}
                className="h-9 text-xs"
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-300">
                Location
              </label>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Lahore Locations" },
                  { value: "bahria-town", label: "Bahria Town Lahore" },
                  { value: "johar-town", label: "Johar Town Lahore" }
                ]}
              />
            </div>

            {/* Bedrooms Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-300">
                Bedrooms
              </label>
              <Select
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
                options={[
                  { value: "all", label: "Any Bedrooms" },
                  { value: "1", label: "1 Bedroom" },
                  { value: "2", label: "2 Bedrooms" },
                  { value: "3", label: "3 Bedrooms" }
                ]}
              />
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-ink-700 dark:text-ink-300">
                <span className="uppercase tracking-wider">Max Nightly Price</span>
                <span className="text-gold-600">{formatPKR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={9000}
                max={35000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-ink-600 dark:text-ink-300 block">
                Amenities & Features
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {siteConfig.amenitiesList.map((am) => {
                  const checked = selectedAmenities.includes(am.id);
                  return (
                    <label
                      key={am.id}
                      className="flex items-center gap-2.5 text-xs text-ink-700 dark:text-ink-300 cursor-pointer select-none hover:text-gold-600"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(am.id)}
                        className="rounded accent-gold-500"
                      />
                      <span>{am.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Results Grid / List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort Bar */}
            <div className="bg-white dark:bg-ink-900 p-4 rounded-2xl border border-ink-100 dark:border-ink-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-ink-500">
                <span className="font-bold text-ink-900 dark:text-white">
                  {filteredApartments.length}
                </span>{" "}
                residences match your criteria
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-ink-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 text-xs bg-ink-50 dark:bg-ink-800 rounded-xl border border-ink-200 dark:border-ink-700 font-semibold focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredApartments.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-ink-900 rounded-3xl border border-dashed border-ink-200 dark:border-ink-800 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gold-50 dark:bg-gold-950/40 text-gold-600 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                  No matching residences found
                </h3>
                <p className="text-xs text-ink-500 max-w-sm mx-auto">
                  Try adjusting your price range, removing amenity filters, or selecting "All Locations".
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setLocationFilter("all");
                    setBedroomFilter("all");
                    setMaxPrice(35000);
                    setSelectedAmenities([]);
                    setSearchKeyword("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApartments.map((apt, idx) => {
                  const isSaved = savedApartmentIds.includes(apt.id);

                  return (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-ink-100 overflow-hidden">
                        <img
                          src={apt.coverImage}
                          alt={apt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40" />

                        <button
                          onClick={() => toggleWishlist(apt.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-ink-800 hover:text-red-500 flex items-center justify-center transition-all shadow-md"
                          aria-label="Save to Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                        </button>

                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-ink-900/80 backdrop-blur-md text-gold-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold-400" />
                          {apt.locationName?.split(" ")[0]}
                        </div>

                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-white/90 dark:bg-ink-900/90 backdrop-blur-md text-ink-900 dark:text-white text-xs font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                          <span>{apt.rating}</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-base font-bold text-ink-900 dark:text-white line-clamp-1 group-hover:text-gold-600 transition-colors">
                            {apt.title}
                          </h3>
                          <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2">
                            {apt.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-ink-100 dark:border-ink-800 text-[11px] text-ink-600 dark:text-ink-300 text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <Bed className="w-3.5 h-3.5 text-gold-500" />
                            <span>{apt.bedrooms} Bed</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Bath className="w-3.5 h-3.5 text-gold-500" />
                            <span>{apt.bathrooms} Bath</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <Users className="w-3.5 h-3.5 text-gold-500" />
                            <span>{apt.maxGuests} Max</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-ink-400">
                              {stayTypeFilter === "long" ? "Monthly Lease" : "Nightly Rate"}
                            </div>
                            <div className="font-heading text-base font-bold text-gold-600 dark:text-gold-400">
                              {stayTypeFilter === "long"
                                ? formatPKR(apt.monthlyPrice)
                                : formatPKR(apt.nightlyPrice)}
                              <span className="text-[10px] font-normal text-ink-400 ml-1">
                                {stayTypeFilter === "long" ? "/ mo" : "/ night"}
                              </span>
                            </div>
                          </div>

                          <Link to={`/apartments/${apt.slug || apt.id}`}>
                            <Button variant="gold" size="sm">
                              Reserve
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredApartments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-100 dark:border-ink-800 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center hover:shadow-luxury transition-all"
                  >
                    <div className="relative w-full sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden shrink-0">
                      <img
                        src={apt.coverImage}
                        alt={apt.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">
                          {apt.locationName} · {apt.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-ink-800 dark:text-white">
                          <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                          <span>{apt.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-ink-900 dark:text-white">
                        {apt.title}
                      </h3>
                      <p className="text-xs text-ink-500 line-clamp-2">{apt.description}</p>
                      <div className="flex items-center gap-4 text-xs text-ink-600 font-medium">
                        <span>{apt.bedrooms} Bedrooms</span>
                        <span>•</span>
                        <span>{apt.bathrooms} Bathrooms</span>
                        <span>•</span>
                        <span>{apt.areaSqFt} Sq Ft</span>
                      </div>
                    </div>
                    <div className="sm:border-l border-ink-100 dark:border-ink-800 sm:pl-6 w-full sm:w-auto text-right sm:text-left flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-3 shrink-0">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-ink-400">Rate</div>
                        <div className="font-heading text-xl font-bold text-gold-600">
                          {formatPKR(apt.nightlyPrice)}
                        </div>
                      </div>
                      <Link to={`/apartments/${apt.slug || apt.id}`}>
                        <Button variant="gold" size="sm">
                          View & Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
