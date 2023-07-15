import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVideoShared, videoSharedSelector, VideoShared } from '../store/videoSharedSlice';
import { VideoCard } from '../components';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [videoShared, setVideoShared] = useState<Array<VideoShared>>([]);

  const selectVideoShared = useAppSelector(videoSharedSelector);

  useEffect(() => {
    dispatch(getVideoShared());
    setVideoShared(selectVideoShared.videoShared);
  }, [dispatch]);

  return (
    <div>
      <h1 className='text-red-400'>Discover</h1>
      <div className='flex flex-wrap'>
        {
          selectVideoShared.isLoading ? (
            <div>Loading...</div>
          ) : (
            videoShared.map((video) => (
              <div key={video._id}>
                <VideoCard video={video} />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default Home;
