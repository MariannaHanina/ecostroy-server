module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      sale: Number,
      descriptionForSite: String,
      imagesForSite: [String],
      videoForSite: String,
      descriptionForAdmin: String,
      imagesForAdmin: [String],
      works: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'works'
      }]
    },
    { timestamps: true }
  );

  const Sets = mongoose.model("sets", schema);
  return Sets;
};
