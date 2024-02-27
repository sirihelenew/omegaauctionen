
function redirectToAuctionItems() {
  window.location.href = "../templates/auctionitems.html";
}


firebase.initializeApp(firebaseConfig);



const auth = firebase.auth();
const loginButton = document.querySelector('.header-button');
const db = firebase.firestore();


// auth.onAuthStateChanged((user) => {
//   console.log(user)
//   if (user) {
//     console.log('User is logged in');
//     loginButton.style.display = 'none';

//     db.collection('auctionItems').onSnapshot((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         const auctionItem = doc.data();
//         const buyers = auctionItem.buyers;

//         // Check if the current user's ID is in the buyers array
//         if (Array.isArray(buyers) && buyers.includes(user.uid)) {
//           // The current user is a buyer for this auction item
//           console.log(`User ${user.uid} is a buyer for auction item ${doc.id}`);
//         }

//         if (Array.isArray(buyers) && buyers.length > 0 && buyers[buyers.length - 1] === user.uid) {
//           // Display the auction item under "My active bids"
//           displayActiveBid(auctionItem);
//         }

//         if (Array.isArray(buyers)) {
//           console.log(buyers.length);
//         }

//         // Check if the last buyer is the current user
//         if (buyers.length > 0 && buyers[buyers.length - 1] === user.uid) {
//           // Display the auction item under "My active bids"
//           displayActiveBid(auctionItem);
//         }
//       });
//     });
//   } else {
//     console.log('User is not logged in');
//   }
// });

// Declare the activeBidsContainer variable outside of the auth.onAuthStateChanged function
const activeBidsContainer = document.getElementById('activeBids');

auth.onAuthStateChanged((user) => {
  console.log(user);
  if (user) {
    console.log('User is logged in');
    loginButton.style.display = 'none';

    db.collection('auctionItems').onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const auctionItem = doc.data();
        const highestBidder = auctionItem.highestBidder;

        // Check if the current user's ID is equal to the highestBidder string
        if (highestBidder === user.uid) {
          // Display the auction item under "My active bids"
          displayActiveBid(auctionItem);
        }
      });
    });
  } else {
    console.log('User is not logged in');
  }
});

// function displayActiveBid(auctionItem) {
//   // Create a new div element
//   const div = document.createElement('div');

//   // Set the content of the div
//   div.textContent = `Objekt: ${auctionItem.itemName}, Sum: ${auctionItem.currentPrice}`;

//   // Append the div to the active bids container
//   const activeBidsContainer = document.getElementById('activeBids');
//   activeBidsContainer.appendChild(div);
// }

function showContent(activeTabId, user) {
document.querySelectorAll('.tab__content').forEach(function(content) {
content.style.display = 'none';
});
//hvis bruker er logget inn, vis innhold
if (user) {
document.getElementById(activeTabId).style.display = 'block';
document.getElementById('login-message').style.display = 'none';
} else {
//ikke vis login-melding for tab4
if (activeTabId === 'tab__content--4') {
    document.getElementById('login-message').style.display = 'none';
    document.getElementById(activeTabId).style.display = 'block';
} else {
    //hvis bruker ikke er logget inn
    document.getElementById('login-message').style.display = 'block';
    document.getElementById(activeTabId).style.display = 'none';
}
//document.getElementById('login-message').style.display = 'block';
//document.getElementById(activeTabId).style.display = 'none';
}
}
/*midlertidig løsning for tab4*/
function showContent_Tab4(activeTabId) {
document.querySelectorAll('.tab__content').forEach(function(content) {
content.style.display = 'none';
});
document.getElementById('login-message').style.display = 'none';
var content = document.querySelector('.veldedighetsinformasjon');
if (content) {
content.style.display = 'none';
}
document.getElementById(activeTabId).style.display = 'block';
}

function clickTab(user){
document.querySelector('#tab1').addEventListener('click', function() {
showContent('tab__content--1', user);
});
document.querySelector('#tab2').addEventListener('click', function() {
showContent('tab__content--2', user);
});
document.querySelector('#tab3').addEventListener('click', function() {
showContent('tab__content--3', user);
});
document.querySelector('#tab4').addEventListener('click', function() {
showContent_Tab4('tab__content--4', user);
});
}


// document.addEventListener('DOMContentLoaded', function() {
//   firebase.auth().onAuthStateChanged(function(user) {
//     const minBruker = document.querySelector('.minBruker-knapp');
    
//   if (user) {
//     clickTab(user);
//     minBruker.style.display = 'block';

