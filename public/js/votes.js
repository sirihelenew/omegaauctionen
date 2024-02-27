//read from firestore db, get amount of bets placed on each runner 
//and return an array with the number of bet

// function getRunnerBets() {
//     const db = firebase.firestore();
//     const runnersRef = db.collection('runners');
//     let runnerBets = [];

//     runnersRef.get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//             const runner = doc.data();
//             const runnerId = doc.id;
//             const winBetsCount = runner.winBets ? runner.winBets.length : 0;
//             const pukeFirstBetsCount = runner.pukeFirstBets ? runner.pukeFirstBets.length : 0;

//             runnerBets.push({
//                 runnerId: runnerId,
//                 winBetsCount: winBetsCount,
//                 pukeFirstBetsCount: pukeFirstBetsCount
//             });
//         });

//         console.log(runnerBets);
//     });
// }

// getRunnerBets();
firebase.initializeApp(firebaseConfig);
function getRunnerBets() {
    const db = firebase.firestore();
    const runnersRef = db.collection('runners');
    let runnerBets = [];

    return runnersRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const runner = doc.data();
            const runnerId = doc.id;
            const winBetsCount = runner.winBets ? runner.winBets.length : 0;
            const pukeFirstBetsCount = runner.pukeFirstBets ? runner.pukeFirstBets.length : 0;

            runnerBets.push({
                runnerId: runnerId,
                winBetsCount: winBetsCount,
                pukeFirstBetsCount: pukeFirstBetsCount
            });
        });
        console.log(runnerBets);
        return runnerBets;
    });
}
function displayChart(runnerBets) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = runnerBets.map(rb => rb.runnerId);
    const winBetsData = runnerBets.map(rb => rb.winBetsCount);
    const pukeFirstBetsData = runnerBets.map(rb => rb.pukeFirstBetsCount);

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vinner',
                data: winBetsData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Spydde først',
                data: pukeFirstBetsData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

getRunnerBets().then(runnerBets => {
    displayChart(runnerBets);
});

