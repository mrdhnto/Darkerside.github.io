function generatePlayer(data){
	let birth = new Date(data.dateOfBirth);
	let day = new Date();
	let age = day.getFullYear() - birth.getFullYear();
	if(data.shirtNumber === null){data.shirtNumber = "?"};
	if(data.position === null){data.position = ""};

	let playerHTML = `
        <div class="col s12">
	      <div class="card gradient-cyan-teal-light">
	        <div class="card-content">
	          <img src="/assets/images/player.png" class="left" id="player-icon"><span class="card-title">${data.name}</span>
	            ${data.nationality}, ${age} year old | ${data.shirtNumber} ${data.position}
	        </div>
	      </div>
	    </div>
        `
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = playerHTML;
}
