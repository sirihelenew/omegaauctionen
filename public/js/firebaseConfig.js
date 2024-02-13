import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


    const firebaseConfig = {
        apiKey: "AIzaSyBQdYPW-nMzPxGbCKtJ9mRNYLpv9uDcY_k",
        authDomain: "testproject-43fdd.firebaseapp.com",
        databaseURL: "https://testproject-43fdd-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "testproject-43fdd",
        storageBucket: "testproject-43fdd.appspot.com",
        messagingSenderId: "1059098419352",
        appId: "1:1059098419352:web:e7d25fdb8e54da1a45b0ed",
        measurementId: "G-WH8X3H8YHZ"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Initialize Firestore Database
        const db = getFirestore(app);
        
        export { db };
    