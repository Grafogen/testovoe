import './index.css'; //нужен для сборки
let a = '';
let b = '';
let znak = '';
let finish = false;

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const znaki = ['+', '-', '/', 'X', '+/-'];

const number = document.querySelector('.calc__screen-number');
const ac = document.querySelector('.btn_ac');
const container = document.querySelector('.container');

function clear() {
	a = '';
	b = '';
	znak = '';
	finish = false;
	number.textContent = '0';
}

ac.addEventListener('click', function () {
	clear();
});

function keyDownHandler(key) {
	// если нажата 0-9 или .
	if (numbers.includes(key)) {
		if (b === '' && znak === '') {
			a += key;
			number.textContent = a;
		} else if (a !== '' && b !== '' && finish) {
			a = '';
			b = '';
			znak = '';
			a += key;
			finish = false;
			number.textContent = a;
		} else {
			b += key;
			number.textContent = b;
		}
		return;
	}

	// если нажата + - / X +/-
	if (znaki.includes(key)) {
		if (a !== '' && b !== '' && znak !== '' && !finish) {
			console.log('tut');
			switch (znak) {
				case '+':
					a = +a + +b;
					break;
				case '-':
					a = a - b;
					break;
				case 'X':
					a = a * b;
					break;
				case '/':
					if (b === '0') {
						number.textContent = 'Ошибка';
						a = '';
						b = '';
						znak = '';
						return;
					}
					a = a / b;
					break;
			}
		}
		if (key === '+/-') {
			a = -a;
			number.textContent = a;
			return;
		}
		b = '';
		znak = key;
		finish = false;
		number.textContent = a + znak;
		console.log(a, b, znak, finish);
		return;
	}

	if (key === '=') {
		if (b === '') b = a;
		switch (znak) {
			case '+':
				a = +a + +b;
				break;
			case '-':
				a = a - b;
				break;
			case 'X':
				a = a * b;
				break;
			case '/':
				if (b === '0') {
					number.textContent = 'Ошибка';
					a = '';
					b = '';
					znak = '';
					return;
				}
				a = a / b;
				break;
			case '%':
				a = b / 100;
				break;
			case '+/-':
				a = -a;
				break;
		}
		finish = true;
		number.textContent = a;
		console.log(a, b, znak, finish);
	} else if (key === '%') {
		if (b === '') {
			a = a / 100;
			number.textContent = a;
		} else {
			b = (a * b) / 100;
			number.textContent = b;
		}
	}
}

container.addEventListener('click', function (evt) {
	// кнопка не нажата
	if (!evt.target.classList.contains('btn')) return;
	// нажата кнопка AC
	if (evt.target.classList.contains('btn_ac')) return;

	keyDownHandler(evt.target.textContent);
});

document.addEventListener('DOMContentLoaded', function () {
	const switchButtons = document.querySelectorAll('.switch-btn');

	switchButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			this.classList.toggle('switch-on');

			if (this.classList.contains('switch-on')) {
				this.dispatchEvent(new Event('on.switch'));
			} else {
				this.dispatchEvent(new Event('off.switch'));
			}
		});

		button.addEventListener('on.switch', function () {
			document.body.classList.add('dark-theme');
			updateCalculatorStyles('darktheme');
		});

		button.addEventListener('off.switch', function () {
			document.body.classList.remove('dark-theme');
			updateCalculatorStyles();
		});
	});
});
function updateCalculatorStyles(theme) {
	const calculator = document.getElementById('calculator'); // Предполагаем, что у калькулятора есть id 'calculator'
	const tushka = document.getElementById('tushka');
	if (theme === 'darktheme') {
		calculator.style.backgroundColor = '#3c3636';
		calculator.style.color = '#181817';
		// calculator.style.border = '1px solid #a8a8a8';
		tushka.style.backgroundColor = '#cbc9c5';
		const buttons = calculator.querySelectorAll('.btn, .btn_grey, .btn_orange');
		console.log(buttons);
		buttons.forEach((button) => {
			button.style.border = '1px solid #cbc9c5';
			button.style.color = '#181817';
			if (button.classList.contains('btn_grey')) {
				button.style.backgroundColor = '#b8b6b2';
			} else if (button.classList.contains('btn_orange')) {
				button.style.backgroundColor = '#9b6436';
			} else if (button.classList.contains('btn')) {
				button.style.backgroundColor = '#9b9996';
				console.log('f');
			}
		});
	} else {
		calculator.style.backgroundColor = '#fdfdfd';
		calculator.style.color = '#f0ffff';
		// calculator.style.border = '1px solid #a8a8a8';
		tushka.style.backgroundColor = '#525252';
		const buttons = calculator.querySelectorAll('.btn, .btn_grey, .btn_orange');

		buttons.forEach((button) => {
			button.style.border = '1px solid #525253';
			button.style.color = '#F0FFFFFF';
			if (button.classList.contains('btn_grey')) {
				button.style.backgroundColor = '#636363';
			} else if (button.classList.contains('btn_orange')) {
				button.style.backgroundColor = '#fd9e0b';
			} else if (button.classList.contains('btn')) {
				button.style.backgroundColor = '#7c7c7d';
			}
		});
	}
}
