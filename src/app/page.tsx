"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed, ChefHat, Leaf, Star, ArrowRight,
  ChevronLeft, ChevronRight, Clock, MapPin, Phone, Quote,
} from "lucide-react";

/* ── Data ── */
interface Slide {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  bg: string;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

interface Stat {
  number: string;
  label: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Authentic Flavors,",
    highlight: "Unforgettable Experience",
    subtitle: "Discover culinary excellence with fresh ingredients and traditional recipes",
    bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=900&fit=crop",
  },
  {
    id: 2,
    title: "Farm to Table",
    highlight: "Excellence",
    subtitle: "Fresh, locally sourced ingredients prepared by our expert chefs every day",
    bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=900&fit=crop",
  },
  {
    id: 3,
    title: "Perfect for Every",
    highlight: "Occasion",
    subtitle: "From intimate dinners to grand celebrations, we make every moment special",
    bg: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&h=900&fit=crop",
  },
];

const FEATURES: Feature[] = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Locally sourced, premium quality ingredients prepared fresh daily from trusted farms.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description: "Award-winning chefs with decades of culinary expertise across world cuisines.",
  },
  {
    icon: UtensilsCrossed,
    title: "Elegant Dining",
    description: "A beautiful, warm ambiance crafted to make every dining occasion memorable.",
  },
];

