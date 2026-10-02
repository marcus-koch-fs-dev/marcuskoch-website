import { TWINKLE_STAR_COLORS, TWINKLE_STAR_COUNT, TWINKLE_STAR_SEED } from "../../config/globeHeroConfig";

function makeTwinkleStars(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => {
    const size = 1 + rand() * 2.2;
    return {
      id: i,
      left: rand() * 100,
      top: rand() * 100,
      size,
      color: TWINKLE_STAR_COLORS[Math.floor(rand() * TWINKLE_STAR_COLORS.length)],
      delay: rand() * 6,
      duration: 2.5 + rand() * 3.5,
    };
  });
}

const TWINKLE_STARS = makeTwinkleStars(TWINKLE_STAR_COUNT, TWINKLE_STAR_SEED);

export default function GlobeBackdrop() {
  return (
    <>
      <div className="globe-hero__stars" />
      <div className="globe-hero__stars globe-hero__stars--far" />
      <div className="globe-hero__twinkle-stars">
        {TWINKLE_STARS.map((star) => (
          <span
            key={star.id}
            className="globe-hero__twinkle-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="globe-hero__aurora" />
      <div className="globe-hero__vignette" />
    </>
  );
}
