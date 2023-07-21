import { DefaultSession } from 'next-auth';
import Image from 'next/image';

const UserCard = ({ user }: { user: DefaultSession['user'] }) => {
  return (
      <div>
        <h5>{user?.name}</h5>
        {user && user.image && (
          <Image
            className="w-20 h-20 rounded-full overflow-hidden text-end"
            src={user.image}
            alt="user image"
            width={96}
            height={96}
          />
        )}
      </div>
  );
};

export default UserCard;
