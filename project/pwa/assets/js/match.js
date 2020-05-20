function GenerateMatchList(data){
	//console.log(data);
	let listHTML = `
		<div class="overflow-a" id="match-content">
	      <h5 class="m-1 bold">Previous Match List</h5>
	      <div class="card-content p1" id="match-data">
            <div class="divider-dark"></div>
	`;

	data.matches.forEach(matches => {
		if(matches.score.fullTime.homeTeam === null){
			matches.score.fullTime.homeTeam = "";
			matches.score.fullTime.awayTeam = "";
		}
		listHTML += `
			<div class="row row-match"><a href="https://darkerside.github.io/project/pwa/match.html?id=${matches.id}">
              <div class="col s5">${matches.homeTeam.name}<span class="right">${matches.score.fullTime.homeTeam}</span></div>
              <div class="col s2 center-align">-</div>
              <div class="col s5">${matches.score.fullTime.awayTeam}<span class="right">${matches.awayTeam.name}</span></div>
            </a></div>
            <div class="divider-dark"></div>
		`;
	})
	listHTML += `
		  </div>
	    </div>
	`;
	$('#match-cont-wrapper').removeClass("t-center");
	document.getElementById("match-cont-wrapper").innerHTML = listHTML;
}

function generateMatch(data){
	//console.log(data);
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  if(isFromSaved){data.match = data}
	let matchHTML = `
	  <div class="col s12">
        <div class="card gradient-blue-teal-light mt0 white-text">
          <div class="card-content">
            <div class="row mb0">
              <div class="col s3 center-align">
                  <div class="row mb0" id="logo_home"></div><div class="row mb0">${data.match.homeTeam.name}</div>
              </div>
              <div class="col s2 center-align match-score">${data.match.score.fullTime.homeTeam}</div>
              <div class="col s2 center-align match-vs">vs</div>
              <div class="col s2 center-align match-score">${data.match.score.fullTime.awayTeam}</div>
              <div class="col s3 center-align">
                  <div class="row mb0" id="logo_away"></div><div class="row mb0">${data.match.awayTeam.name}</div>
              </div>
            </div>
            <div class="col s12 content-tabs t-center" id="match_info">
              <div class="p1" id="match_data">
                <div class="divider"></div>
                <div class="row ctext-title">Status :</div>
                <div class="row ctext-info">${data.match.status}</div>
                <div class="divider"></div>
                <div class="row ctext-title">Group :</div>
                <div class="row ctext-info">${data.match.group}</div>
                <div class="divider"></div>
                <div class="row ctext-title">Duration :</div>
                <div class="row ctext-info">${data.match.score.duration}</div>
                <div class="divider"></div>
                <div class="row ctext-title">Referees :</div>
        `;
        data.match.referees.forEach(referees => {
        	matchHTML += `
        		<div class="row ctext-info">${referees.name}</div>
        	`;
        })
        matchHTML += `       
                <div class="divider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
	`;
	document.getElementById("body-content").innerHTML = matchHTML;
	getClubBadge(data.match.homeTeam.id, "home");
	getClubBadge(data.match.awayTeam.id, "away");
}

function setClubBadge(data, club){
	//console.log(data, club);
	let badgeHTML = `<img class="match-logo" src="${data.crestUrl}" alt="${data.name}">`;
	document.getElementById("logo_" + club).innerHTML = badgeHTML;
}