const container = document.querySelector('#container')
// const GameCard = document.querySelector('.game_card')
const games = document.querySelector('#games')

document.addEventListener('DOMContentLoaded', onLoad)

function onLoad() {
renderGame(1)

}


function renderGame(id) {
  return postAdapter.getPost(id)
    .then(game => {
        let gameCard = renderTeamTemplate(game)
        document.querySelector('.row').innerHTML += gameCard
        bothTeams(game.home_team_id, game.id, 'home')
        bothTeams(game.away_team_id, game.id, 'away')

      })
  }


function renderTeamTemplate(game) {
  return  `<div class="col-sm-5" data-game-id=${game.id}>
      <div class="card home_team">
        <img class="card-img-top" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Votes</h5>

          <h1 id='counter'>
            540
          </h1>
          <button id='<3' > ❤️ </button>
          <br>
          <br>
          <p class="card-text font-weight-bold data-team-home-id=${game.home_team_id}"></p>
        </div>
      </div>
    </div>

    <div class="col-sm-5">
      <div class="card away_team">
          <img class="card-img-top" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Votes</h5>

            <h1 id='counter'>
              130
            </h1>
            <button id='<3' > ❤️ </button>
            <br>
            <br>
            <p class="card-text font-weight-bold data-team-away-id=${game.away_team_id}"></p>
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
