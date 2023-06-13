/** Piping subprocess to file */
import { mergeReadableStreams } from 'https://deno.land/std@0.191.0/streams/merge_readable_streams.ts'

const file = await Deno.open('./process_output.txt', {
	read: true,
	write: true,
	create: true,
})

const command = new Deno.Command('yes', {
	stdout: 'piped',
	stderr: 'piped',
})

const process = command.spawn()

const joined = mergeReadableStreams(
	process.stdout,
	process.stderr,
)

joined.pipeTo(file.writable).then(() => console.log('pipe join done'))

setTimeout(() => {
	process.kill()
}, 100)
