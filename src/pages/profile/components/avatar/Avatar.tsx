import ImageUpload from '../../../../components/importInput/ImportInput';
import { ProfileState } from '../../../login/slices/loginSlices';

export const Avatar = ({
  oldState,
  editPRofile,
  showEditPhoto,
  onMouseEnter,
  onMouseLeave,
  setEditProfile
}: {
  oldState: ProfileState;
  showEditPhoto: boolean;
  editPRofile: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  setEditProfile: () => void;
}) => {
  return (
    <div className=' w-40 h-40 rounded-full items-end justify-start flex'>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${
          showEditPhoto && !editPRofile ? '' : 'hidden'
        } absolute w-fit border border-gray-700 p-1 rounded-md `}
      >
        <ImageUpload setEditProfile={setEditProfile} />
      </div>
      <img
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className='rounded-full w-40 h-40 '
        src={
          oldState.photoURL
            ? oldState.photoURL
            : 'https://firebasestorage.googleapis.com/v0/b/portfoto-ac408.appspot.com/o/profile-images%2Fempty.jpeg?alt=media&token=6f348818-785b-4847-9d49-9445e735a589'
        }
        alt='user'
      />
    </div>
  );
};
