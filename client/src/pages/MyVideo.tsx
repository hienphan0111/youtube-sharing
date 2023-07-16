import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userSelector } from '../store/userSlice';
import { videoSharedSelector, fetchVideoShared } from '../store/videoSharedSlice';
import { Modal, VideoCard } from '../components';

type Props = {}

const MyVideo = (props: Props) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(userSelector);
  const { videoShared, newVideoShared } = useAppSelector(videoSharedSelector);
  const navigate = useNavigate();

  console.log(newVideoShared)
  const [openModal, setOpenModal] = useState(false);

  const userVideoShared = videoShared.filter((video) => video.user === userInfo?._id);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    dispatch(fetchVideoShared());
  }, [])

  return (
    <div className='mt-10 w-full flex flex-col'>
      <div className='mb-5 flex flex-wrap gap-8 justify-end'>
        <button onClick={() => setOpenModal(true)}  className='mb-3 bg-sky-700 px-3 py-2 rounded-lg'>
          Share new video
        </button>
        {
          openModal ? (
            <Modal setOpenModal={setOpenModal} />
          ) : null
        }
      </div>
      <hr className="border-zinc-700" />
      <div className='flex flex-wrap justify-center w-full gap-8'>
        {
          userVideoShared.map((video) => (
            <div key={video._id}>
              <VideoCard video={video} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyVideo;