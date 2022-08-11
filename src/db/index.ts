import mongoose, { Connection } from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/ar-translator-db';

const db = {
  connect: async function (): Promise<Connection | void> {
    try {
      const instance = await mongoose.connect(uri);
      if (instance) {
        console.log(`db connection successful!`);
        return instance.connection;
      }
      throw new Error('could not connect to db');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return this.disconnect();
    }
  },

  disconnect: async function (): Promise<void> {
    try {
      return await mongoose.disconnect();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log(`all db connections disconnected`);
    }
  },
};

export default db;