//     document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
//       e.preventDefault();
//       document.querySelector('.hamburger-menu').style.width = '250px';
//     });

//     document.querySelector('#myBidsButton').addEventListener('click', function(e) {
//       e.preventDefault();

//       // Create a new div element for the card
//       const card = document.createElement('div');
//       card.id = 'activeBids';
//       //card.textContent = 'This is the active bids card.';
//       card.style.display = 'none';

//       // Append the card to the card container
//       const cardContainer = document.getElementById('cardContainer');
//       cardContainer.innerHTML = ''; // Clear the container
//       cardContainer.appendChild(card);

//       const auctionItem = {
//         itemName: 'Item Name', // Replace with actual item name
//         currentPrice: 'Current Price' // Replace with actual current price
//       };
//       displayActiveBid(auctionItem);

//       card.style.display = 'block';
//     });
//     } else {
//         clickTab();
//         minBruker.style.display = 'none';  
//     }
//   });
// });

// function displayActiveBid(auctionItem) {
//   // Create a new div element
//   const div = document.createElement('div');

//   // Set the content of the div
//   div.textContent = `Objekt: ${auctionItem.itemName}, Sum: ${auctionItem.currentPrice}`;

//   // Append the div to the active bids container
//   const activeBidsContainer = document.getElementById('activeBids');
//   activeBidsContainer.appendChild(div);
// }

document.addEventListener('DOMContentLoaded', function() {
  firebase.auth().onAuthStateChanged(function(user) {
    const minBruker = document.querySelector('.minBruker-knapp');
    const db = firebase.firestore();
    
    if (user) {
      clickTab(user);
      minBruker.style.display = 'block';

      document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.hamburger-menu').style.width = '250px';
      });

      document.querySelector('#myBidsButton').addEventListener('click', function(e) {
        e.preventDefault();

        // Create a new div element for the card
        const card = document.createElement('div');
        card.id = 'activeBids';
        card.style.display = 'none';

        // Append the card to the card container
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = ''; // Clear the container
        cardContainer.appendChild(card);

        db.collection('auctionItems').onSnapshot((snapshot) => {
          // snapshot.docs.forEach((doc) => {
          //   const auctionItem = doc.data();
          //   const highestBidder = auctionItem.highestBidder;
          const activeBidsContainer = document.getElementById('activeBids');
          activeBidsContainer.innerHTML = '';

          snapshot.docs.forEach((doc) => {
            const auctionItem = doc.data();
            const highestBidder = auctionItem.highestBidder;


            // Check if the current user's ID is equal to the highestBidder string
            if (highestBidder === user.uid) {
              // Display the auction item under "My active bids"
              displayActiveBid(auctionItem);
            }
          });
        });

        card.style.display = 'block';
      });
    } else {
      clickTab();
      minBruker.style.display = 'none';  
    }
  });
});

function displayActiveBid(auctionItem) {
  // Create a new div element
  const div = document.createElement('div');

  // Set the content of the div
  div.textContent = `Objekt: ${auctionItem.itemName}, Sum: ${auctionItem.currentPrice}`;

  // Append the div to the active bids container
  const activeBidsContainer = document.getElementById('activeBids');
  activeBidsContainer.appendChild(div);
}

document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.dropbtn').addEventListener('click', function() {
var dropdownContent = document.querySelector('.dropdown-content');
if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
  dropdownContent.style.display = 'block';
} else {
  dropdownContent.style.display = 'none';
}
});

document.querySelector('.close-btn').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.hamburger-menu').style.width = '0';
});
/*document.querySelector('.minBruker-knapp').addEventListener('click', function() {
var brukerinfo = document.querySelector('.brukerinfo');
if (brukerinfo.style.display === 'none' || brukerinfo.style.display === '') {
brukerinfo.style.display = 'block';
} else {
brukerinfo.style.display = 'none';
}
});*/

document.getElementById('logoutButton').addEventListener('click', function() {
firebase.auth().signOut().then(function() {
console.log('User Logged Out!');
document.querySelector('.hamburger-menu').style.width = '0';
window.location.href = "index.html";
}).catch(function(error) {
console.error('Sign Out Error', error);
});
});
});


// function displayActiveBid(auctionItem) {
//   // Create a new div element
//   const div = document.createElement('div');

//   // Set the content of the div
//   div.textContent = `Item: ${auctionItem.name}, Current Price: ${auctionItem.currentPrice}`;

//   // Append the div to the active bids container
//   const activeBidsContainer = document.getElementById('activeBids');
//   activeBidsContainer.appendChild(div);
// }

