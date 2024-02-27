firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


var boysData = [
    { name: 'Torodd Solberg', info: 'Komité: Fadderstyret', fornavn: 'Torodd', id:'8TH3HO4XvOG4IUDVXmXS' },
    { name: 'Elias Bostrøm', info: 'Komité: Sport & Spill', fornavn: 'Elias', id:'9SNmFM0uruHtkHbiljHr'},
    { name: 'Gustav Smidtsrød', info: 'Komité: Kielder', fornavn: 'Gustav', id:'Wr4bTsupZ2cpz5U1W2N7' },
    { name: 'Vebjørn Weldingh Nilsen', info: 'Komité: DGR', fornavn: 'Vebjørn', id:'1DuI4Hu9byrtuZwzFfAv'},
    { name: 'Kasper Langland', info: 'Komité: Contactor', fornavn: 'Kasper', id: 'g3ZxRKNGolERko9LjuGJ' },
    { name: 'Edvard Dingsør', info: 'Komité: Soscom', fornavn: 'Edvard', id:'q4GOpgh5QeysR9W2mYXK' },
    { name: 'Einar Augestad', info: 'Komité: Lophtcom', fornavn: 'Einar', id:'m23wGq8xocbndB1QZKg8' },
    { name: 'Andreas Nysæter', info: 'Komité: Loccom', fornavn: 'Andreas', id: 'k7XpvFbDB2o6OG0Ys88M' },
    { name: 'Nils Martin Ørstad Rognmo', info: 'Komité: Blaestcom', fornavn: 'Nils', id:'No2GFkkSrZGEIcRmQnYF' },
    { name: 'Theodor Kvalsvik Lauritzen', info: 'Komité: Vevcom', fornavn: 'Theodor', id:'OwBjvhhWmYXwM04ytiLM' },
    { name: 'Magnus Aubell ', info: 'Komité: Heuttecom', fornavn: 'Magnus', id:'yvKhwMan78jHSxs1JgEy' },
    { name: 'Øystein Martinsen', info: 'Komité: Brygcom', fornavn: 'Øystein', id:'afQJDkc7diImqHt3vATY' },
    { name: 'Simen Bedringås', info: 'Komité: Ombul', fornavn: 'Simen', id:'iJTdup0yFVDByjgUlrGL' },
    { name: 'Atle Sund', info: 'Komité: Phaestcom', fornavn: 'Atle', id:'pgk4tIJPbw3baUbo8flo' },
    { name: 'Sondre Aarli', info: 'Komité: HS', fornavn: 'Sondre', id:'HX5L3hxiBdR8hZetEDsQ' },
];

var girlsData = [
    { name: 'Guro Brekke', info: 'Komité: Lophtcom', fornavn: 'Guro', id:'FkZ8rvq6o2SehAvGs1DW' },
    { name: 'Fride Fossheim', info: 'Komité: Blaestcom', fornavn: 'Fride', id: 'SVEjHKGJEqraGV4ZpzKB' },
    { name: 'Ingrid Kristine Bøe', info: 'Komité: DGR', fornavn: 'Ingrid', id:'aHr8FSIznn8vGMPHP0vM' },
    { name: 'Eva Holm Skillingstad', info: 'Komité: Heuttecom', fornavn: 'Eva', id: 'nRLoip1A6yTj7CFIXPZV' },
    { name: 'Adina Traa Utkilen', info: 'Komité: Sport & Spill', fornavn: 'Adina', id: 'vGnaCKmHaQBFCCJjJCoc' },
    { name: 'Natalie Staurland', info: 'Komité: Loccom', fornavn: 'Natalie', id:'41lL9hup0ykL4eL56OWy' },
    { name: 'Lisa Paulsen', info: 'Komité: Kielder', fornavn: 'Lisa', id: 'owwdHSAcDoT9qx4zrefP' },
    { name: 'Sigrid Romsaas', info: 'Komité: Contactor', fornavn: 'Sigrid', id:'MW7Ban6JUiwCHrlpVzmY' },
    { name: 'Tora Bøckman', info: 'Komité: Phinanscom', fornavn: 'Tora', id:'Xz3Kvk91u68qQpmAQGBm' },
    { name: 'Vilde Tenfjord', info: 'Komité: Brygcom', fornavn: 'Vilde', id: 'Y2wrbfIR2SzECCecWZjK' },
    { name: 'Serafina Mertzani', info: 'Komité: Phaestcom', fornavn: 'Serfina', id:'34HeTMJFBQjvCQERO5MZ' },
    { name: 'Tilde Veie', info: 'Komité: Ombul', fornavn: 'Tilde', id:'pP6ntvnF8DJHlHdovXNF' },
    { name: 'Tuva Ludvigsen', info: 'Komité: Soscom', fornavn: 'Tuva', id:'wjnUPPGCY1dZMzO3Xpt7' },
    { name: 'Mika Victoria Vahedi', info: 'Komité: Vevcom', fornavn: 'Mika', id:'zWxmVqhu6IepuNQHN4kT' },
    { name: 'Lovise Ramsli', info: 'Komité: HS', fornavn: 'Lovise', id:'UzCJ6IVdnL85nMX92wBg' },
    { name: 'Mina Bratterup Hansen', info: 'Komité: Fadderstyret', fornavn: 'Mina', id:'A6BuBGeIYRFFzcYNb4Zl' },
];

