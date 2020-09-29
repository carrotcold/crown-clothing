import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  // config...
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
