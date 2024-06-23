'''
A Reverse Proxy Using Python
----------------------------

(Not recommended for a production environment at all. Just a hobby code)


### The requirements

1. `Python>=3.8`

2. An `ASGI Server` of choice (one can also go with `WSGI`, in that case the code simply wont work (I mean some changes are required for that))
    
    - Going with `uvicorn` for this example. Feel free to choose an ASGI server of your choice (BTW, `hypercorn` is also a good alternative)
'''
import asyncio
import aiohttp

# route table 
ROUTE_TABLE = {
    "/ws" : {
        "proxy_pass": "wss://echo-websocket.hoppscotch.io",
    },
    "/http" : {
        "proxy_pass": "https://echo.hoppscotch.io",
    }
}


async def proxy_http(
    scope: dict,
    receive,
    send,
    target_server_props: dict,
) -> None:
    """Proxy http request to target server
    """
    async def _generate_request_body() -> iter:
        while True:
            message = await receive()
            if message["type"] == "http.request":
                body = message.get("body", b"")
                if body:
                    yield body
                if not message.get("more_body", False):
                    break
    
    connector = aiohttp.TCPConnector(ssl=False)
    async with aiohttp.ClientSession(connector=connector, timeout=aiohttp.ClientTimeout(total=60)) as client:
        method = scope["method"]
        headers = {
            key.decode('utf-8'): value.decode('utf-8') for key, value in scope["headers"]
            if key.lower() not in [b'host', ]
        }

        async with client.request(
            method,
            target_server_props["proxy_pass"],
            headers=headers,
            data=_generate_request_body(),
        ) as proxied_resp:
            # prepare response headers
            response_headers = [
                (key.encode('utf-8'), value.encode('utf-8'))
                    for key, value in proxied_resp.headers.items()
            ] 
            await send(
                {
                    "type": "http.response.start",
                    "status": proxied_resp.status,
                    "headers": response_headers,
                }
            )
            async for chunk, end_of_http_chunk in proxied_resp.content.iter_chunks():
                await send(
                    {"type": "http.response.body", "body": chunk, "more_body": True}
                )
                if end_of_http_chunk:
                    await send({
                            "type": "http.response.body",
                            "body": b"",
                            "more_body": False,
                    })


async def proxy_ws(
    scope: dict,
    receive,
    send,
    target_server_props: dict,
):
    """Proxy websocket request to target server
    """
    async with aiohttp.ClientSession() as session:
        try:
            async with session.ws_connect(
                target_server_props["proxy_pass"], timeout=10
            ) as websocket:
                
                async def forward_to_backend():
                    """Forward message from client to server!"""
                    while True:
                        message = await receive()
                        if message["type"] == "websocket.connect":
                            # send response
                            await send({"type": "websocket.accept"})
                        if message["type"] == "websocket.receive":
                            data = message.get("text", message.get("bytes"))
                            if data is None:
                                raise Exception("Empty message!")
                            if isinstance(data, bytes):
                                await websocket.send_bytes(data)
                            else:
                                await websocket.send_str(data)
                        elif message["type"] == "websocket.disconnect":
                            raise Exception("Client Disconnect!")
                        elif message["type"] == "websocket.close":
                            await websocket.close(code=message.get("code", 1006))
                            raise Exception("Client Close Req!")

                async def forward_to_client():
                    """Forward messages from server to client"""
                    async for message in websocket:
                        # message handling
                        if message.type == aiohttp.WSMsgType.TEXT:
                            await send({"type": "websocket.send", "text": message.data})
                        elif message.type == aiohttp.WSMsgType.BINARY:
                            await send(
                                {"type": "websocket.send", "bytes": message.data}
                            )
                        # disconnect events
                        elif message.type == aiohttp.WSMsgType.CLOSE:
                            raise Exception("Server Close Req!")

                        elif message.type == aiohttp.WSMsgType.ERROR:
                            raise Exception(f"Server Error! {message.data}")
                    raise Exception(
                        f"closing session - {websocket.close_code}"
                    )

                try:
                    # being the middleman
                    await asyncio.gather(forward_to_backend(), forward_to_client())
                finally:
                    # connection garbage collection
                    await websocket.close()
                    try: await send({
                        "type": "websocket.close",
                        "code": websocket.close_code or 1006,
                    })
                    except: pass

        except Exception as e:
            try: await send({
                "type": "websocket.close",
                "code": 1014,
                "reason": "Server Not Responding!",
            })
            except: pass


async def send_error_resp(send, status_code:int=400, msg:str="Something Went Wrong"):
    """send error response back to the client"""
    await send({
        "type": "http.response.start",
        "status": status_code,
        "headers": [
            (b"Content-Type", b"text/plain"),
        ],
    })
    await send({
        "type": "http.response.body",
        "body": msg.encode("utf-8"),
    })


async def app(scope, receive, send):
    """The ASGI app"""
    if scope["path"] not in ROUTE_TABLE:
        return await send_error_resp(send, 404, "Not Found")
    
    if scope["type"] == "http":
        # handle http proxying
        try: return await proxy_http(scope, receive, send, ROUTE_TABLE[scope['path']])
        except: return await send_error_resp(send, 502, "Bad Gateway")
        
    elif scope["type"] == "websocket":
        # handle ws proxying
        try: return await proxy_ws(scope, receive, send, ROUTE_TABLE[scope['path']])
        except: return await send_error_resp(send, 502, "Bad Gateway")



if __name__ == "__main__":
    # feel free to execute `uvicorn gateway:app` to start the server directly from command line
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
