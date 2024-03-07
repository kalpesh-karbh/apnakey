import fire from '../configs/firebase/fire'

export const isObjEmpty = obj => Object.keys(obj).length === 0

// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return localStorage.getItem('uid')
}

export const getUserData = () => {
  fire.auth().onAuthStateChanged(user => {
    return user
  })
}

export const getUserIdToken = async () => {
  return new Promise((resolve, reject) => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        user
          .getIdToken()
          .then(token => {
            console.log(token)
            resolve(token) // Resolve the Promise with the token
          })
          .catch(error => {
            console.error('Error getting ID token:', error)
            reject(error) // Reject the Promise with the error
          })
      } else {
        console.log('User is not signed in.')
        reject(new Error('User is not signed in.')) // Reject if user is not signed in
      }
    })
  })
}

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
// export const getHomeRouteForLoggedInUser = userRole => {
//   if (userRole === 'admin') return '/'
//   if (userRole === 'client') return { name: 'access-control' }
//   return { name: 'auth-login' }
// }
