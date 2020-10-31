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

import { expect } from 'chai';
import 'mocha';

import { Decimal } from './Decimal';

const test = (
	methods: string[],
	smethods: string[],
	tests: { inputs: string[]; output: string }[],
) => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	type DecimalArg = string | number | Number;
	type DecimalMethod = (...a: DecimalArg[]) => Decimal | boolean | number;
	type DecimalObject = {
		[K: string]: DecimalMethod;
	};

	for (const method of methods) {
		for (const test of tests) {
			const obj = new Decimal(test.inputs[0]);
			const extra = {
				Decimal: test.inputs.slice(1).map((i) => new Decimal(i)),
				Number: test.inputs.slice(1).map((i) => new Number(i)),
				number: test.inputs.slice(1).map((i) => Number(i)),
				string: test.inputs.slice(1).map((i) => String(i)),
			};

			expect(Decimal.prototype).to.have.property(method);

			for (const type of ['Decimal', 'Number', 'number', 'string']) {
				expect(
					String(
						((Decimal.prototype as unknown) as DecimalObject)[
							method
						].apply(
							obj,
							extra[
								type as
									| 'Decimal'
									| 'Number'
									| 'number'
									| 'string'
							],
						),
					),
				).to.equal(test.output);
			}
		}
	}

	for (const smethod of smethods) {
		for (const test of tests) {
			const inputs = {
				Decimal: test.inputs.map((i) => new Decimal(i)),
				Number: test.inputs.map((i) => new Number(i)),
				number: test.inputs.map((i) => Number(i)),
				string: test.inputs.map((i) => String(i)),
			};

			expect(Decimal).to.have.property(smethod);

			for (const type of ['Decimal', 'Number', 'number', 'string']) {
				expect(
					String(
						((Decimal as unknown) as DecimalObject)[smethod].apply(
							Decimal,
							inputs[
								type as
									| 'Decimal'
									| 'Number'
									| 'number'
									| 'string'
							],
						),
					),
				).to.equal(test.output);
			}
		}
	}
};

