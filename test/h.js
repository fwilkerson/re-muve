import test from 'ava';

import {h} from '../src';

test('basic', t => {
	const vnode = h('h2', null, 'Hello World');
	t.deepEqual(vnode, {
		attr: {},
		children: ['Hello World'],
		key: undefined,
		name: 'h2',
	});
});

test('nested children', t => {
	const vnode = h('div', null, [
		h('h2', null, 'A list of things'),
		h('ul', null, [
			h('li', {key: 0}, 'A thing'),
			h('li', {key: 1}, 'Another thing'),
		]),
	]);

	t.deepEqual(vnode, {
		attr: {},
		children: [
			{
				attr: {},
				children: ['A list of things'],
				key: undefined,
				name: 'h2',
			},
			{
				attr: {},
				children: [
					{
						attr: {key: 0},
						children: ['A thing'],
						key: 0,
						name: 'li',
					},
					{
						attr: {key: 1},
						children: ['Another thing'],
						key: 1,
						name: 'li',
					},
				],
				key: undefined,
				name: 'ul',
			},
		],
		key: undefined,
		name: 'div',
	});
});

test('conditional render', t => {
	const vnode = h('ul', null, [
		0 && h('li', {key: 0}, 'the zero will render as a string'),
		1 && h('li', {key: 1}, 'the one will eval to true and render this'),
		true && h('li', {key: 2}, 'this renders'),
		false && h('li', {key: 3}, 'this will not render'),
		null && h('li', {key: 4}, 'this will not render'),
		undefined && h('li', {key: 5}, 'this will not render'),
	]);

	t.deepEqual(vnode, {
		attr: {},
		children: [
			'0',
			{
				attr: {key: 1},
				children: ['the one will eval to true and render this'],
				key: 1,
				name: 'li',
			},
			{
				attr: {key: 2},
				children: ['this renders'],
				key: 2,
				name: 'li',
			},
		],
		key: undefined,
		name: 'ul',
	});
});

test('stateless functional component', t => {
	const Component = props => {
		return h('h2', null, props.name);
	};

	const vnode = h(Component, {name: 'Frank'});

	t.deepEqual(vnode, {
		attr: {},
		children: ['Frank'],
		key: undefined,
		name: 'h2',
	});
});
