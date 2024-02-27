
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.getElementById('login-tab').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login-tekst').style.display = 'block';
    document.getElementById('info-knapp').style.display = 'none';
    document.getElementById('registration-tekst').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    this.className = 'active';
    document.getElementById('register-tab').className = 'inactive underlineHover';
});

document.getElementById('register-tab').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-tekst').style.display = 'none';
    //document.getElementById('info-knapp').style.display = 'inline-block';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('registration-tekst').style.display = 'block';
    this.className = 'active';
    document.getElementById('login-tab').className = 'inactive underlineHover';
});


document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        window.location.href = "../index.html"; 
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('error-message').innerHTML = errorMessage;
    });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fornavn = document.getElementById('fornavn').value;
    const etternavn = document.getElementById('etternavn').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        return db.collection("users").doc(user.uid).set({
            fornavn: fornavn,
            etternavn: etternavn,
            email: email
        });
    })
    .then(() => {
        window.location.href = "../index.html"; 
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('error-message').innerHTML = errorMessage;
    });
});