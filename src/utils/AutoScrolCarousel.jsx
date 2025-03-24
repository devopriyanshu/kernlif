import React, { useEffect, useRef } from "react";

const AutoScrollCarousel = ({
  items,
  renderItem,
  speed = 1,
  cardWidth = 300, // Default card width
  gap = 24, // Default gap between cards
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;
    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = speed * 0.5;

    // Set initial scroll position
    container.scrollLeft = 0;

    const scroll = () => {
      if (isPaused) {
        animationId = requestAnimationFrame(scroll);
        return;
      }

      scrollPosition += scrollSpeed;

      // Reset to start when reaching halfway (seamless loop)
      if (scrollPosition >= content.scrollWidth / 2) {
        scrollPosition = 0;
        container.scrollLeft = 0;
      } else {
        container.scrollLeft = scrollPosition;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, isPaused]);

  // Duplicate items for seamless looping
  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div ref={contentRef} className="flex w-max" style={{ gap: `${gap}px` }}>
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0"
            style={{ width: `${cardWidth}px` }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollCarousel;
