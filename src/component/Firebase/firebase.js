import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.database = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  writeUserData = (userId, name, email, imageUrl) => {
    return this.database.ref('users/' + userId + '/detail').set({
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  createPost = (postData, storeId) => {
    const dbRef = this.database.ref()
    const postId = dbRef.child("posts").push().key
    const { posterId, title } = postData

    // add new promotion
    const promoId = dbRef.child("promos").push().key
    const promoData = {
      detail: {
        storeId: storeId,
        title: title,
        verified: false
      },
      promoPosts: {
        postId: true
      }
    }

    var updates = {};
    updates['/posts/' + postId] = postData;
    updates['/users/' + posterId + '/postCreated/' + postId] = true;
    updates['/promos/' + promoId] = promoData;
    updates['/stores/' + storeId + '/storePromos/' + promoId] = true;

    return dbRef.update(updates);

  }

  readStore = (storeId) => {
    return this.database.ref(`/stores/${storeId}`).once('value')
  }

  readStores = () => {
    return this.database.ref(`/stores`).once('value')
  }

  readStoresFromLocations = () => {
    return this.database.ref('/locations').once('value')
  }

}

export default Firebase;