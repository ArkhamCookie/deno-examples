/** echo server */
const port = 8081
const listener = Deno.listen({ port })

console.log('Listening on 0.0.0.0:' + port)

for await (const conn of listener) {
	conn.readable.pipeTo(conn.writable)
}
