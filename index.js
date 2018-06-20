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
        bothTeams(game.home_team_id)
        bothTeams2(game.away_team_id)
      })
    })
}

function bothTeams(id) {
  teamAdapter.oneTeam(id)
       .then(team => {
         let q = temp(team)
         document.querySelector('#home-team').innerHTML = q
       })
}

function bothTeams2(id) {
  teamAdapter.oneTeam(id)
       .then(team => {
         let q = temp(team)
         document.querySelector('#away-team').innerHTML = q
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