const DISHES: Dish[] = [
  { id: 1, name: "Grilled Salmon",        description: "Fresh Atlantic salmon with seasonal vegetables",  price: "$28", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop" },
  { id: 2, name: "Ribeye Steak",          description: "Prime cut with garlic mashed potatoes",           price: "$35", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop" },
  { id: 3, name: "Pasta Primavera",       description: "House-made pasta with fresh garden vegetables",   price: "$22", image: "https://images.unsplash.com/photo-1551183053-bf91798d7fbb?w=400&h=300&fit=crop" },
  { id: 4, name: "Herb Roast Chicken",    description: "Classic French herb chicken with roasted veg",   price: "$26", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=400&h=300&fit=crop" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    review: "Absolutely incredible dining experience! The food was exceptional and the service was impeccable. One of the best meals of my life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Guest",
    review: "Best restaurant in town! The atmosphere is perfect for special occasions. We come here for every anniversary.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Food Critic",
    review: "Fresh ingredients, creative dishes, and wonderful staff. The menu changes with the seasons beautifully.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
];

const STATS: Stat[] = [
  { number: "8+",   label: "Years of Excellence" },
  { number: "50K+", label: "Happy Guests"         },
  { number: "15+",  label: "Awards Won"           },
  { number: "4.9",  label: "Average Rating"       },
];

/* ── Component ── */
export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prevSlide = () => setSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setSlide((p) => (p + 1) % SLIDES.length);

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[900ms] ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${s.bg})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

            {/* Content */}
            <div className="absolute top-1/2 left-[8%] -translate-y-1/2 text-white max-w-xl flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-[#c8963e]/15 border border-[#c8963e]/35 text-[#c8963e] px-4 py-1.5 rounded-full text-[0.8rem] font-semibold w-fit tracking-wide">
                <Star size={13} fill="#c8963e" color="#c8963e" />
                Fine Dining Since 2015
                <Star size={13} fill="#c8963e" color="#c8963e" />
              </div>

              <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.15] m-0">
                {s.title}<br />
                <span className="text-[#c8963e]">{s.highlight}</span>
              </h1>

              <p className="text-white/80 text-[1.1rem] leading-[1.6] m-0">{s.subtitle}</p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#c8963e] to-[#92400e] text-white rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,150,62,0.45)] shadow-[0_4px_18px_rgba(200,150,62,0.35)]"
                >
                  Explore Menu <ArrowRight size={18} />
                </Link>
                <Link
                  href="/reservations"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-white border-2 border-white/55 rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:border-[#c8963e] hover:text-[#c8963e]"
                >
                  Reserve a Table
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Prev / Next */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer z-10 transition-colors duration-200 hover:bg-[#c8963e]/40"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer z-10 transition-colors duration-200 hover:bg-[#c8963e]/40"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === slide ? "bg-[#c8963e] w-6" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>

        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-md flex items-center justify-center gap-8 px-4 py-4 flex-wrap">
          {[
            { icon: Clock,  text: "Mon–Sun: 12PM – 11PM" },
            { icon: MapPin, text: "123 Culinary Street, Downtown" },
            { icon: Phone,  text: "(555) 123-4567" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80 text-[0.875rem]">
              <Icon size={16} color="#c8963e" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.8rem] font-bold tracking-[0.12em] uppercase text-[#c8963e] mb-3">
              Why Choose Us
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a0a00] mb-3 font-[family-name:var(--font-playfair)]">
              An Experience Like No Other
            </h2>
            <p className="text-[#777] text-[1rem] max-w-[550px] mx-auto leading-[1.7]">
              We combine passion, skill, and the finest ingredients to create meals that linger in memory.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-[#f0ebe3] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#fef3e2] to-[#fde8c0] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={28} color="#c8963e" />
                </div>
                <h3 className="text-[1.1rem] text-[#1a0a00] mb-2 font-bold">{title}</h3>
                <p className="text-[#777] text-[0.9rem] leading-[1.6] m-0">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-14 bg-gradient-to-br from-[#1a0a00] to-[#3d1a00]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {STATS.map(({ number, label }) => (
              <div key={label} className="py-4">
                <div className="text-[2.5rem] font-extrabold text-[#c8963e] leading-none">{number}</div>
                <div className="text-[0.85rem] text-white/60 mt-1.5 uppercase tracking-[0.05em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&h=500&fit=crop"
                alt="Restaurant interior"
                className="w-full h-[420px] object-cover block rounded-2xl"
              />
              <div className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md text-white px-4 py-2.5 rounded-full flex items-center gap-2 text-[0.875rem] font-semibold">
                <UtensilsCrossed size={18} color="#c8963e" />
                <span>Est. 2015</span>
              </div>
            </div>
            <div>
              <span className="inline-block text-[0.8rem] font-bold tracking-[0.12em] uppercase text-[#c8963e] mb-2">
                Our Story
              </span>
              <h2 className="text-[clamp(1.8rem,3vw,2.2rem)] text-[#1a0a00] mt-2 mb-4 font-[family-name:var(--font-playfair)]">
                A Culinary Journey of Passion
              </h2>
              <p className="text-[#666] leading-[1.7] mb-4">
                Founded with a passion for exceptional cuisine, Savory Haven has been serving the community
                with authentic flavors and memorable dining experiences for over 8 years.
              </p>
              <p className="text-[#666] leading-[1.7] mb-6">
                We believe in the power of fresh, locally-sourced ingredients combined with time-honored
                cooking techniques to create dishes that tell a story and bring people together.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#c8963e] to-[#92400e] text-white rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(200,150,62,0.35)]"
              >
                Our Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE DISHES ── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.8rem] font-bold tracking-[0.12em] uppercase text-[#c8963e] mb-3">
              Our Menu
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a0a00] mb-3 font-[family-name:var(--font-playfair)]">
              Signature Dishes
            </h2>
            <p className="text-[#777] text-[1rem] max-w-[550px] mx-auto leading-[1.7]">
              A taste of our most beloved creations, crafted with love and precision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISHES.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.1)]"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 bg-[#c8963e] text-white px-3 py-1 rounded-full text-[0.85rem] font-extrabold">
                    {dish.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[1rem] font-bold text-[#1a0a00] mb-1.5">{dish.name}</h3>
                  <p className="text-[0.875rem] text-[#888] m-0 leading-[1.5]">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#c8963e] to-[#92400e] text-white rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(200,150,62,0.35)]"
            >
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.8rem] font-bold tracking-[0.12em] uppercase text-[#c8963e] mb-3">
              Testimonials
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a0a00] font-[family-name:var(--font-playfair)]">
              What Our Guests Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#faf8f5] rounded-2xl p-7 border border-[#f0ebe3] flex flex-col gap-4 transition-shadow duration-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)]"
              >
                <Quote size={28} color="#c8963e" className="opacity-40" />
                <p className="text-[#555] leading-[1.7] text-[0.925rem] flex-1 m-0">{t.review}</p>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#c8963e" color="#c8963e" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-[0.9rem] text-[#1a0a00]">{t.name}</div>
                    <div className="text-[0.78rem] text-[#aaa]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative py-24 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=600&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/88 to-[#3d1a00]/82" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-5">
          <span className="inline-block text-[0.8rem] font-bold tracking-[0.12em] uppercase text-[#c8963e]">
            Book Now
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] text-white m-0 font-[family-name:var(--font-playfair)]">
            Ready for an Unforgettable<br />Dining Experience?
          </h2>
          <p className="text-white/70 text-[1.05rem] max-w-[520px] m-0">
            Reserve your table today and discover why we&apos;re the city&apos;s favourite restaurant.
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-br from-[#c8963e] to-[#92400e] text-white rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(200,150,62,0.35)]"
            >
              Make a Reservation <ArrowRight size={18} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-white border-2 border-white/55 rounded-full font-bold text-[0.95rem] no-underline transition-all duration-200 hover:border-[#c8963e] hover:text-[#c8963e]"
            >
              View Menu
            </Link>
          </div>
          <div className="flex gap-6 flex-wrap justify-center mt-1">
            {["Fresh ingredients daily", "Award-winning chefs", "Perfect for any occasion"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-white/70 text-[0.875rem]">
                <Star size={13} fill="#c8963e" color="#c8963e" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}