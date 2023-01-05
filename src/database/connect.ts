import mongoose, { connect } from 'mongoose'

mongoose.set('strictQuery', true);

const connectionpOptions = {
  dbName: `mk`,
}

export const connectDatabase = async () => {
  try {
    await connect(`${process.env.DATABASE_URL_ATLAS}`, connectionpOptions);
    console.log("connected database!")
  } catch (error) {
    console.log("connection error:",  error);    
  }  
}