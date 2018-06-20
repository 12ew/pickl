const container = document.querySelector('#container')
const categories = document.querySelector('#categories')
const games = document.querySelector('#games')

// const cardBody = document.querySelector('.card-body')

document.addEventListener('DOMContentLoaded', onLoad)

function onLoad() {
renderPosts()
  //renderGames()
  // renderOnePost(2)
}

function renderPosts() {
  return postAdapter.getAllPosts()
    .then(games => {
      games.forEach(game => {
        let gameCard = renderGameTemplate(game)
        document.querySelector('.row').innerHTML += gameCard
        bothTeams(game.home_team_id, game.id, 'home')
        bothTeams(game.away_team_id, game.id, 'away')

      })
    })
}

function renderGameTemplate(game) {
  return `<div class="col-sm-3" data-game-id=${game.id}>
    <div class="card">
        <img class="card-img-top team_1" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap">

        <img class="card-img-top team_2" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap">



        <div class="card-body">
          <h1 class='home-team' data-game-home-id=${game.home_team_id}></h1>
          <h2>vs</h2>
          <h1 class='away-team' data-game-away-id=${game.away_team_id}></h1>
        </div>

      </div>
  </div>`
}


function bothTeams(id, gameId, homeOrAway) {
  return teamAdapter.oneTeam(id)
       .then(team => {
         let q = temp(team)
         // console.log(team);
         document.querySelector(`[data-game-id="${gameId}"] [data-game-${homeOrAway}-id]`).innerHTML = q
       })
}


function temp(team) {
  return`<p>${team.name}</p>`
}
// function callAndLoad(id) {
//   return renderOnePost(id)
//   .then( () => {
//     postTemplate(home)
//   })
// }
//
// function postTemplate(home) {
//   document.querySelector('.card-body').innerHTML = `<h5 class="card-title">${home.name} Votes</h5>
//     <p class="card-text">${home.name} vs. ${home.name}</p>`
// }
//
// function simpleTemplate(info) {
//   return `<p> ${info} </p>`
// }
//
// function renderOnePost(id) {
//   return postAdapter.getPost(id)
//   .then(game => {
//     //home = getTeam(game.home_team_id)
//     home = getTeamInfo(id)
//     //away = getTeam(game.away_team_id)
//
//   })
// }
//
// function renderGames() {
//   postAdapter.getAllPosts()
//     .then(games => {
//       games.forEach(game => {
//         home = getTeamInfo(game.home_team_id)
//         away = getTeamInfo(game.away_team_id)
//       })
//     })
// }
//
// function getTeamInfo(id) {
//   let testOb = {}
//   teamAdapter.oneTeam(id)
//   .then(team => {
//     testOb['name'] = team.name
//     testOb['city'] = team.city
//     testOb['abb'] = team.abbreviation
//   })
//   return testOb
// }
//
//
// function getTeam(id) {
//   teamAdapter.oneTeam(id)
//     .then(team => {
//       let aTeam = postTemplate(team)
//
//       document.querySelector('.card-body').innerHTML = aTeam
//   })
// }
