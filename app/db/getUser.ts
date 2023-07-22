import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';

const getUser = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.email) {
    throw new Error('No user');
  }
  return session.user.email;
};

export default getUser;
