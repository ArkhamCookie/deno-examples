/** Reading a file */
const text = await Deno.readTextFile('./hello.txt')

console.log(text)

/** Write to a file */
await Deno.writeTextFile('./hello.txt', 'Hello World!')

console.log('File written to ./hello.txt')
