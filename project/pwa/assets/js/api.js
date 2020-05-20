//const proxy_url = 'https://cors-anywhere.herokuapp.com/';
const base_url = 'https://api.football-data.org/v2/';
const auth_token = '5fced3dfd1264c04a50486b0565ce442';
const ongoing_url = 'matches?limit=10&status=LIVE&competitions=2021';
const scheduled_url = 'matches?limit=5&status=SCHEDULED&competitions=2021';
const standing_url = 'competitions/2021/standings';
const scorrers_url = 'competitions/2021/scorers';
const competition_url = 'competitions/2021';


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


// Blok kode untuk melakukan request data json
//ONGOING Match Fetch API
function getOngoingMatch() {
  if ("caches" in window) {
    caches.match(base_url + ongoing_url).then(response => {
      if (response) {
        response.json().then(data => {
          listOngoing(data);
        });
      }
    });
  }

  fetch(base_url + ongoing_url, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      listOngoing(data);
    })
    .catch(error);
}

//SCHEDULED Match Fetch API
function getScheduledMatch() {
  if ("caches" in window) {
    caches.match(base_url + scheduled_url).then(response => {
      if (response) {
        response.json().then(data => {
          listScheduled(data);
        });
      }
    });
  }

  fetch(base_url + scheduled_url, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      listScheduled(data);
    })
    .catch(error);
}

//STANDING Stats Fetch API
function getStatistic() {
  if ("caches" in window) {
    caches.match(base_url + standing_url).then(response => {
      if (response) {
        response.json().then(data =>{
          listStanding(data);
        });
      }
    });
  }

  fetch(base_url + standing_url, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      listStanding(data);
    })
    .catch(error);
}

//Season TOP Scorrer Fetch API
function getTopScorrer() {
  if ("caches" in window) {
    caches.match(base_url + scorrers_url).then(response => {
      if (response) {
        response.json().then(data =>{
          listScorrer(data);
        });
      }
    });
  }

  fetch(base_url + scorrers_url, {
      headers: {
        'X-Auth-Token': auth_token
      },
    })
    .then(status)
    .then(json)
    .then(function(data) {
      listScorrer(data);
    })
    .catch(error);
}

//Competition Winner Fetch API
function getCompWinner() {
  if ("caches" in window) {
    caches.match(base_url + competition_url).then(response => {
      if (response) {
        response.json().then(data =>{
          listWinner(data);
        });
      }
    });
  }

  fetch(base_url + competition_url, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      listWinner(data);
    })
    .catch(error);
}

//Function fetch data teams
function getTeamById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            generateTeam(data);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        'X-Auth-Token': auth_token
      },
    })
      .then(status)
      .then(json)
      .then(data => {
        generateTeam(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedTeam() {
  getTeamAll().then(team => {
    listSavedTeam(team);
  });
}

//Function fetch data player
function getPlayerById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "players/" + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            generatePlayer(data);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "players/" + idParam, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        generatePlayer(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedPlayer() {
  getPlayerAll().then(player => {
    listSavedPlayer(player);
  });
}

//Function fetch data match
function getMatchList(teamID) {
  if ("caches" in window) {
    caches.match(base_url + 'teams/' + teamID + '/matches/?competitions=2021').then(response => {
      if (response) {
        response.json().then(data => {
          GenerateMatchList(data);
        });
      }
    });
  }

  fetch(base_url + 'teams/' + teamID + '/matches/?competitions=2021', {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
    .then(status)
    .then(json)
    .then(data => {
      GenerateMatchList(data);
    })
    .catch(error);
}

function getMatchById(id) {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "matches/" + idParam).then(response => {
        if (response) {
          response.json().then(data => {
            console.log(data);
            generateMatch(data);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "matches/" + idParam, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        generateMatch(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedMatch() {
  getMatchAll().then(match => {
    listSavedMatch(match);
  });
}

//get club badge only
function getClubBadge(id, club) {
  return new Promise(function(resolve, reject) {
    if ("caches" in window) {
      caches.match(base_url + "teams/" + id).then(response => {
        if (response) {
          response.json().then(data => {
            setClubBadge(data, club);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + id, {
      headers: {
        'X-Auth-Token': auth_token
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        setClubBadge(data, club);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedDataById(loadfrom) {
  const urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  getById(idParam, loadfrom).then(data => {
    //console.log(loadfrom, data);
    if(loadfrom === "teams"){
      generateTeam(data);
    } else if (loadfrom === "players"){
      generatePlayer(data);
    } else if (loadfrom === "matches"){
      generateMatch(data);
    }
  });
}

//check if data already saved
/*
function isSavedAlready(loadfrom) {
  const urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  getById(idParam, loadfrom).then(data => {
    if(data !== undefined){
      //console.log(data, "isn't");
      $("#save").addClass("d-none");
    }
    //console.log(data);
  });
}
*/