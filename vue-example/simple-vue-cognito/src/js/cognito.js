import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute
} from "amazon-cognito-identity-js"

import config from "./config.js";

export default class CognitoAuth {
  constructor() {
    this.userSession = null
    this.configure(config)
  }

  isAuthenticated(cb) {
    let cognitoUser = this.getCurrentUser()
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          return cb(err, false)
        }
        return cb(null, true)
      })
    } else {
      cb(null, false)
    }
  }

  configure(config) {
    this.userPool = new CognitoUserPool({
      UserPoolId: config.UserPoolId,
      ClientId: config.ClientId
    })
  }

  signup(username, email, password, cb) {
    let attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ]

    this.userPool.signUp(username, password, attributeList, null, cb)
  }

  authenticate(username, password, cb) {
    const authData = { Username: username, Password: password }
    let authDetails = new AuthenticationDetails(authData)
    let userData = { Username: username, Pool: this.userPool }
    let cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        cb(null, {
          'message': 'access_token : ' + result.getAccessToken().getJwtToken(),
          'result': result
        })
      },
      onFailure: (err) => {
        cb(err)
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        cb(null, {
          'message': 'New Password Is Required',
          userAttributes,
          requiredAttributes
        })
      }
    })
  }

  getCurrentUser() {
    return this.userPool.getCurrentUser()
  }

  signOut() {
    this.getCurrentUser().signOut()
  }
}