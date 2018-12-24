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

  createPost = (postData, storeId, oldPromoId) => {
    const dbRef = this.database.ref()
    const postId = dbRef.child("posts").push().key
    var temp = {}
    temp[postId] = true
    const { posterId, title } = postData

    var updates = {};

    console.log("-----------")
    console.log(oldPromoId)

    // add new promotion
    let promoId = null
    if(!oldPromoId){
      console.log("Create New Promo")
      promoId = dbRef.child("promos").push().key
      const promoData = {
        detail: {
          storeId: storeId,
          title: title,
          verified: false
        },
        promoPosts: temp
      }
      updates['/promos/' + promoId] = promoData;
    }
    else{
      console.log("Added Promo Selected")
      promoId = oldPromoId
      updates['/promos/' + promoId + '/promoPosts/' + postId] = true;
    }
    
    updates['/posts/' + postId] = postData;
    updates['/users/' + posterId + '/postCreated/' + postId] = true;
    
    updates['/stores/' + storeId + '/storePromos/' + promoId] = true;

    return dbRef.update(updates);
  }

  getPromosFromStore = (storeId, handlePromos) => {
    const dbRef = this.database.ref()
    console.log(storeId)
    const storePromosRef = dbRef.child("stores").child(storeId).child("storePromos")
    return storePromosRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        var promoArray = Object.keys(snapshot.val());
        handlePromos(promoArray)
      }
    });
  }

  readStore = (storeId) => {
    return this.database.ref(`/stores/${storeId}`).once('value')
  }
  getPromoFromId = (promoId, handlePromo) => {
    const dbRef = this.database.ref()
    const promoDetailRef = dbRef.child("promos").child(promoId).child("detail")
    return promoDetailRef.on('value', (snapshot) => {
      var promoDetail = snapshot.val()
      console.log(promoDetail)
      handlePromo(promoDetail)
    });
  }

  readStores = () => {
    return this.database.ref(`/stores`).once('value')
  }

  readStoresFromLocations = () => {
    return this.database.ref('/locations').once('value')
  }

  getStoreFromId = (storeId, handleStoreName) => {
    const dbRef = this.database.ref()
    const storeName = dbRef.child("stores").child(storeId)
    return storeName.on('value', (snapshot) => {
      handleStoreName(snapshot.val())
    });
  }

  getLocationFromId = (locationId, handleLocation) => {
    const dbRef = this.database.ref()
    const storePromosRef = dbRef.child("locations").child(locationId)
    return storePromosRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        handleLocation(snapshot.val())
      }
    });
  }



}

export default Firebase;