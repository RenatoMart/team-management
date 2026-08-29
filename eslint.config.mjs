import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTypescript,
	tailwindcss.configs.recommended,
	prettierRecommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		plugins: {
			'unused-imports': unusedImports,
		},
		settings: {
			tailwindcss: {
				cssConfigPath: 'src/app/globals.css',
			},
		},
		rules: {
			'react/prop-types': 'off', // <- Should be disabled in TypeScript
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'no-console': 'error',
			semi: ['error', 'always'], // <- Always use semi-colons
			eqeqeq: ['error', 'always'], // <- Always use triple =
			'max-len': [
				'error',
				{
					code: 90,
					ignorePattern: '^className=*',
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreComments: true,
				},
			],
			'no-trailing-spaces': ['error', { skipBlankLines: true }],
			'eol-last': ['error', 'always'],
			'no-unused-vars': [
				'error',
				{ args: 'after-used', argsIgnorePattern: '^_' },
			],
			'import/no-unresolved': 'error',
		},
	},
	globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'next-env.d.ts']),
]);

export default eslintConfig;
