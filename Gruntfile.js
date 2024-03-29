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

module.exports = (grunt) => {
	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					'dist/index.js': ['./src/index.ts'],
				},
				options: {
					plugin: [
						'tsify',
						process.env.NODE_ENV === 'production' ? 'tinyify' : '',
					].filter((p) => !!p),
					browserifyOptions: {
						node: true,
						debug: true,
						standalone: 'decimal.js-float',
					},
				},
			},
		},
		exorcise: {
			dist: {
				options: {},
				files: {
					'dist/index.js.map': ['dist/index.js'],
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('@exact-realty/grunt-exorcise');

	grunt.registerTask('default', ['browserify:dist', 'exorcise:dist']);
};
