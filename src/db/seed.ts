import db from '.';
import User from './models';

const data = [
  {
    username: 'spongebob',
    password: 'imreadyimready',
    email: 'spongebob@squarepants.com',
  },
  {
    username: 'patrick',
    password: 'weewooweewoo',
    email: 'patrick@star.com',
  },
  {
    username: 'squidward',
    password: 'everybodysacritic',
    email: 'squidward@tentacles.com',
  },
];

const addData = async (): Promise<void> => {
  try {
    await User.create(data);
  } catch (error) {
    console.error(error);
  }
};

const seed = async (): Promise<void> => {
  try {
    const connection = await db.connect();
    if (connection) {
      await connection.dropDatabase();
      await addData();
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
