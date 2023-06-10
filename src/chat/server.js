import { Application, Router } from 'https://deno.land/x/oak@v12.5.0/mod.ts'
// import { serve } from 'https://deno.land/std@0.191.0/http/mod.ts'

const connectedClients = new Map()

const app = new Application()
const port = 8080
const router = new Router()

function broadcast(message) {
	for (const client of connectedClients.values()) {
		client.send(message)
	}
}

function broadcastUsernames() {
	const usernames = [...connectedClients.keys()]
	console.log('Sending updated username list to all clients: ' + JSON.stringify(usernames))
	broadcast(JSON.stringify({ event: 'update-users', usernames: usernames }))
}

router.get('/ws', async (ctx) => {
	const socket = await ctx.upgrade()
	const username = ctx.request.url.searchParams.get('username')

	if (connectedClients.has(username)) {
		socket.close(1008, 'Username ' + username + ' is already taken')
		return
	}

	socket.username = username
	connectedClients.set(username, socket)
	console.log('New client connected: ' + username)

	socket.onopen = () => {
		broadcastUsernames()
	}

	socket.onclose = () => {
		console.log('Client ' + socket.username + ' disconnected')
		connectedClients.delete(socket.username)
		broadcastUsernames()
	}

	socket.onmessage = (m) => {
		const data = JSON.parse(m.data)
		switch (data.event) {
			case 'send-message':
				broadcast(JSON.stringify({ event: 'send-message', username: socket.username, message: data.message }))
				break
		}
	}
})

app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (context) => {
	// await context.send({ root: `${Deno.cwd()}/`, index: 'public/index.html' })
	await context.send({ root: Deno.cwd() + '/', index: 'public/index.html' })
})

console.log('Listening at http://localhost:' + port)
await app.listen({ port })
