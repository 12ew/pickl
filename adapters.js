const baseUrl = `http://localhost:3000/api/v1/`
// const userUrl = `${baseUrl}users`   // baseUrl + 'users'
const commentUrl = `${baseUrl}comments/` // baseUrl + 'posts/post_id/comments/'
// const allCommentsUrl = `${baseUrl}posts/`
const allPostsUrl = `${baseUrl}posts`
const postUrl = `${allPostsUrl}/`
const oneTeamUrl = `${baseUrl}teams/`


// const userAdapter = {
//   createUser: function createUser(data) {
//     let options = {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'content-type': 'application/json'
//       }
//     }
//
//     return fetch(userUrl, options)
//       .then(resp => resp.json())
//   }
// }


const commentAdapter = {
  createComment: function createComment(data) {
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    }

    return fetch(commentUrl, options)
  },

  getAllComments: function getAllComments() {
    return fetch(commentUrl)
      .then(resp => resp.json())
  }
}

const postAdapter = {
  createPost: function createPost(data) {
    let options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }

    return fetch(allPostsUrl, options)
      .then(resp => resp.json())
  },

  getAllPosts: function showAllPosts() {
    return fetch(allPostsUrl)
      .then(resp => resp.json())
  },

  getPost: function showPost(id) {
    return fetch(postUrl + id)
      .then(resp => resp.json())
      // .then(console.log)
  },

  updatePost: function updatePost(data, id) {
    let options = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }

    return fetch(postUrl + id, options)
      .then(resp => resp.json())
  }
}

const teamAdapter = {
  oneTeam: function oneTeam(id) {
    return fetch(oneTeamUrl + id)
      .then(resp => resp.json())
  }
}

// const likesAdapter = {
//     createLike: function createLike(data) {
//       let options = {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//           'content-type': 'application/json'
//         }
//     }
//       return fetch(postUrl, options)
//         .then(resp => resp.json())
//   }
// }
