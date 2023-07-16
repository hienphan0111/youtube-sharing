import ReactPlayer from "react-player";
import { VideoShared } from "../store/videoSharedSlice";
import { FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";

const VideoCard = ({ video }: { video: VideoShared }) => {
  const { title, url, username } = video;

  return (
    <div className="shadow-xl border-xl rounded-xl bg-slate-700 max-w-lg mt-10">
      <div className="card-image">
        <ReactPlayer url={url} width="100%" height="100%" style={{ borderRadius: '10px'}} />
      </div>
      <div className="relative mt-5 pb-5 px-4">
        <div className='w-10 h-10 rounded-full flex gap-2 items-center justify-center border absolute right-4 -top-10 bg-slate-900'>
          <FaUser />
        </div>
        <p className="text-sm text-slate-400 text-left pb-2">{username}</p>
        <Link to={`/player/${video._id}`} className='text-left text-slate-400 hover:text-yellow-600'>
          <h2 className="text-left">{title}</h2>
        </Link>
      </div>
    </div>
  );
}

export default VideoCard;
