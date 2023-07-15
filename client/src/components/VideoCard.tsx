import { VideoShared } from "../store/videoSharedSlice";

const VideoCard = ({ video }: { video: VideoShared }) => {
  const { title, url } = video;

  return (
    <div className="shadow-2xl border-xl">
      <div className="card-image">
        <video src={url} />
      </div>
      <div className="card-content">
        <p className="title is-4">{title}</p>
      </div>
    </div>
  );
}

export default VideoCard;
