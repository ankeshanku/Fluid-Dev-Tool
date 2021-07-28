export const fileMap = [
	{
		location: 'build/index.html',
		content: `<!-- Copyright (c) Microsoft Corporation. All rights reserved. -->
<!-- Licensed under the MIT License. -->

<!DOCTYPE html>
<html lang="en" style="height: 100%">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>$PACKAGE_NAME$</title>
    </head>
    <body style="margin: 0; height: 100%">
        <div id="content" style="min-height: 100%"></div>
    </body>
</html>
`
	},
	{
		location: '.editorconfig',
		content: `[*]
indent_size = 4
trim_trailing_whitespace = true
insert_final_newline = true        
`
	},
	{
		location: '.gitattribute',
		content: `# This file sourced from https://github.com/alexkaratarakis/gitattributes

# The MIT License (MIT)

# Copyright (c) 2015 Alexander Karatarakis

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the righst
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

## GITATTRIBUTES FOR WEB PROJECTS
#
# These settings are for any web project.
#
# Details per file setting:
#   text    These files should be normalized (i.e. convert CRLF to LF).
#   binary  These files are binary and should be left untouched.
#
# Note that binary is a macro for -text -diff.
######################################################################

# Auto detect
##   Handle line endings automatically for files detected as
##   text and leave all files detected as binary untouched.
##   This will handle all files NOT defined below.
*                 text=auto

# Source code
*.bash            text eol=lf
*.bat             text eol=crlf
*.cmd             text eol=crlf
*.coffee          text
*.css             text
*.htm             text diff=html
*.html            text diff=html
*.inc             text
*.ini             text
*.js              text
*.json            text
*.jsx             text
*.less            text
*.ls              text
*.map             text -diff
*.od              text
*.onlydata        text
*.php             text diff=php
*.pl              text
*.ps1             text eol=crlf
*.py              text diff=python
*.rb              text diff=ruby
*.sass            text
*.scm             text
*.scss            text diff=css
*.sh              text eol=lf
*.sql             text
*.styl            text
*.tag             text
*.ts              text
*.tsx             text
*.xml             text
*.xhtml           text diff=html

# Docker
*.dockerignore    text
Dockerfile        text

# Documentation
*.ipynb           text
*.markdown        text
*.md              text
*.mdwn            text
*.mdown           text
*.mkd             text
*.mkdn            text
*.mdtxt           text
*.mdtext          text
*.txt             text
AUTHORS           text
CHANGELOG         text
CHANGES           text
CONTRIBUTING      text
COPYING           text
copyright         text
*COPYRIGHT*       text
INSTALL           text
license           text
LICENSE           text
NEWS              text
readme            text
*README*          text
TODO              text

# Templates
*.dot             text
*.ejs             text
*.haml            text
*.handlebars      text
*.hbs             text
*.hbt             text
*.jade            text
*.latte           text
*.mustache        text
*.njk             text
*.phtml           text
*.tmpl            text
*.tpl             text
*.twig            text
*.vue             text

# Linters
.csslintrc        text
.eslintrc         text
.htmlhintrc       text
.jscsrc           text
.jshintrc         text
.jshintignore     text
.stylelintrc      text

# Configs
*.bowerrc         text
*.cnf             text
*.conf            text
*.config          text
.babelrc          text
.browserslistrc   text
.editorconfig     text
.env              text
.gitattributes    text
.gitconfig        text
.htaccess         text
*.lock            text -diff
package-lock.json text -diff
*.npmignore       text
*.yaml            text
*.yml             text
browserslist      text
Makefile          text
makefile          text

# Heroku
Procfile          text
.slugignore       text

# Graphics
*.ai              binary
*.bmp             binary
*.eps             binary
*.gif             binary
*.gifv            binary
*.ico             binary
*.jng             binary
*.jp2             binary
*.jpg             binary
*.jpeg            binary
*.jpx             binary
*.jxr             binary
*.pdf             binary
*.png             binary
*.psb             binary
*.psd             binary
# SVG treated as an asset (binary) by default.
*.svg             text
# If you want to treat it as binary,
# use the following line instead.
# *.svg           binary
*.svgz            binary
*.tif             binary
*.tiff            binary
*.wbmp            binary
*.webp            binary

# Audio
*.kar             binary
*.m4a             binary
*.mid             binary
*.midi            binary
*.mp3             binary
*.ogg             binary
*.ra              binary

# Video
*.3gpp            binary
*.3gp             binary
*.as              binary
*.asf             binary
*.asx             binary
*.fla             binary
*.flv             binary
*.m4v             binary
*.mng             binary
*.mov             binary
*.mp4             binary
*.mpeg            binary
*.mpg             binary
*.ogv             binary
*.swc             binary
*.swf             binary
*.webm            binary

# Archives
*.7z              binary
*.gz              binary
*.jar             binary
*.rar             binary
*.tar             binary
*.zip             binary

# Fonts
*.ttf             binary
*.eot             binary
*.otf             binary
*.woff            binary
*.woff2           binary

# Executables
*.exe             binary
*.pyc             binary
`
	},
	{
		location: 'package.json',
		content: `{
    "name": "@fluidx/$PACKAGE_ALIAS_SNAKE$",
    "version": "0.0.32",
    "description": "Your project description",
    "license": "MIT",
    "author": "Microsoft",
    "sideEffects": false,
    "main": "lib/index.js",
    "types": "lib/index.d.ts",
    "scripts": {
        "build": "npm run build-component & npm run build-container",
        "build-container": "webpack --config webpack.container.config.js",
        "build-component": "tsc --project tsconfig.json",
        "start": "webpack serve --config webpack.dev.config.js",
        "start-t": "concurrently \\"npm:start-t:server\\" \\"npm:start-t:client\\"",
        "start-t:client": "webpack serve --env tinylicious",
        "start-t:server": "tinylicious"
    },
    "peerDependencies": {
        "@fluidframework/aqueduct": ">=0.43.1",
        "@fluidframework/common-utils": ">=0.31.0",
        "@fluidframework/view-interfaces": ">=0.43.1",
        "@fluidx/base-container": ">=2.32.8",
        "react": ">=17.0.0",
        "react-dom": ">=17.0.0",
        "tslib": "^2.1.0"
    },
    "devDependencies": {
        "@fluidframework/aqueduct": "^0.43.1",
        "@fluidframework/common-utils": "^0.31.0",
        "@fluidframework/container-definitions": "^0.39.5",
        "@fluidframework/container-loader": "^0.43.1",
        "@fluidframework/container-runtime-definitions": "^0.43.1",
        "@fluidframework/core-interfaces": "^0.39.5",
        "@fluidframework/driver-utils": "^0.43.1",
        "@fluidframework/get-tinylicious-container": "^0.34.3",
        "@fluidframework/local-driver": "^0.43.1",
        "@fluidframework/server-local-server": "^0.1027.0",
        "@fluidframework/view-interfaces": "^0.43.1",
        "@fluidx/base-container": "^2.32.8",
        "@fluidx/office-fluid-types": "^25.20.0",
        "@fluidx/utilities": "^8.19.8",
        "@types/react": "^17.0.0",
        "@types/react-dom": "^17.0.0",
        "concurrently": "^5.3.0",
        "css-loader": "^1.0.0",
        "html-webpack-plugin": "^4.3.0",
        "react": "^17.0.0",
        "react-dom": "^17.0.0",
        "style-loader": "^1.0.0",
        "tinylicious": "0.3.10860",
        "ts-loader": "^6.1.2",
        "typescript": "~4.0.2",
        "webpack": "^4.44.2",
        "webpack-cli": "^4.2.0",
        "webpack-dev-server": "^3.8.0"
    }
}
`
	},
	{
		location: '.gitignore',
		content: `dist
lib
node_modules`
	},
	{
		location: '.npmignore',
		content: `nyc
*.log
**/*.tsbuildinfo
`
	},
	{
		location: '.npmrc',
		content: `@ms:registry=https://office.pkgs.visualstudio.com/_packaging/Office/npm/registry/
//office.pkgs.visualstudio.com/_packaging/Office/npm/registry/:always-auth=true

registry=https://office.pkgs.visualstudio.com/_packaging/Office/npm/registry/
always-auth=true
`
	},
	{
		location: 'prettier.config.js',
		content: `/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = {
    endOfLine: "lf",
    jsxBracketSameLine: true,
    printWidth: 100,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    overrides: [
        {
            files: ["*.css", "*.scss"],
            options: {
                printWidth: 80,
            },
        },
    ],
};
`
	},
	{
		location: 'tsconfig.json',
		content: `{
    "compilerOptions": {
        "target": "es2017",
        "module": "esnext",
        "jsx": "react",
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,
        "experimentalDecorators": true,
        "noEmitOnError": true,
        "moduleResolution": "node",
        "strict": true,
        "noFallthroughCasesInSwitch": true,
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "importHelpers": true,
        "outDir": "lib",
        "resolveJsonModule": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"],
    "exclude": ["src/demoApp/**/*", "src/demoAppTinylicious/**/*"]
}
        `
	},
	{
		location: 'webpack.container.config.js',
		content: `/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const path = require("path");

module.exports = (env) => {
    return {
        entry: {
            container: "./src/container.ts",
            component: "./src/index.ts"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        output: {
            filename: "[name]\\main.bundle.js",
            path: path.resolve(__dirname, "dist"),
            library: "$PACKAGE_ALIAS_SNAKE$",
            libraryTarget: "umd",
        },
        mode: "development", //"production",
        devtool: "source-map"
        // externals: {
        //     '@fluidframework/aqueduct': '@fluidframework/aqueduct',
        //     '@fluidframework/common-utils': '@fluidframework/common-utils',
        //     '@fluidframework/view-interfaces': '@fluidframework/view-interfaces',
        //     '@fluidx/base-container': '@fluidx/base-container',
        //     'react': 'react',
        //     'react-dom': 'react-dom'
        // }
    };
};
`
	},
	{
		location: 'webpack.dev.config.js',
		content: `/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    console.log("env", env);

    return {
        entry: {
            main: env.tinylicious ? "./src/demoAppTinylicious/app.ts" : "./src/demoApp/app.tsx",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        devServer: {
            contentBase: "dist",
            headers: {
                // For serving container bundle
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            },
            port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            library: "[name]",
            // https://github.com/webpack/webpack/issues/5767
            // https://github.com/webpack/webpack/issues/7939
            devtoolNamespace: "@fluid/project-name",
            libraryTarget: "umd",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./build/index.html",
            }),
        ],
        mode: "development",
        devtool: "inline-source-map",
    };
};
`
	},
	{
		location: 'src/component/index.ts',
		content: `import { $PACKAGE_ALIAS_PASCAL$ } from "./$PACKAGE_ALIAS_PASCAL$";
import { LazyPromise } from "@fluidframework/common-utils";

export * from "./$PACKAGE_ALIAS_PASCAL$";

// TODO: Change any to ComponentRegistryData
export const registryInfo: any = {
    discoverData: getDiscoverData,
    factory: new LazyPromise(() => Promise.resolve($PACKAGE_ALIAS_PASCAL$.getFactory())),
};

export const componentType = "$PACKAGE_ALIAS_PASCAL$";

// TODO: Change any[] to ComponentDiscoverData[]
function getDiscoverData(_locale: string): LazyPromise<any[]> {
    return new LazyPromise(async () => [
        {
            queryableData: {
                displayName: "$PACKAGE_NAME$",
                icon: "FFXQuestionAnswer",
                keywords: [],
                description: "",
            },
        },
    ]);
}
`
	},
	{
		location: 'src/component/$PACKAGE_ALIAS_PASCAL$.tsx',
		content: `import * as React from "react";
import * as ReactDOM from "react-dom";

import { DataObjectFactory, DataObject, IDataObjectProps } from "@fluidframework/aqueduct";
import { IFluidHTMLView } from "@fluidframework/view-interfaces";
import { ComponentFocusable, FocusDirection } from "@fluidx/office-fluid-types";
import { $PACKAGE_ALIAS_PASCAL$View } from "./$PACKAGE_ALIAS_PASCAL$View";

const valueKey = "value";

interface Props {}

export class $PACKAGE_ALIAS_PASCAL$
    extends DataObject<Props>
    implements IFluidHTMLView, ComponentFocusable
{
    private domElement: HTMLElement | undefined;

    private value: string | undefined = "";

    private static readonly factory = new DataObjectFactory(
        "$PACKAGE_ALIAS_PASCAL$",
        $PACKAGE_ALIAS_PASCAL$,
        [] /* sharedObjects */,
        {} /* optionalProviders */
    );

    constructor(props: IDataObjectProps<Props>) {
        super(props);
        this.setValue = this.setValue.bind(this);
    }

    public static getFactory(): DataObjectFactory<$PACKAGE_ALIAS_PASCAL$, object, undefined> {
        return this.factory;
    }

    public get IFluidHTMLView() {
        return this;
    }

    protected async hasInitialized() {
        this.value = this.root.get(valueKey);

        this.root.on("valueChanged", (_changed, _local, _op) => {
            this.value = this.root.get(valueKey);
            this.render();
        });
    }

    private setValue(value: string) {
        this.root.set(valueKey, value);
    }

    public render(element?: HTMLElement) {
        if (element) {
            this.domElement = element;
        }

        if (this.domElement) {
            ReactDOM.render(
                <$PACKAGE_ALIAS_PASCAL$View value={this.value || ""} setValue={this.setValue} />,
                this.domElement
            );
        }
    }

    // #region ComponentFocusable
    private _focused = false;

    public get ComponentFocusable() {
        return this;
    }

    public giveFocus = (focusDirection?: FocusDirection): boolean => {
        console.log("not implemented: giveFocus", focusDirection);
        this._focused = true;
        return true;
    };

    public isComponentFocused = () => {
        console.log("not implemented: isComponentFocused");
        return this._focused;
    };

    public setHostComponentFocusable(setHostComponentFocusable: ComponentFocusable): void {
        console.log("not implemented: setHostComponentFocusable", setHostComponentFocusable);
    }
    // #endregion ComponentFocusable
}
`
	},
	{
		location: 'src/component/$PACKAGE_ALIAS_PASCAL$View.tsx',
		content: `import * as React from "react";

export interface $PACKAGE_ALIAS_PASCAL$ViewProps {
    value: string;
    setValue: (value: string) => void;
}

export function $PACKAGE_ALIAS_PASCAL$View(props: $PACKAGE_ALIAS_PASCAL$ViewProps): JSX.Element {
    const { value, setValue } = props;

    return (
        <div>
            <label>$PACKAGE_NAME$: </label>
            <div>
                <textarea value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
}
`
	},
	{
		location: 'src/demoApp/app.tsx',
		content: `import * as React from "react";
import * as ReactDOM from "react-dom";
import { CollaborationApp } from "./CollaborationApp";

ReactDOM.render(<CollaborationApp />, document.getElementById("content"));
`
	},
	{
		location: 'src/demoApp/CodeLoader.ts',
		content: `import { IFluidCodeDetails } from "@fluidframework/core-interfaces";
import { ICodeLoader, IFluidModule } from "@fluidframework/container-definitions";
import { fluidExport } from "../container";
import { $PACKAGE_ALIAS_PASCAL$ } from "../component/";
import { IProvideHostContext } from "@fluidx/office-fluid-types";

export type Component = $PACKAGE_ALIAS_PASCAL$ & IProvideHostContext;

export function createCodeLoader(): ICodeLoader {
    return {
        load: async (_source: IFluidCodeDetails) => {
            return Promise.resolve({ fluidExport } as IFluidModule);
        },
    };
}
`
	},
	{
		location: 'src/demoApp/CollaborationApp.tsx',
		content: `// This file is original copied from
// https://office.visualstudio.com/OC/_git/office-bohemia?path=%2Fpackages%2Fqa%2Fsrc%2FdemoApp%2FQACollabExample.tsx

import * as React from "react";
import { IFluidCodeDetails } from "@fluidframework/core-interfaces";
import { LocalDocumentServiceFactory, LocalResolver } from "@fluidframework/local-driver";
import {
    LocalDeltaConnectionServer,
    ILocalDeltaConnectionServer,
} from "@fluidframework/server-local-server";
import { Loader } from "@fluidframework/container-loader";
import { renderComponent, setComponentLanguageToDocument } from "./utility";
import { Component, createCodeLoader } from "./CodeLoader";

function createLoader(server: ILocalDeltaConnectionServer): Loader {
    return new Loader({
        urlResolver: new LocalResolver(),
        documentServiceFactory: new LocalDocumentServiceFactory(server),
        codeLoader: createCodeLoader(),
    });
}

async function renderFirstComponent(
    server: ILocalDeltaConnectionServer,
    url: string,
    domElement: HTMLElement
): Promise<Component> {
    const loader = createLoader(server);
    const container = await loader.createDetachedContainer({} as IFluidCodeDetails);
    const component = await renderComponent(container, "/", domElement);
    // It is a good practice to first render the component and then attach the container with the server later on if needed, so that the UI is available to the user sooner
    // We call attach() here because we want to test the component in collaborative environment where a storage server would be needed
    await container.attach({ url, headers: { createNew: true } });
    return component;
}

async function renderSecondComponent(
    server: ILocalDeltaConnectionServer,
    url: string,
    domElement: HTMLElement,
    firstComponent: Component
): Promise<void> {
    const loader = createLoader(server);
    const container = await loader.resolve({ url });
    await renderComponent(container, firstComponent.IFluidLoadable.handle.absolutePath, domElement);
}

export class CollaborationApp extends React.PureComponent {
    private ref1 = React.createRef<HTMLDivElement>();
    private ref2 = React.createRef<HTMLDivElement>();

    async componentDidMount() {
        const server = LocalDeltaConnectionServer.create();
        const documentUrl = "https://localhost:8080/test_document_id";
        const component = await renderFirstComponent(server, documentUrl, this.ref1.current!);

        setComponentLanguageToDocument(component);

        await renderSecondComponent(server, documentUrl, this.ref2.current!, component);
    }

    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <div ref={this.ref1} />
                <div ref={this.ref2} />
            </div>
        );
    }
}
`
	},
	{
		location: 'src/demoApp/utility.ts',
		content: `import { Container } from "@fluidframework/container-loader";
import { defaultLocale } from "@fluidx/utilities";
import { Component } from "./CodeLoader";

export async function renderComponent(
    container: Container,
    url: string,
    domElement: HTMLElement
): Promise<Component> {
    const response = await container.request({
        url: url,
    });

    if (response.status !== 200 || response.mimeType !== "fluid/object") {
        throw new Error(\`Unable to retrieve data object at URL: "\${url}"\`);
    } else if (response.value === undefined) {
        throw new Error(\`Empty response from URL: "\${url}"\`);
    }

    const component = response.value;
    component.IFluidHTMLView.render(domElement);
    return component;
}

export function setComponentLanguageToDocument(component: Component) {
    const uiLanguage = component.HostContext?.hostLocaleContext?.uiLanguage || defaultLocale;
    document.documentElement.setAttribute("lang", uiLanguage);
}
`
	},
	{
		location: 'src/demoAppTinylicious/app.ts',
		content: `/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { getTinyliciousContainer } from "@fluidframework/get-tinylicious-container";
import { getDefaultObjectFromContainer } from "@fluidframework/aqueduct";
import { containerRunTimeFactory } from "./runtimeFactory";
import { $PACKAGE_ALIAS_PASCAL$ } from "../component/";

// Since this is a single page fluid application we are generating a new document id
// if one was not provided
let createNew = false;
if (window.location.hash.length === 0) {
    createNew = true;
    window.location.hash = Date.now().toString();
}
const documentId = window.location.hash.substring(1);

/**
 * This is a helper function for loading the page. It's required because getting the Fluid Container
 * requires making async calls.
 */
async function start() {
    // Get the Fluid Container associated with the provided id
    // TODO: Remove cast any
    const container = await getTinyliciousContainer(
        documentId,
        containerRunTimeFactory as any,
        createNew
    );

    // Get the Default Object from the Container
    const component = await getDefaultObjectFromContainer<$PACKAGE_ALIAS_PASCAL$>(container as any);

    // For now we will just reach into the FluidObject to render it
    component.render(document.getElementById("content")!);
}

start().catch((e) => {
    console.error(e);
    console.log(
        "%cEnsure you are running the Tinylicious Fluid Server\\nUse:\`npm run start:server\`",
        "font-size:30px"
    );
});
`
	},
	{
		location: 'src/demoAppTinylicious/runtimeFactory.ts',
		content: `/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ContainerRuntimeFactoryWithDefaultDataStore } from "@fluidframework/aqueduct";
import { componentType, $PACKAGE_ALIAS_PASCAL$ } from "../component/";

export const containerRunTimeFactory = new ContainerRuntimeFactoryWithDefaultDataStore(
    $PACKAGE_ALIAS_PASCAL$.getFactory(),
    new Map([[componentType, Promise.resolve($PACKAGE_ALIAS_PASCAL$.getFactory())]])
);
`
	},
	{
		location: 'src/container.ts',
		content: `import { IContainerContext } from "@fluidframework/container-definitions";
import {
    BaseContainerRuntimeFactory,
    ComponentRegistryData,
    ensureRootComponent,
} from "@fluidx/base-container";
import { IContainerRuntime } from "@fluidframework/container-runtime-definitions";
import { componentType, registryInfo } from "./component/";

// TODO: This file is for prototyping, will be refactored

const initializeContainerFirstTime = async (
    runtime: IContainerRuntime,
    _context: IContainerContext
): Promise<void> => {
    await ensureRootComponent(runtime, componentType);
};

export const fluidExport = new BaseContainerRuntimeFactory(
    getComponentRegistries(),
    undefined,
    undefined,
    undefined,
    initializeContainerFirstTime
);

function getComponentRegistries(): Map<string, ComponentRegistryData> {
    return new Map([[componentType, registryInfo]]);
}
`
	},
	{
		location: 'src/index.ts',
		content: `export { registryInfo } from "./component";
`
	}
];
