import { model, Schema } from "mongoose";

interface IUrl {
  longURL: string;
  shortURL: string;
  shortUrlId: string;
  userId: string;
  visits: string;
}

const UserSchema = new Schema({
  longURL: {
    type: String,
    required: true
  },
  shortURL: {
    type: String,
    required: true,
  },
  shortUrlId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: false,
    default: ''
  },
  visits: {
    type: Number,
    required: false,
    default: 0
  }
})

const Url = model<IUrl>("urls", UserSchema);

export { Url }
