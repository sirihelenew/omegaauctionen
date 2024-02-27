
firebase.initializeApp(firebaseConfig);



const auth = firebase.auth();
const loginButton = document.querySelector('.header-button');


auth.onAuthStateChanged((user) => {
console.log(user)
if (user) {
console.log('User is logged in');
loginButton.style.display = 'none';
} else {
console.log('User is not logged in');
}
});

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


document.addEventListener('DOMContentLoaded', function() {
firebase.auth().onAuthStateChanged(function(user) {
const minBruker = document.querySelector('.minBruker-knapp');
    
if (user) {
  clickTab(user);
  minBruker.style.display = 'block';
  document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
    e.preventDefault();
      document.querySelector('.hamburger-menu').style.width = '250px';
    });
        
    } else {
        clickTab();
        minBruker.style.display = 'none';  
}});
});

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