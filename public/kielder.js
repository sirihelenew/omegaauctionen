// Funksjon for å håndtere salg av en bong
function sellBong() {
    const bongPrice = 200; // fast pris for en bong
    const db = firebase.firestore();
    const totalRef = db.collection('vandrebar').doc('vandrebarInntekt');
  
    db.runTransaction(transaction => {
      return transaction.get(totalRef).then(doc => {
        // Sjekker om dokumentet eksisterer og har en totalSum verdi
        const newTotal = (doc.data()?.totalSum || 0) + bongPrice;
        transaction.set(totalRef, { totalSum: newTotal });
      });
    }).then(() => {
      console.log("Totalen har blitt oppdatert med en bong.");
    }).catch(error => {
      console.error("Feil ved oppdatering av totalen: ", error);
    });
  }
  
  // Event listener for knappen som selger en bong
  document.getElementById('sellBongBtn').addEventListener('click', sellBong);
  