const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
	transpileDependencies: ["quasar"],

	pages: {
		index: {
			entry: "examples/main.ts",
			template: "public/index.html",
			filename: "index.html"
		}
	},

	devServer: {
	 
		proxy: {
		 
			"/upload": {
				target: "https://p2.bttcdn.com/1d37ca110a2a8d40/",
				changeOrigin: true,
				pathRewrite: {
					"^/upload": "upload"
				}
			},
			"/api": {
				target: "http://127.0.0.1:8110",
				changeOrigin: true
			}
		}
	},

	configureWebpack: (config) => {
		if (process.env.NODE_ENV === "production") {
		 
			config.externals = {};
		}
	},

	chainWebpack: (config) => {
		 
		config.resolve.alias
			.set("@", path.resolve("examples"))
			.set("~", path.resolve("packages"))
			.set("crypto", false);
		 
		config.module.rule("eslint").exclude.add(path.resolve("lib")).end();
	 
		config.module
			.rule("js")
			.include.add(/packages/)
			.end()
			.include.add(/examples/)
			.end()
			.use("babel")
			.loader("babel-loader")
			.tap((options) => {
				return options;
			});
	},

	css: {
		 
		extract: false
	},

	pluginOptions: {
		quasar: {
			importStrategy: "kebab",
			rtlSupport: false
		}
	}
});
