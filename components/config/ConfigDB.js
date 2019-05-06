import Firebase from 'firebase';  
let config = {  
  apiKey: "AIzaSyCpfkKsVvWW-tUvdjWfaQTxLE2HFP03hgo",
  authDomain: "chat-1995.firebaseapp.com",
  databaseURL: "https://chat-1995.firebaseio.com",
  projectId: "chat-1995",
  storageBucket: "chat-1995.appspot.com",
  messagingSenderId: "1098260536313"
//   appId: "1:1098260536313:web:9233b6ef04adff9a"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  