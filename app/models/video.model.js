module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      video: String,
      title: String,
      text: String
    },
    { timestamps: true }
  );

  const Video = mongoose.model("video", schema);
  return Video;
};
