import { NextResponse } from 'next/server';
import {API_URL} from'@/myenv'

 

export default async function handler(req, res) {
  const apiUrl = process.env.API_URL;

  try {
    const { username, password, email } = req.body;
    const url='https://th.bing.com/th/id/OIG.SyICO9MgHcrqErOgoHbZ?pid=ImgGn';
    const signup = await fetch(
      API_URL+'/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'password':password,
          'email':email,
        }),
      }
    );

    if (signup.status === 200) {
      const signupData = await signup.json();
      const signupDataText=JSON.stringify(signupData);
      res.writeHead(303, {
        Location: `/profile/user=${encodeURIComponent(signupDataText)}`,
        'Set-Cookie': `isLoggedIn=true`,
      });
    }else{
      res.writeHead(303, {
        Location: `/login?error=500`,
      });
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(303, {
      Location: `/login?error=500`,
    });
    res.end();

  }
  
}

