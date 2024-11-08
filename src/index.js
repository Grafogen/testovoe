import './index.css'; //нужен для сборки

//объявление рабочих переменных
let a = '';
let b = '';
let znak = '';
let finish = false;

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const znaki = ['+', '-', '/', 'X', '+/-'];

const number = document.querySelector('.calc__screen-number');
const ac = document.querySelector('.btn_ac');
const container = document.querySelector('.container');

//зачистка вывода
function clear() {
	a = '';
	b = '';
	znak = '';
	finish = false;
	number.value = '0';
}

//обработчик на кнопку зачистки
ac.addEventListener('click', function () {
	clear();
});

//обработчик нажатий на клавиши
function keyDownHandler(key) {
	// если нажата 0-9 или .
	if (numbers.includes(key)) {
		if (b === '' && znak === '') {
			a += key;
			number.value = a;
		} else if (a !== '' && b !== '' && finish) {
			a = '';
			b = '';
			znak = '';
			a += key;
			finish = false;
			number.value = a;
		} else {
			b += key;
			number.value = b;
		}
		return;
	}

	// если нажата + - / X +/-
	if (znaki.includes(key)) {
		if (a !== '' && b !== '' && znak !== '' && !finish) {
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
						number.value = 'Ошибка';
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
			number.value = a;
			return;
		}
		b = '';
		znak = key;
		finish = false;
		number.value = a + znak;
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
					number.value = 'Ошибка';
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
		number.value = a;
	} else if (key === '%') {
		if (b === '') {
			a = a / 100;
			number.value = a;
		} else {
			b = (a * b) / 100;
			number.value = b;
		}
	}
}

//обработка кликов не туда
container.addEventListener('click', function (e) {
	// кнопка не нажата
	if (!e.target.classList.contains('btn')) return;
	// нажата кнопка AC
	if (e.target.classList.contains('btn_ac')) return;
	keyDownHandler(e.target.textContent);
});

// функция для работы свитчера темы
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

//функция смены стилей для темы
function updateCalculatorStyles(theme) {
	const calculator = document.getElementById('calculator');
	const tushka = document.getElementById('tushka');
	const calcNumber = document.getElementById('calcNumber');

	if (theme === 'darktheme') {
		calculator.style.backgroundColor = '#3c3636';
		calculator.style.color = '#181817';
		tushka.style.backgroundColor = '#cbc9c5';
		calcNumber.style.color = '#181817';

		const buttons = calculator.querySelectorAll('.btn, .btn_grey, .btn_orange');

		buttons.forEach((button) => {
			button.style.border = '1px solid #cbc9c5';
			button.style.color = '#181817';
			if (button.classList.contains('btn_grey')) {
				button.style.backgroundColor = '#b8b6b2';
			} else if (button.classList.contains('btn_orange')) {
				button.style.backgroundColor = '#9b6436';
			} else if (button.classList.contains('btn')) {
				button.style.backgroundColor = '#9b9996';
			}
		});
	} else {
		calculator.style.backgroundColor = '#fdfdfd';
		calculator.style.color = '#f0ffff';
		calcNumber.style.color = '#eefdfd';
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
