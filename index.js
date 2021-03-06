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
        game.time = formatTime(game.time)
      })
      let today = getToday()
      games.forEach(game => {

          if (game.date === today) {
          let newTime = game.time
          let gameCard = renderGameTemplate(game, newTime)
          document.querySelector('.row').innerHTML += gameCard
          bothTeams(game.home_team_id, game.id, 'home')
          bothTeams(game.away_team_id, game.id, 'away')
        }
      })
    }).then(() => {
      addClickEvents()
    })
}

function getToday() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today
}


function renderGameTemplate(game, gameTime) {
  return `<div class="col-sm-3" data-game-id=${game.id} data-help=${game.id}>
    <div class="card" data-help=${game.id}>
        <img data-image-home-id=${game.home_team_id} class="card-img-top team_1 game-number${game.id}"  alt="Card image cap" data-help=${game.id}>
        <img data-image-away-id=${game.away_team_id} class="card-img-top team_2 game-number${game.id}"  alt="Card image cap" data-help=${game.id}>
        <div class="card-body game-number${game.id}" data-help=${game.id}>
          <h1 class='home-team game-number${game.id}' data-game-home-id=${game.home_team_id} data-help=${game.id}></h1>
          <h2 data-help=${game.id}>vs</h2>
          <h1 class='away-team game-number${game.id}' data-game-away-id=${game.away_team_id} data-help=${game.id}></h1>
        </div>
        <h4>${game.home_likes + game.away_likes} Votes</h4>
        <h6>${gameTime}</h6>
      </div>
  </div>`
}


function bothTeams(id, gameId, homeOrAway) {
  return teamAdapter.oneTeam(id)
       .then(team => {
         let teamName = getTeamName(team)
         let teamImage = getTeamImage(team)
         document.querySelector(`[data-game-id="${gameId}"] [data-image-${homeOrAway}-id]`).src = teamImage
         document.querySelector(`[data-game-id="${gameId}"] [data-game-${homeOrAway}-id]`).innerHTML = teamName
       })
}

function getTeamName(team) {
  return`${team.name}`
}

function getTeamImage(team) {
  return`${team.image}`
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
    let page = gameTemplate(game)
     document.querySelector('.row').innerHTML = page
    teamForGamePage(game.home_team_id, game.id, 'home')
    teamForGamePage(game.away_team_id, game.id, 'away')
    document.querySelector('#counter-home').innerText = game.home_likes
    document.querySelector('#counter-away').innerText = game.away_likes
    handleHomeLikeCick(game.id)
    handleAwayLikeCick(game.id)
    handleCommentSubmitButton()
    renderComments(game.id)
    backClick()

  })

}


function handleHomeLikeCick(gameId) {
  const homeLikeButton = document.querySelector('#home_like')

  homeLikeButton.addEventListener('click', handleClick)


  function handleClick(event) {
    document.querySelector('#counter-home').innerText = parseInt(document.querySelector('#counter-home').innerText) + 1
    let q = event.target.getAttribute('data-help')
    console.log(q);
    // debugger
    let data = {home_likes: parseInt(document.querySelector('#counter-home').innerText)}
    console.log(data);
    postAdapter.updatePost(data, q)
    .then(console.log)
  }
}

function handleAwayLikeCick() {
  const awayLikeButton = document.querySelector('#away_like')

  awayLikeButton.addEventListener('click', handleClick)

  function handleClick(event) {
      document.querySelector('#counter-away').innerText = parseInt(document.querySelector('#counter-away').innerText) + 1
      let q = event.target.getAttribute('data-help')
      console.log(q);
      // debugger
      let data = {away_likes: parseInt(document.querySelector('#counter-away').innerText)}
      console.log(data);
      postAdapter.updatePost(data, q)
      .then(console.log)
  }
}

function getToday() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today
}

function formatTime(time) {
  let amOrPm = 'AM'
  let newTime = time.split('T')
  newTime = newTime[1].split('.')
  newTime = newTime[0].split(':')
  let hour = parseInt(newTime[0])
  if (hour > 12) {
    hour -= 12
    amOrPm = 'PM'
  }
  let formattedTime = hour + ':' + newTime[1] + amOrPm
  return formattedTime
}

