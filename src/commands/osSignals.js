console.log('Press Ctrl-c to trigger a SIGINT signal')

/** Add Signal Listener */
const sigIntHandler = () => {
	console.log('\nInterupted!')
	Deno.exit()
}
Deno.addSignalListener('SIGINT', sigIntHandler)

setTimeout(() => {}, 10000) // Ends process after 10 seconds (also stops it from exiting immediately)

/** Remove Signal Listener */
setTimeout(() => {
	console.log('No longer listening for Ctrl-c')
	Deno.removeSignalListener('SIGINT', sigIntHandler)
}, 5000)
