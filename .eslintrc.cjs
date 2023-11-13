module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-prettier'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'vue/multi-word-component-names': 0,
		'no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'after-used',
				ignoreRestSiblings: false,
				varsIgnorePattern: 'props',
			},
		],
		'vue/no-use-v-if-with-v-for': [
			'warn',
			{
				allowUsingIterationVar: true,
			},
		],
		'vue/require-default-prop': 'off',
		'prettier/prettier': [
			'warn',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
				endOfLine: 'auto',
			},
		],
	},
	ignorePatterns: ['build', 'dist', 'public'],
};
