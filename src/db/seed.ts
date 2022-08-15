import db from '.';
import { User } from './models';

const data = [
  {
    profile: {
      username: 'spongebob',
      email: 'spongebob@squarepants.com',
    },
    credentials: {
      password: 'imreadyimreadyA1!',
    },
  },
  {
    profile: {
      username: 'patrick',
      email: 'patrick@star.com',
    },
    credentials: {
      password: 'weewooweewooA1!',
    },
  },
  {
    profile: {
      username: 'squidward',
      email: 'squidward@tentacles.com',
    },
    credentials: {
      password: 'everybodysacriticA1!',
    },
  },
];

const seed = async (): Promise<void> => {
  try {
    const connection = await db.connect();
    if (connection) {
      console.log('dropping database and seeding...');
      await connection.dropDatabase();
      await User.create(data);
    }
    console.log('db seeded successfully! :)');
  } catch (error) {
    console.log('error seeding database! :(');
    console.error(error);
  } finally {
    await db.disconnect();
  }
};

seed();
