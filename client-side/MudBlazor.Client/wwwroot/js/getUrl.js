export async function getCurrentUrl()
{  
    const parts = window.location.href.split('/');
    //console.log(parts)
    var urlName = parts[parts.length - 1];
    //console.log(urlName)
    return urlName === "" ? "/" : urlName;
}
