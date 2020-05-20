//All DOMElement Generated Code is here

//Generated List for Ongoing Match
function listOngoing(data){
	let ongoingHTML = `<div class="card-content white-text">`;
      if(data.matches.length === 0){
        ongoingHTML += `
              <div class="row mb0">
                <div class="col s12 live-vs center-align">
                  No Matches are Live now
                </div>
              </div>
              `
      } else {
        data.matches.table.forEach(table => {
          ongoingHTML += `
              <div class="row mb0">
                <div class="col s5">
                  <span class="live-home">${table.homeTeam.name}</span>
                  <span class="live-home-score right-align right">${table.score.fullTime.homeTeam}</span>
                </div>
                <div class="col s2 live-vs center-align"> - </div>
                <div class="col s5">
                  <span class="live-away-score left">${table.score.fullTime.awayTeam}</span>
                  <span class="live-away right-align">${table.awayTeam.name}</span>
                </div>
              </div>
              `;
        });
        ongoingHTML += `</div>`;
      }     
      // Sisipkan komponen card ke dalam elemen dengan id #ongoingmatch
      $("#ongoingmatch").removeClass("t-center");
      $("#ongoingmatch").addClass("card gradient-orange-amber-darken");
      document.getElementById("ongoingmatch").innerHTML = ongoingHTML;
}

//Generated List for Scheduled Match
function listScheduled(data){
	let scheduledHTML = `<div class="card-content white-text">`;
        if(data.matches.length === 0){
            scheduledHTML += `
                    <div class="row schedule">
                      <div class="col s12 center-align">
                        No Matches are Scheduled now
                      </div>
                    </div>
                  `
        } else {
            data.matches.table.forEach(table => {
              
            function addZero(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
            }

            let date = new Date(table.utcDate);
            let h = addZero(date.getHours());
            let m = addZero(date.getMinutes());
            let s = addZero(date.getSeconds());
            simpledate = h + ":" + m + ":" + s;

            scheduledHTML += `
                  <div class="divider"></div>
                  <div class="section p0">
                    <div class="row schedule">
                      <div class="col s2 m1 center-align">${simpledate}</div>
                      <div class="col s4 m4 right-align">${table.homeTeam.name}</div>
                      <div class="col s2 m1 center-align">VS</div>
                      <div class="col s4 m4 ">${table.awayTeam.name}</div>
                    </div>
                  </div>
                  `;
            });
            scheduledHTML += `
                <div class="divider"></div>
              </div>
            `;
        }
        scheduledHTML += `</div>`;
        // Sisipkan komponen card ke dalam elemen dengan id #scheduled
        $("#scheduledmatch").removeClass("t-center");
        $("#scheduledmatch").addClass("card gradient-blue-teal-light");
        document.getElementById("scheduledmatch").innerHTML = scheduledHTML;
}

