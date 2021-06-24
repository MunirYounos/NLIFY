const counterNew = document.getElementById('counterNew');
const settings = {
	'Title': 'Spring sale - save 25% on all - sale ends in: ',
	'End_time': 'July 29, 2021 10:23:59',
	'Days': 'Days',
	'Hours': 'Hours',
	'Minutes': 'Minutes',
	'Seconds': 'Seconds',
	'Link': 'https://anodyne.dk/'
};
//add zero
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

let template = document.createElement('section');
template.classList = 'new-counter wrapper';
template.innerHTML = `<h4 id="head">${settings['Title']}</h4>
        <ul class="counter__wrapper">
        <li><span id="days"></span>${settings['Days']}</li>
        <li><span id="hours"></span>${settings['Hours']}</li>
        <li><span id="minutes"></span>${settings['Minutes']}</li>
        <li><span id="seconds"></span>${settings['Seconds']}</li>
        </ul>
				<a class="new-counter-btn" href="${settings['Link']}"></a>
				`;
const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

if (isValidDate(new Date(settings['End_time']))) {
	let countDown = new Date(settings['End_time']).getTime();
	const x = setInterval(function () {
		let now = new Date().getTime(),
			distance = countDown - now;


		if (distance > 0) {
			counterNew.prepend(template);
		}

		document.querySelector('.new-counter #days').innerText = Math.floor(distance / (day)),
			document.querySelector('.new-counter #hours').innerText = addZero(Math.floor((distance % (day)) / (hour))),
			document.querySelector('.new-counter #minutes').innerText = addZero(Math.floor((distance % (hour)) / (minute))),
			document.querySelector('.new-counter #seconds').innerText = addZero(Math.floor((distance % (minute)) / second));

		// Hide when date is reached
		if (distance < 0) {
			clearInterval(x);
			document.querySelector('.new-counter.wrapper').style.display = 'none';
		}

	}, second);
} else {
	console.error('End date is invalid');
}

function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}
