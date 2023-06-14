export function renderHtml(pattern, words) {
	let searchResultsContent
	if (words.length > 0) {
		let wordList
		for (const word of words) {
			wordList += '<li>' + word + '</li>'
		}
	searchResultsContent =
		'<p id="search-result-count" data-count="' + words.length + '">Words Found: ' + words.length + '</p>' +
		''
	}
}
