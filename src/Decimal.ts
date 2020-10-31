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

const decimalPlaces = (a: number): number => {
	if (!Number.isFinite(a)) {
		return Number.NaN;
	}

	let p = 0;

	for (let v = 1; (a * v) % 1 !== 0; v *= 10, p++);

	return p;
};

const correctionFactor = (...values: number[]): number => {
	const p = Math.max(...values.map(decimalPlaces));
	return p === p ? Math.pow(10, p) : 1;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type DecimalArg = string | number | Number;

export class Decimal extends Number {
	abs(): Decimal {
		return new Decimal(Math.abs(this.valueOf()));
	}

	absoluteValue(): Decimal {
		return this.abs();
	}

	ceil(): Decimal {
		return new Decimal(Math.ceil(this.valueOf()));
	}

	floor(): Decimal {
		return new Decimal(Math.floor(this.valueOf()));
	}

	neg(): Decimal {
		return new Decimal(-this.valueOf());
	}

	negated(): Decimal {
		return this.neg();
	}

	round(): Decimal {
		return new Decimal(Math.round(this.valueOf()));
	}

	toDP(precision?: DecimalArg): Decimal {
		const pf = Math.pow(10, +(precision?.valueOf() ?? 0));
		return new Decimal(Math.round(this.valueOf() * pf) / pf);
	}

	toDecimalPlaces(precision?: DecimalArg): Decimal {
		return this.toDP(precision);
	}

	// Unimplemented methods
	// toFraction
	// toNearest
	// toSD / toSignificantDigits

	trunc(): Decimal {
		return new Decimal(Math.trunc(this.valueOf()));
	}

	truncated(): Decimal {
		return this.trunc();
	}

	// Unimplemented methods
	// toBinary

	toExponential(): string {
		return this.valueOf().toExponential();
	}

	// toHexadecimal
	// toOctal

	toNumber(): number {
		return this.valueOf();
	}

	cmp(b: DecimalArg): number {
		const av = this.valueOf();
		const bv = +b.valueOf();

		return av === bv ? 0 : av < bv ? -1 : av > bv ? 1 : Number.NaN;
	}

	compareTo(b: DecimalArg): number {
		return this.cmp(b);
	}

	eq(b: DecimalArg): boolean {
		return this.valueOf() === +b.valueOf();
	}

	equals(b: DecimalArg): boolean {
		return this.eq(b);
	}

	gt(b: DecimalArg): boolean {
		return this.valueOf() > +b.valueOf();
	}

	greaterThan(b: DecimalArg): boolean {
		return this.gt(b);
	}

	gte(b: DecimalArg): boolean {
		return this.valueOf() >= +b.valueOf();
	}

	greaterThanOrEqualTo(b: DecimalArg): boolean {
		return this.gte(b);
	}

	lt(b: DecimalArg): boolean {
		return this.valueOf() < +b.valueOf();
	}

	lessThan(b: DecimalArg): boolean {
		return this.lt(b);
	}

	lte(b: DecimalArg): boolean {
		return this.valueOf() <= +b.valueOf();
	}

	lessThanOrEqualTo(b: DecimalArg): boolean {
		return this.lte(b);
	}

	cbrt(): Decimal {
		const av = this.valueOf();
		const C = correctionFactor(av);

		return new Decimal(Math.cbrt(av * C * C * C) / C);
	}

	cubeRoot(): Decimal {
		return this.cbrt();
	}

	div(q: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +q.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal((av * C) / (bv * C));
	}

	dividedBy(q: DecimalArg): Decimal {
		return this.div(q);
	}

	divToInt(q: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +q.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal(Math.round((av * C) / (bv * C)));
	}

	dividedToIntegerBy(q: DecimalArg): Decimal {
		return this.divToInt(q);
	}

	log(b: DecimalArg = 10): Decimal {
		return new Decimal(
			Math.log10(this.valueOf()) / Math.log10(+b.valueOf()),
		);
	}

	logarithm(b: DecimalArg = 10): Decimal {
		return this.log(b);
	}

	sub(s: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +s.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal((av * C - bv * C) / C);
	}

	minus(s: DecimalArg): Decimal {
		return this.sub(s);
	}

	mod(m: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +m.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal(((av * C) % (bv * C)) / C);
	}

	modulo(m: DecimalArg): Decimal {
		return this.mod(m);
	}

	exp(): Decimal {
		return new Decimal(Math.exp(this.valueOf()));
	}

	naturalExponential(): Decimal {
		return this.exp();
	}

	ln(): Decimal {
		return new Decimal(Math.log(this.valueOf()));
	}

	naturalLogarithm(): Decimal {
		return this.ln();
	}

	add(s: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +s.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal((av * C + bv * C) / C);
	}

	plus(s: DecimalArg): Decimal {
		return this.add(s);
	}

	sqrt(): Decimal {
		const av = this.valueOf();
		const C = correctionFactor(av);

		return new Decimal(Math.sqrt(av * C * C) / C);
	}

	squareRoot(): Decimal {
		return this.sqrt();
	}

	mul(f: DecimalArg): Decimal {
		const av = this.valueOf();
		const bv = +f.valueOf();
		const C = correctionFactor(av, bv);

		return new Decimal((av * C * (bv * C)) / (C * C));
	}

	times(f: DecimalArg): Decimal {
		return this.mul(f);
	}

	pow(e: DecimalArg): Decimal {
		const av = this.valueOf();
		const ev = +e.valueOf();

		if (Number.isInteger(ev)) {
			const C = correctionFactor(av);

			return new Decimal(Math.pow(av * C, ev) / Math.pow(C, ev));
		} else {
			const logC = Math.max(decimalPlaces(av), decimalPlaces(ev));

			return new Decimal(
				Math.pow(av * Math.pow(10, Math.ceil(ev * logC) / ev), ev) /
					Math.pow(10, Math.ceil(ev * logC)),
			);
		}
	}

	toPower(e: DecimalArg): Decimal {
		return this.pow(e);
	}

	dp(): number {
		return decimalPlaces(this.valueOf());
	}

	decimalPlaces(): number {
		return this.dp();
	}

	sd(): number {
		const av = Math.abs(this.valueOf());

		if (av === 0) {
			return 1;
		}

		const dp = decimalPlaces(av);

		if (av >= 1) {
			const ip = Math.trunc(av);
			const id = Math.floor(Math.log10(ip + Number.EPSILON));

			return id + dp + 1;
		} else {
			const id = Math.ceil(Math.log10(av + Number.EPSILON));

			return id + dp;
		}
	}

	precision(): number {
		return this.sd();
	}

	cos(): Decimal {
		return new Decimal(Math.cos(this.valueOf()));
	}

	cosine(): Decimal {
		return this.cos();
	}

	sin(): Decimal {
		return new Decimal(Math.sin(this.valueOf()));
	}

	sine(): Decimal {
		return this.sin();
	}

	tan(): Decimal {
		return new Decimal(Math.tan(this.valueOf()));
	}

	tangent(): Decimal {
		return this.tan();
	}

	acos(): Decimal {
		return new Decimal(Math.acos(this.valueOf()));
	}

	inverseCosine(): Decimal {
		return this.acos();
	}

	asin(): Decimal {
		return new Decimal(Math.asin(this.valueOf()));
	}

	inverseSine(): Decimal {
		return this.asin();
	}

	atan(): Decimal {
		return new Decimal(Math.atan(this.valueOf()));
	}

	inverseTangent(): Decimal {
		return this.atan();
	}

	cosh(): Decimal {
		return new Decimal(Math.cosh(this.valueOf()));
	}

	hyperbolicCosine(): Decimal {
		return this.cosh();
	}

	sinh(): Decimal {
		return new Decimal(Math.sinh(this.valueOf()));
	}

	hyperbolicSine(): Decimal {
		return this.sinh();
	}

	tanh(): Decimal {
		return new Decimal(Math.tanh(this.valueOf()));
	}

	hyperbolicTangent(): Decimal {
		return this.tanh();
	}

	acosh(): Decimal {
		return new Decimal(Math.acosh(this.valueOf()));
	}

	inverseHyperbolicCosine(): Decimal {
		return this.acosh();
	}

	asinh(): Decimal {
		return new Decimal(Math.asinh(this.valueOf()));
	}

	inverseHyperbolicSine(): Decimal {
		return this.asinh();
	}

	atanh(): Decimal {
		return new Decimal(Math.atanh(this.valueOf()));
	}

	inverseHyperbolicTangent(): Decimal {
		return this.atanh();
	}

	isFinite(): boolean {
		return !Number.isNaN(this.valueOf() - this.valueOf());
	}

	isInt(): boolean {
		return Number.isInteger(this.valueOf());
	}

	isInteger(): boolean {
		return this.isInt();
	}

	isNaN(): boolean {
		return this.valueOf() !== this.valueOf();
	}

	isNeg(): boolean {
		return this.valueOf() < 0;
	}

	isNegative(): boolean {
		return this.isNeg();
	}

	isPos(): boolean {
		return this.valueOf() > 0;
	}

	isPositive(): boolean {
		return this.isPos();
	}

	isZero(): boolean {
		return this.valueOf() === 0;
	}

	static add(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).add(y);
	}

	static div(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).div(y);
	}

	static mod(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).mod(y);
	}

	static mul(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).mul(y);
	}

	static pow(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).pow(y);
	}

	static sub(x: DecimalArg, y: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).sub(y);
	}

	static abs(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).abs();
	}

	static ceil(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).ceil();
	}

	static floor(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).floor();
	}

	static max(...values: DecimalArg[]): Decimal {
		return new Decimal(Math.max(...values.map((v) => +v.valueOf())));
	}

	static min(...values: DecimalArg[]): Decimal {
		return new Decimal(Math.min(...values.map((v) => +v.valueOf())));
	}

	static round(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).round();
	}

	static trunc(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).trunc();
	}

	static hypot(...values: DecimalArg[]): Decimal {
		const nvalues = values.map((v) => +v.valueOf());
		const C = correctionFactor(...nvalues);

		return new Decimal(Math.hypot(...nvalues.map((v) => v * C)) / C);
	}

	static sqrt(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).sqrt();
	}

	static exp(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).exp();
	}

	static ln(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).ln();
	}

	static log(x: DecimalArg, y?: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).log(y);
	}

	static log2(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).log(2);
	}

	static log10(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).log(10);
	}

	static cos(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).cos();
	}

	static sin(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).sin();
	}

	static tan(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).tan();
	}

	static acos(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).acos();
	}

	static asin(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).asin();
	}

	static atan(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).atan();
	}

	static atan2(x: DecimalArg, y: DecimalArg): Decimal {
		return new Decimal(Math.atan2(+x.valueOf(), +y.valueOf()));
	}

	static cosh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).cosh();
	}

	static sinh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).sinh();
	}

	static tanh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).tanh();
	}

	static acosh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).acosh();
	}

	static asinh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).asinh();
	}

	static atanh(x: DecimalArg): Decimal {
		return (x instanceof Decimal ? x : new Decimal(+x.valueOf())).atanh();
	}

	static random(): Decimal {
		return new Decimal(Math.random());
	}

	static sign(x: DecimalArg): number {
		const v = +x.valueOf();
		return v === 0 ? 0 : v < 0 ? -1 : v > 0 ? 1 : Number.NaN;
	}
}