describe('Decimal', () => {
	it('abs() and absoluteValue()', () => {
		test(
			['abs', 'absoluteValue'],
			['abs'],
			[
				{ inputs: ['-5'], output: '5' },
				{ inputs: ['5'], output: '5' },
				{ inputs: ['-5.12'], output: '5.12' },
				{ inputs: ['+5.13'], output: '5.13' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('ceil()', () => {
		test(
			['ceil'],
			['ceil'],
			[
				{ inputs: ['-5'], output: '-5' },
				{ inputs: ['5'], output: '5' },
				{ inputs: ['-5.12'], output: '-5' },
				{ inputs: ['+5.13'], output: '6' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('floor()', () => {
		test(
			['floor'],
			['floor'],
			[
				{ inputs: ['-5'], output: '-5' },
				{ inputs: ['5'], output: '5' },
				{ inputs: ['-5.12'], output: '-6' },
				{ inputs: ['+5.13'], output: '5' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('neg() and negated()', () => {
		test(
			['neg', 'negated'],
			[],
			[
				{ inputs: ['-5'], output: '5' },
				{ inputs: ['5'], output: '-5' },
				{ inputs: ['-5.12'], output: '5.12' },
				{ inputs: ['+5.13'], output: '-5.13' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'Infinity' },
				{ inputs: ['Infinity'], output: '-Infinity' },
			],
		);
	});

	it('round()', () => {
		test(
			['round'],
			['round'],
			[
				{ inputs: ['-5'], output: '-5' },
				{ inputs: ['5'], output: '5' },
				{ inputs: ['-5.12'], output: '-5' },
				{ inputs: ['+5.13'], output: '5' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('toDP() and toDecimalPlaces()', () => {
		test(
			['toDP', 'toDecimalPlaces'],
			[],
			[
				{ inputs: ['-5', '5'], output: '-5' },
				{ inputs: ['5', '5'], output: '5' },
				{ inputs: ['-5.12'], output: '-5' },
				{ inputs: ['-5.12', '0'], output: '-5' },
				{ inputs: ['-5.12', '1'], output: '-5.1' },
				{ inputs: ['+5.13', '2'], output: '5.13' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('trunc() and truncated()', () => {
		test(
			['trunc', 'truncated'],
			['trunc'],
			[
				{ inputs: ['-5', '5'], output: '-5' },
				{ inputs: ['5', '5'], output: '5' },
				{ inputs: ['-5.12'], output: '-5' },
				{ inputs: ['+5.13'], output: '5' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('toExponential()', () => {
		test(
			['toExponential'],
			[],
			[
				{ inputs: ['-5'], output: '-5e+0' },
				{ inputs: ['5'], output: '5e+0' },
				{ inputs: ['-5.12'], output: '-5.12e+0' },
				{ inputs: ['+5.13'], output: '5.13e+0' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('toNumber()', () => {
		test(
			['toNumber'],
			[],
			[
				{ inputs: ['-5'], output: '-5' },
				{ inputs: ['5'], output: '5' },
				{ inputs: ['-5.12'], output: '-5.12' },
				{ inputs: ['+5.13'], output: '5.13' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('cmp() and compareTo()', () => {
		test(
			['cmp', 'compareTo'],
			[],
			[
				{ inputs: ['-5', '5'], output: '-1' },
				{ inputs: ['5', '5'], output: '0' },
				{ inputs: ['-5.12', '0'], output: '-1' },
				{ inputs: ['0', '-5.12'], output: '1' },
				{ inputs: ['+5.13', 'Infinity'], output: '-1' },
				{ inputs: ['NaN', '3'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: '-1' },
				{ inputs: ['Infinity', 'Infinity'], output: '0' },
			],
		);
	});

	it('eq() and equals()', () => {
		test(
			['eq', 'equals'],
			[],
			[
				{ inputs: ['-5', '5'], output: 'false' },
				{ inputs: ['5', '5'], output: 'true' },
				{ inputs: ['-5.12', '0'], output: 'false' },
				{ inputs: ['0', '-5.12'], output: 'false' },
				{ inputs: ['+5.13', 'Infinity'], output: 'false' },
				{ inputs: ['NaN', '3'], output: 'false' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'false' },
				{ inputs: ['Infinity', 'Infinity'], output: 'true' },
			],
		);
	});

	it('gt() and greaterThan()', () => {
		test(
			['gt', 'greaterThan'],
			[],
			[
				{ inputs: ['-5', '5'], output: 'false' },
				{ inputs: ['5', '5'], output: 'false' },
				{ inputs: ['-5.12', '0'], output: 'false' },
				{ inputs: ['0', '-5.12'], output: 'true' },
				{ inputs: ['+5.13', 'Infinity'], output: 'false' },
				{ inputs: ['NaN', '3'], output: 'false' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'false' },
				{ inputs: ['Infinity', 'Infinity'], output: 'false' },
			],
		);
	});

	it('gte() and greaterThanOrEqualTo()', () => {
		test(
			['gte', 'greaterThanOrEqualTo'],
			[],
			[
				{ inputs: ['-5', '5'], output: 'false' },
				{ inputs: ['5', '5'], output: 'true' },
				{ inputs: ['-5.12', '0'], output: 'false' },
				{ inputs: ['0', '-5.12'], output: 'true' },
				{ inputs: ['+5.13', 'Infinity'], output: 'false' },
				{ inputs: ['NaN', '3'], output: 'false' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'false' },
				{ inputs: ['Infinity', 'Infinity'], output: 'true' },
			],
		);
	});

	it('lt() and lessThan()', () => {
		test(
			['lt', 'lessThan'],
			[],
			[
				{ inputs: ['-5', '5'], output: 'true' },
				{ inputs: ['5', '5'], output: 'false' },
				{ inputs: ['-5.12', '0'], output: 'true' },
				{ inputs: ['0', '-5.12'], output: 'false' },
				{ inputs: ['+5.13', 'Infinity'], output: 'true' },
				{ inputs: ['NaN', '3'], output: 'false' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'true' },
				{ inputs: ['Infinity', 'Infinity'], output: 'false' },
			],
		);
	});

	it('lte() and lessThanOrEqualTo()', () => {
		test(
			['lte', 'lessThanOrEqualTo'],
			[],
			[
				{ inputs: ['-5', '5'], output: 'true' },
				{ inputs: ['5', '5'], output: 'true' },
				{ inputs: ['-5.12', '0'], output: 'true' },
				{ inputs: ['0', '-5.12'], output: 'false' },
				{ inputs: ['+5.13', 'Infinity'], output: 'true' },
				{ inputs: ['NaN', '3'], output: 'false' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'true' },
				{ inputs: ['Infinity', 'Infinity'], output: 'true' },
			],
		);
	});

	it('cbrt() and cubeRoot()', () => {
		test(
			['cbrt', 'cubeRoot'],
			[],
			[
				{ inputs: ['-5'], output: '-1.709975946676697' },
				{ inputs: ['5'], output: '1.709975946676697' },
				{ inputs: ['-5.12'], output: '-1.7235477520255071' },
				{ inputs: ['+5.13'], output: '1.7246691236834493' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('div() and dividedBy()', () => {
		test(
			['div', 'dividedBy'],
			['div'],
			[
				{ inputs: ['-5', '1'], output: '-5' },
				{ inputs: ['-5', '2'], output: '-2.5' },
				{ inputs: ['-5', '2.5'], output: '-2' },
				{ inputs: ['-5', '0'], output: '-Infinity' },
				{ inputs: ['-5', '-0'], output: 'Infinity' },
				{ inputs: ['0', '0'], output: 'NaN' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'NaN' },
				{ inputs: ['-Infinity', '-5'], output: 'Infinity' },
			],
		);
	});

	it('divToInt() and dividedToIntegerBy()', () => {
		test(
			['divToInt', 'dividedToIntegerBy'],
			[],
			[
				{ inputs: ['-5', '1'], output: '-5' },
				{ inputs: ['-5', '2'], output: '-2' },
				{ inputs: ['-5', '2.5'], output: '-2' },
				{ inputs: ['-5', '0'], output: '-Infinity' },
				{ inputs: ['-5', '-0'], output: 'Infinity' },
				{ inputs: ['0', '0'], output: 'NaN' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'NaN' },
				{ inputs: ['-Infinity', '-5'], output: 'Infinity' },
			],
		);
	});

	it('log() and logarithm()', () => {
		test(
			['log', 'logarithm'],
			['log'],
			[
				{ inputs: ['-5'], output: 'NaN' },
				{ inputs: ['9', '3'], output: '2' },
				{ inputs: ['5'], output: '0.6989700043360189' },
				{ inputs: ['-5.12'], output: 'NaN' },
				{ inputs: ['+5.13'], output: '0.7101173651118162' },
				{ inputs: ['1'], output: '0' },
				{ inputs: ['1e-4'], output: '-4' },
				{ inputs: ['100'], output: '2' },
				{ inputs: ['0'], output: '-Infinity' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('log(2) and logarithm(2)', () => {
		test(
			['log', 'logarithm'],
			['log'],
			[
				{ inputs: ['-5', '2'], output: 'NaN' },
				{ inputs: ['5', '2'], output: '2.3219280948873626' },
				{ inputs: ['-5.12', '2'], output: 'NaN' },
				{ inputs: ['+5.13', '2'], output: '2.358958825832329' },
				{ inputs: ['1', '2'], output: '0' },
				{ inputs: ['1.25e-1', '2'], output: '-3' },
				{ inputs: ['128', '2'], output: '7' },
				{ inputs: ['0', '2'], output: '-Infinity' },
				{ inputs: ['NaN', '2'], output: 'NaN' },
				{ inputs: ['-Infinity', '2'], output: 'NaN' },
				{ inputs: ['Infinity', '2'], output: 'Infinity' },
			],
		);
	});

	it('sub() and minus()', () => {
		test(
			['sub', 'minus'],
			['sub'],
			[
				{ inputs: ['-5', '1'], output: '-6' },
				{ inputs: ['-5', '2'], output: '-7' },
				{ inputs: ['-5', '2.5'], output: '-7.5' },
				{ inputs: ['-5', '0'], output: '-5' },
				{ inputs: ['-5', '-0'], output: '-5' },
				{ inputs: ['0', '0'], output: '0' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: '-Infinity' },
				{ inputs: ['-Infinity', '-5'], output: '-Infinity' },
			],
		);
	});

	it('mod() and modulo()', () => {
		test(
			['mod', 'modulo'],
			['mod'],
			[
				{ inputs: ['-5', '1'], output: '0' },
				{ inputs: ['-5', '2'], output: '-1' },
				{ inputs: ['-5', '2.5'], output: '0' },
				{ inputs: ['-5', '0'], output: 'NaN' },
				{ inputs: ['-5', '-0'], output: 'NaN' },
				{ inputs: ['0', '0'], output: 'NaN' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'NaN' },
				{ inputs: ['-Infinity', '-5'], output: 'NaN' },
			],
		);
	});

	it('exp() and naturalExponential()', () => {
		test(
			['exp', 'naturalExponential'],
			['exp'],
			[
				{ inputs: ['-5'], output: '0.006737946999085467' },
				{ inputs: ['5'], output: '148.4131591025766' },
				{ inputs: ['-5.12'], output: '0.005976022895005943' },
				{ inputs: ['+5.13'], output: '169.01711804488718' },
				{ inputs: ['0'], output: '1' },
				{ inputs: ['1'], output: '2.718281828459045' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '0' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('ln() and naturalLogarithm()', () => {
		test(
			['ln', 'naturalLogarithm'],
			['ln'],
			[
				{ inputs: ['-5'], output: 'NaN' },
				{ inputs: ['5'], output: '1.6094379124341003' },
				{ inputs: ['-5.12'], output: 'NaN' },
				{ inputs: ['+5.13'], output: '1.635105659182678' },
				{ inputs: ['1'], output: '0' },
				{ inputs: ['0'], output: '-Infinity' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('add() and plus()', () => {
		test(
			['add', 'plus'],
			['add'],
			[
				{ inputs: ['-5', '1'], output: '-4' },
				{ inputs: ['-5', '2'], output: '-3' },
				{ inputs: ['-5', '2.5'], output: '-2.5' },
				{ inputs: ['-5', '0'], output: '-5' },
				{ inputs: ['-5', '-0'], output: '-5' },
				{ inputs: ['0', '0'], output: '0' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'NaN' },
				{ inputs: ['-Infinity', '-5'], output: '-Infinity' },
			],
		);
	});

	it('sqrt() and squareRoot()', () => {
		test(
			['sqrt', 'squareRoot'],
			['sqrt'],
			[
				{ inputs: ['-5'], output: 'NaN' },
				{ inputs: ['5'], output: '2.23606797749979' },
				{ inputs: ['-5.12'], output: 'NaN' },
				{ inputs: ['+5.13'], output: '2.264950330581225' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('mul() and times()', () => {
		test(
			['mul', 'times'],
			['mul'],
			[
				{ inputs: ['-5', '1'], output: '-5' },
				{ inputs: ['-5', '2'], output: '-10' },
				{ inputs: ['-5', '2.5'], output: '-12.5' },
				{ inputs: ['-5', '0'], output: '0' },
				{ inputs: ['-5', '-0'], output: '0' },
				{ inputs: ['1', '1'], output: '1' },
				{ inputs: ['0', '0'], output: '0' },
				{ inputs: ['0.1', '0.2'], output: '0.02' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: '-Infinity' },
				{ inputs: ['-Infinity', '-5'], output: 'Infinity' },
			],
		);
	});

	it('pow() and toPower()', () => {
		test(
			['pow', 'toPower'],
			['pow'],
			[
				{ inputs: ['-5', '1'], output: '-5' },
				{ inputs: ['-5', '2'], output: '25' },
				{ inputs: ['-5', '2.5'], output: 'NaN' },
				{ inputs: ['-5', '0'], output: '1' },
				{ inputs: ['-5', '-0'], output: '1' },
				{ inputs: ['1', '1'], output: '1' },
				{ inputs: ['0', '0'], output: '1' },
				{ inputs: ['0.1', '2'], output: '0.01' },
				{ inputs: ['NaN', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'Infinity'], output: 'NaN' },
				{ inputs: ['-Infinity', '-5'], output: '0' },
			],
		);
	});

	it('dp() and decimalPlaces()', () => {
		test(
			['dp', 'decimalPlaces'],
			[],
			[
				{ inputs: ['-5'], output: '0' },
				{ inputs: ['50'], output: '0' },
				{ inputs: ['50.00'], output: '0' },
				{ inputs: ['-5e-1'], output: '1' },
				{ inputs: ['5e-2'], output: '2' },
				{ inputs: ['1.234'], output: '3' },
				{ inputs: ['1.2345'], output: '4' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('sd() and precision()', () => {
		test(
			['sd', 'precision'],
			[],
			[
				{ inputs: ['-5'], output: '1' },
				{ inputs: ['1'], output: '1' },
				{ inputs: ['-1'], output: '1' },
				{ inputs: ['10'], output: '2' },
				{ inputs: ['50'], output: '2' },
				{ inputs: ['50.00'], output: '2' },
				{ inputs: ['-1e-1'], output: '1' },
				{ inputs: ['1e-2'], output: '1' },
				{ inputs: ['-5e-1'], output: '1' },
				{ inputs: ['5e-2'], output: '1' },
				{ inputs: ['-5.67e-1'], output: '3' },
				{ inputs: ['5.678e-2'], output: '4' },
				{ inputs: ['1.234'], output: '4' },
				{ inputs: ['1.2345'], output: '5' },
				{ inputs: ['0'], output: '1' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('cos() and cosine()', () => {
		test(
			['cos', 'cosine'],
			['cos'],
			[
				{ inputs: [String(-Math.PI)], output: '-1' },
				{
					inputs: [String((-2 * Math.PI) / 3)],
					output: '-0.4999999999999998',
				},
				{
					inputs: [String(-Math.PI / 2)],
					output: '6.123233995736766e-17',
				},
				{
					inputs: [String(-Math.PI / 3)],
					output: '0.5000000000000001',
				},
				{ inputs: ['0'], output: '1' },
				{ inputs: [String(Math.PI / 3)], output: '0.5000000000000001' },
				{
					inputs: [String(Math.PI / 2)],
					output: '6.123233995736766e-17',
				},
				{
					inputs: [String((2 * Math.PI) / 3)],
					output: '-0.4999999999999998',
				},
				{ inputs: [String(Math.PI)], output: '-1' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('sin() and sine()', () => {
		test(
			['sin', 'sine'],
			['sin'],
			[
				{
					inputs: [String(-Math.PI)],
					output: '-1.2246467991473532e-16',
				},
				{
					inputs: [String((-2 * Math.PI) / 3)],
					output: '-0.8660254037844387',
				},
				{ inputs: [String(-Math.PI / 2)], output: '-1' },
				{
					inputs: [String(-Math.PI / 3)],
					output: '-0.8660254037844386',
				},
				{ inputs: ['0'], output: '0' },
				{ inputs: [String(Math.PI / 3)], output: '0.8660254037844386' },
				{ inputs: [String(Math.PI / 2)], output: '1' },
				{
					inputs: [String((2 * Math.PI) / 3)],
					output: '0.8660254037844387',
				},
				{ inputs: [String(Math.PI)], output: '1.2246467991473532e-16' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('tan() and tangent()', () => {
		test(
			['tan', 'tangent'],
			['tan'],
			[
				{
					inputs: [String(-Math.PI)],
					output: '1.2246467991473532e-16',
				},
				{
					inputs: [String((-2 * Math.PI) / 3)],
					output: '1.7320508075688783',
				},
				{
					inputs: [String(-Math.PI / 2)],
					output: '-16331239353195370',
				},
				{
					inputs: [String(-Math.PI / 3)],
					output: '-1.7320508075688767',
				},
				{ inputs: ['0'], output: '0' },
				{ inputs: [String(Math.PI / 3)], output: '1.7320508075688767' },
				{ inputs: [String(Math.PI / 2)], output: '16331239353195370' },
				{
					inputs: [String((2 * Math.PI) / 3)],
					output: '-1.7320508075688783',
				},
				{
					inputs: [String(Math.PI)],
					output: '-1.2246467991473532e-16',
				},
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('acos() and inverseCosine()', () => {
		test(
			['acos', 'inverseCosine'],
			['acos'],
			[
				{ inputs: [String(-Math.SQRT2)], output: 'NaN' },
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: '2.356194490192345',
				},
				{ inputs: ['-0.5'], output: '2.0943951023931957' },
				{ inputs: ['0'], output: '1.5707963267948966' },
				{ inputs: ['0.5'], output: '1.0471975511965979' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: '0.7853981633974483',
				},
				{ inputs: [String(Math.SQRT2)], output: 'NaN' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('asin() and inverseSine()', () => {
		test(
			['asin', 'inverseSine'],
			['asin'],
			[
				{ inputs: [String(-Math.SQRT2)], output: 'NaN' },
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: '-0.7853981633974484',
				},
				{ inputs: ['-0.5'], output: '-0.5235987755982989' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['0.5'], output: '0.5235987755982989' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: '0.7853981633974484',
				},
				{ inputs: [String(Math.SQRT2)], output: 'NaN' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('atan() and inverseTangent()', () => {
		test(
			['atan', 'inverseTangent'],
			['atan'],
			[
				{
					inputs: [String(-Math.SQRT2)],
					output: '-0.9553166181245093',
				},
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: '-0.6154797086703874',
				},
				{ inputs: ['-0.5'], output: '-0.4636476090008061' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['0.5'], output: '0.4636476090008061' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: '0.6154797086703874',
				},
				{ inputs: [String(Math.SQRT2)], output: '0.9553166181245093' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-1.5707963267948966' },
				{ inputs: ['Infinity'], output: '1.5707963267948966' },
			],
		);
	});

	it('cosh() and hyperbolicCosine()', () => {
		test(
			['cosh', 'hyperbolicCosine'],
			['cosh'],
			[
				{ inputs: [String(-Math.E)], output: '7.610125138662288' },
				{
					inputs: [String((-2 * Math.E) / 3)],
					output: '3.143563749821104',
				},
				{
					inputs: [String(-Math.E / 2)],
					output: '2.074864470111516',
				},
				{
					inputs: [String(-Math.E / 3)],
					output: '1.4393685681265074',
				},
				{ inputs: ['0'], output: '1' },
				{ inputs: [String(Math.E / 3)], output: '1.4393685681265074' },
				{
					inputs: [String(Math.E / 2)],
					output: '2.074864470111516',
				},
				{
					inputs: [String((2 * Math.E) / 3)],
					output: '3.143563749821104',
				},
				{ inputs: [String(Math.E)], output: '7.610125138662288' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('sinh() and hyperbolicSine()', () => {
		test(
			['sinh', 'hyperbolicSine'],
			['sinh'],
			[
				{
					inputs: [String(-Math.E)],
					output: '-7.544137102816975',
				},
				{
					inputs: [String((-2 * Math.E) / 3)],
					output: '-2.980267278146261',
				},
				{
					inputs: [String(-Math.E / 2)],
					output: '-1.8179831047980461',
				},
				{
					inputs: [String(-Math.E / 3)],
					output: '-1.0352689867423597',
				},
				{ inputs: ['0'], output: '0' },
				{ inputs: [String(Math.E / 3)], output: '1.0352689867423597' },
				{ inputs: [String(Math.E / 2)], output: '1.8179831047980461' },
				{
					inputs: [String((2 * Math.E) / 3)],
					output: '2.980267278146261',
				},
				{ inputs: [String(Math.E)], output: '7.544137102816975' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('tanh() and hyperbolicTangent()', () => {
		test(
			['tanh', 'hyperbolicTangent'],
			['tanh'],
			[
				{
					inputs: [String(-Math.E)],
					output: '-0.9913289158005998',
				},
				{
					inputs: [String((-2 * Math.E) / 3)],
					output: '-0.9480537107974552',
				},
				{
					inputs: [String(-Math.E / 2)],
					output: '-0.8761936651700128',
				},
				{
					inputs: [String(-Math.E / 3)],
					output: '-0.7192521843726748',
				},
				{ inputs: ['0'], output: '0' },
				{ inputs: [String(Math.E / 3)], output: '0.7192521843726748' },
				{ inputs: [String(Math.E / 2)], output: '0.8761936651700128' },
				{
					inputs: [String((2 * Math.E) / 3)],
					output: '0.9480537107974552',
				},
				{
					inputs: [String(Math.E)],
					output: '0.9913289158005998',
				},
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-1' },
				{ inputs: ['Infinity'], output: '1' },
			],
		);
	});

	it('acosh() and inverseHyperbolicCosine()', () => {
		test(
			['acosh', 'inverseHyperbolicCosine'],
			['acosh'],
			[
				{ inputs: [String(-Math.SQRT2)], output: 'NaN' },
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: 'NaN',
				},
				{ inputs: ['-0.5'], output: 'NaN' },
				{ inputs: ['0'], output: 'NaN' },
				{ inputs: ['0.5'], output: 'NaN' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: 'NaN',
				},
				{ inputs: ['1'], output: '0' },
				{ inputs: [String(Math.SQRT2)], output: '0.881373587019543' },
				{ inputs: [String(Math.E)], output: '1.6574544541530771' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('asinh() and inverseHyperbolicSine()', () => {
		test(
			['asinh', 'inverseHyperbolicSine'],
			['asinh'],
			[
				{
					inputs: [String(-Math.SQRT2)],
					output: '-1.1462158347805889',
				},
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: '-0.6584789484624084',
				},
				{ inputs: ['-0.5'], output: '-0.48121182505960347' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['0.5'], output: '0.48121182505960347' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: '0.6584789484624084',
				},
				{ inputs: ['1'], output: '0.881373587019543' },
				{ inputs: [String(Math.SQRT2)], output: '1.1462158347805889' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('atanh() and inverseHyperbolicTangent()', () => {
		test(
			['atanh', 'inverseHyperbolicTangent'],
			['atanh'],
			[
				{
					inputs: [String(-Math.SQRT2)],
					output: 'NaN',
				},
				{
					inputs: ['-1'],
					output: '-Infinity',
				},
				{
					inputs: [String(-Math.SQRT2 / 2)],
					output: '-0.8813735870195432',
				},
				{ inputs: ['-0.5'], output: '-0.5493061443340548' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['0.5'], output: '0.5493061443340548' },
				{
					inputs: [String(Math.SQRT2 / 2)],
					output: '0.8813735870195432',
				},
				{
					inputs: ['1'],
					output: 'Infinity',
				},
				{ inputs: [String(Math.SQRT2)], output: 'NaN' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'NaN' },
			],
		);
	});

	it('isFinite()', () => {
		test(
			['isFinite'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'true' },
				{ inputs: ['-1'], output: 'true' },
				{ inputs: ['-0.5'], output: 'true' },
				{ inputs: ['-1.23e-4'], output: 'true' },
				{ inputs: [String(-Number.EPSILON)], output: 'true' },
				{
					inputs: ['0'],
					output: 'true',
				},
				{ inputs: ['1.23e-4'], output: 'true' },
				{ inputs: ['0.5'], output: 'true' },
				{
					inputs: ['1'],
					output: 'true',
				},
				{ inputs: ['1.23e+4'], output: 'true' },
				{ inputs: ['NaN'], output: 'false' },
				{ inputs: ['-Infinity'], output: 'false' },
				{ inputs: ['Infinity'], output: 'false' },
			],
		);
	});

	it('isInt() and isInteger()', () => {
		test(
			['isInt', 'isInteger'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'true' },
				{ inputs: ['-1'], output: 'true' },
				{ inputs: ['-0.5'], output: 'false' },
				{ inputs: ['-1.23e-4'], output: 'false' },
				{ inputs: [String(-Number.EPSILON)], output: 'false' },
				{
					inputs: ['0'],
					output: 'true',
				},
				{ inputs: ['1.23e-4'], output: 'false' },
				{ inputs: ['0.5'], output: 'false' },
				{
					inputs: ['1'],
					output: 'true',
				},
				{ inputs: ['1.23e+4'], output: 'true' },
				{ inputs: ['NaN'], output: 'false' },
				{ inputs: ['-Infinity'], output: 'false' },
				{ inputs: ['Infinity'], output: 'false' },
			],
		);
	});

	it('isNaN()', () => {
		test(
			['isNaN'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'false' },
				{ inputs: ['-1'], output: 'false' },
				{ inputs: ['-0.5'], output: 'false' },
				{ inputs: ['-1.23e-4'], output: 'false' },
				{ inputs: [String(-Number.EPSILON)], output: 'false' },
				{
					inputs: ['0'],
					output: 'false',
				},
				{ inputs: ['1.23e-4'], output: 'false' },
				{ inputs: ['0.5'], output: 'false' },
				{
					inputs: ['1'],
					output: 'false',
				},
				{ inputs: ['1.23e+4'], output: 'false' },
				{ inputs: ['NaN'], output: 'true' },
				{ inputs: ['-Infinity'], output: 'false' },
				{ inputs: ['Infinity'], output: 'false' },
			],
		);
	});

	it('isNeg() and isNegative()', () => {
		test(
			['isNeg', 'isNegative'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'true' },
				{ inputs: ['-1'], output: 'true' },
				{ inputs: ['-0.5'], output: 'true' },
				{ inputs: ['-1.23e-4'], output: 'true' },
				{ inputs: [String(-Number.EPSILON)], output: 'true' },
				{
					inputs: ['-0'],
					output: 'false',
				},
				{
					inputs: ['0'],
					output: 'false',
				},
				{ inputs: ['1.23e-4'], output: 'false' },
				{ inputs: ['0.5'], output: 'false' },
				{
					inputs: ['1'],
					output: 'false',
				},
				{ inputs: ['1.23e+4'], output: 'false' },
				{ inputs: ['NaN'], output: 'false' },
				{ inputs: ['-Infinity'], output: 'true' },
				{ inputs: ['Infinity'], output: 'false' },
			],
		);
	});

	it('isPos() and isPositive()', () => {
		test(
			['isPos', 'isPositive'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'false' },
				{ inputs: ['-1'], output: 'false' },
				{ inputs: ['-0.5'], output: 'false' },
				{ inputs: ['-1.23e-4'], output: 'false' },
				{ inputs: [String(-Number.EPSILON)], output: 'false' },
				{
					inputs: ['-0'],
					output: 'false',
				},
				{
					inputs: ['0'],
					output: 'false',
				},
				{ inputs: ['1.23e-4'], output: 'true' },
				{ inputs: ['0.5'], output: 'true' },
				{
					inputs: ['1'],
					output: 'true',
				},
				{ inputs: ['1.23e+4'], output: 'true' },
				{ inputs: ['NaN'], output: 'false' },
				{ inputs: ['-Infinity'], output: 'false' },
				{ inputs: ['Infinity'], output: 'true' },
			],
		);
	});

	it('isZero()', () => {
		test(
			['isZero'],
			[],
			[
				{ inputs: ['-1.23e4'], output: 'false' },
				{ inputs: ['-1'], output: 'false' },
				{ inputs: ['-0.5'], output: 'false' },
				{ inputs: ['-1.23e-4'], output: 'false' },
				{ inputs: [String(-Number.EPSILON)], output: 'false' },
				{
					inputs: ['-0'],
					output: 'true',
				},
				{
					inputs: ['0'],
					output: 'true',
				},
				{ inputs: ['1.23e-4'], output: 'false' },
				{ inputs: ['0.5'], output: 'false' },
				{
					inputs: ['1'],
					output: 'false',
				},
				{ inputs: ['1.23e+4'], output: 'false' },
				{ inputs: ['NaN'], output: 'false' },
				{ inputs: ['-Infinity'], output: 'false' },
				{ inputs: ['Infinity'], output: 'false' },
			],
		);
	});

	it('static max()', () => {
		test(
			[],
			['max'],
			[
				{ inputs: [], output: '-Infinity' },
				{ inputs: ['-1'], output: '-1' },
				{ inputs: ['-1', '-0.5'], output: '-0.5' },
				{ inputs: ['-1', '-0.5', '-1.23e-4'], output: '-0.000123' },
				{
					inputs: ['-1', '-0.5', '-1.23e-4', String(-Number.EPSILON)],
					output: String(-Number.EPSILON),
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(-Number.EPSILON),
						'-0',
					],
					output: '0',
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(-Number.EPSILON),
						'-0',
						'0',
					],
					output: '0',
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: String(Number.EPSILON),
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
						'NaN',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'NaN',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'NaN',
						'Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'Infinity',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'Infinity',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'NaN',
						'0',
					],
					output: 'NaN',
				},
			],
		);
	});

	it('static min()', () => {
		test(
			[],
			['min'],
			[
				{ inputs: [], output: 'Infinity' },
				{ inputs: ['-1'], output: '-1' },
				{ inputs: ['-1', '-0.5'], output: '-1' },
				{ inputs: ['-1', '-0.5', '-1.23e-4'], output: '-1' },
				{
					inputs: ['-1', '-0.5', '-1.23e-4', String(-Number.EPSILON)],
					output: '-1',
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(-Number.EPSILON),
						'-0',
					],
					output: '-1',
				},
				{
					inputs: ['1', '0.5', '1.23e-4', String(Number.EPSILON)],
					output: String(Number.EPSILON),
				},
				{
					inputs: [
						'1',
						'0.5',
						'1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: '0',
				},
				{
					inputs: [
						'-1',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
						'NaN',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'NaN',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'NaN',
						'Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: 'NaN',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-0.5',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: '-1',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'-0',
						'0',
					],
					output: '-Infinity',
				},
				{
					inputs: [
						'-1',
						'Infinity',
						'-Infinity',
						'-1.23e-4',
						String(Number.EPSILON),
						'NaN',
						'0',
					],
					output: 'NaN',
				},
			],
		);
	});

	it('static hypot()', () => {
		test(
			[],
			['hypot'],
			[
				{ inputs: ['3', '4'], output: '5' },
				{ inputs: ['-3', '4'], output: '5' },
				{
					inputs: ['1.5', '1.5', '1.5', '1.5', '2', '2', '2', '2'],
					output: '5',
				},
				{ inputs: ['-3e-1', '4e-1'], output: '0.5' },
				{ inputs: ['3e-3', '-4e-3'], output: '0.005' },
				{ inputs: ['-3e-3', '-4e-3'], output: '0.005' },
				{ inputs: ['-5'], output: '5' },
				{ inputs: ['50'], output: '50' },
				{ inputs: ['50.00'], output: '50' },
				{ inputs: ['-5e-1'], output: '0.5' },
				{ inputs: ['5e-2'], output: '0.05' },
				{ inputs: ['1.234'], output: '1.234' },
				{ inputs: ['1.2345'], output: '1.2345' },
				{ inputs: ['0'], output: '0' },
				{ inputs: ['0', 'NaN'], output: 'NaN' },
				{ inputs: ['2', '3', 'NaN'], output: 'NaN' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['0', 'Infinity'], output: 'Infinity' },
				{ inputs: ['2', '3', 'Infinity'], output: 'Infinity' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'Infinity' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('static log2()', () => {
		test(
			[],
			['log2'],
			[
				{ inputs: ['-5'], output: 'NaN' },
				{ inputs: ['5'], output: '2.3219280948873626' },
				{ inputs: ['-5.12'], output: 'NaN' },
				{ inputs: ['+5.13'], output: '2.358958825832329' },
				{ inputs: ['1'], output: '0' },
				{ inputs: ['128'], output: '7' },
				{ inputs: ['0'], output: '-Infinity' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('static log10()', () => {
		test(
			[],
			['log10'],
			[
				{ inputs: ['-5'], output: 'NaN' },
				{ inputs: ['5'], output: '0.6989700043360189' },
				{ inputs: ['-5.12'], output: 'NaN' },
				{ inputs: ['+5.13'], output: '0.7101173651118162' },
				{ inputs: ['1'], output: '0' },
				{ inputs: ['1e-4'], output: '-4' },
				{ inputs: ['100'], output: '2' },
				{ inputs: ['0'], output: '-Infinity' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: 'NaN' },
				{ inputs: ['Infinity'], output: 'Infinity' },
			],
		);
	});

	it('static atan2()', () => {
		test(
			[],
			['atan2'],
			[
				{ inputs: ['-1', 'Infinity'], output: '0' },
				{ inputs: ['-1', '-Infinity'], output: '-3.141592653589793' },
				{ inputs: ['0', '-Infinity'], output: '3.141592653589793' },
				{ inputs: ['-Infinity', '0'], output: '-1.5707963267948966' },
				{ inputs: ['Infinity', '0'], output: '1.5707963267948966' },
				{ inputs: ['0', '0'], output: '0' },
				{ inputs: ['1', '1'], output: '0.7853981633974483' },
				{ inputs: ['1', '-1'], output: '2.356194490192345' },
				{ inputs: ['-2', '2'], output: '-0.7853981633974483' },
				{ inputs: ['-3', '-3'], output: '-2.356194490192345' },
				{
					inputs: [String(Math.SQRT2), '1'],
					output: '0.9553166181245093',
				},
				{ inputs: ['NaN', '1'], output: 'NaN' },
				{ inputs: ['NaN', '0'], output: 'NaN' },
				{ inputs: ['1', 'NaN'], output: 'NaN' },
				{ inputs: ['0', 'NaN'], output: 'NaN' },
				{ inputs: ['-Infinity', 'NaN'], output: 'NaN' },
				{ inputs: ['Infinity', 'NaN'], output: 'NaN' },
			],
		);
	});

	it('static random()', () => {
		for (const _ of new Array(100)) {
			void _;
			const result = Decimal.random();

			expect(result).to.be.an.instanceof(Decimal);
			expect(Number(result)).to.be.within(0, 1);
		}
	});

	it('static sign()', () => {
		test(
			[],
			['sign'],
			[
				{ inputs: ['-1.23e4'], output: '-1' },
				{ inputs: ['-1'], output: '-1' },
				{ inputs: ['-0.5'], output: '-1' },
				{ inputs: ['-1.23e-4'], output: '-1' },
				{ inputs: [String(-Number.EPSILON)], output: '-1' },
				{
					inputs: ['-0'],
					output: '0',
				},
				{
					inputs: ['0'],
					output: '0',
				},
				{ inputs: ['1.23e-4'], output: '1' },
				{ inputs: ['0.5'], output: '1' },
				{
					inputs: ['1'],
					output: '1',
				},
				{ inputs: ['1.23e+4'], output: '1' },
				{ inputs: ['NaN'], output: 'NaN' },
				{ inputs: ['-Infinity'], output: '-1' },
				{ inputs: ['Infinity'], output: '1' },
			],
		);
	});
});
