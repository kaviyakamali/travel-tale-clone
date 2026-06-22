import { motion } from "framer-motion";

const experiences = [
  {
    title: "Sunset Sailing in the Aegean",
    location: "Mykonos, Greece",
    price: 75,
    image: "https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Authentic Pasta Masterclass",
    location: "Bologna, Italy",
    price: 60,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Northern Lights Expedition",
    location: "Tromsø, Norway",
    price: 130,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Desert Dune Adventure",
    location: "Merzouga, Morocco",
    price: 95,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
  },
];

export function Experiences() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Unforgettable experiences</h2>
        <p className="text-muted-foreground">Activities hosted by local experts</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl border bg-card shadow-sm"
          >
            <div className="relative overflow-hidden">
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-xs font-medium text-white/80">{exp.location}</p>
                <h3 className="font-semibold text-white">{exp.title}</h3>
              </div>
            </div>
            <div className="p-4 text-sm">
              <span className="font-semibold">From ${exp.price}</span>
              <span className="text-muted-foreground"> / person</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