//Generated List for Standing Info
function listStanding(data){
	let statistikHTML = `
            <div class="card gradient-cyan-teal-darken">
              <div class="card-content white-text overflow-a">
                <div class="row p0 m0" id="stat-head">
                  <div class="row klasemen-row" id="klasemen-header">
                    <div class="col klasemen-pos"></div>
                    <div class="col klasemen-badge"></div>
                    <div class="col klasemen-team"></div>
                    <div class="col klasemen-teaminfo">GP</div>
                    <div class="col klasemen-teaminfo">W</div>
                    <div class="col klasemen-teaminfo">D</div>
                    <div class="col klasemen-teaminfo">L</div>
                    <div class="col klasemen-teaminfo">GF</div>
                    <div class="col klasemen-teaminfo">GA</div>
                    <div class="col klasemen-teaminfo">GD</div>
                    <div class="col klasemen-teaminfo">P</div>
                  </div>
                </div>
                <div class="row" id="klasemen-data">
    `;
    data.standings[0].table.forEach(table => {
        statistikHTML += `
                  <div class="row klasemen-row">
                    <div class="col klasemen-pos">${table.position}</div>
                    <div class="col klasemen-badge"><a href="https://darkerside.github.io/project/pwa//team.html?id=${table.team.id}"><img src="${table.team.crestUrl}" alt="${table.team.name}"></a></div>
                    <div class="col klasemen-team"><a href="https://darkerside.github.io/project/pwa//team.html?id=${table.team.id}">${table.team.name}</a></div>
                    <div class="col klasemen-teaminfo">${table.playedGames}</div>
                    <div class="col klasemen-teaminfo">${table.won}</div>
                    <div class="col klasemen-teaminfo">${table.draw}</div>
                    <div class="col klasemen-teaminfo">${table.lost}</div>
                    <div class="col klasemen-teaminfo">${table.goalsFor}</div>
                    <div class="col klasemen-teaminfo">${table.goalsAgainst}</div>
                    <div class="col klasemen-teaminfo">${table.goalDifference}</div>
                    <div class="col klasemen-teaminfo">${table.points}</div>
                  </div>
            `;
    });
    statistikHTML += `
                </div>
              </div>
            </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #statistik
    $('#statistik').removeClass("t-center");
    document.getElementById("statistik").innerHTML = statistikHTML;
}

//Generated List for Scorrer Info
function listScorrer(data){
	let i = 1;
	let scorrerHTML = `
              <div class="card gradient-blue-teal-light">
                <div class="card-content white-text overflow-a">
                  <div class="row p0 m0" id="score-head">
                    <div class="row scorrer-row" id="scorrer-header">
                      <div class="col scorrer-pos"></div>
                      <div class="col scorrer-name">Name</div>
                      <div class="col scorrer-number">Number</div>
                      <div class="col scorrer-post">Post</div>
                      <div class="col scorrer-team">Club</div>
                      <div class="col scorrer-goal">Goals</div>
                    </div>
                  </div>
                  <div class="row p0 m0" id="scorrer-data">
              `;
    i = 1;
    data.scorers.forEach(scorers => {
        if(scorers.player.shirtNumber===null){scorers.player.shirtNumber = "?";}
        scorrerHTML += `
                  <div class="row scorrer-row">
                      <div class="col scorrer-pos">${i}</div>
                      <div class="col scorrer-name">${scorers.player.name}</div>
                      <div class="col scorrer-number">${scorers.player.shirtNumber}</div>
                      <div class="col scorrer-post">${scorers.player.position}</div>
                      <div class="col scorrer-team">${scorers.team.name}</div>
                      <div class="col scorrer-goal">${scorers.numberOfGoals}</div>
                    </div>
                  `;
              i++;
    });
    scorrerHTML += `
                  </div>
                </div>
              </div>  
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #topscorrer
    $('#topscorrer').removeClass("t-center");
    document.getElementById("topscorrer").innerHTML = scorrerHTML;
}

