import type { StorybookConfig } from "@storybook/vue3-webpack5";

const config: StorybookConfig = {
	stories: [
		"../packages/**/*.mdx",
		"../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)"
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-styling",
			options: {
				sass: {
					// Require your Sass preprocessor here·
					implementation: require("sass")
				}
			}
		}
	],
	framework: {
		name: "@storybook/vue3-webpack5",
		options: {}
	},
	docs: {
		autodocs: "tag"
	}
};
export default config;
