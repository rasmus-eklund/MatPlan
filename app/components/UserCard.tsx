import { DefaultSession } from 'next-auth';
import Image from 'next/image';

const UserCard = ({ user }: { user: DefaultSession['user'] }) => {
  return (
      <div>
        {user && user.image && (
          <Image
            className="w-10 h-10 rounded-full overflow-hidden text-end"
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
