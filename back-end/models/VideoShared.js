import mongoose from 'mongoose';

const videoSharedSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

const VideoShared = mongoose.model('VideoShared', videoSharedSchema);

export default VideoShared;
