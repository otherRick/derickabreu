import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { userAuth } from '../../../firebase';

export const OAuthGoogle = () => {
  const onClick = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(userAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);

        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <button onClick={onClick} className=' px-4 py-2 rounded-full gap-2 flex items-center'>
        <p> Login com o Google</p>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png'
          alt='Google'
          className='w-6 h-6 mr-2'
        />
      </button>
    </div>
  );
};
