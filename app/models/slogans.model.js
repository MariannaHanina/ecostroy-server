module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      mainText: String,
      subText: String,
      buttonText: String
    },
    { timestamps: true }
  );

  const Slogans = mongoose.model("slogans", schema);
  return Slogans;
};
