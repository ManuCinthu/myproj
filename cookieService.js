import Cookies from 'universal-cookie';
const cookies = new Cookies();

const CookieService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    
    function _setCookie(cname, cvalue, seconds) {
      cookies.set(cname, cvalue, { path: '/', maxAge: seconds });
    }

    function _getAccessToken() {      
      return cookies.get('cookieAT');
    }

    function _getRefreshToken() {
      return cookies.get('cookieRT');
    }

    function _clearCookies() {
      cookies.remove('cookieAT');
      cookies.remove('cookieRT');
    }

    function _isLoggedIn() {
      if(cookies.get('cookieAT')){
        return true;
      }else{
        return false;
      }      
    }
   return {
      getService : _getService,
      setCookie : _setCookie,
      getAccessToken : _getAccessToken,
      getRefreshToken : _getRefreshToken,
      clearCookies : _clearCookies,
      isLoggedIn: _isLoggedIn
    }
   })();

   export default CookieService;