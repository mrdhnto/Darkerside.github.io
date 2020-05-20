//Main.js Script for the web
document.addEventListener("DOMContentLoaded", function() {
  // REQUEST API UNTUK PERTAMA KALI
  const page = window.location.hash.substr(1);
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  let item;

  if(pageindex === 0){
  //console.log("you're in home.html");
  } else if (pageindex === 1){
  //console.log("you're in team.html");
    if(isFromSaved){
      $('#save').addClass("d-none");
      // ambil team lalu tampilkan
      getSavedDataById("teams");
    } else {
      item = getTeamById();
      //isSavedAlready("teams");
    }

    save.onclick = function() {
    //console.log("Tombol FAB di klik.");
      item.then(function(team) {
        let savedto = "teams";
        saveForLater(team, savedto);
      });
              
      $(this).addClass("d-none");
    };

  } else if (pageindex === 2){
  //console.log("you're in person.html");
    if(isFromSaved){
      $('#save').addClass("d-none");
      // ambil artikel lalu tampilkan
      getSavedDataById("players");
    } else {
      item = getPlayerById();
      //isSavedAlready("players");
    }

    save.onclick = function() {
    //console.log("Tombol FAB di klik.");
      item.then(function(person) {
        let savedto = "players";
        saveForLater(person, savedto);
      });
              
      $(this).addClass("d-none");
    };

  } else if (pageindex === 3) {
  //console.log("you're in match.html");
    if(isFromSaved){
      $('#save').addClass("d-none");
      // ambil artikel lalu tampilkan
      getSavedDataById("matches");
    } else {
      item = getMatchById();
      //isSavedAlready("matches");
    }
    
    save.onclick = function() {
    //console.log("Tombol FAB di klik.");
      item.then(function(match) {
        let savedto = "matches";
        saveForLater(match.match, savedto);
      });
              
      $(this).addClass("d-none");
    };

  } else {
    console.log("You're Lost!")
  };

});

//Jquery script to make more simple
$(document).ready(function() {

  //navigation active effect
  $(".sidenav").on("click", ".link", function(){
    $(".link").removeClass("active");
    $(this).addClass("active");
  });

  //navigation tab on statistic pages
  $("#body-content").on("click", ".icon-tabs-nav", function(){
    //console.log($(this).attr("target"))
    $('.icon-tabs-nav').removeClass("active");
    $(this).addClass("active");
    $('.content-tabs').addClass("d-none");
    $('#' + $(this).attr("target")).removeClass("d-none");
  });

  //navigation tab on team.html
  $("#body-content").on("click", ".icon-tabs-nav-phone", function(){
    //console.log($(this).attr("target"))
    $('.icon-tabs-nav-phone').removeClass("active");
    $(this).addClass("active");
    $('.content-tabs-phone').addClass("phone-d-none");
    $('#' + $(this).attr("target")).removeClass("phone-d-none");
  });

  //delete function on saved pages
  $("#body-content").on("click", ".mdi-delete", function(){
    deleteData($(this).attr("id"), $(this).attr("target"));
    if($(this).attr("target") === "teams") {
      M.toast({html: $(this).attr("target2") + '&nbspberhasil dihapus!'})
      getSavedTeam();
    } else if($(this).attr("target") === "players") {
      M.toast({html: $(this).attr("target2") + '&nbspberhasil dihapus!'})
      getSavedPlayer();
    } else if($(this).attr("target") === "matches") {
      M.toast({html: 'Match ID&nbsp' + $(this).attr("target2") + '&nbspberhasil dihapus!'})
      getSavedMatch();
    }
  });

  //load Saved Club and hide this button
  $("#body-content").on("click", "#btn-club", function(){
    $('#btn-club').addClass("d-none");
    $('#btn-player').removeClass("d-none");
    getSavedTeam();
  });

  //load Saved Players and hide this button
  $("#body-content").on("click", "#btn-player", function(){
    $('#btn-player').addClass("d-none");
    $('#btn-match').removeClass("d-none");
    getSavedPlayer();
  });

  //load Saved Match and hide this button
  $("#body-content").on("click", "#btn-match", function(){
    $('#btn-match').addClass("d-none");
    $('#btn-club').removeClass("d-none");
    getSavedMatch();
  });

});