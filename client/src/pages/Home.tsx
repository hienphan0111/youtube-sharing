import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchVideoShared, videoSharedSelector, VideoShared } from '../store/videoSharedSlice';
import { VideoCard } from '../components';

const socket = io.connect('http://127.0.0.1:5000', { transports: ['websocket'] });

const Home: React.FC = () => {
  const [newVideoShared, setNewVideoShared] = useState<VideoShared | null>(null);

  useEffect(() => {
    socket.on('new-video-shared', (newVideoShared: VideoShared) => {
      setNewVideoShared(newVideoShared);
    });
  }, [socket]);

  const dispatch = useAppDispatch();
  const [videoShared, setVideoShared] = useState<Array<VideoShared>>([]);

  const selectVideoShared = useAppSelector(videoSharedSelector);

  useEffect(() => {
    dispatch(fetchVideoShared());
    setVideoShared(selectVideoShared.videoShared);
  }, [dispatch]);

  return (
    <div>
      <div>
        <p>{newVideoShared?.title}</p>
      </div>
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
