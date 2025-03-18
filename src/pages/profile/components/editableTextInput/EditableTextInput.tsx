import { useEffect } from 'react';
import { Input } from '../../../../components/input/input';
import { get, getDatabase, ref } from 'firebase/database';
import { userAuth } from '../../../../../firebase';
import { useDispatch } from 'react-redux';
import { ProfileState, updateUserProfile } from '../../../login/slices/loginSlices';

export const EditableTextInput = ({
  editPRofile,
  onCancelEdit,
  saveChanges,
  oldStade,
  updateData,
  onChangeName,
  onChangeEmail,
  onChangePhone,
  onBlur
}: {
  editPRofile: boolean;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  loginMethod: string;
  onCancelEdit: () => void;
  saveChanges: () => void;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePhone: (value: string) => void;
  updateData: ProfileState;
  oldStade: ProfileState;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const db = getDatabase();
    const userId = userAuth.currentUser?.uid;
    const userRef = ref(db, `/users/${userId}`);

    get(userRef).then((snapshot) => {
      const userData = snapshot.val();
      dispatch(updateUserProfile({ phoneNumber: userData.telefone }));
    });
  }, [dispatch]);

  return (
    <div className='text-white h-full gap-2 items-center flex flex-col w-full  space-y-3 py-2'>
      <Input
        onChange={(e) => onChangeName(e.target.value)}
        readOnly={!editPRofile}
        value={
          updateData.displayName === ''
            ? !editPRofile
              ? oldStade.displayName
              : ''
            : updateData.displayName
        }
        type='text'
        label='nome:'
      />
      <div
        className={` ${
          editPRofile ? '' : 'hidden'
        } space-y-3 h-full flex flex-col w-full justify-between `}
      >
        <div className={` ${editPRofile ? '' : 'hidden'} space-y-3 h-full w-full `}>
          <Input
            onBlur={onBlur}
            onChange={(e) => onChangeEmail(e.target.value)}
            readOnly={!editPRofile}
            value={
              updateData.email === '' ? (!editPRofile ? oldStade.email : '') : updateData.email
            }
            type='text'
            label='email:'
          />
          <Input
            label='fone:'
            phoneInput
            onPhoneChange={(value) => onChangePhone(value)}
            phoneValue={oldStade.phoneNumber}
          />
        </div>
        <div>
          <div className='flex flex-col py-4 gap-6 h-full text-sm'>
            <button
              onClick={saveChanges}
              className='bg-emerald-700 text-white  p-1 rounded-md font-bold'
            >
              Salvar
            </button>
            <button onClick={onCancelEdit} className=' underline text-white p-1 rounded-md'>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
