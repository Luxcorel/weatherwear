import { constants } from "http2";
import { z } from "zod";

//NOTE: GET FUNCTION WITHOUT "request: Request" WILL BE CACHED AUTOMATICALLY!
export async function GET() {
  //console.log(request.headers); //headers from client
  return Response.json(
    //using Response API
    {
      message: "You made a GET request to the API",
    }, //data returned as JSON
    {
      //config: headers, HTTP status etc.
      headers: { "content-type": "application/json" },
      status: 200,
    },
  );
}

export async function HEAD(request: Request) {
  return Response.json({ message: "You made a HEAD request to the API" }, { status: constants.HTTP_STATUS_TEAPOT });
}

export async function POST(request: Request) {
  const emailSchema = z.string().email("You must enter a valid email!");
  const requestBody = await request.json();
  const emailReceived = requestBody.email;

  const emailCheck = emailSchema.safeParse(emailReceived);

  let emailToSend;
  if (emailCheck.success) {
    emailToSend = emailCheck.data;
  } else {
    emailToSend = emailCheck.error.message;
  }

  return Response.json({ message: emailToSend }, { status: constants.HTTP_STATUS_OK });
}

export async function PUT(request: Request) {
  return Response.json({ message: "You made a PUT request to the API" }, { status: constants.HTTP_STATUS_TEAPOT });
}

export async function DELETE(request: Request) {
  return Response.json({ message: "You made a DELETE request to the API" }, { status: constants.HTTP_STATUS_TEAPOT });
}

export async function PATCH(request: Request) {
  return Response.json({ message: "You made a PATCH request to the API" }, { status: constants.HTTP_STATUS_TEAPOT });
}
