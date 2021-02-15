export function success(body) {
  if(typeof body === "string"){
    return buildResponse(200, body);
  }else{
    return buildResponse(200, JSON.stringify(body));
  }
}

export function badRequest(message) {
  return buildResponse(400, JSON.stringify({message: message}));
}

export function exception(ex) {
  return buildResponse(500, JSON.stringify({message: ex.toString()}));
}

export function failure(body) {
  console.log(body);
  if(body.statusCode) {
    return body;
  }
  return buildResponse(500, JSON.stringify({message: body.toString()}));
}

export function buildResponse(statusCode, body, headers) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      ...headers
    },
    body: body
  };
}