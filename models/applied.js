import mongoose from "mongoose";

const AppliedJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const AppliedJob = mongoose.model('AppliedJob', AppliedJobSchema);
export default AppliedJob
