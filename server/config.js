import dotenv from 'dotenv' 

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://developers:123Rr@clusterprinc.crxbi6b.mongodb.net/developers3x1?retryWrites=true&w=majority"
export const PORT = process.env.PORT || 5050
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || "developers3x1"
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 982138118491583
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "BIbOGuY9OdDwBybKVa1vOfnXdvM"