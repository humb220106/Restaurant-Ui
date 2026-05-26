"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { UtensilsCrossed, Clock, ChefHat, Flame, Star, X, Search } from "lucide-react";

/* ── Types ── */
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Dish {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  chef: string;
  cookingTime: string;
  calories: string;
  isPopular: boolean;
  primaryImage: string;
}

/* ── Data ── */
const CATEGORIES: Category[] = [
  { id: 1, name: "Italian",  slug: "italian"  },
  { id: 2, name: "Asian",    slug: "asian"    },
  { id: 3, name: "French",   slug: "french"   },
  { id: 4, name: "American", slug: "american" },
];

const DISHES: Dish[] = [
  { id: 1, name: "Spaghetti Carbonara", category: "italian",  description: "Creamy pasta with parmesan cheese and crispy bacon.", price: 18.99, chef: "Chef Mario", cookingTime: "20 mins", calories: "650 cal", isPopular: true,  primaryImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" },
  { id: 2, name: "Margherita Pizza",    category: "italian",  description: "Classic pizza with mozzarella and fresh basil.",        price: 16.50, chef: "Chef Luca",  cookingTime: "25 mins", calories: "720 cal", isPopular: false, primaryImage: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400" },
  { id: 3, name: "Sushi Deluxe",        category: "asian",    description: "Fresh sushi platter with salmon and tuna.",             price: 24.99, chef: "Chef Ken",   cookingTime: "15 mins", calories: "450 cal", isPopular: true,  primaryImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400" },
  { id: 4, name: "Pad Thai",            category: "asian",    description: "Traditional Thai noodles with shrimp and peanuts.",    price: 19.99, chef: "Chef Lin",   cookingTime: "18 mins", calories: "580 cal", isPopular: true,  primaryImage: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400" },
  { id: 5, name: "French Croissant",    category: "french",   description: "Flaky buttery croissant baked fresh daily.",           price:  8.99, chef: "Chef Pierre",cookingTime: "10 mins", calories: "300 cal", isPopular: false, primaryImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" },
  { id: 6, name: "Beef Bourguignon",    category: "french",   description: "Slow-cooked beef stew in rich red wine sauce.",        price: 28.99, chef: "Chef Alain", cookingTime: "40 mins", calories: "820 cal", isPopular: true,  primaryImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { id: 7, name: "Classic Burger",      category: "american", description: "Juicy grilled beef burger served with fries.",         price: 16.99, chef: "Chef John",  cookingTime: "25 mins", calories: "780 cal", isPopular: true,  primaryImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { id: 8, name: "BBQ Wings",           category: "american", description: "Smoky barbecue chicken wings with dipping sauce.",     price: 14.50, chef: "Chef Mike",  cookingTime: "22 mins", calories: "690 cal", isPopular: false, primaryImage: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400" },
];

const CATEGORY_ICONS: Record<string, string> = {
  italian: "🍝",
  asian:   "🥢",
  french:  "🥖",
  american:"🍔",
};

/* ── Component ── */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].slug);
  const [search, setSearch]                 = useState("");
  const [selectedDish, setSelectedDish]     = useState<Dish | null>(null);

  const filtered = useMemo(() =>
    DISHES.filter(
      (d) =>
        d.category === activeCategory &&
        d.name.toLowerCase().includes(search.toLowerCase())
    ),
    [activeCategory, search]
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* ── HERO ── */}
      <section
        className="relative h-[340px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=400&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00]/75 to-[#3d1a00]/65" />
        <div className="relative z-10 text-center text-white flex flex-col items-center gap-3">
          <UtensilsCrossed size={48} color="#c8963e" />
          <h1 className="text-[3rem] font-extrabold tracking-wide m-0">Our Menu</h1>
          <p className="text-white/80 text-[1.1rem] m-0">Fresh ingredients, bold flavors, unforgettable dishes</p>
        </div>
      </section>

      {/* ── TABS + SEARCH ── */}
      <section className="bg-white border-b border-[#eee] sticky top-[70px] z-50 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-4">

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.slug); setSearch(""); }}
                className={[
                  "flex items-center gap-2 px-5 py-2 rounded-full border-2 text-[0.95rem] font-semibold cursor-pointer transition-all duration-200",
                  activeCategory === cat.slug
                    ? "bg-[#c8963e] border-[#c8963e] text-white"
                    : "bg-white border-[#eee] text-[#555] hover:border-[#c8963e] hover:text-[#c8963e]",
                ].join(" ")}
              >
                <span className="text-[1.1rem]">{CATEGORY_ICONS[cat.slug] ?? "🍽️"}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-[#f5f5f5] border-[1.5px] border-[#eee] rounded-full px-4 py-2 min-w-[220px]">
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none bg-transparent text-[0.9rem] outline-none w-full text-[#333]"
            />
          </div>

        </div>
      </section>

      {/* ── DISHES ── */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-[#bbb]">
              <UtensilsCrossed size={48} color="#ccc" />
              <p className="text-[1.1rem]">No dishes found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDish(dish)}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
                >
                  {/* Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={dish.primaryImage}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {dish.isPopular && (
                      <div className="absolute top-3 right-3 bg-[#c8963e] text-white rounded-full px-2.5 py-1 text-[0.75rem] font-bold flex items-center gap-1">
                        <Star size={12} fill="#fff" color="#fff" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[1.05rem] font-bold text-[#1a0a00] m-0">{dish.name}</h3>
                      <span className="text-[1.05rem] font-extrabold text-[#c8963e] whitespace-nowrap">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[0.875rem] text-[#666] leading-[1.5] mb-4 line-clamp-2">{dish.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center gap-1 text-[0.8rem] text-[#888]">
                        <ChefHat size={14} color="#c8963e" /> {dish.chef}
                      </span>
                      <span className="flex items-center gap-1 text-[0.8rem] text-[#888]">
                        <Clock size={14} color="#c8963e" /> {dish.cookingTime}
                      </span>
                      <span className="flex items-center gap-1 text-[0.8rem] text-[#888]">
                        <Flame size={14} color="#c8963e" /> {dish.calories}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-br from-[#1a0a00] to-[#3d1a00] text-center text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[2rem] font-bold m-0 mb-3 font-[family-name:var(--font-playfair)]">
            Ready to Dine With Us?
          </h2>
          <p className="text-white/75 mb-6 text-[1.05rem]">Book your table and enjoy these dishes in person</p>
          <Link
            href="/reservations"
            className="inline-block px-10 py-3.5 bg-[#c8963e] hover:bg-[#a87530] text-white rounded-full font-bold text-[1rem] no-underline transition-colors duration-200"
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selectedDish && (
        <div
          className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedDish(null); }}
        >
          <div className="bg-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto relative">

            {/* Close */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-black/10 hover:bg-black/20 border-none rounded-full flex items-center justify-center cursor-pointer z-10 transition-colors duration-200"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative h-[260px] overflow-hidden rounded-t-2xl">
              <img src={selectedDish.primaryImage} alt={selectedDish.name} className="w-full h-full object-cover" />
              {selectedDish.isPopular && (
                <div className="absolute top-3 right-3 bg-[#c8963e] text-white rounded-full px-2.5 py-1 text-[0.75rem] font-bold flex items-center gap-1">
                  <Star size={12} fill="#fff" color="#fff" /> Popular
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-[1.4rem] font-bold text-[#1a0a00] m-0">{selectedDish.name}</h2>
                <span className="text-[1.4rem] font-extrabold text-[#c8963e] whitespace-nowrap">
                  ${selectedDish.price.toFixed(2)}
                </span>
              </div>

              <p className="text-[#555] leading-[1.6] mb-5">{selectedDish.description}</p>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 bg-[#faf7f3] rounded-xl p-4 mb-5">
                <span className="flex items-center gap-2 text-[0.9rem] text-[#555]">
                  <ChefHat size={16} color="#c8963e" /> {selectedDish.chef}
                </span>
                <span className="flex items-center gap-2 text-[0.9rem] text-[#555]">
                  <Clock size={16} color="#c8963e" /> {selectedDish.cookingTime}
                </span>
                <span className="flex items-center gap-2 text-[0.9rem] text-[#555]">
                  <Flame size={16} color="#c8963e" /> {selectedDish.calories}
                </span>
              </div>

              <Link
                href="/reservations"
                onClick={() => setSelectedDish(null)}
                className="block text-center bg-gradient-to-br from-[#c8963e] to-[#3d1a00] text-white py-3.5 rounded-xl font-bold text-[1rem] no-underline hover:opacity-90 transition-opacity duration-200"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}