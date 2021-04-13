module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'workCategories'
      },
      name: String,
      unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'units'
      },
      price: Number,
      conversionUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'units'
      },
      conversionRate: Number,
      salary: Number
    },
    { timestamps: true }
  );

  const Works = mongoose.model("works", schema);
  return Works;
};
