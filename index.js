// const cardBody = document.querySelector('.card-body')

document.addEventListener('DOMContentLoaded', onLoad)

function onLoad() {
  const container = document.querySelector('#container')
  const categories = document.querySelector('#categories')
  const games = document.querySelector('#games')
  const body = document.querySelector('#body')


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
    }).then(() => {
      addClickEvents()
    })
}

function renderGameTemplate(game) {
  return `<div class="col-sm-3" data-game-id=${game.id} data-help=${game.id}>
    <div class="card" data-help=${game.id}>
        <img class="card-img-top team_1 game-number${game.id}" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap" data-help=${game.id}>
        <img class="card-img-top team_2 game-number${game.id}" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap" data-help=${game.id}>
        <div class="card-body game-number${game.id}" data-help=${game.id}>
          <h1 class='home-team game-number${game.id}' data-game-home-id=${game.home_team_id} data-help=${game.id}></h1>
          <h2 data-help=${game.id}>vs</h2>
          <h1 class='away-team game-number${game.id}' data-game-away-id=${game.away_team_id} data-help=${game.id}></h1>
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
  return`${team.name}`
}

function addClickEvents() {
  let divs = document.getElementsByClassName('card')
  for (let i = 0; i < divs.length; i++) {
    divs[i].onclick = (e) => {
    let target = e.target
      let gameNumber = target.getAttribute('data-help')
      renderGamePage(gameNumber)
    }
  }
}

function renderGamePage(id) {
  return postAdapter.getPost(id)
  .then(game => {
    let page = gameTemplate(game.id)
     document.querySelector('.row').innerHTML = page
    teamForGamePage(game.home_team_id, game.id, 'home')
    teamForGamePage(game.away_team_id, game.id, 'away')
  }).then(() => {
    handleHomeLikeCick()
    handleAwayLikeCick()
  })

}




function handleHomeLikeCick() {
  const homeLikeButton = document.querySelector('#home_like')

  homeLikeButton.addEventListener('click', handleClick)

  function handleClick(event) {
    console.log(event.target)
  }
}

function handleAwayLikeCick() {
  const awayLikeButton = document.querySelector('#away_like')

  awayLikeButton.addEventListener('click', handleClick)

  function handleClick(event) {
    console.log(event.target)
  }
}



function gameTemplate(game) {
  return  `<div class="col-sm-5" data-game-id=${game.id}>
      <div class="card home_team">
        <img class="card-img-top" src="https://www.mlbstatic.com/mlb.com/images/share/147.jpg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Votes</h5>

          <h1 id='counter'>
            540
          </h1>
          <button class='<3' id="home_like" data-home-likes-id=${game.home_team_id}> ❤️ </button>
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
            <button class='<3' id="away_like" data-away-likes-id=${game.away_team_id}> ❤️ </button>
            <br>
            <br>
            <p class="card-text font-weight-bold data-team-away-id=${game.away_team_id}"></p>
          </div>
        </div>
      </div>`
}

function teamForGamePage(id, gameId, homeOrAway) {
  return teamAdapter.oneTeam(id)
       .then(team => {
         let q = temp(team)
         document.querySelector(`[data-game-${homeOrAway}-id]`).innerHTML = q
       })
}
