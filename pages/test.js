import { useSelector } from "react-redux";


const getMyPosts=async (id)=>{
    const respons=await fetch('http://localhost:5000/user-movies-post',{
        method:'POST',
        body:JSON.stringify({'id':id}),
        headers: {
            'Content-Type': 'application/json',
          },
    }) 
  const  data=await respons.json();
    console.log(data)
}

export default function test(){
    
const myData = useSelector(state=>state.user);
const userId=myData.currentUser?.jsonData.id;

   
    getMyPosts(userId);
    return(
        <h1>
ddddddddddd
        </h1>
    )
}