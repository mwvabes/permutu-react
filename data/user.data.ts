import axios from 'axios'

export const getLoggedIn = () => {

  return axios
  .get(`${process.env.COMMUNITY_API_PUBLIC_ADDRESS}/users/loggedInUser`)
  .then(response => {   
    return response.data
  }).catch((e) => {
    return e
    
  })

}