let group = 'Group';

document.getElementById('boysBtn').addEventListener('click', function() {
  createPersonButtons('Boys', boysData);
});

document.getElementById('girlsBtn').addEventListener('click', function() {
  createPersonButtons('Girls', girlsData);
});

async function createPersonButtons(group, data) {
  var personBtnsContainer = document.getElementById('personBtnsContainer');
  var personCardContainer = document.getElementById('personCardContainer');

  personBtnsContainer.innerHTML = ''; 
  personCardContainer.innerHTML = ''; 
  for (var i = 0; i < data.length; i++) {
      var personBtn = document.createElement('button');
      personBtn.className = 'personBtn';
      personBtn.textContent = data[i].name;
      personBtn.dataset.runnerId = data[i].id; 
      personBtnsContainer.appendChild(personBtn);

      var personCard = document.createElement('div');
      personCard.id = group.toLowerCase() + 'Person' + (i + 1) + 'Card';
      personCard.className = 'personCard hidden';
      personCard.innerHTML = `
          <h2 style="color: #333">${data[i].name}</h2>
          <p>${data[i].info}</p>
          <div class="checkbox-container">
              <input type="checkbox" id="${group.toLowerCase()}Person${i + 1}WinnerCheckbox" name="${group === 'Boys' ? 'winMale' : 'winFemale'}">
              <label for="${group.toLowerCase()}Person${i + 1}WinnerCheckbox">Vinner i ${group === 'Boys' ? 'gutte' : 'jente'}klassen</label>

              <br>
              <input type="checkbox" id="${group.toLowerCase()}Person${i + 1}PukeCheckbox" name="pukeFirst">
              <label for="${group.toLowerCase()}Person${i + 1}PukeCheckbox">Spydde først</label>

          </div>
          <button class="bidBtn" data-name="${data[i].name}" data-group="${group.toLowerCase()}" data-runner-id="${data[i].id}">Jeg vil bette på ${data[i].fornavn}!</button>
          <button class="closeBtn">Lukk</button>
      `;
      personCardContainer.appendChild(personCard);
  }


var personButtons = document.querySelectorAll('.personBtn');
    personButtons.forEach(function(btn, index) {
        btn.addEventListener('click', function() {
            personBtnsContainer.style.display = 'none';

            var personCard = document.getElementById(group.toLowerCase() + 'Person' + (index + 1) + 'Card');
            // personCard.classList.remove('hidden');
            //var personCard = document.getElementById(this.dataset.personCardId); // Use the stored ID
            personCard.classList.remove('hidden');

            personCardContainer.style.display = 'flex';
            personCardContainer.style.justifyContent = 'center';
            personCardContainer.style.alignItems = 'center';
        });
    });

    var closeButtons = document.querySelectorAll('.closeBtn');
    closeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            //Fjern personCard
            this.parentElement.classList.add('hidden');

            // Vis knapper igjen
            personBtnsContainer.style.display = 'grid'; 
            personBtnsContainer.style.flexWrap = 'wrap'; 
            personBtnsContainer.style.justifyContent = 'space-around'; 
            personBtnsContainer.style.alignItems = 'flex-start'; 
            personBtnsContainer.style.height = 'auto'; 

            personCardContainer.style.display = 'none'; 
        });
    });
    var bidBtns = document.querySelectorAll('.bidBtn');
    bidBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            placeBet();
        
            // alert('You have successfully bid on ' + this.closest('.personCard').querySelector('h2').textContent + '.');
        });
    });

}