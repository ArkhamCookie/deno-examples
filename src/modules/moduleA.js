import { outputB } from './moduleB.js'

function outputA() {
	console.log('Module A\'s import.meta.url', import.meta.url)
	console.log('Module A\'s mainModule url', Deno.mainModule)
	console.log('Is module A the main module via import.meta.main?', import.meta.main)
	console.log('Resolved specifier for ./moduleB.js', import.meta.resolve('./moduleB.js'))
}

outputA()
console.log('')
outputB()
