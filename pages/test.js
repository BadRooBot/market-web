import {API_URL} from'@/myenv'

export default function test(){
    const { protocol, hostname, port } = window.location;
    const currentUrl = `${protocol}//${hostname}:${port}`;

  
    const apiUrl = API_URL
    console.log(apiUrl)
   
    return(
        <h1>
{currentUrl+''}
        </h1>
    )
}