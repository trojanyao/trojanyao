export default function Detailed() {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet="/imgs/resume/skill-details-528.avif 528w"
        sizes="(max-width: 576px) calc(100vw - 48px), 528px"
      />
      <source
        type="image/webp"
        srcSet="/imgs/resume/skill-details-528.webp 528w"
        sizes="(max-width: 576px) calc(100vw - 48px), 528px"
      />
      {/* Keep native responsive sources to control format fallback under unoptimized mode. */}
      <img
        src="/imgs/resume/skill-details-528.webp"
        alt="details"
        width={528}
        height={330}
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
