function generateTeam(data){
	let i = 1;
	let mailto;

	if(data.email === null || data.email === "-"){
		data.email = "-";
		mailto = "#";
	} else {
		mailto = "mailto:" + data.email;
	}
	let teamHTML = `
        <div class="col s12">
	        <div class="card white">
	          <div class="card-content">
	          <div class="row">
	            <div class="col s12 m3 mb2">
	              	<img class="logo-img" src="${data.crestUrl}">
	            </div>
	            <div class="col s12 m9 pl1 pt1">
	              <div class="row m0"><h4 class="ttext-title-dark">${data.name}</h4></div>
	              <div class="row m0"><h6 class="ttext-info-dark">a.k.a ${data.shortName}</h6></div>
	              <div class="row m0"><h6 class="ttext-info-dark">Home : ${data.venue}</h6></div>
	            </div>
	          </div>
	          <div class="row mt2 mb2 phone-d-show">
	          	<div class="col s12 center">
	          		<i class="mdi mdi-city icon-tabs-nav-phone active" target="infos-cont"></i>
	          		<i class="mdi mdi-account-multiple icon-tabs-nav-phone" target="squad-cont-wrapper"></i>
	          		<i class="mdi mdi-sword-cross icon-tabs-nav-phone" target="match-cont-wrapper"></i>
	          	</div>
	      	  </div>
	          <div class="row mb0">
	            <div class="col s12 m3 content-tabs-phone" id="infos-cont">
	            <div class="p1" id="team-infos">
	              <div class="row ltext-title">Club Colors :</div>
	              <div class="row ltext-info">${data.clubColors}</div>
	              <div class="row ltext-title">Founded :</div>
	              <div class="row ltext-info">${data.founded}</div>
	              <div class="row ltext-title">Address :</div>
	              <div class="row ltext-info">${data.address}, ${data.area.name}</div>
	              <div class="row ltext-title">Phone :</div>
	              <div class="row ltext-info">${data.phone}</div>
	              <div class="row ltext-title">E-Mail :</div>
	              <div class="row ltext-info"><a href="${mailto}">${data.email}</a></div>
	              <div class="row ltext-title">WEB :</div>
	              <div class="row ltext-info"><a href="${data.website}">${data.website}</a></div>
	            </div>
	            </div>
	            <div class="col s12 m9 content-tabs-phone phone-d-none" id="squad-cont-wrapper">
	            <div class="p1" id="squad-cont">
	              <h5 class="mt0 bold">Squad Info</h5>
	                <div class="row rtext-title r-even" >
	                  <div class="col squad-no">No</div>
	                  <div class="col squad-name">Name</div>
	                  <div class="col squad-pos">Position</div>
	                </div>
	                <div class="rtext-info" id="squad-data">
	                  
	                `

	data.squad.forEach(squad => {
		if(i % 2 === 0){
			rclass = "r-even";
		}else{
			rclass = "r-odd";
		}

		if(squad.role === "COACH"){
			squad.role = "Coach";
		} else if (squad.role === "ASSISTANT_COACH"){
			squad.role = "Ast. Coach";
		}

		if(squad.position === null){squad.position = squad.role};
		if(squad.shirtNumber === null){squad.shirtNumber = " "};

		teamHTML += `
					  <div class="row rtext-data ${rclass}">
	                    <div class="col squad-no">${squad.shirtNumber}</div>
	                    <div class="col squad-name"><a href="https://darkerside.github.io/project/pwa/player.html?id=${squad.id}">${squad.name}</a></div>
	                    <div class="col squad-pos">${squad.position}</div>
	                  </div>
		`
		i++;
	});

	teamHTML += `
	                </div>
	            </div>
	            </div>
				<div class="col s12 m12 content-tabs-phone phone-d-none t-center" id="match-cont-wrapper">
					<div class="preloader-wrapper small active">
				        <div class="spinner-layer spinner-orange-only">
				          <div class="circle-clipper left">
				            <div class="circle"></div>
				          </div><div class="gap-patch">
				            <div class="circle"></div>
				          </div><div class="circle-clipper right">
				            <div class="circle"></div>
				          </div>
				        </div>
				    </div>
				</div>
	          </div>
	        </div>
	        </div>
	      </div>
          `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
    
    const urlParams = new URLSearchParams(window.location.search);
    const teamID = urlParams.get("id");
	getMatchList(teamID);
}
