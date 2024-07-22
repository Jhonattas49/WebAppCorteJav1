exports.TokenResponse= async (message, success, token, data) => 
{
    if (token) {
       // console.log(token)

        return await { Message: message, Success: success, Token: token, Data: data };
    }
};