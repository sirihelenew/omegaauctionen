firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


auth.onAuthStateChanged((user) => {
    console.log(user)
    if (user) {
      console.log('User is logged in');
      loginButton.style.display = 'none';
  
      // Fetch the auctionItems collection
      db.collection('auctionItems').onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const auctionItem = doc.data();
          const buyers = auctionItem.buyers;
  
          // Check if the last buyer is the current user
          if (buyers.length > 0 && buyers[buyers.length - 1] === user.uid) {
            // Display the auction item under "My active bids"
            displayActiveBid(auctionItem);
          }
        });
      });
    } else {
      console.log('User is not logged in');
    }
  });
  
  function displayActiveBid(auctionItem) {
    // Create a new div element
    const div = document.createElement('div');

    // Set the content of the div
    div.textContent = `Item: ${auctionItem.name}, Current Price: ${auctionItem.currentPrice}`;

    // Append the div to the active bids container
    const activeBidsContainer = document.getElementById('activeBids');
    activeBidsContainer.appendChild(div);
}

