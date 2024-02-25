
//masse funksjoner fra copilot <3 som kan være nyttige
//bud 

const placeBid = async (auctionItemID, userId, bidAmount) => {
    const auctionItemRef = firestore.collection('auctionItems').doc(auctionItemID); //ref til auksjonsobjektet
    const newBidRef = firestore.collection('bids').doc(); //ref til nytt bud
  
    // Transaksjon --> oppdatere auksjonsobjektet og legge til nytt bud
    await firestore.runTransaction(async (transaction) => {
        // Status auksjonsobjekt
      const auctionItemDoc = await transaction.get(auctionItemRef);
      if (!auctionItemDoc.exists) {
        throw "Auksjonsobjektet eksisterer ikke!";
      }
      // Sjekk om budet er høyere enn gjeldende bud
      const currentBid = auctionItemDoc.data().currentBid || 0;
      if (bidAmount > currentBid) {
        transaction.update(auctionItemRef, { currentBid: bidAmount, bidderID: userId });
        transaction.set(newBidRef, {
          auctionItemID: auctionItemID,
          bidderID: userId,
          bidAmount: bidAmount,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        throw "Budet må være høyere enn gjeldende bud!";
      }
    });
  };


  //live display siste bud
  const onBidUpdate = (auctionItemID, callback) => {
    const auctionItemRef = firestore.collection('auctionItems').doc(auctionItemID);
  
    auctionItemRef.onSnapshot((doc) => {
      if (doc.exists) {
        callback(doc.data());
      }
    });
  };
  

  //favorite objekt❤️

  const addFavorite = async (userId, auctionItemID) => {
    const userRef = firestore.collection('users').doc(userId);
  
    await userRef.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(auctionItemID)
    });
  };

  //display favoritter
  const getFavorites = async (userId) => {
    const userDoc = await firestore.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw "Brukeren eksisterer ikke!";
    }
  
    const favoriteIds = userDoc.data().favorites || [];
    return Promise.all(favoriteIds.map(id => firestore.collection('auctionItems').doc(id).get()));
  };

    //remove favorite
    const removeFavorite = async (userId, auctionItemID) => {
        const userRef = firestore.collection('users').doc(userId);
      
        await userRef.update({
          favorites: firebase.firestore.FieldValue.arrayRemove(auctionItemID)
        });
      };

      //get user
      const getUser = async (userId) => {
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (!userDoc.exists) {
          throw "Brukeren eksisterer ikke!";
        }
        return userDoc.data();
      };
      
      //get auction items
      const getAuctionItems = async () => {
        const auctionItemsCollection = await firestore.collection('auctionItems').get();
        return auctionItemsCollection.docs.map(doc => doc.data());
      };
      
      //get auction item
      const getAuctionItem = async (auctionItemID) => {
        const auctionItemDoc = await firestore.collection('auctionItems').doc(auctionItemID).get();
        if (!auctionItemDoc.exists) {
          throw "Auksjonsobjektet eksisterer ikke!";
        }
        return auctionItemDoc.data();
      };
      
      //get bids
      const getBids = async (auctionItemID) => {
        const bidsCollection = await firestore.collection('bids').where('auctionItemID', '==', auctionItemID).get();
        return bidsCollection.docs.map(doc => doc.data());
      };
      
      //get user bids
      const getUserBids = async (userId) => {
        const bidsCollection = await firestore.collection('bids').where('bidderID', '==', userId).get();
        return bidsCollection.docs.map(doc => doc.data());
      };
      
      //get user favorites
      const getUserFavorites = async (userId) => {
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (!userDoc.exists) {
          throw "Brukeren eksisterer ikke!";
        }
      
        const favoriteIds = userDoc.data().favorites || [];
        return Promise.all(favoriteIds.map(id => firestore.collection('auctionItems').doc(id).get()));
      };
      

      /*CREATE*/ 

      //create auction item
      const createAuctionItem = async (auctionItem) => {
        const auctionItemRef = firestore.collection('auctionItems').doc();
        await auctionItemRef.set(auctionItem);
        return auctionItemRef.id;
        }

        //create user
        const createUser = async (user) => {
            const userRef = firestore.collection('users').doc(user.id);
            await userRef.set(user);
          };
          
          //create bid
          const createBid = async (bid) => {
            const bidRef = firestore.collection('bids').doc();
            await bidRef.set(bid);
          };
          
          //update auction item
          const updateAuctionItem = async (auctionItemID, auctionItem) => {
            const auctionItemRef = firestore.collection('auctionItems').doc(auctionItemID);
            await auctionItemRef.update(auctionItem);
          };
          
          //update user
          const updateUser = async (userId, user) => {
            const userRef = firestore.collection('users').doc(userId);
            await userRef.update(user);
          };
          
          //delete auction item
          const deleteAuctionItem = async (auctionItemID) => {
            const auctionItemRef = firestore.collection('auctionItems').doc(auctionItemID);
            await auctionItemRef.delete();
          };
          
          //delete user
          const deleteUser = async (userId) => {
            const userRef = firestore.collection('users').doc(userId);
            await userRef.delete();
          };
          
          //delete bid
          const deleteBid = async (bidID) => {
            const bidRef = firestore.collection('bids').doc(bidID);
            await bidRef.delete();
          };
          
          //delete all bids for auction item
          const deleteAllBidsForAuctionItem = async (auctionItemID) => {
            const bidsCollection = await firestore.collection('bids').where('auctionItemID', '==', auctionItemID).get();
            bidsCollection.docs.forEach(doc => doc.ref.delete());
          };
          
          //delete all favorites for user
          const deleteAllFavoritesForUser = async (userId) => {
            const userRef = firestore.collection('users').doc(userId);
            await userRef.update({ favorites: [] });
          };
          
          //delete all bids for user
          const deleteAllBidsForUser = async (userId) => {
            const bidsCollection = await firestore.collection('bids').where('bidderID', '==', userId).get();
            bidsCollection.docs.forEach(doc => doc.ref.delete());
          };
          
          //delete all auction items
          const deleteAllAuctionItems = async () => {
            const auctionItemsCollection = await firestore.collection('auctionItems').get();
            auctionItemsCollection.docs.forEach(doc => doc.ref.delete());
            };

            export {
                placeBid,
                onBidUpdate,
                addFavorite,
                getFavorites,
                removeFavorite,
                getUser,
                getAuctionItems,
                getAuctionItem,
                getBids,
                getUserBids,
                getUserFavorites,
                createAuctionItem,
                createUser,
                createBid,
                updateAuctionItem,
                updateUser,
                deleteAuctionItem,
                deleteUser,
                deleteBid,
                deleteAllBidsForAuctionItem,
                deleteAllFavoritesForUser,
                deleteAllBidsForUser,
                deleteAllAuctionItems
              };

    //email verification
    const sendVerificationEmail = () => {
      const user = auth.currentUser;
      return user.sendEmailVerification();
    };
    //user session
    const onAuthStateChanged = (callback) => {
      return auth.onAuthStateChanged(callback);
    };

    //display name of logged in user
    const getDisplayName = () => {
      const user = auth.currentUser;
      return user.displayName;
    };

    //check password when creating user
    const checkPassword = (password) => {
      return password.length >= 6;
    };

    //write password twice when creating user
    const passwordsMatch = (password, passwordRepeat) => {
      return password === passwordRepeat;
    };
    
    


    document.addEventListener('DOMContentLoaded', function() {
      firebase.auth().onAuthStateChanged(function(user) {
          const minBruker = document.querySelector('.minBruker-knapp');
          const tabContents = document.querySelectorAll('.tab__content'); 
          //setUpTabs();
  
          if (user) {
            minBruker.style.display = 'block';
            document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
              e.preventDefault();
              document.querySelector('.hamburger-menu').style.width = '250px';
            });
            setUpTabs();
            document.querySelector('.loginmessage-content').style.display = 'none';
        } else {
          minBruker.style.display = 'none';
          document.querySelectorAll('.tab__content').forEach(function(content) {
            if (content.id !== 'tab__content--4'){
              content.style.display = 'none';
              //document.getElementById('login-message').style.display = 'block';
          
              if (document.querySelector('.active').id !== 'tab__title--4') {
                document.getElementById('login-message').style.display = 'block';
              } 
        }
      });
     }
    });
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
      const minBruker = document.querySelector('.minBruker-knapp');
      //const tabContents = document.querySelectorAll('.tab__content'); 

      if (user) {
        minBruker.style.display = 'block';
        document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector('.hamburger-menu').style.width = '250px';
        });
        setUpTabs();
        //document.querySelector('.loginmessage-content').style.display = 'none';
      } else {
        minBruker.style.display = 'none';
        document.querySelectorAll('.tab__content').forEach(function(content) {
          content.style.display = 'none';
        });
        // Show tab 4 content by default if no user is logged in
        //document.getElementById('tab__content--4').style.display = 'block';
      }
    });
  });