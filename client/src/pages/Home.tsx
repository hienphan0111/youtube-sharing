import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchVideoShared, videoSharedSelector } from '../store/videoSharedSlice';
import { VideoCard } from '../components';

const Home: React.FC = () => {

  const dispatch = useAppDispatch();

  const { videoShared, isLoading } = useAppSelector(videoSharedSelector);

  useEffect(() => {
    void dispatch(fetchVideoShared());
  }, []);

  return (
    <div>
      <h1 className='text-red-400 text-left font-bold text-2xl mt-3'>Discover</h1>
      <div className='flex flex-wrap gap-8 mt-5 justify-center'>
        {
          isLoading ? (
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
