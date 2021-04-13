module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'materialCategories'
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
      conversionRate: Number
    },
    { timestamps: true }
  );

  const Materials = mongoose.model("materials", schema);
  return Materials;
};
