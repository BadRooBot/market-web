import { NextResponse } from "next/server";
import Cookies from 'js-cookie';



export async function POST(request) {
    try {
    const body = await request.formData();
    const movie = body.get("email");
    const redirectTo = new URL("/", request.url);

    redirectTo.searchParams.set("email", movie.toString());
    Cookies.set("isLoggedIn", true, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
    const cookieValue = Cookies.get('isLoggedIn');
   

    return NextResponse.redirect(redirectTo, 303); // <------- here, inserted status code 303 afer url
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Ups! El servidor no responde, intenta más tarde",
      },
      {
        status: 500,
      }
    );
  }
}


