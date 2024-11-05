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
		console.log(a, b, znak, finish);
		return;
	}

	// если нажата + - / X % +/-
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
		b = '';
		znak = key;
		number.textContent = a + znak;
		console.log(a, b, znak, finish);
		return;
	}

	if (key === '=' || key === 'Enter') {
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

document.addEventListener('keydown', function (evt) {
	console.log(`code=${evt.key}`);
	if (evt.key === 'Escape') {
		clear();
	}
	keyDownHandler(evt.key);
});