function gameTemplate(game) {
  return  `<div class="col-md-12" id="container">
        <div class='row'>
          <div class='col-sm-2'>
            <button id='go-back'>Back</button>
          </div>
        </div>
        <div id="categories">

        </div>

        <div id="games">


          <div class="card-deck text-center">
            <div class="card-deck ">
              <div class="row">

              <div class="col-sm-5" data-game-id=${game.id}>
                  <div class="card home_team">
                    <h4 id='home-name'></h4>
                    <img id='home-image' class="card-img-top" src="" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">Votes</h5>

                      <h1 id='counter-home'>
            </h1>
                      <button class='<3' id="home_like" data-help=${game.id} data-home-likes-id=${game.home_team_id}>❤️ </button>
                      <br>
                      <br>
                      <p class="card-text font-weight-bold data-team-home-id=${game.home_team_id}"></p>
                    </div>
                  </div>
                </div>

                <div class="col-sm-5">
                  <div class="card away_team">
                    <h4 id='away-name'></h4>
                      <img id='away-image' class="card-img-top" src="" alt="Card image cap">
                      <div class="card-body">
                        <h5 class="card-title">Votes</h5>

                        <h1 id='counter-away'></h1>
                        <button class='<3' id="away_like" data-help=${game.id} data-away-likes-id=${game.away_team_id}> ⚾ </button>
                        <br>
                        <br>
                        <p class="card-text font-weight-bold data-team-away-id=${game.away_team_id}"></p>
                      </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>


          <div>
            <h3>join the conversation</h3>
              <div id='list' class='comments' data-help=${game.id}></div>

              <h6>leave a comment</h6>


              <form>
                <div class="row">
                  <div class="form-group col-sm-9">
                    <label for="text_area"></label>

                    <textarea class="form-control" id="text_area" rows="2"></textarea>
                    <hr>
                    <button type="submit" class="btn btn-primary" data-help=${game.id}>Submit</button>

                  </div>
              </form>
              <br>
              <div>
                <ul class="commentsBody">

                </ul>
              </div>

            </div>
          </div>

            </div>
          </div>

          <br>

          <div class="row">
           <div class="col s12 m12">
             <div class="card-panel blue">
               <span class="white-text"> <h6></h6>
               </span>
             </div>
           </div>
          </div>

          <br>
          <br>

        </div>
      </div>`
}


function teamForGamePage(id, gameId, homeOrAway) {
  return teamAdapter.oneTeam(id)
       .then(team => {
         let teamName = getTeamName(team)
         let teamImage = getTeamImage(team)
         document.querySelector(`#${homeOrAway}-image`).src = teamImage
         document.querySelector(`#${homeOrAway}-name`).innerHTML = teamName
       })
}


function handleCommentSubmitButton() {
  const submitForm = document.querySelector('form')

  submitForm.addEventListener('submit', handleButton)

    function handleButton(event) {
      event.preventDefault()

      let textarea = document.querySelector('.form-control')

      let commentContent = `<li>${textarea.value}</li>`

      btn = document.querySelector('.btn')
      id = parseInt(btn.getAttribute('data-help'))
      let data = {
        post_id: id,
        user_id: 1,
        content: textarea.value
      }

      let commentsBody = document.querySelector('.commentsBody')

      commentsBody.innerHTML += commentContent

      commentAdapter.createComment(data)

        textarea.value = ''
  }
}


function renderComments(id) {
  let commentsBody = document.querySelector('.commentsBody')

  commentAdapter.getAllComments()
    .then(comments => {
      comments.forEach(comment => {
        if (comment.post_id === id) {
          commentsBody.innerHTML += `<li>${comment.content}</li>`
        }
    })
  })
}

function backClick() {
  document.addEventListener('click', (e) => {
    console.log(e.target);

    if (e.target.id === 'go-back') {
      console.log('HELLLLLOOOOO');
      // renderPosts()
      location.reload(false)
    }
  })
  // let back = document.querySelector('#go-back')
  // back.addEventListener('click', (e) => {
  //   console.log(e.target);
  //   renderPosts()
  // })
}
