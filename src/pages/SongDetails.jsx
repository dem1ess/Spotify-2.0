import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const {
    songid,
    id: artistId
  } = useParams();
  const {
    activeSong,
    isPlaying
  } = useSelector((state) => state.player);
  console.log(songid);
  const {
    data: songData,
    isFetching: isFetchingSongDetails
  } = useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title="Seraching song detail"/>;
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
      <DetailsHeader artistId={artistId} songData={songData}/>
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ?
            songData?.sections[1].text.map((Line) => (<p className="text-gray-400 text-base my-1">{Line}</p>)) :
            <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>}
        </div>
      </div>
      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePlayClick={handlePlayClick}
                    handlePause={handlePause}/>
    </div>
  );
};

export default SongDetails;
