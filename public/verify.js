
/*
function showContent(activeTabId, user) {
    document.querySelectorAll('.tab__content').forEach(function(content) {
        content.style.display = 'none';
    });
    
    if (user) {
        document.getElementById(activeTabId).style.display = 'block';
        document.getElementById('login-message').style.display = 'none';
    } else {
        
        document.getElementById('login-message').style.display = 'block';
        document.getElementById(activeTabId).style.display = 'none';
    }
}

function showContent_Tab4(activeTabId) {
    document.getElementById('login-message').style.display = 'none';
    var content = document.querySelector('.veldedighetsinformasjon');
    if (content) {
        content.style.display = 'none';
    }
    document.getElementById(activeTabId).style.display = 'block';
}

function clickTab(){
    document.querySelector('#tab1').addEventListener('click', function() {
        showContent('tab__content--1');
    });
    document.querySelector('#tab2').addEventListener('click', function() {
        showContent('tab__content--2');
    });
    document.querySelector('#tab3').addEventListener('click', function() {
        showContent('tab__content--3');
    });
    document.querySelector('#tab4').addEventListener('click', function() {
        showContent_Tab4('tab__content--4');
    });
}


    document.addEventListener('DOMContentLoaded', function() {
        firebase.auth().onAuthStateChanged(function(user) {
            const minBruker = document.querySelector('.minBruker-knapp');
            if (user) {
                minBruker.style.display = 'block';
                document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector('.hamburger-menu').style.width = '250px';
                });
                
                clickTab();
            } else {
                minBruker.style.display = 'none';
                
        }});


    });










    function handleLoginMessage4() {
        //
    }
    function handleLoginMessage(tabIndex, user) {
        
        var loginMessageDiv = document.getElementById('login-message');

        if (user || tabIndex === '4') {
            // Hide login message if user is logged in or tab 4 is clicked
            loginMessageDiv.style.display = 'none';
        } else {
            // Show login message for tabs 1, 2, and 3 if user is not logged in
            loginMessageDiv.style.display = 'block';
        }
    }

    function setUpTabs(user) {
        ['1', '2', '3'].forEach(function(i) {
            document.querySelector('#tab' + i).addEventListener('click', function() {
                showTabContent('tab__content--' + i);
                handleLoginMessage(i, user);
            });
        });


        // document.querySelector('#tab4').addEventListener('click', function() {
        //     showTabContent('tab__content--4');
        //     // Hide the login message regardless of the user's login status
        //     document.getElementById('login-message').style.display = 'none';
        // });
        // Initially show the first tab content and handle login message for it
        //showTabContent('tab__content--1');
        //handleLoginMessage('1');
    }

    function showTabContent(activeTabId) {
        document.querySelectorAll('.tab__content').forEach(function(content) {
            content.style.display = 'none';
        });
        document.getElementById(activeTabId).style.display = 'block';
    }


    

    document.addEventListener('DOMContentLoaded', function() {
        firebase.auth().onAuthStateChanged(function(user) {
            const minBruker = document.querySelector('.minBruker-knapp');

            if (user) {
                minBruker.style.display = 'block';
                document.querySelector('.minBruker-knapp').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector('.hamburger-menu').style.width = '250px';
                });
                setUpTabs(user);
                //var tab4Content = document.querySelector('#tab__content--4');
                    //if (tab4Content) {
                        //handleLoginMessage('4', user);  
                        //tab4Content.style.display = 'block';
                    //}
            } else {
                minBruker.style.display = 'none';
                ['1', '2', '3'].forEach(function(i) {
                var tabContent = document.querySelector('#tab__content--' + i);
                //var tab4Content = document.querySelector('#tab__content--4');
                if (tabContent) {
                        tabContent.style.display = 'none';
                        handleLoginMessage(i);
                }
        });
        
        // var tab4Content = document.querySelector('#tab__content--4');
        // if (tab4Content) {
        //     tab4Content.style.display = 'block';
        // }
}
        });
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
/*
    document.getElementById('logoutButton').addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log('User Logged Out!');
                document.querySelector('.hamburger-menu').style.width = '0';
        }).catch(function(error) {
                // An error happened.
                console.error('Sign Out Error', error);
        });
});
});

*/
