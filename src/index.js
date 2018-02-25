const stack = [];
export function h(name, attr, ...args) {
	let i, child; // eslint-disable-line one-var
	const children = [];
	attr = attr || {};

	for (i = args.length; i--; ) {
		stack.push(args[i]);
	}

	while (stack.length) {
		if ((child = stack.pop()) && Array.isArray(child)) {
			for (i = child.length; i--; ) {
				stack.push(child[i]);
			}
		} else if (!isNullOrUndefined(child) && typeof child !== 'boolean') {
			if (typeof child === 'number') child = String(child);
			children.push(child);
		}
	}

	if (typeof name === 'function') {
		return name(Object.assign({}, attr, {children}));
	}

	return {name, attr, children, key: attr.key};
}

export function render() {}

function isNullOrUndefined(val) {
	if (val === null) return true;
	if (val === undefined) return true;
	return false;
}
