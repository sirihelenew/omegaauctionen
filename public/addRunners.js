// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDC_yGwhnlgbRTLdvvSJkNi-FGFZgzUKuk",
//   authDomain: "omegaauctionen.firebaseapp.com",
//   databaseURL: "https://omegaauctionen-default-rtdb.firebaseio.com",
//   projectId: "omegaauctionen",
//   storageBucket: "omegaauctionen.appspot.com",
//   messagingSenderId: "612432199946",
//   appId: "1:612432199946:web:8475ac11c820c11d5c3af3",
//   measurementId: "G-NLP4T6TXHL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);




var runnersData = [
  { name: 'Torodd Solberg', info: 'Komité: Fadderstyret', fornavn: 'Torodd' },
  { name: 'Elias Bostrøm', info: 'Komité: Sport & Spill', fornavn: 'Elias' },
  { name: 'Gustav Smidtsrød', info: 'Komité: Kielder', fornavn: 'Gustav' },
  { name: 'Vebjørn Weldingh Nilsen', info: 'Komité: DGR', fornavn: 'Vebjørn' },
  { name: 'Kasper Langland', info: 'Komité: Contactor', fornavn: 'Kasper' },
  { name: 'Edvard Dingsør', info: 'Komité: Soscom', fornavn: 'Edvard' },
  { name: 'Einar Augestad', info: 'Komité: Lophtcom', fornavn: 'Einar' },
  { name: 'Andreas Nysæter', info: 'Komité: Loccom', fornavn: 'Andreas' },
  { name: 'Nils Martin Ørstad Rognmo', info: 'Komité: Blaestcom', fornavn: 'Nils' },
  { name: 'Theodor Kvalsvik Lauritzen', info: 'Komité: Vevcom', fornavn: 'Theodor' },
  { name: 'Magnus Aubell ', info: 'Komité: Heuttecom', fornavn: 'Magnus' },
  { name: 'Øystein Martinsen', info: 'Komité: Brygcom', fornavn: 'Øystein' },
  { name: 'Simen Bedringås', info: 'Komité: Ombul', fornavn: 'Simen' },
  { name: 'Atle Sund', info: 'Komité: Phaestcom', fornavn: 'Atle' },
  { name: 'Sondre Aarli', info: 'Komité: HS', fornavn: 'Sondre' },
  { name: 'Guro Brekke', info: 'Komité: Lophtcom', fornavn: 'Guro' },
  { name: 'Fride Fossheim', info: 'Komité: Blaestcom', fornavn: 'Fride' },
  { name: 'Ingrid Kristine Bøe', info: 'Komité: DGR', fornavn: 'Ingrid' },
  { name: 'Eva Holm Skillingstad', info: 'Komité: Heuttecom', fornavn: 'Eva' },
  { name: 'Adina Traa Utkilen', info: 'Komité: Sport & Spill', fornavn: 'Adina' },
  { name: 'Natalie Staurland', info: 'Komité: Loccom', fornavn: 'Natalie' },
  { name: 'Lisa Paulsen', info: 'Komité: Kielder', fornavn: 'Lisa' },
  { name: 'Sigrid Romsaas', info: 'Komité: Contactor', fornavn: 'Sigrid' },
  { name: 'Tora Bøckman', info: 'Komité: Phinanscom', fornavn: 'Tora' },
  { name: 'Vilde Tenfjord', info: 'Komité: Brygcom', fornavn: 'Vilde' },
  { name: 'Serafina Mertzani', info: 'Komité: Phaestcom', fornavn: 'Serfina' },
  { name: 'Tilde Veie', info: 'Komité: Ombul', fornavn: 'Tilde' },
  { name: 'Tuva Ludvigsen', info: 'Komité: Soscom', fornavn: 'Tuva' },
  { name: 'Mika Victoria Vahedi', info: 'Komité: Vevcom', fornavn: 'Mika' },
  { name: 'Lovise Ramsli', info: 'Komité: HS', fornavn: 'Lovise' },
  { name: 'Mina Bratterup Hansen', info: 'Komité: Fadderstyret', fornavn: 'Mina' },
];

function addRunnersToFirestore(runnersData) {
  const db = firebase.firestore();;
  const runnersCollection = db.collection('runners');

  runnersData.forEach(runner => {
    runnersCollection.add({ // This will auto-generate an ID for each runner
      navn: runner.name,
      komite: runner.info.split(': ')[1], // Assuming the info is in the format "Komité: <KomiteName>"
      fornavn: runner.fornavn
    })
    .then((docRef) => {
      console.log(`Runner ${runner.name} added successfully with ID: ${docRef.id}`);
    })
    .catch(error => {
      console.error("Error adding runner: ", error);
    });
  });
}


