import express from 'express';
import VideoShared from '../models/VideoShared.js';
import asyncHandler from 'express-async-handler';
import protectRoute from '../ultils/authenticate.js';

const videoSharedRoutes = express.Router();

// Get all videos shared

const getAllVideosShared = asyncHandler(async (req, res) => {
  const videosShared = await VideoShared.find({});

  res.json(videosShared);
})

// Get all video belonging to a user

const getAllVideosSharedByUser = asyncHandler( async (req, res) => {
  const videosShared = await VideoShared.find({ user: req.user._id });

  res.json(videosShared);
})

// Create new video shared

const createVideoShared = asyncHandler( async (req, res) => {
  const { title, description, url } = req.body;

  const videoShared = new VideoShared({
    user: req.user._id,
    title,
    description,
    url,
  })

  const videoSave = await videoShared.save();

  if (videoSave) {
    res.status(201).json({
      ...videoSave._doc,
    })
  }
});

// Delete a video shared

const deleteVideoShared = asyncHandler( async (req, res) => {
  const videoShared = await VideoShared.findByIdAndDelete(req.params.id);

  if (videoShared) {
    res.json({ message: 'Video shared has been removed' });
  } else {
    res.status(404).json({ message: 'Video shared not found' });
    throw new Error('Video shared not found');
  }
});

// Add route 

videoSharedRoutes.route('/').get(getAllVideosShared);
videoSharedRoutes.route('/myvideos').get(protectRoute, getAllVideosSharedByUser);
videoSharedRoutes.route('/create').post(protectRoute, createVideoShared);
videoSharedRoutes.route('/:id').delete(protectRoute, deleteVideoShared);

export default videoSharedRoutes;