//Generated List for Winner Info
function listWinner(data){
	let cStart, cEnd, sStart, sEnd;
	cStart = data.currentSeason.startDate.split("-").reverse().join("-");
    cEnd = data.currentSeason.endDate.split("-").reverse().join("-");
    let competitionHTML = `
            <div class="col s12 m3 mb2">
              <img class="logo-img" alt="Premier_League_Logo" src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg">
            </div>
            <div class="col s12 m9 pl1">
              <div class="row m0"><h4 class="ttext-title-dark">${data.name}</h4></div>
              <div class="row m0"><h6 class="ttext-info-dark">${data.area.name}</h6></div>
              <div class="row m0"><h6 class="ttext-info-dark">${cStart}&nbsp&nbsp-&nbsp&nbsp${cEnd}</h6></div>
            </div>
    `;
    // Sisipkan komponen html ke dalam elemen dengan id #competitioninfo
    $('#competitioninfo').removeClass("t-center");
    document.getElementById("competitioninfo").innerHTML = competitionHTML;

    let winnerHTML = `
            <div class="card gradient-orange-amber-darken overflow-a">
              <div class="card-content white-text" id="winner-data">
                <div class="divider-dark"></div>
    `;
    data.seasons.forEach(seasons => {
            sStart = seasons.startDate.split("-").reverse().join("-");
            sEnd = seasons.endDate.split("-").reverse().join("-");
            if(seasons.winner === null){
              winnerHTML += `
                  <div class="row row-winner">
                      <div class="col s5 m4 center-align season-year">${sStart} - ${sEnd}</div>
                      <div class="col s1 m1"></div>
                      <div class="col s6 m7"></div>
                  </div>
                  <div class="divider-dark"></div>
                  `;
            } else {
              if(seasons.winner.crestUrl === null){seasons.winner.crestUrl = "https://upload.wikimedia.org/wikipedia/en/0/0f/Blackburn_Rovers.svg"};
              winnerHTML += `
                  <div class="row row-winner">
                      <div class="col s5 m4 center-align season-year">${sStart} - ${sEnd}</div>
                      <div class="col s1 m1"><a href="https://darkerside.github.io/project/pwa/team.html?id=${seasons.winner.id}"><img class="winner-badge right" src="${seasons.winner.crestUrl}" alt="${seasons.winner.name}"></a></div>
                      <div class="col s6 m7"><a href="https://darkerside.github.io/project/pwa/team.html?id=${seasons.winner.id}">${seasons.winner.name}</a></div>
                  </div>
                  <div class="divider-dark"></div>
                  `;
            };
    });
    winnerHTML += `
              </div>
            </div> 
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #compwinner
    $('#compwinner').removeClass("t-center");
    document.getElementById("compwinner").innerHTML = winnerHTML;
}

//Generated List for Saved Team data
function listSavedTeam(team){
	let savedHTML = "";
  if(team.length === 0){
    savedHTML += `
      <div class="row card saved-data">
        <div class="saved-content">
                <div class="col s12 center-align saved-title">No Saved Team</div>
        </div>
      </div>
    `;
  } else {
    team.forEach(team => {
      savedHTML += `
            <div class="row card saved-data">
              <div class="saved-content">
                <div class="col s2 center-align"><a href="https://darkerside.github.io/project/pwa/team.html?id=${team.id}&saved=true"><img class="saved-badge" src="${team.crestUrl}" alt="${team.name}"></a></div>
                <div class="col s8 truncate saved-title"><a href="https://darkerside.github.io/project/pwa/team.html?id=${team.id}&saved=true">${team.name}</a></div>
                <div class="col s2 saved-del right"><i class="mdi mdi-delete red-text text-darken-4" id="${team.id}" target="teams" target2="${team.name}"></i></div>
              </div>
            </div>
      `;
    });
  }
    // Sisipkan komponen card ke dalam elemen dengan id #saveddata
    document.getElementById("saveddata").innerHTML = savedHTML;
}

//Generated List for Saved Player data
function listSavedPlayer(player){
  let savedHTML = "";
  if(player.length === 0){
    savedHTML += `
      <div class="row card saved-data">
        <div class="saved-content">
                <div class="col s12 center-align saved-title">No Saved Player</div>
        </div>
      </div>
    `;
  } else {
    player.forEach(player => {
      savedHTML += `
            <div class="row card saved-data">
              <div class="saved-content">
                <div class="col s2 center-align"><a href="https://darkerside.github.io/project/pwa/player.html?id=${player.id}&saved=true"><img class="saved-badge" alt="player_img" src="https://darkerside.github.io/project/pwa/assets/images/player.png"></a></div>
                <div class="col s8 truncate saved-title"><a href="https://darkerside.github.io/project/pwa/player.html?id=${player.id}&saved=true">${player.name}</a></div>
                <div class="col s2 saved-del right><i class="mdi mdi-delete red-text text-darken-4" id="${player.id}" target="players" target2="${player.name}"></i></div>
              </div>
            </div>
      `;
    });
  }
    // Sisipkan komponen card ke dalam elemen dengan id #saveddata
    document.getElementById("saveddata").innerHTML = savedHTML;
}

//Generated List for Saved Matches data
function listSavedMatch(match){
  let savedHTML = "";
  if(match.length === 0){
    savedHTML += `
      <div class="row card saved-data">
        <div class="saved-content">
                <div class="col s12 center-align saved-title">No Saved Match</div>
        </div>
      </div>
    `;
  } else {
    match.forEach(match => {
      savedHTML += `
            <div class="row card saved-data">
              <div class="saved-content">
                <a href="https://darkerside.github.io/project/pwa/match.html?id=${match.id}&saved=true"><div class="col s5 truncate saved-title">${match.homeTeam.name}</div></a>
                <a href="https://darkerside.github.io/project/pwa/match.html?id=${match.id}&saved=true"><div class="col s1 saved-title center-align">-</div></a>
                <a href="https://darkerside.github.io/project/pwa/match.html?id=${match.id}&saved=true"><div class="col s5 saved-title right-align truncate">${match.awayTeam.name}</div></a>
                <div class="col s1 saved-del right"><i class="mdi mdi-delete red-text text-darken-4" id="${match.id}" target="matches" target2="${match.id}"></i></div>
              </div>
            </div>
      `;
    });
  }
    // Sisipkan komponen card ke dalam elemen dengan id #saveddata
    document.getElementById("saveddata").innerHTML = savedHTML;
}