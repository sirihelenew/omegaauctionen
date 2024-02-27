


firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var bidBtns = document.querySelectorAll('.bidBtn');
    bidBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            placeBet();
        
            // alert('You have successfully bid on ' + this.closest('.personCard').querySelector('h2').textContent + '.');
        });
    });

function placeBet() {
    const user = firebase.auth().currentUser;
  
    if (!user) {
      alert("You must be logged in to place a bet.");
      return;
    }
  
    const winMaleCheckbox = document.querySelector('input[name="winMale"]:checked');
    console.log('winMaleCheckbox:', winMaleCheckbox);
  
    const winFemaleCheckbox = document.querySelector('input[name="winFemale"]:checked');
    console.log('winFemaleCheckbox:', winFemaleCheckbox);
  
    const pukeFirstCheckbox = document.querySelector('input[name="pukeFirst"]:checked');
    console.log('pukeFirstCheckbox:', pukeFirstCheckbox);
  
    const bets = {
      vinnerGutt: winMaleCheckbox ? { runnerId: winMaleCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null,
      vinnerJente: winFemaleCheckbox ? { runnerId: winFemaleCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null,
      spyr: pukeFirstCheckbox ? { runnerId: pukeFirstCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null
    };

    // Update the runners' documents in Firestore
    const db = firebase.firestore();
    if (bets.vinnerGutt) {
        db.collection('runners').doc(bets.vinnerGutt.runnerId).update({
            winBets: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
    }
    if (bets.vinnerJente) {
        db.collection('runners').doc(bets.vinnerJente.runnerId).update({
            winBets: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
    }
    if (bets.spyr) {
        db.collection('runners').doc(bets.spyr.runnerId).update({
            pukeFirstBets: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
    }
  
    console.log(bets);
  
    const checkedOut = Array.from(document.querySelectorAll('input[name="box"]:checked'))
      .map(box => box.value);
  
    if (!bets.vinnerGutt && !bets.vinnerJente && !bets.spyr) {
      alert("Du må velge minst én kategori:)");
      return;
    }
  
    const betAmount = 30; 
    const totalBetAmount = betAmount * Object.values(bets).filter(Boolean).length;
  
   
    db.collection('beermilebet').add({
      betterID: `${user.uid}`,
      ...bets,
      amount: totalBetAmount,
    })
    .then(() => {
      alert(`All good! Husk å vippse ${totalBetAmount} kr.`);
    })
    .catch(error => {
      console.error("Obs: ", error);
    });
  }


  // function placeBet() {
//     const user = firebase.auth().currentUser;

//     if (!user) {
//         alert("You must be logged in to place a bet.");
//         return;
//     }

//     const winMaleCheckbox = document.querySelector('input[name="winMale"]:checked');
//     console.log('winMaleCheckbox:', winMaleCheckbox);

//     const winFemaleCheckbox = document.querySelector('input[name="winFemale"]:checked');
//     console.log('winFemaleCheckbox:', winFemaleCheckbox);

//     const pukeFirstCheckbox = document.querySelector('input[name="pukeFirst"]:checked');
//     console.log('pukeFirstCheckbox:', pukeFirstCheckbox);
// //   const bets = {
// //     vinnerGutt: winMaleCheckbox ? winMaleCheckbox.value : null,
// //     vinnerJente: winFemaleCheckbox ? winFemaleCheckbox.value : null,
// //     spyr: pukeFirstCheckbox ? pukeFirstCheckbox.value : null
// //   };
// const bets = {
//     vinnerGutt: winMaleCheckbox ? { runnerId: winMaleCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null,
//     vinnerJente: winFemaleCheckbox ? { runnerId: winFemaleCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null,
//     spyr: pukeFirstCheckbox ? { runnerId: pukeFirstCheckbox.closest('.personCard').querySelector('.bidBtn').dataset.runnerId } : null
// };

// console.log(bets);

//     // const checkedOut = document.querySelectorAll('input[name="box"]:checked')
//     // .map(box  => box.value);
//     const checkedOut = Array.from(document.querySelectorAll('input[name="box"]:checked'))
//     .map(box => box.value);
    

//     if (!bets.vinnerGutt && !bets.vinnerJente && !bets.spy) {
//         alert("Du må velge minst én kategori:)");
//         return;
//       }
    
//     const betAmount = 30; 
//     const totalBetAmount = betAmount * Object.values(bets).filter(Boolean).length;

//     const db = firebase.firestore();
//     db.collection('beermilebet').add({
//         betterID: `/users/${user.uid}`,
//         ...bets,
//         amount: totalBetAmount,
//     })
//     .then(() => {
//         alert(`All good! Husk å vippse ${totalBetAmount} kr.`);
//     })
//     .catch(error => {
//         console.error("Obs: ", error);
//     });
//     }
// var bidBtns = document.querySelectorAll('.bidBtn');
// bidBtns.forEach(function(btn) {
//     btn.addEventListener('click', function() {
//         placeBet();

//         var personCard = this.closest('.personCard');
//         var runnerId = personCard.querySelector('button').dataset.runnerId;
//         var name = personCard.querySelector('h2').textContent;
//         var group = personCard.querySelector('button').dataset.group;

//         // Set the bets object using the runnerId from the data attribute
//         const bets = {
//           vinnerGutt: winMaleCheckbox ? { runnerId: runnerId } : null,
//           vinnerJente: winFemaleCheckbox ? { runnerId: runnerId } : null,
//           spyr: pukeFirstCheckbox ? { runnerId: runnerId } : null
//         };

//         // Set the name and group for the alert message
//         var message = `You have successfully bid on ${name} in the ${group} category.`;
//         alert(message);
//     });
// });

// function placeBet() {
//   const user = firebase.auth().currentUser;

//   if (!user) {
//     alert("You must be logged in to place a bet.");
//     return;
// }}

// var bidBtns = document.querySelectorAll('.bidBtn');
// bidBtns.forEach(function(btn) {
//         btn.addEventListener('click', function() {
//                 placeBet();

//                 var personCard = this.closest('.personCard');
//                 var runnerId = personCard.querySelector('button').dataset.runnerId;
//                 var name = personCard.querySelector('h2').textContent;
//                 var group = personCard.querySelector('button').dataset.group;

//                 // Get the checkboxes
//                 var winMaleCheckbox = document.querySelector('#winMaleCheckbox').checked;
//                 var winFemaleCheckbox = document.querySelector('#winFemaleCheckbox').checked;
//                 var pukeFirstCheckbox = document.querySelector('#pukeFirstCheckbox').checked;

//                 // Set the bets object using the runnerId from the data attribute
//                 const bets = {
//                     vinnerGutt: winMaleCheckbox ? { runnerId: runnerId } : null,
//                     vinnerJente: winFemaleCheckbox ? { runnerId: runnerId } : null,
//                     spyr: pukeFirstCheckbox ? { runnerId: runnerId } : null
//                 };

//                 // Set the name and group for the alert message
//                 var message = `You have successfully bid on ${name} in the ${group} category.`;
//                 alert(message);
//         });
// });

// function placeBet() {
//     const user = firebase.auth().currentUser;

//     if (!user) {
//         alert("You must be logged in to place a bet.");
//         return;
//     }
// }


async function getWinningBettors() {
  const db = firebase.firestore();
  const runnersSnapshot = await db.collection('runners').get();
  const bettorsSnapshot = await db.collection('beermilebet').get();

  const winners = {
      vinnerGutt: null,
      vinnerJente: 'pP6ntvnF8DJHlHdovXNF',
      spyr: 'aHr8FSIznn8vGMPHP0vM'
  };

  // Find the winners for each category
  runnersSnapshot.forEach(doc => {
      const runner = doc.data();
      if (runner.winBets && runner.winBets.length > 0) {
          winners.vinnerGutt = doc.id;
      }
      if (runner.winBets && runner.winBets.length > 0) {
          winners.vinnerJente = doc.id;
      }
      if (runner.pukeFirstBets && runner.pukeFirstBets.length > 0) {
          winners.spyr = doc.id;
      }
  });

  const winningBettors = [];

  // Find the bettors who betted on the winners
  bettorsSnapshot.forEach(doc => {
      const bettor = doc.data();
      if ((bettor.vinnerGutt && bettor.vinnerGutt.runnerId === winners.vinnerGutt) ||
          (bettor.vinnerJente && bettor.vinnerJente.runnerId === winners.vinnerJente) ||
          (bettor.spyr && bettor.spyr.runnerId === winners.spyr)) {
          winningBettors.push(bettor.betterID);
      }
  });

  return winningBettors;
}