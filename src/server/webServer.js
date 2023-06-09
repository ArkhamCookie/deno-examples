/** Webserver using [std/http library](https://deno.land/std/http/mod.ts) */
import { serve } from 'https://deno.land/std@0.191.0/http/server.ts'

const port = 8080

const handler = request => {
	const body = 'Your user-agent is:\n\n' + request.headers.get('user-agent') ?? 'Unknown'

	return new Response(body, { status: 200 })
}

console.log('HTTP webserver running...\nAccess it at: https://localhost:' + port)
await serve(handler, { port })
