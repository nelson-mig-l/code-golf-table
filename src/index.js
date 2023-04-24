const head = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Code Golf Table</title>
  <style>
	.vertical {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}

	.light {
		font-size: 8px;
		color: #AAA;
		width: 100%;
		text-align: center;
	}

	body {
		font-family: Lato,sans-serif !important;
	}
	
	table {
		font-size: 14px;
		border-collapse: collapse;
		/*width: 100%;*/
	}
	
	td, th {
		border: 1px solid #000;
		padding: 8px;
		min-width: 25px;
		max-width: 25px;
	}
	
	th {
		padding-top: 12px;
		padding-bottom: 12px;
		background-color: #252E38;
		color: #fff;
		font-size: 15px;
		text-align: left;
	}

	td {
		text-align: right;
	}
	
	tr:nth-child(even) {
		background-color: #F2F2F2;
	}

	tbody > tr > td:nth-of-type(1) {
		min-width: 125px;
		max-width: 125px;
		font-weight: bold;
		font-size: 15px;
	}
	
	tr:hover {
		background-color: #E7E9EB;
	}
  </style>
</head>`;

const languages = [
	'Bash',
	'C', 'C#', 'C++', 'Clojure',
	'D', 'Dart',
	'F#',
	'Go', 'Groovy',
	'Haskell',
	'Java', 'Javascript',
	'Kotlin',
	'Lua',
	'ObjectiveC', 'OCaml',
	'Pascal', 'Perl', 'PHP', 'Python3',
	'Ruby', 'Rust',
	'Scala', 'Swift',
	'TypeScript',
	'VB.NET'
]

const services = 'https://www.codingame.com/services';
const url = services + '/CodinGamer/getMyConsoleInformation';
const player = [1939310];

async function handleRequest() {
	const init = {
		body: JSON.stringify(player),
		method: 'POST',
		headers: {
			'content-type': 'application/json;charset=UTF-8',
		},
	};
	const response = await fetch(url, init)
	const json = await response.json()
	const puzzles = json['puzzles']
	const golfs = puzzles.filter(p => p.puzzleType === "GOLF")

	var html = '<!DOCTYPE html><html>'
	html += head;
	html += '<body><table>'

	html += '<thead><tr><th class="vertical"></th>';
	languages.forEach(language => {
		html += '<th class="vertical">' + language + '</th>'
	});
	html += '</tr></thead>'

	html += '<tbody>'
	golfs.forEach(golf => {
		html += '<tr><td>' + golf.labelTitle + '</td>';
		languages.forEach(language => {
			const points = golf.pointsByLanguage[language] || 0
			const rank = golf.ranksByLanguage[language] || '-'
			const players = golf.totalPlayersByLanguage[language] || '-'
			html += '<td>'
			html += points
			html += '<br/><div class="light"><b>' + rank + '</b><br/>' + players + "</div>"
			html += '</td>'
		});
		html += '</tr>'
	});
	html += '</tbody>'

	html += '</table>'
	html += '<p class="light">Generated: ' + new Date().toLocaleString("UK") + '</p>'
	html += '</body>'
	html += '</html>'
	return new Response(html, {
		headers: {
			'content-type': 'text/html;charset=UTF-8'
		},
	});
};

addEventListener('fetch', event => {
	return event.respondWith(handleRequest());
});