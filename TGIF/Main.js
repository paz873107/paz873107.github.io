var app = new Vue({
    el: '#app',
    data: {
        senates: [],
        house: [],
        statistics: {
            "democrats": [],
            "d_total": 0,
            "republicans": [],
            "r_total": 0,
            "independents": [],
            "i_total": 0,
            "total": 0,
            "avg_democrats": 0,
            "avg_republicans": 0,
            "avg_independents": 0,
            "total_avg": 0,
            "least_engaged": [],
            "most_engaged": [],
            "least_loyal": [],
            "most_loyal": []
        }
    }
});

// This time, the result target is the same as the previous step in the project, but the functions are improved by using VUE,
// promises and fetch to get live data and avoid the making of the tables in the js file

let url1 = "https://api.propublica.org/congress/v1/113/senate/members.json"
let url2 = "https://api.propublica.org/congress/v1/113/house/members.json"


function fSenate() {
    fetch(url1, {
        method: "GET", 
        headers: new Headers({
            "X-API-Key": 'Gr0ZgB1BlfNDiL4ip2sgsvY06EikpZcxyhKylBV4'
        }),
    }).then(function (response) {
        if (response.ok)
            return response.json();
        throw new Error(response.statusText);
    }).then(data => {
        app.senates = data.results[0].members
        calculateAttendance(app.senates)
        calculateAverage()
        Attendance(app.senates, 'missed_votes', app.statistics.most_engaged, app.statistics.least_engaged)
        Attendance(app.senates, 'total_votes', app.statistics.least_loyal, app.statistics.most_loyal)       
    });
}


function fHouse() {
    fetch(url2, {
        method: "GET", 
        headers: new Headers({
            "X-API-Key": 'Gr0ZgB1BlfNDiL4ip2sgsvY06EikpZcxyhKylBV4'
        }),
    }).then(function (response) { 
        if (response.ok)
            return response.json();
        throw new Error(response.statusText);
    }).then(data => {
        app.house = data.results[0].members
        calculateAttendance(app.house)
        calculateAverage()
        Attendance(app.house, 'missed_votes', app.statistics.most_engaged, app.statistics.least_engaged)
        Attendance(app.house, 'total_votes', app.statistics.least_loyal, app.statistics.most_loyal)
    });
}


function calculateAttendance(member) {
    app.statistics.democrats = member.filter(member => member.party == "D").map(member => member.votes_with_party_pct);
    app.statistics.d_total = app.statistics.democrats.length;

    app.statistics.republicans = member.filter(member => member.party == "R").map(member => member.votes_with_party_pct);
    app.statistics.r_total = app.statistics.republicans.length;

    app.statistics.independents = member.filter(member => member.party == "I").map(member => member.votes_with_party_pct);
    app.statistics.i_total = app.statistics.independents.length;

    app.statistics.total = (app.statistics.democrats.length + app.statistics.republicans.length + app.statistics.independents.length)
}



function calculateAverage() {
    if (app.statistics.democrats != 0) {
        app.statistics.avg_democrats = app.statistics.democrats.reduce(function (total, currentValue) {
            return total + currentValue
        })
        app.statistics.total_avg = (app.statistics.total_avg + app.statistics.avg_democrats)
        app.statistics.avg_democrats = (app.statistics.avg_democrats / app.statistics.democrats.length).toFixed(2);
    }

    if (app.statistics.republicans != 0) {
        app.statistics.avg_republicans = app.statistics.republicans.reduce(function (total, currentValue) {
            return total + currentValue
        })
        app.statistics.total_avg = (app.statistics.total_avg + app.statistics.avg_republicans)
        
        app.statistics.avg_republicans = (app.statistics.avg_republicans / app.statistics.republicans.length).toFixed(2);
    }

    if (app.statistics.independents != 0) {
        app.statistics.avg_independents = app.statistics.independents.reduce(function (total, currentValue) {
            return total + currentValue
        })
        app.statistics.total_avg = (app.statistics.total_avg + app.statistics.avg_independents)
        

        app.statistics.avg_independents = (app.statistics.avg_independents / app.statistics.independents.length).toFixed(2);
    }

    app.statistics.total_avg = (app.statistics.total_avg / app.statistics.total).toFixed(2);
}


function Attendance(array, value, most, least) {

    var porcentaje = Math.round(app.statistics.total * 10 / 100);

    function order(array, value) {
        array.sort(function (a, b) {
            return a[value] - b[value];
        });
    }
    order(array, value);
    for (i = 0; i < porcentaje; i++) {
        most.push(array[i])
    }
    most.forEach(element => {
        return(element)
    });
    
    array.reverse(array, value)
    for (i = 0; i < porcentaje; i++) {
        least.push(array[i])
    }
    least.forEach(element => {
        return(element)
    });

}