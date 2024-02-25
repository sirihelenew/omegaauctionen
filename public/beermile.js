var boysData = [
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
];

var girlsData = [
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


document.getElementById('boysBtn').addEventListener('click', function() {
createPersonButtons('Boys', boysData);
});

document.getElementById('girlsBtn').addEventListener('click', function() {
createPersonButtons('Girls', girlsData);
});

function createPersonButtons(group, data) {
var personBtnsContainer = document.getElementById('personBtnsContainer');
var personCardContainer = document.getElementById('personCardContainer');

personBtnsContainer.innerHTML = ''; 
personCardContainer.innerHTML = ''; 
for (var i = 0; i < data.length; i++) {
    var personBtn = document.createElement('button');
    personBtn.className = 'personBtn';
    personBtn.textContent = data[i].name;
    personBtnsContainer.appendChild(personBtn);

    var personCard = document.createElement('div');
    personCard.id = group.toLowerCase() + 'Person' + (i + 1) + 'Card';
    personCard.className = 'personCard hidden';
    personCard.innerHTML = `
        <h2 style="color: #333">${data[i].name}</h2>
        <p>${data[i].info}</p>
        <button class="bidBtn">Jeg vil bette på ${data[i].fornavn}!</button>
        <button class="closeBtn">Lukk</button>
    `;
    personCardContainer.appendChild(personCard);
}


var personButtons = document.querySelectorAll('.personBtn');
personButtons.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        personBtnsContainer.style.display = 'none';

        var personCard = document.getElementById(group.toLowerCase() + 'Person' + (index + 1) + 'Card');
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
            alert('You have successfully bid on ' + this.closest('.personCard').querySelector('h2').textContent + '.');
        });
    });
}
