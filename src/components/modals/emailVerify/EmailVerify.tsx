import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { userAuth } from '../../../../firebase';

export const EmailVerify = () => {
  const handleVerify = () => {
    const password = '101010';
    const email = 'myf.finances@gmail.com';

    const user = createUserWithEmailAndPassword(userAuth, email, password); // Assuming successful account creation
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://portfoto-ac408.web.app',
      // This must be true.
      handleCodeInApp: true
    };
    sendEmailVerification(user, actionCodeSettings)
      .then(() => {
        // Email sent successfully. Inform the user to check their inbox.
        console.log('mandou');
      })
      .catch((error) => {
        // Handle errors, such as network issues or invalid email formats.
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleVerify} className='bg-red-300 p-4'>
        Verify
      </button>
    </div>
  );
};
