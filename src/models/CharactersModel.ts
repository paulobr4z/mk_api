import { Schema, model } from "mongoose"

const Character = new Schema({
  name: { type: String },
  real_name: { type: String },
  bio: { type: String },
  introduced: { type: String },
  gender: { type: String },
  origin: { type: String },
  species: [{ type: String }],
  weapons: [{ type: String }],
  fighting_styles: [{ type: String }],
  image: { type: String },
  fatalities: [{ type: String }],
  games: [{ type: String }],
  created_at: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export default model("Character", Character)