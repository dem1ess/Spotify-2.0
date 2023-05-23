import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const {
    activeSong,
    isPlaying
  } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..."/>;

  if (error) return <Error/>;

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({
      song,
      data,
      i
    }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0]}
      />
      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePlayClick={handlePlayClick}
        handlePause={handlePause}
      />
    </div>
  );
};

export default ArtistDetails;