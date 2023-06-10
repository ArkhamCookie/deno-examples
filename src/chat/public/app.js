const myUsername = prompt('Please enter your username.')
const port = 8080
const socket = new WebSocket('ws://localhost:' + port + 'start_web?username=' + myUsername)
// const socket = new WebSocket(`ws://localhost:${port}/start_web_socket?username=${myUsername}`)

// /*
socket.onopen = function() {
	console.log('[OPEN] Connection established.')
	console.log(myUsername + 'joined!')
}
// */

// /*
socket.onmessage = (m) => {
	const data = JSON.parse(m.data)

	switch (data.event) {
		case 'update-users':
			// let userListHtml = ''
			for (const username of data.usernames) {
				userListHtml += '<div> ' + username + ' </div>'
			}
			document.getElementById('users').innerHTML = userListHtml
			break

		case 'send-message':
			addMessage(data.username, data.message)
			break
	}
}
// */

function addMessage(username, message) {
	document.getElementById('conversation').innerHTML += '<b> ' + username + ' </b>: ' + message + ' <br/>'
	/* document.getElementById(
		'conversation',
	).innerHTML += `<b> ${username} </b>: ${message} <br/>` */
}

window.onload = () => {
	document.getElementById('data').addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			const inputElement = document.getElementById('data')
			const message = inputElement.value
			inputElement.value = ''
			socket.send(JSON.stringify({ event: 'send-message', message: message }))
			/* socket.send(
				JSON.stringify({
					event: 'send-message',
					message: message
				})
			) */
		}
	})
}
