import test from 'ava';
import browserEnv from 'browser-env';

import {render} from '../src';

test.before('setup browserEnv', () => {
	browserEnv(['document']);
});

test.afterEach('clean up dom', () => {
	document.body.innerHTML = '';
});

test.serial('basic', t => {
	render('Hello, World', document.body);
	t.is(document.body.innerHTML, 'Hello, World');
});

test.serial('merge', t => {
	document.body.innerHTML = `<div id="root"></div>`;
	render('Hello, World', document.body, document.getElementById('root'));
	t.is(document.body.innerHTML, 'Hello, World');
});

test.serial('update textNode', t => {
	document.body.innerHTML = `Hello, World`;
	render('Goodbye world', document.body, document.body.childNodes[0]);
	t.is(document.body.innerHTML, 'Goodbye world');

	// A second render shouldn't change anything
	render('Goodbye world', document.body, document.body.childNodes[0]);
	t.is(document.body.innerHTML, 'Goodbye world');
});
