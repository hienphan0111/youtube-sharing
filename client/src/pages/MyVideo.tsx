import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { userSelector } from '../store/userSlice';
import { videoSharedSelector } from '../store/videoSharedSlice';
import { Modal, VideoCard } from '../components';

type Props = {}

const MyVideo = (props: Props) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(userSelector);
  const { videoShared } = useAppSelector(videoSharedSelector);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const userVideoShared = videoShared.filter((video) => video.user === userInfo?._id);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [])

  return (
    <div className='mt-10'>
      <div className='mb-5 flex justify-end'>
        <button onClick={() => setOpenModal(true)}  className='bg-sky-700 px-3 py-2 rounded-lg'>
          Add new video
        </button>
        {
          openModal ? (
            <Modal setOpenModal={setOpenModal} />
          ) : null
        }
      </div>
      <hr className="border-zinc-700" />
      {
        userVideoShared.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      }
    </div>
  )
}

export default MyVideo;