import {API_URL} from'@/myenv'

export default function test(){
    const apiUrl = API_URL
    console.log(apiUrl)
   
    return(
        <h1>
{apiUrl+'/dddd'}
        </h1>
    )
}