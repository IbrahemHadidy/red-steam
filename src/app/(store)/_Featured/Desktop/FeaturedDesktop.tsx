'use client';

// React
import { useContext, useEffect, useState } from 'react';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// NextJS
import Link from 'next/link';

// Components
import HoverSummary from 'components/HoverSummary/HoverSummary';
import Slider from 'react-slick';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Utils
import formatDate from 'utils/formatDate';

// Services
import { getFeatured } from 'services/game/game';

// Types
import type { FC, JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';
import type { Game } from 'types/game.types';
import type { ImageEntry } from 'types/media.types';
import isTagInUserTags from 'utils/recommendationReason';

const FeaturedDesktop: FC = (): JSX.Element => {
  // Init
  const { userData } = useContext(AuthContext);
  const isViewport1600 = useResponsiveViewport(1600);

  // States
  const [summaryHoverStates, setSummaryHoverStates] = useState<{ [key: string]: boolean }>({});
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);

  const fetchFeatured = async (): Promise<void> => {
    const data: Game[] = await getFeatured('12');
    setFeaturedGames(data);
  };
  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleMouseEnterImage = (img: ImageEntry): void => {
    setHoveredImage(img.link);
  };

  const handleMouseLeaveImage = (): void => {
    setHoveredImage(null);
  };

  const handleMouseEnterSlide = (slide: Game): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: true,
    }));
  };

  const handleMouseLeaveSlide = (slide: Game): void => {
    setSummaryHoverStates((prevState) => ({
      ...prevState,
      [slide.id]: false,
    }));
  };

  const getRecommendationClass = (slide: Game): string => {
    if (!userData) return 'available';
    if (isTagInUserTags(slide.tags, userData?.tags)) return 'recommended';
    return 'available';
  };

  const featuredSettings: SliderSettings = {
    dots: true,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="featured-carousel">
      <div className="main-carousel-content">
        <h2 className="home-titles">Featured & Recommended</h2>
        <Slider {...featuredSettings}>
          {featuredGames.map((slide) => {
            const positiveCount = slide.reviews.filter((review) => review.positive).length;
            const totalReviews = slide.reviews.length;
            const positivePercentage = (positiveCount / totalReviews) * 100;

            return (
              <div className="slides-container" key={slide.id}>
                <Link
                  className="slide"
                  href={`/game/${slide.id}`}
                  onPointerMove={() => handleMouseEnterSlide(slide)}
                  onPointerLeave={() => handleMouseLeaveSlide(slide)}
                >
                  <div
                    className="main-card"
                    style={{
                      backgroundImage: `url(${hoveredImage || slide.thumbnailEntries.mainImage})`,
                      transition: 'background-image 0.1s',
                    }}
                  />
                  <div className="info-card">
                    <div className="app-name">
                      <div>{slide.name}</div>
                    </div>
                    <div className="photos">
                      {slide.imageEntries.map((img, idx) => (
                        <div key={idx}>
                          <div
                            onPointerMove={() => handleMouseEnterImage(img)}
                            onPointerLeave={handleMouseLeaveImage}
                            style={{ backgroundImage: `url(${img.link})` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="reason">
                      <div className={getRecommendationClass(slide)}>
                        {getRecommendationClass(slide) === 'available' ? (
                          <div>Now Available</div>
                        ) : (
                          <>
                            <strong>Recommended</strong> because you liked games tagged with
                          </>
                        )}
                      </div>
                      <div className="tags">
                        {slide.tags.map((tag, idx) => (
                          <span key={idx}>{tag.name}</span>
                        ))}
                      </div>
                    </div>
                    {!slide.pricing.discount ? (
                      <div className="no-discount">
                        <div className="price">
                          {slide.pricing.free ? 'Free to Play' : `$${slide.pricing.basePrice} USD`}
                        </div>
                      </div>
                    ) : (
                      <div className="discount">
                        <div className="discount-block">
                          <div className="discount-percentage">
                            -{slide.pricing.discountPercentage}%
                          </div>
                          <div className="discount-prices">
                            <div className="original-price">${slide.pricing.basePrice}</div>
                            <div className="final-price">${slide.pricing.discountPrice} USD</div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="platform">
                      {slide.platformEntries.win && <span className="platform-image win" />}
                      {slide.platformEntries.mac && <span className="platform-image mac" />}
                    </div>
                  </div>
                </Link>
                {!isViewport1600 && summaryHoverStates[slide.id] && (
                  <div>
                    <HoverSummary
                      title={slide.name}
                      date={formatDate(slide.releaseDate)}
                      screenshots={slide.imageEntries.map((img) => img.link)}
                      description={slide.description}
                      positivePercentage={positivePercentage}
                      totalReviews={totalReviews}
                      tags={slide.tags.map((tag) => tag.name)}
                      leftArrow={!isViewport1600}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedDesktop;