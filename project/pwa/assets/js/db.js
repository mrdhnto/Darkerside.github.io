const dbPromised = idb.open("smatch-database", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {
    unique: false
  });

  const playersObjectStore = upgradeDb.createObjectStore("players", {
    keyPath: "id"
  });
  playersObjectStore.createIndex("name", "name", {
    unique: false
  });

  const matchesObjectStore = upgradeDb.createObjectStore("matches", {
    keyPath: "id"
  });
  matchesObjectStore.createIndex("id", "id", {
    unique: false
  });
});

//database for saved data
function saveForLater(id, savedto) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction(savedto, "readwrite");
      let store = tx.objectStore(savedto);
      //console.log(id);
      store.put(id);
      return tx.complete;
    })
    .then(function() {
      if(id.name !== undefined){ M.toast({html: id.name + '&nbspberhasil disimpan.'}) }
      else { M.toast({html: 'Match ID&nbsp' + id.id + '&nbspberhasil disimpan.'}) }
    });
}

//database for delete data
function deleteData(id, delfrom) {
  id = parseInt(id, 10);
  dbPromised.then(db => {
    let tx = db.transaction(delfrom, 'readwrite');
    let store = tx.objectStore(delfrom);
    store.delete(id);
    return tx.complete;
  }).then(function() {
    //console.log(id, ': Data dihapus');
  });
}

//function for get all team
function getTeamAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(db => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(teams => {
        resolve(teams);
      });
  });
}

//function to get all player
function getPlayerAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(db => {
        let tx = db.transaction("players", "readonly");
        let store = tx.objectStore("players");
        return store.getAll();
      })
      .then(players => {
        resolve(players);
      });
  });
}

//function to get all match
function getMatchAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(db => {
        let tx = db.transaction("matches", "readonly");
        let store = tx.objectStore("matches");
        return store.getAll();
      })
      .then(matches => {
        resolve(matches);
      });
  });
}

//function to retrieve saved data by id
function getById(id, loadfrom) {
  id = parseInt(id, 10);
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(db => {
        let tx = db.transaction(loadfrom, "readonly");
        let store = tx.objectStore(loadfrom);
        return store.get(id);
      })
      .then(data => {
        //console.log(data);
        resolve(data);
      });
  });
}
