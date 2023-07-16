import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { useAppSelector } from '../store/hooks';
import { videoSharedSelector } from '../store/videoSharedSlice';

const PlayerVideo = () => {
  const { id } = useParams();

  const { videoShared } = useAppSelector(videoSharedSelector);
  const video = videoShared.find((video) => video._id === id);

  return (
    <div className='mt-5 w-full h-full max-w-[768px] min-h-[480px] flex justify-center'>
      <ReactPlayer url={video?.url} width="100%" />
    </div>
  )
}

export default PlayerVideo;
