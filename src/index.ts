/* Copyright 2020 Ricardo Iván Vieitez Parra
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

import { Decimal as Decimal$class } from './Decimal';

// The bindNew signature is based on jcalz's answer to the question
// 'Call constructor on TypeScript class without new' on StackOverflow:
// https://stackoverflow.com/questions/32807163/call-constructor-on-typescript-class-without-new
// -- retrieved 2020-10-29
function bindNew<C extends { new (...args: A): T }, A extends unknown[], T>(
	Class: C & { new (...args: A): T },
): C & ((...args: A) => T) {
	return new Proxy(Class, {
		apply: (t, _, a: A) => new t(...a),
	}) as C & ((...args: A) => T);
}

//type Decimal = Decimal$class;
const Decimal = bindNew(Decimal$class);

const Decimal$export = Object.assign(Decimal, { Decimal, default: Decimal });

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Decimal$export {
	export type Decimal = Decimal$class;
}

export = Decimal$export;
