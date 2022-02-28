const { DateTime } = require("luxon");

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  return "/catalog/bookinstance/" + this._id;
});

// Virtual for bookinstance's due back date
BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Virtual for bookinstance's due back date formatted to 'YYYY-MM-DD'
BookInstanceSchema.virtual("due_back_formatted_YYYY_MM_DD").get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate();
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
