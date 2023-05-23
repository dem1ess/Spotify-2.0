import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePlayClick,
  handlePause,
  artistId
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs: </h1>

    <div className="mt-6 w-full flx flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePlayClick={handlePlayClick}
          handlePause={handlePause}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
