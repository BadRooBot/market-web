import { NextResponse } from 'next/server';
import {API_URL} from'@/myenv'

 

export default async function handler(req, res) {
  
  try {
    const { username, password, email } = req.body;
    const url='https://th.bing.com/th/id/OIG.SyICO9MgHcrqErOgoHbZ?pid=ImgGn';
    const signup = await fetch(
      API_URL+'/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username':username,
          'password':password,
          'email':email,
          image_url: url,
          gender: 'gender',
          points: '23',
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
        Location: `/signup?error=500`,
      });
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(303, {
      Location: `/signup?error=500`,
    });
    res.end();
  }
}

