import http from "./httpService";
import config from "./../config.json";
import { signIn } from "./query";
import CookieService from "./cookieService";

const cookieService = CookieService.getService();

export async function login(encryptedText) {
  const headers = {
    userData: encryptedText,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  };
  const useCase = "signIn";
  const { data: response  } = await http.post(config.apiUrl, signIn, {
    headers: headers,
  });
  //response.data.signin
  if(response.data.signin=== null){
    if(response.errors !== null){
      response.errors.map(({ message, locations, path, extensions }) =>{
        //if extensions is not null
        if(extensions !== null){
        console.log(extensions.message)
        // console.log(
        //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} , extensions: ${extensions}` 
        // ),
        }else {
          console.log("unexpected error")
        }
      });
    }
    else{
      console.log("unexpected error")
    }
  }
  cookieService.setCookie("cookieAT", response.data.signin.accessToken, response.data.signin.expiresIn)
  cookieService.setCookie("cookieRT", response.data.signin.refreshToken, response.data.signin.refreshExpiresIn)
  //console.log("UserId:"+ response.data.signin.userId )
  sessionStorage.setItem('UserId', response.data.signin.userId);
}

export default login;
