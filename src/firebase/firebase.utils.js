import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // firestore.doc 은 해당 위치 데이터 유무와 무관하게 queryReference 를 반환
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // 그 레퍼런스로 스냅샷을 가져와서 데이터가 있다면 저장한다
  const snapShot = await userRef.get();

  // DocSnapshot 메소드 .exists 사용
  if (!snapShot.exists) {
    const { displayName, email, photoURL, phoneNumber } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        phoneNumber,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.warn('set 실패', error);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account ' });
// { prompt: 'select_account ' }
// 권한 부여 서버는 사용자에게 사용자 계정을 선택하라는 메시지를 표시합니다. 이를 통해 권한 부여 서버에 여러 계정을 가진 사용자는 현재 세션이있을 수있는 여러 계정 중에서 선택할 수 있습니다.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
