import React from 'react'
import { useSelector } from 'react-redux';
import { getWatchListStore } from '../../redux/reducers/watchListSlice';
import WatchListCard from './WatchListCard';

function RecentSearch({lightMode,isOverlay=true}) {
  const watchListStore = useSelector(getWatchListStore);

  const recentSearchdata = useSelector((state) => state.RecentSearch);

  return (
    <div>
             <div>
              <p className="fs-s-16 fw-700"> Recently Searched</p>
              {recentSearchdata.values &&
                recentSearchdata.values.map((items,i) => (
                  <div key={i} className="mb-15">
                    <WatchListCard lightMode={lightMode} watchListStore={watchListStore} symbol={items?.symbol} fincode={items?.fincode} items={items?.name} isOverlay={isOverlay} />
                  </div>
                ))}
            </div>
    </div>
  )
}

export default RecentSearch