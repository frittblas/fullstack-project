import { clearJWT } from '../authentication/webtoken.js';

async function logout(res) {

    console.log("logout function called!");
    clearJWT(res);  // remove the cookie

}

export default logout;