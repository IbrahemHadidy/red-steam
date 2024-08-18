'use client';

// React
import { useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Services
import gameData from 'services/gameData/gameData';

// Images
import blank from 'images/blank.gif';

// Types
import type { ChangeEvent, FC } from 'react';

const NavSearch: FC = (): JSX.Element => {
  // States
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  // TODO: send searchInput to backend then fetch the requested data
  // make the backend send 10 games at a time for every change

  return (
    <div className="search-area">
      <div id="search">
        <form>
          <input type="hidden" />
          <div className="search">
            <input
              name="term"
              type="text"
              className="search-input"
              autoComplete="off"
              placeholder="search"
              onChange={handleSearchChange}
            />
            <Link href={`/search?term=${searchInput}`} className="search-button">
              <Image alt="Search" src={blank} />
            </Link>
          </div>
        </form>
      </div>
      <div className="nav-search" style={{ display: searchInput !== '' ? 'block' : 'none' }}>
        <div className="search-popup">
          {gameData.slice(0, 11).map((game) => (
            <Link key={game.id} className="search-match" href={`/game/${game.id}`}>
              <div className="match-name">{game.name}</div>
              <div className="match-img">
                <Image
                  width={120}
                  height={45}
                  src={game.thumbnailEntries.searchImage}
                  alt={game.name}
                />
              </div>
              <div className="match-price">
                {!game.pricing.free && '$'}
                {game.pricing.discountPrice ? game.pricing.discountPrice : game.pricing.basePrice}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSearch;
