import{A as e}from"./index.262e9fcd.js";const h=`[![Cybernetically enhanced web apps: Svelte](https://sveltejs.github.io/assets/banner.png)](https://svelte.dev)

[![license](https://img.shields.io/npm/l/svelte.svg)](LICENSE.md) [![Chat](https://img.shields.io/discord/457912077277855764?label=chat&logo=discord)](https://svelte.dev/chat)

## What is Svelte?

Svelte is a new way to build web applications. It's a compiler that takes your declarative components and converts them into efficient JavaScript that surgically updates the DOM.

Learn more at the [Svelte website](https://svelte.dev), or stop by the [Discord chatroom](https://svelte.dev/chat).

## Supporting Svelte

Svelte is an MIT-licensed open source project with its ongoing development made possible entirely by fantastic volunteers. If you'd like to support their efforts, please consider:

- [Becoming a backer on Open Collective](https://opencollective.com/svelte).

Funds donated via Open Collective will be used for compensating expenses related to Svelte's development such as hosting costs. If sufficient donations are received, funds may also be used to support Svelte's development more directly.

## Roadmap

You may view [our roadmap](https://svelte.dev/roadmap) if you'd like to see what we're currently working on.

## Contributing

Please see the [Contributing Guide](CONTRIBUTING.md) and the [\`svelte\`](packages/svelte) package for information on contributing to Svelte.

### svelte.dev

The source code for https://svelte.dev lives in the [sites](https://github.com/sveltejs/svelte/tree/master/sites/svelte.dev) folder, with all the documentation right [here](https://github.com/sveltejs/svelte/tree/master/documentation). The site is built with [SvelteKit](https://kit.svelte.dev).

## Is svelte.dev down?

Probably not, but it's possible. If you can't seem to access any \`.dev\` sites, check out [this SuperUser question and answer](https://superuser.com/q/1413402).

## License

[MIT](LICENSE.md)`,l=`# [React](https://react.dev/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://legacy.reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using [Node](https://nodejs.org/en) and power mobile apps using [React Native](https://reactnative.dev/).

[Learn how to use React in your project](https://react.dev/learn).

## Installation

React has been designed for gradual adoption from the start, and **you can use as little or as much React as you need**:

* Use [Quick Start](https://react.dev/learn) to get a taste of React.
* [Add React to an Existing Project](https://react.dev/learn/add-react-to-an-existing-project) to use as little or as much React as you need.
* [Create a New React App](https://react.dev/learn/start-a-new-react-project) if you're looking for a powerful JavaScript toolchain.

## Documentation

You can find the React documentation [on the website](https://react.dev/).

Check out the [Getting Started](https://react.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Quick Start](https://react.dev/learn)
* [Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
* [Thinking in React](https://react.dev/learn/thinking-in-react)
* [Installation](https://react.dev/learn/installation)
* [Describing the UI](https://react.dev/learn/describing-the-ui)
* [Adding Interactivity](https://react.dev/learn/adding-interactivity)
* [Managing State](https://react.dev/learn/managing-state)
* [Advanced Guides](https://react.dev/learn/escape-hatches)
* [API Reference](https://react.dev/reference/react)
* [Where to Get Support](https://react.dev/community)
* [Contributing Guide](https://legacy.reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/react.dev).

## Examples

We have several examples [on the website](https://react.dev/). Here is the first one to get you started:

\`\`\`jsx
import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
\`\`\`

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://react.dev/learn#writing-markup-with-jsx). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://legacy.reactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://legacy.reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### [Good First Issues](https://github.com/facebook/react/labels/good%20first%20issue)

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

React is [MIT licensed](./LICENSE).`,m=`<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby
</h1>

<p align="center">
  <strong>
    The future of web development is here.
  </strong>
</p>
<p align="center">
  Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps. </br> It combines the control and scalability of dynamically rendered sites with the speed of static-site generation, creating a whole new web of possibilities.
</p>
<p align="center">
  <a href="https://github.com/gatsbyjs/gatsby/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Gatsby is released under the MIT license." />
  </a>
  <a href="https://circleci.com/gh/gatsbyjs/gatsby">
    <img src="https://circleci.com/gh/gatsbyjs/gatsby.svg?style=shield" alt="Current CircleCI build status." />
  </a>
  <a href="https://www.npmjs.com/package/gatsby">
    <img src="https://img.shields.io/npm/v/gatsby.svg" alt="Current npm package version." />
  </a>
  <a href="https://npmcharts.com/compare/gatsby?minimal=true">
    <img src="https://img.shields.io/npm/dm/gatsby.svg" alt="Downloads per month on npm." />
  </a>
  <a href="https://npmcharts.com/compare/gatsby?minimal=true">
    <img src="https://img.shields.io/npm/dt/gatsby.svg" alt="Total downloads on npm." />
  </a>
  <a href="https://gatsbyjs.com/contributing/how-to-contribute/">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=gatsbyjs">
    <img src="https://img.shields.io/twitter/follow/gatsbyjs.svg?label=Follow%20@gatsbyjs" alt="Follow @GatsbyJS" />
  </a>
</p>

<h2 align="center">
  <a href="https://www.gatsbyjs.com/docs/quick-start/">Quickstart</a>
  <span> · </span>
  <a href="https://www.gatsbyjs.com/docs/tutorial/getting-started/">Tutorial</a>
  <span> · </span>
  <a href="https://www.gatsbyjs.com/plugins/">Plugins</a>
  <span> · </span>
  <a href="https://www.gatsbyjs.com/starters/">Starters</a>
  <span> · </span>
  <a href="https://www.gatsbyjs.com/showcase/">Showcase</a>
  <span> · </span>
  <a href="https://www.gatsbyjs.com/contributing/how-to-contribute/">Contribute</a>
  <br />
  Support: <a href="https://twitter.com/AskGatsbyJS">Twitter</a>, <a href="https://github.com/gatsbyjs/gatsby/discussions">Discussions</a>
  <span> & </span>
  <a href="https://gatsby.dev/discord">Discord</a>
</h2>

Gatsby helps professional developers efficiently create maintainable, highly-performant, content-rich websites.

- **Load Data From Anywhere.** Gatsby pulls in data from any data source, whether it’s Markdown files, a headless CMS like Contentful or WordPress, or a REST or GraphQL API. Use source plugins to load your data, then develop using Gatsby’s uniform GraphQL interface.

- **Go Beyond Static Websites.** Get all the benefits of static websites with none of the limitations. Gatsby sites are fully functional React apps, so you can create high-quality, dynamic web apps, from blogs to e-commerce sites to user dashboards.

- **Choose your Rendering Options.** You can choose alternative [rendering options](https://gatsbyjs.com/docs/conceptual/rendering-options/), namely Deferred Static Generation (DSG) and Server-Side Rendering (SSR), in addition to Static Site Generation (SSG) — on a per-page basis. This type of granular control allows you to optimize for performance and productivity without sacrificing one for the other.

- **Performance Is Baked In.** Ace your performance audits by default. Gatsby automates code splitting, image optimization, inlining critical styles, lazy-loading, prefetching resources, and more to ensure your site is fast — no manual tuning required.

- **Use a Modern Stack for Every Site.** No matter where the data comes from, Gatsby sites are built using React and GraphQL. Build a uniform workflow for you and your team, regardless of whether the data is coming from the same backend.

- **Host at Scale for Pennies.** Gatsby sites don’t require servers, so you can host your entire site on a CDN for a fraction of the cost of a server-rendered site. Many Gatsby sites can be hosted entirely free on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/) and other similar services.

- **Use Gatsby's Centralized Data Layer Everywhere.** With Gatsby's [Valhalla Content Hub](https://www.gatsbyjs.com/products/valhalla-content-hub/) you can bring Gatsby's data layer to any project. Making it accessible via a unified GraphQL API for building content sites, eCommerce platforms, and both native and web applications.

[**Learn how to use Gatsby for your next project.**](https://www.gatsbyjs.com/docs/)

## 🚀 Ship your first Gatsby site in 5 Minutes

Click the link below to quickly try the workflow of developing, building, and deploying websites with Gatsby and Gatsby Cloud.

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-blog&utm_source=github&utm_medium=link&utm_campaign=onboarding&utm_content=oss)

At the end of this process, you'll have

1. a site working on Gatsby Cloud
2. a new repository that is linked to that new site
3. as you push changes to your new repository, Gatsby Cloud will automatically rebuild and redeploy your site!

## 💻 Get started with Gatsby locally in 5 Minutes

You can get a new Gatsby site up and running on your local dev environment in 5 minutes with these four steps:

1. **Initialize a new project.**

   \`\`\`shell
   npm init gatsby
   \`\`\`

   Give it the name "My Gatsby Site".

2. **Start the site in \`develop\` mode.**

   Next, move into your new site’s directory and start it up:

   \`\`\`shell
   cd my-gatsby-site/
   npm run develop
   \`\`\`

3. **Open the source code and start editing!**

   Your site is now running at \`http://localhost:8000\`. Open the \`my-gatsby-site\` directory in your code editor of choice and edit \`src/pages/index.js\`. Save your changes, and the browser will update in real time!

At this point, you’ve got a fully functional Gatsby website. For additional information on how you can customize your Gatsby site, see our [plugins](https://gatsbyjs.com/plugins/) and [the official tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/).

## 🎓 Learning Gatsby

Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.com/).

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/getting-started/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the “<i>How-to Guides</i>”, “<i>Reference</i>”, and “<i>Conceptual Guides</i>” sections in the sidebar.

We welcome suggestions for improving our docs. See the [“how to contribute”](https://www.gatsbyjs.com/contributing/how-to-contribute/) documentation for more details.

**Start Learning Gatsby: [Follow the Tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/) · [Read the Docs](https://www.gatsbyjs.com/docs/)**

## 🚢 Release Notes

Wondering what we've shipped recently? Check out our [release notes](https://www.gatsbyjs.com/docs/reference/release-notes) for key highlights, performance improvements, new features, and notable bugfixes.

Also, read our [documentation on version support](https://www.gatsbyjs.com/docs/reference/release-notes/gatsby-version-support/) to understand our plans for each version of Gatsby.

## 💼 Migration Guides

Already have a Gatsby site? These handy guides will help you add the improvements of Gatsby v5 to your site without starting from scratch!

- [Migrate from v4 to v5](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)
- [Migrate from v3 to v4](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/)
- [Migrate from v2 to v3](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/)

## ❗ Code of Conduct

Gatsby is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the Gatsby community to abide by our [**Code of Conduct**](https://www.gatsbyjs.com/contributing/code-of-conduct/). Please read it. Please follow it. In the Gatsby community, we work hard to build each other up and create amazing things together. 💪💜

## 🤝 How to Contribute

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of the Gatsby community!

Check out our [**Contributing Guide**](https://www.gatsbyjs.com/contributing/how-to-contribute/) for ideas on contributing and setup steps for getting our repositories up and running on your local machine.

### A note on how this repository is organized

This repository is a [monorepo](https://trunkbaseddevelopment.com/monorepos/) managed using [Lerna](https://github.com/lerna/lerna). This means there are [multiple packages](https://github.com/gatsbyjs/gatsby/tree/master/packages) managed in this codebase, even though we publish them to NPM as separate packages.

## 📝 License

Licensed under the [MIT License](./LICENSE).

## 💜 Thanks

Thanks go out to all our many contributors creating plugins, starters, videos, and blog posts. And a special appreciation for our community members helping with issues and PRs, or answering questions on Discord and GitHub Discussions.

A big part of what makes Gatsby great is each and every one of you in the community. Your contributions enrich the Gatsby experience and make it better every day.`,u=`# GraphQL.js

The JavaScript reference implementation for GraphQL, a query language for APIs created by Facebook.

[![npm version](https://badge.fury.io/js/graphql.svg)](https://badge.fury.io/js/graphql)
[![Build Status](https://github.com/graphql/graphql-js/workflows/CI/badge.svg?branch=main)](https://github.com/graphql/graphql-js/actions?query=branch%3Amain)

See more complete documentation at https://graphql.org/ and
https://graphql.org/graphql-js/.

Looking for help? Find resources [from the community](https://graphql.org/community/).

## Getting Started

A general overview of GraphQL is available in the
[README](https://github.com/graphql/graphql-spec/blob/main/README.md) for the
[Specification for GraphQL](https://github.com/graphql/graphql-spec). That overview
describes a simple set of GraphQL examples that exist as [tests](src/__tests__)
in this repository. A good way to get started with this repository is to walk
through that README and the corresponding tests in parallel.

### Using GraphQL.js

Install GraphQL.js from npm

With \`npm\`:

\`\`\`sh
npm install --save graphql
\`\`\`

With \`yarn\`:

\`\`\`sh
yarn add graphql
\`\`\`

With \`bun\`:

\`\`\`sh
bun add graphql
\`\`\`

GraphQL.js provides two important capabilities: building a type schema and
serving queries against that type schema.

First, build a GraphQL type schema which maps to your codebase.

\`\`\`js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});
\`\`\`

This defines a simple schema, with one type and one field, that resolves
to a fixed value. The \`resolve\` function can return a value, a promise,
or an array of promises. A more complex example is included in the top-level [tests](src/__tests__) directory.

Then, serve the result of a query against that type schema.

\`\`\`js
var source = '{ hello }';

graphql({ schema, source }).then((result) => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);
});
\`\`\`

This runs a query fetching the one field defined. The \`graphql\` function will
first ensure the query is syntactically and semantically valid before executing
it, reporting errors otherwise.

\`\`\`js
var source = '{ BoyHowdy }';

graphql({ schema, source }).then((result) => {
  // Prints
  // {
  //   errors: [
  //     { message: 'Cannot query field BoyHowdy on RootQueryType',
  //       locations: [ { line: 1, column: 3 } ] }
  //   ]
  // }
  console.log(result);
});
\`\`\`

**Note**: Please don't forget to set \`NODE_ENV=production\` if you are running a production server. It will disable some checks that can be useful during development but will significantly improve performance.

### Want to ride the bleeding edge?

The \`npm\` branch in this repository is automatically maintained to be the last
commit to \`main\` to pass all tests, in the same form found on npm. It is
recommended to use builds deployed to npm for many reasons, but if you want to use
the latest not-yet-released version of graphql-js, you can do so by depending
directly on this branch:

\`\`\`
npm install graphql@git://github.com/graphql/graphql-js.git#npm
\`\`\`

### Using in a Browser

GraphQL.js is a general-purpose library and can be used both in a Node server
and in the browser. As an example, the [GraphiQL](https://github.com/graphql/graphiql/)
tool is built with GraphQL.js!

Building a project using GraphQL.js with [webpack](https://webpack.js.org) or
[rollup](https://github.com/rollup/rollup) should just work and only include
the portions of the library you use. This works because GraphQL.js is distributed
with both CommonJS (\`require()\`) and ESModule (\`import\`) files. Ensure that any
custom build configurations look for \`.mjs\` files!

### Contributing

We actively welcome pull requests. Learn how to [contribute](./.github/CONTRIBUTING.md).

This repository is managed by EasyCLA. Project participants must sign the free ([GraphQL Specification Membership agreement](https://preview-spec-membership.graphql.org) before making a contribution. You only need to do this one time, and it can be signed by [individual contributors](http://individual-spec-membership.graphql.org/) or their [employers](http://corporate-spec-membership.graphql.org/).

To initiate the signature process please open a PR against this repo. The EasyCLA bot will block the merge if we still need a membership agreement from you.

You can find [detailed information here](https://github.com/graphql/graphql-wg/tree/main/membership). If you have issues, please email [operations@graphql.org](mailto:operations@graphql.org).

If your company benefits from GraphQL and you would like to provide essential financial support for the systems and people that power our community, please also consider membership in the [GraphQL Foundation](https://foundation.graphql.org/join).

### Changelog

Changes are tracked as [GitHub releases](https://github.com/graphql/graphql-js/releases).

### License

GraphQL.js is [MIT-licensed](./LICENSE).`,g=`<p align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
    <h1 align="center">Next.js</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Vercel logo" href="https://vercel.com">
    <img src="https://img.shields.io/badge/MADE%20BY%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/next">
    <img alt="" src="https://img.shields.io/npm/v/next.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/vercel/next.js/blob/canary/license.md">
    <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on GitHub" href="https://github.com/vercel/next.js/discussions">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20">
  </a>
</p>

## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community

The Next.js community can be found on [GitHub Discussions](https://github.com/vercel/next.js/discussions) where you can ask questions, voice ideas, and share your projects with other people.

To chat with other community members you can join the Next.js [Discord](https://nextjs.org/discord) server.

Do note that our [Code of Conduct](https://github.com/vercel/next.js/blob/canary/CODE_OF_CONDUCT.md) applies to all Next.js community channels. Users are **highly encouraged** to read and adhere to them to avoid repercussions.

## Contributing

Contributions to Next.js are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](/contributing.md) to make sure you have a smooth experience contributing to Next.js.

### Good First Issues:

We have a list of **[good first issues](https://github.com/vercel/next.js/labels/good%20first%20issue)** that contain bugs that have a relatively limited scope. This is a great place for newcomers and beginners alike to get started, gain experience, and get familiar with our contribution process.

## Authors

A list of the original co-authors of Next.js that helped bring this amazing framework to life!

- Tim Neutkens ([@timneutkens](https://x.com/timneutkens))
- Naoyuki Kanezawa ([@nkzawa](https://x.com/nkzawa))
- Guillermo Rauch ([@rauchg](https://x.com/rauchg))
- Arunoda Susiripala ([@arunoda](https://x.com/arunoda))
- Tony Kovanen ([@tonykovanen](https://x.com/tonykovanen))
- Dan Zajdband ([@impronunciable](https://x.com/impronunciable))

---

## Security

If you believe you have found a security vulnerability in Next.js, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email \`security@vercel.com\` to disclose any security vulnerabilities. Alternatively, you can visit this [link](https://vercel.com/security) to know more about Vercel's security and report any security vulnerabilities.`,b=`## Vue 2 has reached End of Life

**You are looking at the now inactive repository for Vue 2. The actively maintained repository for the latest version of Vue is [vuejs/core](https://github.com/vuejs/core).**

Vue has reached End of Life on December 31st, 2023. It no longer receives new features, updates, or fixes. However, it is still available on all existing distribution channels (CDNs, package managers, Github, etc).

If you are starting a new project, please start with the latest version of Vue (3.x). We also strongly recommend current Vue 2 users to upgrade ([guide](https://v3-migration.vuejs.org/)), but we also acknowledge that not all users have the bandwidth or incentive to do so. If you have to stay on Vue 2 but also have compliance or security requirements about unmaintained software, check out [Vue 2 NES](https://www.herodevs.com/support/nes-vue?utm_source=vuejs-github&utm_medium=vue2-readme).

<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

<p align="center">
  <a href="https://circleci.com/gh/vuejs/vue/tree/dev"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://codecov.io/github/vuejs/vue?branch=dev"><img src="https://img.shields.io/codecov/c/github/vuejs/vue/dev.svg?sanitize=true" alt="Coverage Status"></a>
  <a href="https://npmcharts.com/compare/vue?minimal=true"><img src="https://img.shields.io/npm/dm/vue.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
  <a href="https://chat.vuejs.org/"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p>

## Sponsors

Vue.js is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome [backers](https://github.com/vuejs/core/blob/main/BACKERS.md). If you'd like to join them, please consider [ sponsor Vue's development](https://vuejs.org/sponsor/).

<p align="center">
  <h3 align="center">Special Sponsor</h3>
</p>

<p align="center">
  <a target="_blank" href="https://github.com/appwrite/appwrite">
  <img alt="special sponsor appwrite" src="https://sponsors.vuejs.org/images/appwrite.svg" width="300">
  </a>
</p>

<p align="center">
  <a target="_blank" href="https://vuejs.org/sponsor/">
    <img alt="sponsors" src="https://sponsors.vuejs.org/sponsors.svg?v3">
  </a>
</p>

---

## Introduction

Vue (pronounced \`/vjuː/\`, like view) is a **progressive framework** for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases. It consists of an approachable core library that focuses on the view layer only, and an ecosystem of supporting libraries that helps you tackle complexity in large Single-Page Applications.

#### Browser Compatibility

Vue.js supports all browsers that are [ES5-compliant](https://compat-table.github.io/compat-table/es5/) (IE8 and below are not supported).

## Ecosystem

| Project               | Status                                                       | Description                                             |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [vue-router]          | [![vue-router-status]][vue-router-package]                   | Single-page application routing                         |
| [vuex]                | [![vuex-status]][vuex-package]                               | Large-scale state management                            |
| [vue-cli]             | [![vue-cli-status]][vue-cli-package]                         | Project scaffolding                                     |
| [vue-loader]          | [![vue-loader-status]][vue-loader-package]                   | Single File Component (\`*.vue\` file) loader for webpack |
| [vue-server-renderer] | [![vue-server-renderer-status]][vue-server-renderer-package] | Server-side rendering support                           |
| [vue-class-component] | [![vue-class-component-status]][vue-class-component-package] | TypeScript decorator for a class-based API              |
| [vue-rx]              | [![vue-rx-status]][vue-rx-package]                           | RxJS integration                                        |
| [vue-devtools]        | [![vue-devtools-status]][vue-devtools-package]               | Browser DevTools extension                              |

[vue-router]: https://github.com/vuejs/vue-router
[vuex]: https://github.com/vuejs/vuex
[vue-cli]: https://github.com/vuejs/vue-cli
[vue-loader]: https://github.com/vuejs/vue-loader
[vue-server-renderer]: https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer
[vue-class-component]: https://github.com/vuejs/vue-class-component
[vue-rx]: https://github.com/vuejs/vue-rx
[vue-devtools]: https://github.com/vuejs/vue-devtools
[vue-router-status]: https://img.shields.io/npm/v/vue-router.svg
[vuex-status]: https://img.shields.io/npm/v/vuex.svg
[vue-cli-status]: https://img.shields.io/npm/v/@vue/cli.svg
[vue-loader-status]: https://img.shields.io/npm/v/vue-loader.svg
[vue-server-renderer-status]: https://img.shields.io/npm/v/vue-server-renderer.svg
[vue-class-component-status]: https://img.shields.io/npm/v/vue-class-component.svg
[vue-rx-status]: https://img.shields.io/npm/v/vue-rx.svg
[vue-devtools-status]: https://img.shields.io/chrome-web-store/v/nhdogjmejiglipccpnnnanhbledajbpd.svg
[vue-router-package]: https://npmjs.com/package/vue-router
[vuex-package]: https://npmjs.com/package/vuex
[vue-cli-package]: https://npmjs.com/package/@vue/cli
[vue-loader-package]: https://npmjs.com/package/vue-loader
[vue-server-renderer-package]: https://npmjs.com/package/vue-server-renderer
[vue-class-component-package]: https://npmjs.com/package/vue-class-component
[vue-rx-package]: https://npmjs.com/package/vue-rx
[vue-devtools-package]: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

## Documentation

To check out [live examples](https://v2.vuejs.org/v2/examples/) and docs, visit [vuejs.org](https://v2.vuejs.org).

## Questions

For questions and support please use [the official forum](https://forum.vuejs.org) or [community chat](https://chat.vuejs.org/). The issue list of this repo is **exclusively** for bug reports and feature requests.

## Issues

Please make sure to read the [Issue Reporting Checklist](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/vuejs/vue/releases).

## Stay In Touch

- [Twitter](https://twitter.com/vuejs)
- [Blog](https://medium.com/the-vue-point)
- [Job Board](https://vuejobs.com/?ref=vuejs)

## Contribution

Please make sure to read the [Contributing Guide](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md) before making a pull request. If you have a Vue-related project/component/tool, add it with a pull request to [this curated list](https://github.com/vuejs/awesome-vue)!

Thank you to all the people who already contributed to Vue!

<a href="https://github.com/vuejs/vue/graphs/contributors"><img src="https://opencollective.com/vuejs/contributors.svg?width=890" /></a>

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2013-present, Yuxi (Evan) You`,f=`# Starter

A [Nuxt.js](https://github.com/nuxt/nuxt.js) + Vue Material starter project template without the distraction of a complicated development environment.

## Installation

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

\`\`\` bash
$ vue init vuematerial/nuxtjs my-project
$ cd my-project
# install dependencies
$ npm install # Or yarn install
\`\`\`

> Make sure to use a version of vue-cli >= 2.1 (\`vue -V\`).

## Usage

### Development

\`\`\` bash
# serve with hot reloading at localhost:3000
$ npm run dev
\`\`\`

Go to [http://localhost:3000](http://localhost:3000)

### Production

\`\`\` bash
# build for production and launch the server
$ npm run build
$ npm start
\`\`\`

### Generate

\`\`\` bash
# generate a static project
$ npm run generate
\`\`\``,v=`<h1><img width="200px" alt="Sass" src="https://rawgit.com/sass/sass-site/main/source/assets/img/logos/logo.svg" /></h1>

[![@SassCSS on Twitter](https://img.shields.io/twitter/follow/SassCSS?label=%40SassCSS&style=social)](https://twitter.com/SassCSS)
&nbsp;&nbsp;
[![stackoverflow](https://img.shields.io/stackexchange/stackoverflow/t/sass?label=Sass%20questions&logo=stackoverflow&style=social)](https://stackoverflow.com/questions/tagged/sass)
&nbsp;&nbsp;
[![Gitter](https://img.shields.io/gitter/room/sass/sass?label=chat&logo=gitter&style=social)](https://gitter.im/sass/sass?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

**Sass makes CSS fun again**. Sass is an extension of CSS, adding nested rules,
variables, mixins, selector inheritance, and more. It's translated to
well-formatted, standard CSS using the command line tool or a plugin for your
build system.

\`\`\`scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { @include border-radius(10px); }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
\`\`\`

## Install Sass

You can install Sass on Windows, Mac, or Linux by downloading the package for
your operating system [from GitHub][] and [adding it to your \`PATH\`][PATH].
That's all—there are no external dependencies and nothing else you need to
install.

[from GitHub]: https://github.com/sass/dart-sass/releases
[PATH]: https://katiek2.github.io/path-doc/

If you use Node.js, you can also install Sass using [npm][] by running

[npm]: https://www.npmjs.com/

\`\`\`
npm install -g sass
\`\`\`

**However, please note** that this will install the pure JavaScript
implementation of Sass, which runs somewhat slower than the other options listed
here. But it has the same interface, so it'll be easy to swap in another
implementation later if you need a bit more speed!

See [the Sass website](https://sass-lang.com/install) for more ways to install
Sass.

Once you have Sass installed, you can run the \`sass\` executable to compile
\`.sass\` and \`.scss\` files to \`.css\` files. For example:

\`\`\`
sass source/stylesheets/index.scss build/stylesheets/index.css
\`\`\`

## Learn Sass

Check out [the Sass website](https://sass-lang.com/guide) for a guide on how to
learn Sass!

## This Repository

This repository isn't an implementation of Sass. Those live in
[\`sass/dart-sass\`][] and [\`sass/libsass\`][]. Instead, it contains:

[\`sass/dart-sass\`]: https://github.com/sass/dart-sass
[\`sass/libsass\`]: https://github.com/sass/libsass

* [\`spec/\`][], which contains specifications for language features.
* [\`proposal/\`][], which contains in-progress proposals for changes to the
  language.
* [\`accepted/\`][], which contains proposals that have been accepted and are
  either implemented or in the process of being implemented.

[\`spec/\`]: https://github.com/sass/sass/tree/main/spec
[\`proposal/\`]: https://github.com/sass/sass/tree/main/proposal
[\`accepted/\`]: https://github.com/sass/sass/tree/main/accepted

Note that this doesn't contain a full specification of Sass. Instead, feature
specifications are written as needed when a new feature is being designed or
when an implementor needs additional clarity about how something is supposed to
work. This means many of the specs in \`spec/\` only cover small portions of the
features in question.

### Versioning Policy

The proposals in this repository are versioned, to make it easy to track changes
over time and to refer to older versions. Every version has a Git tag of the
form \`proposal.<name>.draft-<version>\`. A new version should be created for each
batch of changes.

Every version has a major version, and they may have a minor version as well
(indicated \`<major>.<minor>\`). The minor version should be incremented for
changes that don't affect the intended semantics of the proposal; otherwise, the
major version should be incremented.`,y=`<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://vitejs.dev/logo.svg" alt="Vite logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatibility"></a>
  <a href="https://github.com/vitejs/vite/actions/workflows/ci.yml"><img src="https://github.com/vitejs/vite/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://pr.new/vitejs/vite"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
  <a href="https://chat.vitejs.dev"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br/>

# Vite ⚡

> Next Generation Frontend Tooling

- 💡 Instant Server Start
- ⚡️ Lightning Fast HMR
- 🛠️ Rich Features
- 📦 Optimized Build
- 🔩 Universal Plugin Interface
- 🔑 Fully Typed APIs

Vite (French word for "quick", pronounced [\`/vit/\`](https://cdn.jsdelivr.net/gh/vitejs/vite@main/docs/public/vite.mp3), like "veet") is a new breed of frontend build tooling that significantly improves the frontend development experience. It consists of two major parts:

- A dev server that serves your source files over [native ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), with [rich built-in features](https://vitejs.dev/guide/features.html) and astonishingly fast [Hot Module Replacement (HMR)](https://vitejs.dev/guide/features.html#hot-module-replacement).

- A [build command](https://vitejs.dev/guide/build.html) that bundles your code with [Rollup](https://rollupjs.org), pre-configured to output highly optimized static assets for production.

In addition, Vite is highly extensible via its [Plugin API](https://vitejs.dev/guide/api-plugin.html) and [JavaScript API](https://vitejs.dev/guide/api-javascript.html) with full typing support.

[Read the Docs to Learn More](https://vitejs.dev).

## Packages

| Package                                         | Version (click for changelogs)                                                                                                    |
| ----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [vite](packages/vite)                           | [![vite version](https://img.shields.io/npm/v/vite.svg?label=%20)](packages/vite/CHANGELOG.md)                                    |
| [@vitejs/plugin-legacy](packages/plugin-legacy) | [![plugin-legacy version](https://img.shields.io/npm/v/@vitejs/plugin-legacy.svg?label=%20)](packages/plugin-legacy/CHANGELOG.md) |
| [create-vite](packages/create-vite)             | [![create-vite version](https://img.shields.io/npm/v/create-vite.svg?label=%20)](packages/create-vite/CHANGELOG.md)               |

## Contribution

See [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE).

## Sponsors

<p align="center">
  <a target="_blank" href="https://github.com/sponsors/yyx990803">
    <img alt="sponsors" src="https://sponsors.vuejs.org/vite.svg">
  </a>
</p>`,w=`<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

[![Discord Shield](https://img.shields.io/discord/809501355504959528?color=000000&label=Discord&logo=fdgssdf)](https://remotion.dev/discord)
[![NPM Version](https://img.shields.io/npm/v/remotion.svg?style=flat&color=black)](https://www.npmjs.org/package/remotion)
[![NPM Downloads](https://img.shields.io/npm/dm/remotion.svg?style=flat&color=black&label=Downloads)](https://npmcharts.com/compare/remotion?minimal=true)
[![Open Bounties](https://img.shields.io/endpoint?url=https%3A%2F%2Fconsole.algora.io%2Fapi%2Fshields%2Fremotion%2Fbounties%3Fstatus%3Dopen&style=flat&color=black&labelColor=grey&label=Open+Bounties)](https://github.com/remotion-dev/remotion/issues?q=is%3Aopen+label%3A%22%F0%9F%92%8E+Bounty%22+sort%3Aupdated-desc)
<a href="https://twitter.com/remotion"><img src="https://img.shields.io/twitter/follow/remotion?label=Twitter&color=black" alt="Twitter"></a>

Remotion is a framework for **creating videos programmatically using React.**

## Why create videos in React?

- **Leverage web technologies**: Use all of CSS, Canvas, SVG, WebGL, etc.
- **Leverage programming**: Use variables, functions, APIs, math and algorithms to create new effects
- **Leverage React**: Reusable components, Powerful composition, Fast Refresh, Package ecosystem

## Created with Remotion

<table>
<tr>
<td align="center">
<img style="width: 290px" src="packages/docs/static/img/fireship-quick.gif" />
<p>"This video was made with code" <em>- Fireship</em> <a href="https://youtu.be/deg8bOoziaE">Watch</a> • <a href="https://github.com/wcandillon/remotion-fireship">Source</a></p>
</td>
<td align="center">
<img style="width: 240px" src="packages/docs/static/img/unwrapped-2023.gif" />
<p>GitHub Unwrapped - Personalized Year in Review <a href="https://www.githubunwrapped.com">Try</a> • <a href="https://github.com/remotion-dev/github-unwrapped-2023">Source</a></p>
</td>
<td align="center">
<em>View more in the <a href="https://remotion.dev/showcase">Remotion Showcase</a>!</em>
</td>
</tr>
</table>

## Get started

If you already have Node.JS installed, type

\`\`\`console
npx create-video@latest
\`\`\`

to get started. Otherwise, read the [installation page](https://www.remotion.dev/docs/) in the documentation.

## Documentation

Documentation: [**remotion.dev/docs**](https://www.remotion.dev/docs)
API Reference: [**remotion.dev/api**](https://www.remotion.dev/api)

## License

Be aware of that Remotion has a special license and requires obtaining a company license in some cases. Read the [LICENSE](LICENSE.md) page for more information.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) to learn about contributing to this project.`,k=`<h1 align="center">Angular - The modern web developer's platform</h1>

<p align="center">
  <img src="adev/src/assets/images/press-kit/angular_icon_gradient.gif" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <em>Angular is a development platform for building mobile and desktop web applications
    <br> using TypeScript/JavaScript and other languages.</em>
  <br>
</p>

<p align="center">
  <a href="https://angular.dev/"><strong>angular.dev</strong></a>
  <br>
</p>

<p align="center">
  <a href="CONTRIBUTING.md">Contributing Guidelines</a>
  ·
  <a href="https://github.com/angular/angular/issues">Submit an Issue</a>
  ·
  <a href="https://blog.angular.io/">Blog</a>
  <br>
  <br>
</p>

<p align="center">
  <a href="https://circleci.com/gh/angular/workflows/angular/tree/main">
    <img src="https://img.shields.io/circleci/build/github/angular/angular/main.svg?logo=circleci&logoColor=fff&label=CircleCI" alt="CI status" />
  </a>&nbsp;
  <a href="https://www.npmjs.com/@angular/core">
    <img src="https://img.shields.io/npm/v/@angular/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="Angular on npm" />
  </a>&nbsp;
  <a href="https://discord.gg/angular">
    <img src="https://img.shields.io/discord/463752820026376202.svg?logo=discord&logoColor=fff&label=Discord&color=7389d8" alt="Discord conversation" />
  </a>
</p>

<p align="center">
  <a href="https://app.circleci.com/insights/github/angular/angular/workflows/default_workflow?branch=main">
    <img src="https://dl.circleci.com/insights-snapshot/gh/angular/angular/main/default_workflow/badge.svg" alt="InsightsSnapshot" />
  </a>
</p>

<hr>

## Documentation

Get started with Angular, learn the fundamentals and explore advanced topics on our documentation website.

- [Getting Started][quickstart]
- [Architecture][architecture]
- [Components and Templates][componentstemplates]
- [Forms][forms]
- [API][api]

### Advanced

- [Angular Elements][angularelements]
- [Server Side Rendering][ssr]
- [Schematics][schematics]
- [Lazy Loading][lazyloading]
- [Animations][animations]

### Local Development

To contribute to the Angular Docs, check out the [Angular.dev README](adev/README.md)

## Development Setup

### Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

### Setting Up a Project

Install the Angular CLI globally:

\`\`\`
npm install -g @angular/cli
\`\`\`

Create workspace:

\`\`\`
ng new [PROJECT NAME]
\`\`\`

Run the application:

\`\`\`
cd [PROJECT NAME]
ng serve
\`\`\`

Angular is cross-platform, fast, scalable, has incredible tooling, and is loved by millions.

## Quickstart

[Get started in 5 minutes][quickstart].

## Ecosystem

<p>
  <img src="/docs/images/angular-ecosystem-logos.png" alt="angular ecosystem logos" width="500px" height="auto">
</p>

- [Angular Command Line (CLI)][cli]
- [Angular Material][angularmaterial]

## Changelog

[Learn about the latest improvements][changelog].

## Upgrading

Check out our [upgrade guide](https://angular.dev/update-guide/) to find out the best way to upgrade your project.

## Contributing

### Contributing Guidelines

Read through our [contributing guidelines][contributing] to learn about our submission process, coding rules, and more.

### Want to Help?

Want to report a bug, contribute some code, or improve the documentation? Excellent! Read up on our guidelines for [contributing][contributing] and then check out one of our issues labeled as <kbd>[help wanted](https://github.com/angular/angular/labels/help%20wanted)</kbd> or <kbd>[good first issue](https://github.com/angular/angular/labels/good%20first%20issue)</kbd>.

### Code of Conduct

Help us keep Angular open and inclusive. Please read and follow our [Code of Conduct][codeofconduct].

## Community

Join the conversation and help the community.

- [X (formerly Twitter)][X (formerly Twitter)]
- [Discord][discord]
- [Gitter][gitter]
- [YouTube][youtube]
- [StackOverflow][stackoverflow]
- Find a Local [Meetup][meetup]

[![Love Angular badge](https://img.shields.io/badge/angular-love-blue?logo=angular&angular=love)](https://www.github.com/angular/angular)

**Love Angular? Give our repo a star :star: :arrow_up:.**

[contributing]: CONTRIBUTING.md
[quickstart]: https://angular.dev/tutorials/learn-angular
[changelog]: CHANGELOG.md
[ng]: https://angular.dev
[documentation]: https://angular.dev/overview
[angularmaterial]: https://material.angular.io/
[cli]: https://angular.dev/tools/cli
[architecture]: https://angular.dev/essentials
[componentstemplates]: https://angular.dev/tutorials/learn-angular/1-components-in-angular
[forms]: https://angular.dev/tutorials/learn-angular/15-forms
[api]: https://angular.dev/api
[angularelements]: https://angular.dev/guide/elements
[ssr]: https://angular.dev/guide/ssr
[schematics]: https://angular.dev/tools/cli/schematics
[lazyloading]: https://angular.dev/guide/ngmodules/lazy-loading
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/get-npm
[codeofconduct]: CODE_OF_CONDUCT.md
[X (formerly Twitter)]: https://www.twitter.com/angular
[discord]: https://discord.gg/angular
[gitter]: https://gitter.im/angular/angular
[stackoverflow]: https://stackoverflow.com/questions/tagged/angular
[youtube]: https://youtube.com/angular
[meetup]: https://www.meetup.com/find/?keywords=angular
[animations]: https://angular.dev/guide/animations`,j=`[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

**Fast, unopinionated, minimalist web framework for [Node.js](http://nodejs.org).**

**This project has a [Code of Conduct][].**

## Table of contents

* [Installation](#Installation)
* [Features](#Features)
* [Docs & Community](#docs--community)
* [Quick Start](#Quick-Start)
* [Running Tests](#Running-Tests)
* [Philosophy](#Philosophy)
* [Examples](#Examples)
* [Contributing to Express](#Contributing)
* [TC (Technical Committee)](#tc-technical-committee)
* [Triagers](#triagers)
* [License](#license)


[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

\`\`\`js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
\`\`\`

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a \`package.json\` first with
the [\`npm init\` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[\`npm install\` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

\`\`\`console
$ npm install express
\`\`\`

Follow [our installing guide](http://expressjs.com/en/starter/installing.html)
for more information.

## Features

  * Robust routing
  * Focus on high performance
  * Super-high test coverage
  * HTTP helpers (redirection, caching, etc)
  * View system supporting 14+ template engines
  * Content negotiation
  * Executable for generating applications quickly

## Docs & Community

  * [Website and Documentation](http://expressjs.com/) - [[website repo](https://github.com/expressjs/expressjs.com)]
  * [#express](https://web.libera.chat/#express) on [Libera Chat](https://libera.chat) IRC
  * [GitHub Organization](https://github.com/expressjs) for Official Middleware & Modules
  * Visit the [Wiki](https://github.com/expressjs/express/wiki)
  * [Google Group](https://groups.google.com/group/express-js) for discussion
  * [Gitter](https://gitter.im/expressjs/express) for support and discussion

**PROTIP** Be sure to read [Migrating from 3.x to 4.x](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x) as well as [New features in 4.x](https://github.com/expressjs/express/wiki/New-features-in-4.x).

## Quick Start

  The quickest way to get started with express is to utilize the executable [\`express(1)\`](https://github.com/expressjs/generator) to generate an application as shown below:

  Install the executable. The executable's major version will match Express's:

\`\`\`console
$ npm install -g express-generator@4
\`\`\`

  Create the app:

\`\`\`console
$ express /tmp/foo && cd /tmp/foo
\`\`\`

  Install dependencies:

\`\`\`console
$ npm install
\`\`\`

  Start the server:

\`\`\`console
$ npm start
\`\`\`

  View the website at: http://localhost:3000

## Philosophy

  The Express philosophy is to provide small, robust tooling for HTTP servers, making
  it a great solution for single page applications, websites, hybrids, or public
  HTTP APIs.

  Express does not force you to use any specific ORM or template engine. With support for over
  14 template engines via [Consolidate.js](https://github.com/tj/consolidate.js),
  you can quickly craft your perfect framework.

## Examples

  To view the examples, clone the Express repo and install the dependencies:

\`\`\`console
$ git clone https://github.com/expressjs/express.git --depth 1
$ cd express
$ npm install
\`\`\`

  Then run whichever example you want:

\`\`\`console
$ node examples/content-negotiation
\`\`\`

## Contributing

  [![Linux Build][github-actions-ci-image]][github-actions-ci-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

The Express.js project welcomes all constructive contributions. Contributions take many forms,
from code for bug fixes and enhancements, to additions and fixes to documentation, additional
tests, triaging incoming pull requests and issues, and more!

See the [Contributing Guide](Contributing.md) for more technical details on contributing.

### Security Issues

If you discover a security vulnerability in Express, please see [Security Policies and Procedures](Security.md).

### Running Tests

To run the test suite, first install the dependencies, then run \`npm test\`:

\`\`\`console
$ npm install
$ npm test
\`\`\`

## People

The original author of Express is [TJ Holowaychuk](https://github.com/tj)

The current lead maintainer is [Douglas Christopher Wilson](https://github.com/dougwilson)

[List of all contributors](https://github.com/expressjs/express/graphs/contributors)

### TC (Technical Committee)

* [UlisesGascon](https://github.com/UlisesGascon) - **Ulises Gascón** (he/him)
* [jonchurch](https://github.com/jonchurch) - **Jon Church**
* [wesleytodd](https://github.com/wesleytodd) - **Wes Todd**
* [LinusU](https://github.com/LinusU) - **Linus Unnebäck**
* [blakeembrey](https://github.com/blakeembrey) - **Blake Embrey**
* [sheplu](https://github.com/sheplu) - **Jean Burellier**
* [crandmck](https://github.com/crandmck) - **Rand McKinney**

<details>
<summary>TC emeriti members</summary>

#### TC emeriti members

  * [dougwilson](https://github.com/dougwilson) - **Douglas Wilson**
  * [hacksparrow](https://github.com/hacksparrow) - **Hage Yaapa**
  * [jonathanong](https://github.com/jonathanong) - **jongleberry**
  * [niftylettuce](https://github.com/niftylettuce) - **niftylettuce**
  * [troygoode](https://github.com/troygoode) - **Troy Goode**
</details>


### Triagers

* [aravindvnair99](https://github.com/aravindvnair99) - **Aravind Nair**
* [carpasse](https://github.com/carpasse) - **Carlos Serrano**
* [CBID2](https://github.com/CBID2) - **Christine Belzie**
* [enyoghasim](https://github.com/enyoghasim) - **David Enyoghasim**
* [UlisesGascon](https://github.com/UlisesGascon) - **Ulises Gascón** (he/him)
* [mertcanaltin](https://github.com/mertcanaltin) - **Mert Can Altin**
* [0ss](https://github.com/0ss) - **Salah**
* [import-brain](https://github.com/import-brain) - **Eric Cheng** (he/him)
* [3imed-jaberi](https://github.com/3imed-jaberi) - **Imed Jaberi**
* [dakshkhetan](https://github.com/dakshkhetan) - **Daksh Khetan** (he/him)
* [lucasraziel](https://github.com/lucasraziel) - **Lucas Soares Do Rego**
* [Sushmeet](https://github.com/Sushmeet) - **Sushmeet Sunger**

<details>
<summary>Triagers emeriti members</summary>

#### Emeritus Triagers

  * [AuggieH](https://github.com/AuggieH) - **Auggie Hudak**
  * [G-Rath](https://github.com/G-Rath) - **Gareth Jones**
  * [MohammadXroid](https://github.com/MohammadXroid) - **Mohammad Ayashi**
  * [NawafSwe](https://github.com/NawafSwe) - **Nawaf Alsharqi**
  * [NotMoni](https://github.com/NotMoni) - **Moni**
  * [VigneshMurugan](https://github.com/VigneshMurugan) - **Vignesh Murugan**
  * [davidmashe](https://github.com/davidmashe) - **David Ashe**
  * [digitaIfabric](https://github.com/digitaIfabric) - **David**
  * [e-l-i-s-e](https://github.com/e-l-i-s-e) - **Elise Bonner**
  * [fed135](https://github.com/fed135) - **Frederic Charette**
  * [firmanJS](https://github.com/firmanJS) - **Firman Abdul Hakim**
  * [getspooky](https://github.com/getspooky) - **Yasser Ameur**
  * [ghinks](https://github.com/ghinks) - **Glenn**
  * [ghousemohamed](https://github.com/ghousemohamed) - **Ghouse Mohamed**
  * [gireeshpunathil](https://github.com/gireeshpunathil) - **Gireesh Punathil**
  * [jake32321](https://github.com/jake32321) - **Jake Reed**
  * [jonchurch](https://github.com/jonchurch) - **Jon Church**
  * [lekanikotun](https://github.com/lekanikotun) - **Troy Goode**
  * [marsonya](https://github.com/marsonya) - **Lekan Ikotun**
  * [mastermatt](https://github.com/mastermatt) - **Matt R. Wilson**
  * [maxakuru](https://github.com/maxakuru) - **Max Edell**
  * [mlrawlings](https://github.com/mlrawlings) - **Michael Rawlings**
  * [rodion-arr](https://github.com/rodion-arr) - **Rodion Abdurakhimov**
  * [sheplu](https://github.com/sheplu) - **Jean Burellier**
  * [tarunyadav1](https://github.com/tarunyadav1) - **Tarun yadav**
  * [tunniclm](https://github.com/tunniclm) - **Mike Tunnicliffe**
</details>


## License

  [MIT](LICENSE)

[appveyor-image]: https://badgen.net/appveyor/ci/dougwilson/express/master?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/express
[coveralls-image]: https://badgen.net/coveralls/c/github/expressjs/express/master
[coveralls-url]: https://coveralls.io/r/expressjs/express?branch=master
[github-actions-ci-image]: https://badgen.net/github/checks/expressjs/express/master?label=linux
[github-actions-ci-url]: https://github.com/expressjs/express/actions/workflows/ci.yml
[npm-downloads-image]: https://badgen.net/npm/dm/express
[npm-downloads-url]: https://npmcharts.com/compare/express?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/express
[npm-install-size-url]: https://packagephobia.com/result?p=express
[npm-url]: https://npmjs.org/package/express
[npm-version-image]: https://badgen.net/npm/v/express
[Code of Conduct]: https://github.com/expressjs/express/blob/master/Code-Of-Conduct.md`,S=`# MJML 4

If you're looking for MJML 3.3.X check [this branch](https://github.com/mjmlio/mjml/tree/3.3.x)

<p style="text-align: center;" >
  <a href="https://mjml.io" target="_blank">
    <img width="250"src="https://mjml.io/assets/img/litmus/mjmlbymailjet.png">

  </a>
</p>

<p style="text-align: center;" >
  <a href="https://github.com/mjmlio/mjml/actions">
    <img src="https://github.com/mjmlio/mjml/workflows/Mjml%20CI/badge.svg?branch=master" alt="github actions">
  </a>
  <a href="https://www.codacy.com/app/gbadi/mjml">
    <img src="https://api.codacy.com/project/badge/grade/575339cb861f4ff4b0dbb3f9e1759c35"/>
  </a>
</p>


<p style="text-align: center;" >
  | <b><a href="#translated-documentation">Translated documentation</a></b>
  | <b><a href="#introduction">Introduction</a></b>
  | <b><a href="#installation">Installation</a></b>
  | <b><a href="#usage">Usage</a></b> |
</p>

---
# Translated documentation

| Language | Link for documentation |
| :-: | :-: |
| 日本語 | [日本語ドキュメント](https://github.com/mjmlio/mjml/blob/master/readme-ja.md) |

# Introduction

\`MJML\` is a markup language created by [Mailjet](https://www.mailjet.com/) and designed to reduce the pain of coding a responsive email. Its semantic syntax makes the language easy and straightforward while its rich standard components library shortens your development time and lightens your email codebase. MJML’s open-source engine takes care of translating the \`MJML\` you wrote into responsive HTML.

<p style="text-align: center;" >
  <a href="https://mjml.io" target="_blank">
    <img width="75%" src="https://cloud.githubusercontent.com/assets/6558790/12450760/ee034178-bf85-11e5-9dda-98d0c8f9f8d6.png">
  </a>
</p>


# Installation

You can install \`MJML\` with \`NPM\` to use it with NodeJS or the Command Line Interface. If you're not sure what those are, head over to <a href="#usage">Usage</a> for other ways to use MJML.

\`\`\`bash
npm install mjml
\`\`\`

# Development

To work on MJML, make changes and create merge requests, download and install [yarn](https://yarnpkg.com/lang/en/docs/install/) for easy development.

\`\`\`bash
git clone https://github.com/mjmlio/mjml.git && cd mjml
yarn
yarn build
\`\`\`

You can also run \`yarn build:watch\` to rebuild the package as you code.

# Usage

## Online

Don't want to install anything? Use the free online editor!

<p style="text-align: center;" >
  <a href="https://mjml.io/try-it-live" target="_blank"><img src="https://cloud.githubusercontent.com/assets/6558790/12195421/58a40618-b5f7-11e5-9ed3-80463874ab14.png" alt="try it live" width="75%"></a>
</p>
<br>

## Applications and plugins

MJML comes with an ecosystem of tools and plugins, check out:
- The [MJML App](https://mjmlio.github.io/mjml-app/) (MJML is included)
- [Visual Studio Code plugin](https://github.com/mjmlio/vscode-mjml) (MJML is included)
- [Sublime Text plugin](https://packagecontrol.io/packages/MJML-syntax) (MJML needs to be installed separately)

For more tools, check the [Community](https://mjml.io/community) page.

## Command line interface

> Compiles the file and outputs the HTML generated in \`output.html\`

\`\`\`bash
mjml input.mjml -o output.html
\`\`\`

You can pass optional \`arguments\` to the CLI and combine them.

argument | description | default value
---------|--------|--------------
\`mjml -m [input]\` | Migrates a v3 MJML file to the v4 syntax | NA
\`mjml [input] -o [output]\` | Writes the output to [output] | NA
\`mjml [input] -s\` | Writes the output to \`stdout\` | NA
\`mjml -w [input]\` | Watches the changes made to \`[input]\` (file or folder) | NA
\`mjml [input] --config.beautify\` | Beautifies the output (\`true\` or \`false\`) | true
\`mjml [input] --config.minify\` | Minifies the output (\`true\` or \`false\`) | false

See [mjml-cli documentation](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md) for more information about config options.

## Inside Node.js

\`\`\`javascript
import mjml2html from 'mjml'

/*
  Compile an mjml string
*/
const htmlOutput = mjml2html(\`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
\`, options)


/*
  Print the responsive HTML generated and MJML errors if any
*/
console.log(htmlOutput)
\`\`\`

You can pass optional \`options\` as an object to the \`mjml2html\` function:

option   | unit   | description  | default value
-------------|--------|--------------|---------------
fonts  | object | Default fonts imported in the HTML rendered by MJML | See in [index.js](https://github.com/mjmlio/mjml/blob/master/packages/mjml-core/src/index.js#L100-L108)
keepComments | boolean | Option to keep comments in the HTML output | true
ignoreIncludes | boolean | Option to ignore mj-includes | false
beautify | boolean | Option to beautify the HTML output | false
minify | boolean | Option to minify the HTML output | false
validationLevel | string | Available values for the [validator](https://github.com/mjmlio/mjml/tree/master/packages/mjml-validator#validating-mjml): 'strict', 'soft', 'skip'  | 'soft'
filePath | string | Path of file, used for relative paths in mj-includes | '.'
preprocessors | array of functions | Preprocessors applied to the xml before parsing. Input must be xml, not json. Functions must be (xml: string) => string | []
juicePreserveTags | Preserve some tags when inlining css, see [mjml-cli documentation](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md) for more info | NA
minifyOptions | Options for html minifier, see [mjml-cli documentation](https://github.com/mjmlio/mjml/blob/master/packages/mjml-cli/README.md) for more info | NA
mjmlConfigPath | string | The path or directory of the \`.mjmlconfig\` file (for custom components use) | \`process.cwd()\`
useMjmlConfigOptions | Allows to use the \`options\` attribute from \`.mjmlconfig\` file | false

## Client-side (in browser)

\`\`\`javascript
var mjml2html = require('mjml-browser')

/*
  Compile a mjml string
*/
var htmlOutput = mjml2html(\`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
\`, options)


/*
  Print the responsive HTML generated and MJML errors if any
*/
console.log(htmlOutput)
\`\`\`

## API

A free-to-use MJML API is available to make it easy to integrate MJML in your application. Head over [here](https://mjml.io/api) to learn more about the API.

# MJML Slack

MJML wouldn't be as cool without its amazing community. Head over the [Community Slack](https://join.slack.com/t/mjml/shared_invite/zt-gqmwfwmr-kPBnfuuB7wof5httaTcXxg) to meet fellow MJML'ers.

# Contributors

- [Maxime](https://github.com/iRyusa)
- [Nicolas](https://github.com/ngarnier)
- [Cedric](https://github.com/kmcb777)
- [Loeck](https://github.com/lohek)
- [Robin](https://github.com/robink)
- [Guillaume](https://github.com/GuillaumeBadi)
- [Meriadec](https://github.com/meriadec)
- [Arnaud](https://github.com/arnaudbreton)
- [HTeuMeuLeu](https://github.com/hteumeuleu)
- [Emmanuel Payet](https://github.com/epayet)
- [Matthieu](https://github.com/swibge)
- [Rogier](https://github.com/rogierslag)`,A=`# Welcome to Remix!

We are happy you're here!

[Remix](https://remix.run) is a full stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience that deploys to any Node.js server and even non-Node.js environments at the edge like Cloudflare Workers.

Want to know more? Read the [Technical Explanation of Remix](https://remix.run/discussion/introduction)

This repository contains the Remix source code. This repo is a work in progress, so we appreciate your patience as we figure things out.

## Documentation

For documentation about Remix, please visit [our website](https://remix.run/docs).

Also, please [join our community on Discord](https://rmx.as/discord).

The documentation is automatically generated on each release from the files in
[the \`docs\` directory](docs).

## Contributing

If you're interested in contributing code and/or documentation, please see [our guide to contributing](https://remix.run/guides/contributing).

## Code of Conduct

Please see our [code of conduct](CODE_OF_CONDUCT.md) for any questions about the kind of community we are trying to build here and what to do if you need help with someone who is not acting professionally.`,T=`
# TypeScript

[![GitHub Actions CI](https://github.com/microsoft/TypeScript/workflows/CI/badge.svg)](https://github.com/microsoft/TypeScript/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/typescript.svg)](https://www.npmjs.com/package/typescript)
[![Downloads](https://img.shields.io/npm/dm/typescript.svg)](https://www.npmjs.com/package/typescript)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/microsoft/TypeScript/badge)](https://securityscorecards.dev/viewer/?uri=github.com/microsoft/TypeScript)


[TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](https://www.typescriptlang.org/play/), and stay up to date via [our blog](https://blogs.msdn.microsoft.com/typescript) and [Twitter account](https://twitter.com/typescript).

Find others who are using TypeScript at [our community page](https://www.typescriptlang.org/community/).

## Installing

For the latest stable version:

\`\`\`bash
npm install -D typescript
\`\`\`

For our nightly builds:

\`\`\`bash
npm install -D typescript@next
\`\`\`

## Contribute

There are many ways to [contribute](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) to TypeScript.
* [Submit bugs](https://github.com/microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/microsoft/TypeScript/pulls).
* Engage with other TypeScript users and developers on [StackOverflow](https://stackoverflow.com/questions/tagged/typescript).
* Help each other in the [TypeScript Community Discord](https://discord.gg/typescript).
* Join the [#typescript](https://twitter.com/search?q=%23TypeScript) discussion on Twitter.
* [Contribute bug fixes](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see
the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.

## Documentation

*  [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
*  [Programming handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
*  [Homepage](https://www.typescriptlang.org/)

## Roadmap

For details on our planned features and future direction, please refer to our [roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap).`,R=`> Want to **automatically find and fix performance issues**? Check out [Million Lint](https://million.dev/).

<a href="https://million.dev">
  <img src="https://raw.githubusercontent.com/aidenybai/million/main/.github/assets/banner.png" alt="Million.js Banner" />
</a>

<div align="center">
  <a href="https://img.shields.io/github/actions/workflow/status/aidenybai/million/ci.yml?branch=main" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/aidenybai/million/ci.yml?branch=main&style=flat&colorA=000000&colorB=000000" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/million" target="_blank"><img src="https://img.shields.io/npm/v/million?style=flat&colorA=000000&colorB=000000" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/million" target="_blank"><img src="https://img.shields.io/npm/dt/million.svg?style=flat&colorA=000000&colorB=000000" alt="NPM Downloads" /></a>
  <a href="https://discord.gg/X9yFbcV2rF" target="_blank"><img src="https://img.shields.io/discord/938129049539186758?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=ffffff" /></a>

<table>
    <tbody>
      <tr>
        <td>
          <a href="https://million.dev/docs/introduction">📚 Read the docs</a>
        </td>
        <td>
          <a href="https://www.youtube.com/watch?v=VkezQMb1DHw">🎦 Watch video</a>
        </td>
        <td>
          <a href="https://million.dev/chat">💬 Join our Discord</a>
        </td>
        <td>
          <a href="https://twitter.com/milliondotjs">🌐 Follow on Twitter</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## What is Million.js?

Million.js is an extremely fast and lightweight optimizing compiler that make [components](https://react.dev) up to [_**70% faster**_](https://krausest.github.io/js-framework-benchmark/current.html).

> Oh man... Another [\`/virtual dom|javascript/gi\`](https://regexr.com/6mr5f) framework? I'm fine with [React](https://reactjs.org) already, why do I need this?

Million.js works with React and makes reconciliation faster. By using a fine-tuned, optimized virtual DOM, Million.js reduces the overhead of diffing ([_try it out here_](https://demo.million.dev))

**TL;DR:** Imagine [React](https://react.dev) components running at the speed of raw JavaScript.

### [**👉 Setup Million.js in seconds! →**](https://million.dev/)

## Installation

The Million.js CLI will automatically install the package and configure your project for you.

\`\`\`bash
npx million@latest
\`\`\`

Once your down, just run your project and information should show up in your command line!

> Having issues installing? [**→ View the installation guide**](https://million.dev/docs/install)

## Why Million.js?

To understand why to use Million.js, we need to understand how React updates interfaces. When an application's state or props change, React undergoes an update in two parts: rendering and reconciliation.

To show this, let's say this is our \`App\`:

\`\`\`jsx
function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
\`\`\`

In this \`App\`, when I click on the button, the \`count\` state will update and the \`<p>\` tag will update to reflect the new value. Let's break this down.

### Rendering

The first step is rendering. Rendering is the process of generating a snapshot of the current component. You can imagine it as simply "calling" the \`App\` function and storing the output in a variable. This is what the \`App\` snapshot would look like:

\`\`\`jsx
const snapshot = App();

// snapshot =
<div>
  <p>Count: 1</p>
  <button onClick={increment}>Increment</button>
</div>;
\`\`\`

### Reconciliation

In order to update the interface to reflect the new state, React needs to compare the previous snapshot to the new snapshot (_called "diffing"_). React's reconciler will go to each element in the previous snapshot and compare it to the new snapshot. If the element is the same, it will skip it. If the element is different, it will update it.

- The \`<div>\` tag is the same, so it doesn't need to be updated. ✅
  - The \`<p>\` tag is the same, so it doesn't needs to be updated. ✅
    - The text inside the \`<p>\` tag is different, so it needs to be updated. ⚠ ️
  - The \`<button>\` tag is the same, so it doesn't need to be updated. ✅
    - The \`onClick\` prop is the same, so it doesn't need to be updated. ✅
    - The text inside the \`<button>\` tag is the same, so it doesn't need to be updated. ✅

_(total: 6 diff checks)_

\`\`\`diff
<div>
-  <p>Count: 0</p>
+  <p>Count: 1</p>
  <button onClick={increment}>Increment</button>
</div>
\`\`\`

From here, we can see that the \`<p>\` tag needs to be updated. React will then update the \`<p>\` DOM node to reflect the new value.

\`\`\`jsx
<p>.innerHTML = \`Count: \${count}\`;
\`\`\`

### How Million.js makes this faster

React is slow.

The issue with React's reconciliation it becomes **exponentially slower** the more JSX elements you have. With this simple \`App\`, it only needs to diff a few elements. In a real world React app, you can easily have hundreds of elements, slowing down interface updates.

Million.js solves this by **skipping the diffing step entirely** and directly updating the DOM node.

Here is a conceptual example of how Million.js reconciler works:

\`\`\`jsx
function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  // generated by compiler
  if (count !== prevCount) {
    <p>.innerHTML = \`Count: \${count}\`;
  }

  <button>.onclick = increment;

  // ...
}
\`\`\`

Notice how when the \`count\` is updated, Million.js will directly update the DOM node. Million.js turns React reconciliation from \`O(n)\` (linear time) to \`O(1)\` (constant time).

> How fast is it? [**→ View the benchmarks**](https://krausest.github.io/js-framework-benchmark/current.html)

## Resources & Contributing Back

Looking for the docs? Check the [documentation](https://million.dev) or the [Contributing Guide](https://github.com/aidenybai/million/blob/main/.github/CONTRIBUTING.md) out. We also recommend reading [_Virtual DOM: Back in Block_](https://million.dev/blog/virtual-dom) to learn more about Million.js's internals.

Want to talk to the community? Hop in our [Discord](https://discord.gg/X9yFbcV2rF) and share your ideas and what you've build with Million.js.

Find a bug? Head over to our [issue tracker](https://github.com/aidenybai/million/issues) and we'll do our best to help. We love pull requests, too!

We expect all Million.js contributors to abide by the terms of our [Code of Conduct](https://github.com/aidenybai/million/blob/main/.github/CODE_OF_CONDUCT.md).

[**→ Start contributing on GitHub**](https://github.com/aidenybai/million/blob/main/.github/CONTRIBUTING.md)

![Alt](https://repobeats.axiom.co/api/embed/74a4b271e2a24c2cb08c897cfc1dfe155e0e1c1e.svg 'Repobeats analytics image')

## Codebase

This repo is a "mono-repo" with modules. Million.js ships as one NPM package, but has first class modules for more complex, but important extensions. Each module has its own folder in the \`/packages\` directory.

You can also track our progress through our [Roadmap](https://github.com/users/aidenybai/projects/5/views/1?layout=roadmap).

| Module                                                                                                                                                            | Description                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [\`million\`](https://github.com/aidenybai/million/tree/main/packages/million)                                                                                      | The main Virtual DOM with all of Million.js's core. |
| [\`react\`](https://github.com/aidenybai/million/tree/main/packages/react) / [\`react-server\`](https://github.com/aidenybai/million/tree/main/packages/react-server) | React compatibility for Million.js.                 |
| [\`compiler\`](https://github.com/aidenybai/million/tree/main/packages/compiler)                                                                                    | The compiler for Million.js in React.               |
| [\`jsx-runtime\`](https://github.com/aidenybai/million/tree/main/packages/jsx-runtime)                                                                              | A simple JSX runtime for Million.js core.           |
| [\`types\`](https://github.com/aidenybai/million/tree/main/packages/types)                                                                                          | Shared types between packages                       |

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/aidenybai">
    <img src="https://raw.githubusercontent.com/aidenybai/aidenybai/master/sponsors.svg" />
  </a>
  <a href="https://vercel.com?utm_source=millionjs&utm_campaign=oss"><img height="30" src="https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg" /></a>
</p>

## Acknowledgments

Million.js takes heavy inspiration from the following projects:

- [\`blockdom\`](https://github.com/ged-odoo/blockdom) ([Géry Debongnie](https://github.com/ged-odoo))
  Thank you to Géry pioneering the concept of "blocks" in the virtual DOM. Many parts of the Million.js codebase either directly or indirectly derive from his work.
- [\`voby\`](https://github.com/vobyjs/voby) ([Fabio Spampinato](https://github.com/fabiospampinato))
  The Million.js "template" concept is derived from Voby's \`template()\` API.
- [Hack the Wave](https://hackthewave.com) ([Melinda Chang](https://github.com/melindachang)) for their homepage.
- [\`react\`](https://react.dev) and [\`turbo\`](https://turbo.build) for their documentation. Many parts of the current Million.js documentation are grokked and modified from theirs.
- [\`ivi\`](https://github.com/localvoid/ivi), [Preact](https://github.com/preactjs/preact), [and more](https://krausest.github.io/js-framework-benchmark/2021/table_chrome_96.0.4664.45.html)

## License

Million.js is [MIT-licensed](LICENSE) open-source software by [Aiden Bai](https://aiden.mov) and [contributors](https://github.com/aidenybai/million/graphs/contributors):

<a href="https://github.com/aidenybai/million/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aidenybai/million" />
</a>`,I=`# Service workers
[content/browser/service_worker]: /content/browser/service_worker
[content/renderer/service_worker]: /content/renderer/service_worker
[content/renderer/service_worker]: /content/renderer/service_worker
[disk_cache]: /net/disk_cache/README.md
[embedded_worker.mojom]: https://codesearch.chromium.org/chromium/src/third_party/blink/public/mojom/service_worker/embedded_worker.mojom
[service_worker_container.mojom]: https://codesearch.chromium.org/chromium/src/third_party/blink/public/mojom/service_worker/service_worker_container.mojom
[service_worker_database.h]: https://codesearch.chromium.org/chromium/src/components/services/storage/service_worker/service_worker_database.h
[third_party/blink/common/service_worker]: /third_party/blink/common/service_worker
[third_party/blink/public/common/service_worker]: /third_party/blink/public/common/service_worker
[third_party/blink/public/mojom/service_worker]: /third_party/blink/public/mojom/service_worker
[third_party/blink/public/platform/modules/service_worker]: /third_party/blink/public/platform/modules/service_worker
[third_party/blink/public/web/modules/service_worker]: /third_party/blink/public/web/modules/service_worker
[third_party/blink/renderer/modules/service_worker]: /third_party/blink/renderer/modules/service_worker
[Blink Public API]: /third_party/blink/public/README.md
[Cache Storage API]: /content/browser/cache_storage/README.md
[LevelDB]: /third_party/leveldatabase/README.chromium
[Onion Soup]: https://docs.google.com/document/d/1K1nO8G9dO9kNSmtVz2gJ2GG9gQOTgm65sJlV3Fga4jE/edit?usp=sharing
[Quota Manager]: /storage/browser/quota
[ServiceWorkerDatabase]: https://codesearch.chromium.org/chromium/src/components/services/storage/service_worker/service_worker_database.h
[ServiceWorkerStorage]: https://codesearch.chromium.org/chromium/src/components/services/storage/service_worker/service_worker_storage.h
[Service Worker specification]: https://w3c.github.io/ServiceWorker/
[MDN documentation]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

This document describes Chromium's implementation of [service
workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

[TOC]

## Introduction to service workers

This section briefly introduces what service workers are. For a more detailed
treatment, see the [MDN documentation] or the [Service Worker specification].

Service workers are a web platform feature that form the basis of app-like
capabilities such as offline support, push notifications, and background sync.
A service worker is a event-driven JavaScript program that runs in a worker
thread separate from a document.

Once registered, a service worker is installed on the browser and persists
indefinitely until evicted or deleted manually (see [Eviction](#Eviction)
below). The browser dispatches events to the worker thread, starting the
thread whenever needed and stopping it when there are no more events to
dispatch.

Service workers are bound to an origin. More specifically they have a *scope*
URL, specified when the service worker is registered. The service worker
*controls* pages or web workers that match its scope. There can be only one
service worker registration for a given scope.

A website registers a service worker using the \`register()\` API:
\`\`\`javascript
navigator.serviceWorker.register('sw.js', {scope: './foo'});
\`\`\`

If this page is on \`https://example.com\`, the service worker is registered for
scope \`https://example.com/foo\`.

The service worker may look like this:

\`\`\`javascript
// sw.js:
self.addEventListener('install', event => {
  // Install static assets.
  event.waitUntil((async () => {
    const cache = await caches.open('my-cache');
    await cache.addAll(['all.css', 'page.js', 'page.html']);
  })());
});

self.addEventListener('fetch', event => {
  // Respond with a cached resource, or else fetch from network.
  event.respondWith((async () => {
    const response = await caches.match(event.request);
    return response || fetch(event.request);
  })());
});
\`\`\`

Note the \`fetch\` event handler. A core functionality of service workers is the
ability to intercept and respond to URL requests, similar to a network proxy.
Whenever the browser makes a URL request that a service worker can intercept, it
dispatches a \`fetch\` event to the worker. The service worker can then provide a
response to the request, for example, by using the Fetch API, the Cache Storage
API, or by generating a response using \`new Response()\`.

To understand which service worker intercepts a URL request, there are two
rules.

1. *Main resource requests* are requests for a window or a web worker. When the
   browser makes a main resource request, it finds the service worker
   registration whose scope contains the URL, if any (example:
   \`https://example.com/foo/hi\` matches the service worker above). If so, that
   service worker intercepts the request, and the service worker subsequently
   controls the resulting window or web worker.
2. *Subresource requests* are requests from a window or a web worker, such as
   for stylesheets, scripts, or images. The service worker that controls the
   window or web worker intercepts these requests.

The rest of this document explains how service workers are implemented in
Chromium.

## Class overview

As a web platform feature, service worker is implemented in the [content
module](/content/README.md) and its dependency
[Blink](/third_party/blink/README.md).  Chrome-specific hooks and additions, for
example, for Chrome extensions support, are in higher-level directories like
[//chrome](/chrome/README.md).

The service worker implementation has parts in both the browser process and
renderer process:
- The browser process manages service worker registrations, initiates starting
  and stopping service worker threads in the renderer, requests the renderer
  to dispatch events to the workers, and implements most of the service worker
  APIs that the renderer process exposes to the web.
- The renderer process runs service worker threads, dispatches events to them,
  and provides the web-exposed API surface.

> TODO: A simple diagram of the browser/renderer architecture and the Mojo
> message pipes and interfaces would be helpful.

### Browser process

> Note: The classes in this section are in the namespace \`content\`.

In the browser process, \`ServiceWorkerContextCore\` is root class which all other
service worker classes are attached to. There is one context per [storage
partition](/content/public/browser/storage_partition.h).

\`ServiceWorkerContextCore\` is owned by a thread-safe refcounted wrapper called
\`ServiceWorkerContextWrapper\`. \`StoragePartition\` is the primary owner of this
object on the UI thread. But \`ServiceWorkerContextCore\` itself, and the classes
that hang off of it, are primarily single-threaded and run on the IO thread.
There is ongoing work to move this "service worker core" thread to the UI
thread. After that time, it may be possible to remove the refcounted wrapper and
have StoragePartition uniquely own the context core on the UI thread. See
the [Service Worker on UI design
doc](https://docs.google.com/document/d/1APPz704Ebcrwp0QEaPNLVtBjPuV6MXlolby7AtZB4MA/edit?usp=sharing).

The context owns \`ServiceWorkerStorage\`, which manages service worker
registrations and auxiliary data attached to them. The \`ServiceWorkerStorage\`
owns a \`ServiceWorkerDatabase\`, which provides access to the LevelDB instance
containing the registration data. See [Storage](#Storage) below.

\`ServiceWorkerStorage\` is used to register, update, and unregister service
workers. Typically these operations are driven by \`ServiceWorkerRegisterJob\` and
\`ServiceWorkerUnregisterJob\`, which implement the
[*jobs*](https://w3c.github.io/ServiceWorker/#dfn-job) defined in the
specification. As per the specification, the jobs are run sequentially using a a
[*job queue*](https://w3c.github.io/ServiceWorker/#dfn-job-queue).  The class
\`ServiceWorkerJobCoordinator\`, owned by the context, implements this queue.

\`ServiceWorkerStorage\` represents service worker entities as
\`ServiceWorkerRegistration\` and \`ServiceWorkerVersion\`. These correspond to the
specification's model of [*service worker
registration*](https://w3c.github.io/ServiceWorker/#dfn-service-worker-registration)
and [*service worker*](https://w3c.github.io/ServiceWorker/#dfn-service-worker),
respectively.

\`ServiceWorkerVersion\` provides functions for starting and stopping a service
worker thread in the renderer, and for dispatching events to the thread.
It uses a lower-level class, \`EmbeddedWorkerInstance\`,
to request the renderer to start and stop the service worker thread.

> Note: The "embedded worker" terminology and abstraction is a bit of a historical
> accident. At one point the plan was for service workers and shared workers to
> use the same "embedded worker" classes. But it turned out only service workers
> use it.

A running service worker has a corresponding host in the browser process called
\`ServiceWorkerHost\`.

In addition, service worker clients (windows and web workers) are represented by
a \`ServiceWorkerContainerHost\` in the browser process. This host holds
information pertinent to service workers, such as which
\`ServiceWorkerRegistration\` is controlling the client, and it implements the
Mojo interface the renderer uses for the [client-side service worker
API](https://w3c.github.io/ServiceWorker/#document-context).

### Renderer process

> Note: Historically much service worker code in the renderer process was
> implemented in \`//content/renderer\`. There is ongoing work to move it to
> \`//third_party/blink\` per [Onion Soup], which will remove some layers of
> indirection.

The renderer process naturally has classes that implement the web-exposed
interfaces: \`blink::ServiceWorker\`, \`blink::ServiceWorkerRegistration\`,
\`blink::ServiceWorkerContainer\`, etc.

Other classes in the renderer process can be divided into those that deal with
a) service worker execution contexts, and b) service worker clients (windows and
web workers).

#### Service worker execution contexts

For starting and stopping a service worker,
\`content::EmbeddedWorkerInstanceClientImpl\` is used. One is created per service
worker startup on a background thread. It creates a
\`content::ServiceWorkerContextClient\`, which owns a
\`blink::WebEmbeddedWorkerImpl\`, which creates a \`blink::ServiceWorkerThread\`
which starts the physical service worker thread and JavaScript execution context
with a \`blink::ServiceWorkerGlobalScope\` global.

\`ServiceWorkerGlobalScope\` implements two Mojo interfaces:
- \`mojom.blink.ServiceWorker\`, which the browser process uses to dispatch events
  to the service worker.
- \`mojom.blink.ControllerServiceWorker\`, which other renderer processes use to
  dispatch fetch events to a service worker that controls a client in that
  process.

#### Service worker clients

Service worker clients have an associated
\`content::ServiceWorkerProviderContext\` which contains information such as which
service worker controls the client and manages request interception to that
service worker.

### Mojo

[Mojo](/mojo/README.md) is Chromium's IPC system and plays a important role in
service worker architecture. This section describes the main Mojo interfaces for
service workers, and which message pipes they are on.

#### Browser <->  Renderer (window)

For windows (or [clients](https://w3c.github.io/ServiceWorker/#service-worker-client-concept)),
the browser process and renderer process talk over Mojo interfaces bound to the Mojo pipe to commit
a navigation, which is considered as the legacy IPC "channel" message pipe. This guarantees the
order of IPC messages between Mojo interfaces.

Each window in the renderer process is connected to a host in the browser
process. The renderer talks to the browser process over the
\`mojom.blink.ServiceWorkerContainerHost\` interface which provides functionality
like registering service workers. The browser talks to the renderer over the
\`mojom.blink.ServiceWorkerContainer\` interface.

The window obtains \`ServiceWorkerRegistration\` and \`ServiceWorker\` JavaScript
objects via APIs like \`navigator.serviceWorker.ready\`,
\`navigator.serviceWorker.controller\`, and \`navigator.serviceWorker.register()\`.
Each object has a connection to the browser, again on the channel-associated
message pipe. \`ServiceWorkerRegistration\` has a remote to a
\`mojom.blink.ServiceWorkerRegistrationObjectHost\` and \`ServiceWorker\` has a
remote to a \`ServiceWorkerObjectHost\`. Conversely, the browser process has
remotes to \`mojom.blink.ServiceWorkerRegistrationObject\` and
\`mojom.blink.ServiceWorkerObject\`.

> After making this design, there's been some realization that asynchronous
> ownership makes destruction complicated because of non-deterministic
> destruction order sometimes caused crashes.
> It may have worked better to use fewer interfaces, e.g., a single
> ServiceWorkerContainer interface from which one can manipulate
> ServiceWorkerRegistration and ServiceWorker, or maybe prohibiting destructions
> initiated from the renderer may work.
> In addition, we have a Mojo interface for in-process communication across threads like
> [this](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/public/mojom/service_worker/controller_service_worker.mojom;l=95;drc=6e8b402a6231405b753919029c9027404325ea00).
> Mojo is now slightly overused for abstraction of layers for service workers.

#### Browser <-> Renderer (shared worker)

For shared workers, the browser process and renderer process talk over Mojo
interfaces bound to the dedicated message pipe established by
the \`mojom.blink.SharedWorkerFactory\` implementation that creates the shared
worker.

Similar to windows, the shared worker has a remote to a
\`mojom.blink.ServiceWorkerContainerHost\` in the browser process, and the
browser process has a remote to the \`mojom.blink.ServiceWorkerContainer\`
in the renderer process.

However, shared workers don't yet support \`navigator.serviceWorker\`,
so they don't use many of the methods on \`ServiceWorkerContainerHost\`.
They also don't yet have a way to obtain a \`ServiceWorkerRegistration\`
or \`ServiceWorker\` JavaScript object.

#### Browser <-> Renderer (service worker)

For service workers, there are two message pipes: a) a "bootstrap" message
pipe for starting/stopping the service worker thread, and b) a message pipe
bound to the running service worker thread.

The "bootstrap" message pipe is established by the
\`mojom.blink.EmbeddedWorkerInstanceClient\` implementation in the renderer.  The
browser process uses this interface to ask the renderer process to start and
stop a service worker thread. The renderer process has a remote to a
corresponding \`mojom.blink.EmbeddedWorkerInstanceHost\` in the browser process.

In addition, like windows and shared workers above, the service worker has a
remote to a \`mojom.blink.ServiceWorkerContainerHost\` in the brocess process, and
the browser process has a remote to a \`mojom.blink.ServiceWorkerContainer\`.
These are on the bootstrap message pipe.

> Note: It's unclear why service workers use the \`ServiceWorkerContainerHost\`
> interface, because they are forbidden from calling any methods on this
> interface.  There are some plans to clean this up, see
> https://crbug.com/931087.

Running service worker threads have a dedicated message pipe, established by the
\`mojom.blink.ServiceWorker\` implementation. The browser process uses this
interface to ask the renderer to dispatch events to the service worker. The
service worker has a remote to a corresponding \`mojom.blink.ServiceWorkerHost\`
in the browser process.

Service workers have access to a \`ServiceWorkerRegistration\` JavaScript object
via \`self.registration\` and its \`ServiceWorker\` properties. The
\`mojom.blink.ServiceWorker(Registration)Object(Host)\` interfaces are bound to
the service worker thread's message pipe.

#### Renderer (window or shared worker) <-> Renderer (service worker)

Service worker clients in a renderer process have a direct connection to their
controller service worker, which can be in the same process or a different
process. The clients have a remote to a \`mojom.blink.ControllerServiceWorker\`
which they use to dispatch fetch events to the service worker.

This remote is given to the client by the browser process using
\`SetController()\` on the \`mojom.blink.ServiceWorkerContainer\` interface.  The
browser is the source of truth about which service worker is controlling which
client.

If the connection breaks, it likely means the service worker has stopped. The
service worker client asks the browser process to restart the service worker so
it can again dispatch fetch events to it.

## Directory structure

- [content/browser/service_worker]: Browser process code, including stored
  registration data, the inception of starting a service worker, and controlling
  navigations. The browser process has host objects of most live renderer
  entities that deal with service workers, and the bulk of work is performed by
  these host objects.
- [content/renderer/service_worker]: Renderer process code. This should move to
  third_party/blink per [Onion Soup].
- [third_party/blink/common/service_worker]: Common process code. Contains the
  implementation of [third_party/blink/public/common/service_worker].
- [third_party/blink/public/common/service_worker]: Header files for common
  process code that can be used by both inside Blink and outside Blink.
- [third_party/blink/public/mojom/service_worker]: Mojom files for common
  process code that can be used by both Blink and content.
- [third_party/blink/public/platform/modules/service_worker]: [Blink Public API]
  header files. This should be removed per [Onion Soup].
- [third_party/blink/public/web/modules/service_worker]: More [Blink Public API]
  header files. This should be removed per [Onion Soup].
- [third_party/blink/renderer/modules/service_worker]: Renderer process code in
  Blink. This is the closest code to the web-exposed Service Worker API.

## Storage

Service worker storage consists of the following.
- **Service worker registration metadata** is stored in a [LevelDB] instance
  located at \${DIR_USER_DATA}/Service Worker/Database.
- **Service worker scripts** are stored in a [disk_cache] instance using the
  "simple" implementation, located at \${DIR_USER_DATA}/Service
  Worker/ScriptCache. Registration metadata points to these scripts.

Code pointers include [ServiceWorkerDatabase] and [ServiceWorkerStorage].

The related [Cache Storage API] uses a [disk_cache] instance using the "simple"
implementation, located at \${DIR_USER_DATA}/Service Worker/CacheStorage. This
location was chosen because the [Cache Storage API] is currently defined in the
[Service Worker specification], but it can be used independently of service
workers.

For incognito windows, everything is in-memory.

### Eviction

Service workers storage lasts indefinitely, i.e, there is no periodic deletion
of old but still installed service workers. Installed service workers are only
evicted by the [Quota Manager] (or user action). The Quota Manager controls
several web platform APIs, including sandboxed filesystem, WebSQL,
IndexedDB, cache storage, service worker (registration and scripts), and
background fetch.

The Quota Manager starts eviction when one of the following conditions is true
(as of August 2018):
- **The global pool is full**: Chrome is using > 1/3 of the disk (>2/3 on CrOS).
- **The system is critically low on space**: the disk has < min(1GB,1%) free
  (regardless of how much Chrome is contributing!)

When eviction starts, origins are purged on an LRU basis until the triggering
condition no longer applies. Purging an origin deletes its storage completely.

Note that Quota Manager eviction is independent of HTTP cache eviction. The
HTTP cache is typically much smaller than the storage under the control of the
Quota Manager, and it likely uses a simple non-origin-based LRU algorithm.

## UseCounter integration

Blink has a UseCounter mechanism intended to measure the percentage of page
loads on the web that used a given feature.  Service workers complicate this
measurement because a feature use in a service worker potentially affects many
page loads, including ones in the future.

Therefore, service workers integrate with the UseCounter mechanism as follows:
- **If a feature use occurs before the service worker finished installing**, it
is recorded in storage along with the service worker. Any page thereafter that
the service worker controls is counted as using the feature.
- **If a feature use occurs after the service worker finished installing**, all
currently controlled pages are counted as using the feature.

For more details and rationale, see [Design of UseCounter for
workers](https://docs.google.com/document/d/1VyYZnhjBdk-MzCRAcX37TM5-yjwTY40U_J9rWnEAo8c/edit?usp=sharing)
and [crbug 376039](https://bugs.chromium.org/p/chromium/issues/detail?id=376039).

Code pointers include:
- (Browser -> Page) ServiceWorkerContainer.SetController and
ServiceWorkerContainer.CountFeature in [service_worker_container.mojom].
- (Service worker -> Browser) EmbeddedWorkerInstanceHost.CountFeature
in [embedded_worker.mojom].
- (Persistence) ServiceWorkerDatabase::RegistrationData::used_features
in [service_worker_database.h].

## Performance

We monitor service worker performance with real-world metrics
([UMA](/tools/metrics/histograms/README.md)) and performance benchmarks.

### UMA

The UMA data is internal-only. Key metrics include:

[Page load metrics](/chrome/browser/page_load_metrics/README) for service worker
controlled loads:
- PageLoad.Clients.ServiceWorker2.PaintTiming.NavigationToFirstContentfulPaint
- PageLoad.Clients.ServiceWorker2.Input.NavigationToFirstContentfulPaint

Service worker startup time and breakdown:
- ServiceWorker.StartWorker.Time
- ServiceWorker.StartTiming.Duration
- ServiceWorker.StartTiming.[A]To[B] (e.g.,
  ServiceWorker.StartTiming.StartToReceivedStartWorker)

Fetch event handling:
- ServiceWorker.LoadTiming.MainFrame.MainResource.\\*
- ServiceWorker.LoadTiming.Subresource.\\*

Service worker's startup sequence is composed of a few steps in
ServiceWorker.StartTiming.[A]To[B]. These are the milestones that can be in the
[A] and [B].

1. Start (browser)
2. SentStartWorker (browser)
3. ReceivedStartWorker (renderer)
4. ScriptEvaluationStart (renderer)
5. ScriptEvaluationEnd (renderer)
6. End (browser)

Here's the explanation about the each section:
- **Start to SentStartWorker**: the browser process initiates a starting
  worker sequence. This may include process creation if not exists, and setting up
  URLLoaderFactories.
- **SentStartWorker to ReceivedStartWorker**:  This section measures the IPC
  delay. SendStartWorker is recorded when the browser sends a Mojo message to
  start a worker thread to the renderer process. ReceivedStartWorker is
  recordred when the renderer receives it.
- **ReceivedStartWorker to ScriptEvaluationStart**: This measures the time to be
  spent for starting a worker thread, and preparation for the V8 isolate and
  context.
- **ScriptEvaluationStart to ScriptEvaluationEnd**: the initial script
  evaluation. This metrics can be affected by the content of service scripts.
- **ScriptEvaluationEnd to End**: This measures the IPC delay of OnStarted
   message from the renderer to the browser.

### Tests

We run a limited number of
[Telemetry](https://chromium.googlesource.com/catapult/+/HEAD/telemetry/README.md)
benchmark tests for service worker and a few microbenchmarks in
[blink_perf](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/benchmark/harnesses/blink_perf.md#service-worker-perf-tests)
([crbug](https://crbug.com/1019097)).

Telemetry tests are part of the [Loading
benchmarks](/docs/speed/benchmark/harnesses/loading.md), as the "pwa" tests
inside the "loading.mobile" suite. The tests do not run on desktop machines
(loading.desktop) due to resource constraints.

See a quick
[dashboard](https://chromeperf.appspot.com/report?sid=59acafc01d33fa4fcea163b4b83d733670d91e7c2eaa853656c2e23f21c04dfd)
of these test results. You can also run the benchmarks locally:

\`\`\`
# Run benchmark on \`FlipKart\`
$ tools/perf/run_benchmark --browser=android-chromium loading.mobile --story-filter='FlipKart'

# Run benchmark on \`FlipKart\` with cache_temperature = cold
$ tools/perf/run_benchmark --browser=android-chromium loading.mobile --story-filter='FlipKart_cold'
\`\`\`

> TODO(falken): Merge this with loading.md and cache_temperature.py documentation.

The PWA tests load a page multiple times. Each time has a different "cache
temperature". These temperatures have special significance for service worker
controlled page loads:
- **cold**: tests the very first load to a page (no active service worker).
  Browser cache and storage data including service worker registrations are
  cleared first.
- **warm**: tests the second load to a page (with an active service worker). It
  first does a cold load which installs a service worker, waits for the service
  worker to reach activated state, and then tests the load.
- **hot**: tests the third load to the page (with an active service worker and
  V8 code caching). It first does a warm load, then waits(?) for V8 Code Caching
  to complete, then tests another load.

Service workers are terminated between loads in order to include service worker
startup as part of the performance test.

Code links and resources:
- PWA test suite: see 'pwa' in
  [loading_mobile.py](/tools/perf/page_sets/loading_mobile.py), as of March 2019
  [here](https://cs.chromium.org/chromium/src/tools/perf/page_sets/loading_mobile.py?l=88&rcl=e590d4e0ae6d3cbdabee199ea6fabe152a3eea83).
- [cache_temperature.py](https://chromium.googlesource.com/catapult/+/main/telemetry/telemetry/page/cache_temperature.py)
- "Perf benchmark for PWAs using the loading benchmark": [crbug](https://crbug.com/736697) and
  [design doc](https://docs.google.com/document/d/1Nf97CVp1X7aSqvAspyJ7yOCDyr1osUNrnfrGwZ_Yuuo/edit?usp=sharing).

## Other documentation

- [Service Worker Security FAQ](/docs/security/service-worker-security-faq.md)
- [ES Modules in Service Workers](/content/browser/service_worker/es_modules.md)
`,x=`<p align="center">
  <a href="https://fastapi.tiangolo.com"><img width="100%" height="auto" src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" alt="FastAPI"></a>
</p>
<p align="center">
    <em>FastAPI framework, high performance, easy to learn, fast to code, ready for production</em>
</p>
<p align="center">
<a href="https://github.com/tiangolo/fastapi/actions?query=workflow%3ATest+event%3Apush+branch%3Amaster" target="_blank">
    <img src="https://github.com/tiangolo/fastapi/workflows/Test/badge.svg?event=push&branch=master" alt="Test">
</a>
<a href="https://coverage-badge.samuelcolvin.workers.dev/redirect/tiangolo/fastapi" target="_blank">
    <img src="https://coverage-badge.samuelcolvin.workers.dev/tiangolo/fastapi.svg" alt="Coverage">
</a>
<a href="https://pypi.org/project/fastapi" target="_blank">
    <img src="https://img.shields.io/pypi/v/fastapi?color=%2334D058&label=pypi%20package" alt="Package version">
</a>
<a href="https://pypi.org/project/fastapi" target="_blank">
    <img src="https://img.shields.io/pypi/pyversions/fastapi.svg?color=%2334D058" alt="Supported Python versions">
</a>
</p>

---

**Documentation**: <a href="https://fastapi.tiangolo.com" target="_blank">https://fastapi.tiangolo.com</a>

**Source Code**: <a href="https://github.com/tiangolo/fastapi" target="_blank">https://github.com/tiangolo/fastapi</a>

---

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints.

The key features are:

* **Fast**: Very high performance, on par with **NodeJS** and **Go** (thanks to Starlette and Pydantic). [One of the fastest Python frameworks available](#performance).
* **Fast to code**: Increase the speed to develop features by about 200% to 300%. *
* **Fewer bugs**: Reduce about 40% of human (developer) induced errors. *
* **Intuitive**: Great editor support. <abbr title="also known as auto-complete, autocompletion, IntelliSense">Completion</abbr> everywhere. Less time debugging.
* **Easy**: Designed to be easy to use and learn. Less time reading docs.
* **Short**: Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.
* **Robust**: Get production-ready code. With automatic interactive documentation.
* **Standards-based**: Based on (and fully compatible with) the open standards for APIs: <a href="https://github.com/OAI/OpenAPI-Specification" class="external-link" target="_blank">OpenAPI</a> (previously known as Swagger) and <a href="https://json-schema.org/" class="external-link" target="_blank">JSON Schema</a>.

<small>* estimation based on tests on an internal development team, building production applications.</small>

## Sponsors

<!-- sponsors -->

<a href="https://cryptapi.io/" target="_blank" title="CryptAPI: Your easy to use, secure and privacy oriented payment gateway."><img src="https://fastapi.tiangolo.com/img/sponsors/cryptapi.svg"></a>
<a href="https://platform.sh/try-it-now/?utm_source=fastapi-signup&utm_medium=banner&utm_campaign=FastAPI-signup-June-2023" target="_blank" title="Build, run and scale your apps on a modern, reliable, and secure PaaS."><img src="https://fastapi.tiangolo.com/img/sponsors/platform-sh.png"></a>
<a href="https://www.porter.run" target="_blank" title="Deploy FastAPI on AWS with a few clicks"><img src="https://fastapi.tiangolo.com/img/sponsors/porter.png"></a>
<a href="https://bump.sh/fastapi?utm_source=fastapi&utm_medium=referral&utm_campaign=sponsor" target="_blank" title="Automate FastAPI documentation generation with Bump.sh"><img src="https://fastapi.tiangolo.com/img/sponsors/bump-sh.svg"></a>
<a href="https://reflex.dev" target="_blank" title="Reflex"><img src="https://fastapi.tiangolo.com/img/sponsors/reflex.png"></a>
<a href="https://github.com/scalar/scalar/?utm_source=fastapi&utm_medium=website&utm_campaign=main-badge" target="_blank" title="Scalar: Beautiful Open-Source API References from Swagger/OpenAPI files"><img src="https://fastapi.tiangolo.com/img/sponsors/scalar.svg"></a>
<a href="https://www.propelauth.com/?utm_source=fastapi&utm_campaign=1223&utm_medium=mainbadge" target="_blank" title="Auth, user management and more for your B2B product"><img src="https://fastapi.tiangolo.com/img/sponsors/propelauth.png"></a>
<a href="https://www.withcoherence.com/?utm_medium=advertising&utm_source=fastapi&utm_campaign=banner%20january%2024" target="_blank" title="Coherence"><img src="https://fastapi.tiangolo.com/img/sponsors/coherence.png"></a>
<a href="https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/?utm_campaign=fastapi_framework&utm_source=fastapi_sponsorship&utm_medium=web_referral" target="_blank" title="Simplify Full Stack Development with FastAPI & MongoDB"><img src="https://fastapi.tiangolo.com/img/sponsors/mongodb.png"></a>
<a href="https://konghq.com/products/kong-konnect/register?utm_medium=referral&utm_source=github&utm_campaign=platform&utm_content=fast-api" target="_blank" title="Kong Konnect - API management platform"><img src="https://fastapi.tiangolo.com/img/sponsors/kong.png"></a>
<a href="https://training.talkpython.fm/fastapi-courses" target="_blank" title="FastAPI video courses on demand from people you trust"><img src="https://fastapi.tiangolo.com/img/sponsors/talkpython-v2.jpg"></a>
<a href="https://github.com/deepset-ai/haystack/" target="_blank" title="Build powerful search from composable, open source building blocks"><img src="https://fastapi.tiangolo.com/img/sponsors/haystack-fastapi.svg"></a>
<a href="https://databento.com/" target="_blank" title="Pay as you go for market data"><img src="https://fastapi.tiangolo.com/img/sponsors/databento.svg"></a>
<a href="https://speakeasyapi.dev?utm_source=fastapi+repo&utm_medium=github+sponsorship" target="_blank" title="SDKs for your API | Speakeasy"><img src="https://fastapi.tiangolo.com/img/sponsors/speakeasy.png"></a>
<a href="https://www.svix.com/" target="_blank" title="Svix - Webhooks as a service"><img src="https://fastapi.tiangolo.com/img/sponsors/svix.svg"></a>
<a href="https://www.codacy.com/?utm_source=github&utm_medium=sponsors&utm_id=pioneers" target="_blank" title="Take code reviews from hours to minutes"><img src="https://fastapi.tiangolo.com/img/sponsors/codacy.png"></a>

<!-- /sponsors -->

<a href="https://fastapi.tiangolo.com/fastapi-people/#sponsors" class="external-link" target="_blank">Other sponsors</a>

## Opinions

"_[...] I'm using **FastAPI** a ton these days. [...] I'm actually planning to use it for all of my team's **ML services at Microsoft**. Some of them are getting integrated into the core **Windows** product and some **Office** products._"

<div style="text-align: right; margin-right: 10%;">Kabir Khan - <strong>Microsoft</strong> <a href="https://github.com/tiangolo/fastapi/pull/26" target="_blank"><small>(ref)</small></a></div>

---

"_We adopted the **FastAPI** library to spawn a **REST** server that can be queried to obtain **predictions**. [for Ludwig]_"

<div style="text-align: right; margin-right: 10%;">Piero Molino, Yaroslav Dudin, and Sai Sumanth Miryala - <strong>Uber</strong> <a href="https://eng.uber.com/ludwig-v0-2/" target="_blank"><small>(ref)</small></a></div>

---

"_**Netflix** is pleased to announce the open-source release of our **crisis management** orchestration framework: **Dispatch**! [built with **FastAPI**]_"

<div style="text-align: right; margin-right: 10%;">Kevin Glisson, Marc Vilanova, Forest Monsen - <strong>Netflix</strong> <a href="https://netflixtechblog.com/introducing-dispatch-da4b8a2a8072" target="_blank"><small>(ref)</small></a></div>

---

"_I’m over the moon excited about **FastAPI**. It’s so fun!_"

<div style="text-align: right; margin-right: 10%;">Brian Okken - <strong><a href="https://pythonbytes.fm/episodes/show/123/time-to-right-the-py-wrongs?time_in_sec=855" target="_blank">Python Bytes</a> podcast host</strong> <a href="https://twitter.com/brianokken/status/1112220079972728832" target="_blank"><small>(ref)</small></a></div>

---

"_Honestly, what you've built looks super solid and polished. In many ways, it's what I wanted **Hug** to be - it's really inspiring to see someone build that._"

<div style="text-align: right; margin-right: 10%;">Timothy Crosley - <strong><a href="https://www.hug.rest/" target="_blank">Hug</a> creator</strong> <a href="https://news.ycombinator.com/item?id=19455465" target="_blank"><small>(ref)</small></a></div>

---

"_If you're looking to learn one **modern framework** for building REST APIs, check out **FastAPI** [...] It's fast, easy to use and easy to learn [...]_"

"_We've switched over to **FastAPI** for our **APIs** [...] I think you'll like it [...]_"

<div style="text-align: right; margin-right: 10%;">Ines Montani - Matthew Honnibal - <strong><a href="https://explosion.ai" target="_blank">Explosion AI</a> founders - <a href="https://spacy.io" target="_blank">spaCy</a> creators</strong> <a href="https://twitter.com/_inesmontani/status/1144173225322143744" target="_blank"><small>(ref)</small></a> - <a href="https://twitter.com/honnibal/status/1144031421859655680" target="_blank"><small>(ref)</small></a></div>

---

"_If anyone is looking to build a production Python API, I would highly recommend **FastAPI**. It is **beautifully designed**, **simple to use** and **highly scalable**, it has become a **key component** in our API first development strategy and is driving many automations and services such as our Virtual TAC Engineer._"

<div style="text-align: right; margin-right: 10%;">Deon Pillsbury - <strong>Cisco</strong> <a href="https://www.linkedin.com/posts/deonpillsbury_cisco-cx-python-activity-6963242628536487936-trAp/" target="_blank"><small>(ref)</small></a></div>

---

## **Typer**, the FastAPI of CLIs

<a href="https://typer.tiangolo.com" target="_blank"><img src="https://typer.tiangolo.com/img/logo-margin/logo-margin-vector.svg" style="width: 20%;"></a>

If you are building a <abbr title="Command Line Interface">CLI</abbr> app to be used in the terminal instead of a web API, check out <a href="https://typer.tiangolo.com/" class="external-link" target="_blank">**Typer**</a>.

**Typer** is FastAPI's little sibling. And it's intended to be the **FastAPI of CLIs**. ⌨️ 🚀

## Requirements

FastAPI stands on the shoulders of giants:

* <a href="https://www.starlette.io/" class="external-link" target="_blank">Starlette</a> for the web parts.
* <a href="https://docs.pydantic.dev/" class="external-link" target="_blank">Pydantic</a> for the data parts.

## Installation

<div class="termy">

\`\`\`console
$ pip install fastapi

---> 100%
\`\`\`

</div>

## Example

### Create it

* Create a file \`main.py\` with:

\`\`\`Python
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
\`\`\`

<details markdown="1">
<summary>Or use <code>async def</code>...</summary>

If your code uses \`async\` / \`await\`, use \`async def\`:

\`\`\`Python hl_lines="9  14"
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
\`\`\`

**Note**:

If you don't know, check the _"In a hurry?"_ section about <a href="https://fastapi.tiangolo.com/async/#in-a-hurry" target="_blank">\`async\` and \`await\` in the docs</a>.

</details>

### Run it

Run the server with:

<div class="termy">

\`\`\`console
$ fastapi dev main.py

 ╭────────── FastAPI CLI - Development mode ───────────╮
 │                                                     │
 │  Serving at: http://127.0.0.1:8000                  │
 │                                                     │
 │  API docs: http://127.0.0.1:8000/docs               │
 │                                                     │
 │  Running in development mode, for production use:   │
 │                                                     │
 │  fastapi run                                        │
 │                                                     │
 ╰─────────────────────────────────────────────────────╯

INFO:     Will watch for changes in these directories: ['/home/user/code/awesomeapp']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [2248755] using WatchFiles
INFO:     Started server process [2248757]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
\`\`\`

</div>

<details markdown="1">
<summary>About the command <code>fastapi dev main.py</code>...</summary>

The command \`fastapi dev\` reads your \`main.py\` file, detects the **FastAPI** app in it, and starts a server using <a href="https://www.uvicorn.org" class="external-link" target="_blank">Uvicorn</a>.

By default, \`fastapi dev\` will start with auto-reload enabled for local development.

You can read more about it in the <a href="https://fastapi.tiangolo.com/fastapi-cli/" target="_blank">FastAPI CLI docs</a>.

</details>

### Check it

Open your browser at <a href="http://127.0.0.1:8000/items/5?q=somequery" class="external-link" target="_blank">http://127.0.0.1:8000/items/5?q=somequery</a>.

You will see the JSON response as:

\`\`\`JSON
{"item_id": 5, "q": "somequery"}
\`\`\`

You already created an API that:

* Receives HTTP requests in the _paths_ \`/\` and \`/items/{item_id}\`.
* Both _paths_ take \`GET\` <em>operations</em> (also known as HTTP _methods_).
* The _path_ \`/items/{item_id}\` has a _path parameter_ \`item_id\` that should be an \`int\`.
* The _path_ \`/items/{item_id}\` has an optional \`str\` _query parameter_ \`q\`.

### Interactive API docs

Now go to <a href="http://127.0.0.1:8000/docs" class="external-link" target="_blank">http://127.0.0.1:8000/docs</a>.

You will see the automatic interactive API documentation (provided by <a href="https://github.com/swagger-api/swagger-ui" class="external-link" target="_blank">Swagger UI</a>):

![Swagger UI](https://fastapi.tiangolo.com/img/index/index-01-swagger-ui-simple.png)

### Alternative API docs

And now, go to <a href="http://127.0.0.1:8000/redoc" class="external-link" target="_blank">http://127.0.0.1:8000/redoc</a>.

You will see the alternative automatic documentation (provided by <a href="https://github.com/Rebilly/ReDoc" class="external-link" target="_blank">ReDoc</a>):

![ReDoc](https://fastapi.tiangolo.com/img/index/index-02-redoc-simple.png)

## Example upgrade

Now modify the file \`main.py\` to receive a body from a \`PUT\` request.

Declare the body using standard Python types, thanks to Pydantic.

\`\`\`Python hl_lines="4  9-12  25-27"
from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}
\`\`\`

The \`fastapi dev\` server should reload automatically.

### Interactive API docs upgrade

Now go to <a href="http://127.0.0.1:8000/docs" class="external-link" target="_blank">http://127.0.0.1:8000/docs</a>.

* The interactive API documentation will be automatically updated, including the new body:

![Swagger UI](https://fastapi.tiangolo.com/img/index/index-03-swagger-02.png)

* Click on the button "Try it out", it allows you to fill the parameters and directly interact with the API:

![Swagger UI interaction](https://fastapi.tiangolo.com/img/index/index-04-swagger-03.png)

* Then click on the "Execute" button, the user interface will communicate with your API, send the parameters, get the results and show them on the screen:

![Swagger UI interaction](https://fastapi.tiangolo.com/img/index/index-05-swagger-04.png)

### Alternative API docs upgrade

And now, go to <a href="http://127.0.0.1:8000/redoc" class="external-link" target="_blank">http://127.0.0.1:8000/redoc</a>.

* The alternative documentation will also reflect the new query parameter and body:

![ReDoc](https://fastapi.tiangolo.com/img/index/index-06-redoc-02.png)

### Recap

In summary, you declare **once** the types of parameters, body, etc. as function parameters.

You do that with standard modern Python types.

You don't have to learn a new syntax, the methods or classes of a specific library, etc.

Just standard **Python**.

For example, for an \`int\`:

\`\`\`Python
item_id: int
\`\`\`

or for a more complex \`Item\` model:

\`\`\`Python
item: Item
\`\`\`

...and with that single declaration you get:

* Editor support, including:
    * Completion.
    * Type checks.
* Validation of data:
    * Automatic and clear errors when the data is invalid.
    * Validation even for deeply nested JSON objects.
* <abbr title="also known as: serialization, parsing, marshalling">Conversion</abbr> of input data: coming from the network to Python data and types. Reading from:
    * JSON.
    * Path parameters.
    * Query parameters.
    * Cookies.
    * Headers.
    * Forms.
    * Files.
* <abbr title="also known as: serialization, parsing, marshalling">Conversion</abbr> of output data: converting from Python data and types to network data (as JSON):
    * Convert Python types (\`str\`, \`int\`, \`float\`, \`bool\`, \`list\`, etc).
    * \`datetime\` objects.
    * \`UUID\` objects.
    * Database models.
    * ...and many more.
* Automatic interactive API documentation, including 2 alternative user interfaces:
    * Swagger UI.
    * ReDoc.

---

Coming back to the previous code example, **FastAPI** will:

* Validate that there is an \`item_id\` in the path for \`GET\` and \`PUT\` requests.
* Validate that the \`item_id\` is of type \`int\` for \`GET\` and \`PUT\` requests.
    * If it is not, the client will see a useful, clear error.
* Check if there is an optional query parameter named \`q\` (as in \`http://127.0.0.1:8000/items/foo?q=somequery\`) for \`GET\` requests.
    * As the \`q\` parameter is declared with \`= None\`, it is optional.
    * Without the \`None\` it would be required (as is the body in the case with \`PUT\`).
* For \`PUT\` requests to \`/items/{item_id}\`, Read the body as JSON:
    * Check that it has a required attribute \`name\` that should be a \`str\`.
    * Check that it has a required attribute \`price\` that has to be a \`float\`.
    * Check that it has an optional attribute \`is_offer\`, that should be a \`bool\`, if present.
    * All this would also work for deeply nested JSON objects.
* Convert from and to JSON automatically.
* Document everything with OpenAPI, that can be used by:
    * Interactive documentation systems.
    * Automatic client code generation systems, for many languages.
* Provide 2 interactive documentation web interfaces directly.

---

We just scratched the surface, but you already get the idea of how it all works.

Try changing the line with:

\`\`\`Python
    return {"item_name": item.name, "item_id": item_id}
\`\`\`

...from:

\`\`\`Python
        ... "item_name": item.name ...
\`\`\`

...to:

\`\`\`Python
        ... "item_price": item.price ...
\`\`\`

...and see how your editor will auto-complete the attributes and know their types:

![editor support](https://fastapi.tiangolo.com/img/vscode-completion.png)

For a more complete example including more features, see the <a href="https://fastapi.tiangolo.com/tutorial/">Tutorial - User Guide</a>.

**Spoiler alert**: the tutorial - user guide includes:

* Declaration of **parameters** from other different places as: **headers**, **cookies**, **form fields** and **files**.
* How to set **validation constraints** as \`maximum_length\` or \`regex\`.
* A very powerful and easy to use **<abbr title="also known as components, resources, providers, services, injectables">Dependency Injection</abbr>** system.
* Security and authentication, including support for **OAuth2** with **JWT tokens** and **HTTP Basic** auth.
* More advanced (but equally easy) techniques for declaring **deeply nested JSON models** (thanks to Pydantic).
* **GraphQL** integration with <a href="https://strawberry.rocks" class="external-link" target="_blank">Strawberry</a> and other libraries.
* Many extra features (thanks to Starlette) as:
    * **WebSockets**
    * extremely easy tests based on HTTPX and \`pytest\`
    * **CORS**
    * **Cookie Sessions**
    * ...and more.

## Performance

Independent TechEmpower benchmarks show **FastAPI** applications running under Uvicorn as <a href="https://www.techempower.com/benchmarks/#section=test&runid=7464e520-0dc2-473d-bd34-dbdfd7e85911&hw=ph&test=query&l=zijzen-7" class="external-link" target="_blank">one of the fastest Python frameworks available</a>, only below Starlette and Uvicorn themselves (used internally by FastAPI). (*)

To understand more about it, see the section <a href="https://fastapi.tiangolo.com/benchmarks/" class="internal-link" target="_blank">Benchmarks</a>.

## Dependencies

Used by Pydantic:

* <a href="https://github.com/JoshData/python-email-validator" target="_blank"><code>email_validator</code></a> - for email validation.
* <a href="https://docs.pydantic.dev/latest/usage/pydantic_settings/" target="_blank"><code>pydantic-settings</code></a> - for settings management.
* <a href="https://docs.pydantic.dev/latest/usage/types/extra_types/extra_types/" target="_blank"><code>pydantic-extra-types</code></a> - for extra types to be used with Pydantic.

Used by Starlette:

* <a href="https://www.python-httpx.org" target="_blank"><code>httpx</code></a> - Required if you want to use the \`TestClient\`.
* <a href="https://jinja.palletsprojects.com" target="_blank"><code>jinja2</code></a> - Required if you want to use the default template configuration.
* <a href="https://github.com/Kludex/python-multipart" target="_blank"><code>python-multipart</code></a> - Required if you want to support form <abbr title="converting the string that comes from an HTTP request into Python data">"parsing"</abbr>, with \`request.form()\`.

Used by FastAPI / Starlette:

* <a href="https://www.uvicorn.org" target="_blank"><code>uvicorn</code></a> - for the server that loads and serves your application.
* <a href="https://github.com/ijl/orjson" target="_blank"><code>orjson</code></a> - Required if you want to use \`ORJSONResponse\`.
* <a href="https://github.com/esnme/ultrajson" target="_blank"><code>ujson</code></a> - Required if you want to use \`UJSONResponse\`.
* \`fastapi-cli\` - to provide the \`fastapi\` command.

When you install \`fastapi\` it comes these standard dependencies.

## \`fastapi-slim\`

If you don't want the extra standard optional dependencies, install \`fastapi-slim\` instead.

When you install with:

\`\`\`bash
pip install fastapi
\`\`\`

...it includes the same code and dependencies as:

\`\`\`bash
pip install "fastapi-slim[standard]"
\`\`\`

The standard extra dependencies are the ones mentioned above.

## License

This project is licensed under the terms of the MIT license.`,P=`# \\PoolsApi

All URIs are relative to *https://localhost/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddOsdsToPool**](PoolsApi.md#AddOsdsToPool) | **Put** /pools/{pool_id}/osds |
[**CreatePool**](PoolsApi.md#CreatePool) | **Post** /pools/ |
[**DeletePool**](PoolsApi.md#DeletePool) | **Delete** /pools/{pool_id} |
[**DisableDeviceTypeCheck**](PoolsApi.md#DisableDeviceTypeCheck) | **Post** /pools/{pool_id}:disable-device-type-check |
[**EnableDeviceTypeCheck**](PoolsApi.md#EnableDeviceTypeCheck) | **Post** /pools/{pool_id}:enable-device-type-check |
[**GetPool**](PoolsApi.md#GetPool) | **Get** /pools/{pool_id} |
[**GetPoolPredictions**](PoolsApi.md#GetPoolPredictions) | **Get** /pools/{pool_id}/predictions |
[**GetPoolSamples**](PoolsApi.md#GetPoolSamples) | **Get** /pools/{pool_id}/samples |
[**GetPoolTopology**](PoolsApi.md#GetPoolTopology) | **Get** /pools/{pool_id}/topology |
[**ListPools**](PoolsApi.md#ListPools) | **Get** /pools/ |
[**RemoveOsdsFromPool**](PoolsApi.md#RemoveOsdsFromPool) | **Delete** /pools/{pool_id}/osds |
[**ReweightPool**](PoolsApi.md#ReweightPool) | **Post** /pools/{pool_id}:reweight |
[**SwitchPoolRole**](PoolsApi.md#SwitchPoolRole) | **Post** /pools/{pool_id}:switch-role |
[**UpdatePool**](PoolsApi.md#UpdatePool) | **Patch** /pools/{pool_id} |


# **AddOsdsToPool**
> PoolResp AddOsdsToPool(ctx, poolId, body)


Add osds to pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**OsdsAddReq**](OsdsAddReq.md)| osd infos |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **CreatePool**
> PoolResp CreatePool(ctx, body)


Create pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **body** | [**PoolCreateReq**](PoolCreateReq.md)| the pool info |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **DeletePool**
> PoolResp DeletePool(ctx, poolId, optional)


Delete pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **poolId** | **int64**| pool id |
 **force** | **bool**| force delete or not |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **DisableDeviceTypeCheck**
> PoolResp DisableDeviceTypeCheck(ctx, poolId)


Disable device type check when add osd

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **EnableDeviceTypeCheck**
> PoolResp EnableDeviceTypeCheck(ctx, poolId)


Enable device type check when add osd

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPool**
> PoolResp GetPool(ctx, poolId)


get pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolPredictions**
> PoolPredictionsResp GetPoolPredictions(ctx, poolId)


get a pool's prediction

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolPredictionsResp**](PoolPredictionsResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolSamples**
> PoolSamplesResp GetPoolSamples(ctx, poolId, optional)


get pool's samples

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **poolId** | **int64**| pool id |
 **durationBegin** | **string**| duration begin timestamp |
 **durationEnd** | **string**| duration end timestamp |
 **period** | **string**| samples period |

### Return type

[**PoolSamplesResp**](PoolSamplesResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolTopology**
> PoolTopologyResp GetPoolTopology(ctx, poolId)


get pool topology

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolTopologyResp**](PoolTopologyResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ListPools**
> PoolsResp ListPools(ctx, optional)


List pools

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int64**| paging param |
 **offset** | **int64**| paging param |
 **all** | **bool**| show all pools |
 **protectionDomainId** | **int64**| protection domain id |
 **compoundOsdOnly** | **bool**| filter pool with only compound osds |
 **osdGroupId** | **int64**| osd group id |
 **poolType** | **string**| filter pool by type |
 **poolRole** | **string**| filter pool by role |
 **poolMode** | **string**| filter pool by pool_mode |
 **stretched** | **bool**| filter stretched pool |
 **withCompound** | **bool**| with compound pool |
 **osPolicyId** | **int64**| filter data pool by object storage policy id |
 **storageClassId** | **int64**| filter data pool by os storage class id |
 **storageClassPoolType** | **string**| storage class pool type(active inactive) to query |
 **q** | **string**| query param of search |
 **sort** | **string**| sort param of search |

### Return type

[**PoolsResp**](PoolsResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **RemoveOsdsFromPool**
> PoolResp RemoveOsdsFromPool(ctx, poolId, body)


Remove multiple osds from a pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**OsdsRemoveReq**](OsdsRemoveReq.md)| osd infos |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ReweightPool**
> PoolResp ReweightPool(ctx, poolId)


Reweight a pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **SwitchPoolRole**
> PoolResp SwitchPoolRole(ctx, poolId)


Switch pool role to compound

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **UpdatePool**
> PoolResp UpdatePool(ctx, poolId, body)


update pool info

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**PoolUpdateReq**](PoolUpdateReq.md)| pool info |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
`,E=`<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

# Supabase

[Supabase](https://supabase.com) is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools.

- [x] Hosted Postgres Database. [Docs](https://supabase.com/docs/guides/database)
- [x] Authentication and Authorization. [Docs](https://supabase.com/docs/guides/auth)
- [x] Auto-generated APIs.
  - [x] REST. [Docs](https://supabase.com/docs/guides/api)
  - [x] GraphQL. [Docs](https://supabase.com/docs/guides/graphql)
  - [x] Realtime subscriptions. [Docs](https://supabase.com/docs/guides/realtime)
- [x] Functions.
  - [x] Database Functions. [Docs](https://supabase.com/docs/guides/database/functions)
  - [x] Edge Functions [Docs](https://supabase.com/docs/guides/functions)
- [x] File Storage. [Docs](https://supabase.com/docs/guides/storage)
- [x] AI + Vector/Embeddings Toolkit. [Docs](https://supabase.com/docs/guides/ai)
- [x] Dashboard

![Supabase Dashboard](https://raw.githubusercontent.com/supabase/supabase/master/apps/www/public/images/github/supabase-dashboard.png)

Watch "releases" of this repo to get notified of major updates.

<kbd><img src="https://raw.githubusercontent.com/supabase/supabase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="Watch this repo"/></kbd>

## Documentation

For full documentation, visit [supabase.com/docs](https://supabase.com/docs)

To see how to Contribute, visit [Getting Started](./DEVELOPERS.md)

## Community & Support

- [Community Forum](https://github.com/supabase/supabase/discussions). Best for: help with building, discussion about database best practices.
- [GitHub Issues](https://github.com/supabase/supabase/issues). Best for: bugs and errors you encounter using Supabase.
- [Email Support](https://supabase.com/docs/support#business-support). Best for: problems with your database or infrastructure.
- [Discord](https://discord.supabase.com). Best for: sharing your applications and hanging out with the community.

## How it works

Supabase is a combination of open source tools. We’re building the features of Firebase using enterprise-grade, open source products. If the tools and communities exist, with an MIT, Apache 2, or equivalent open license, we will use and support that tool. If the tool doesn't exist, we build and open source it ourselves. Supabase is not a 1-to-1 mapping of Firebase. Our aim is to give developers a Firebase-like developer experience using open source tools.

**Architecture**

Supabase is a [hosted platform](https://supabase.com/dashboard). You can sign up and start using Supabase without installing anything.
You can also [self-host](https://supabase.com/docs/guides/hosting/overview) and [develop locally](https://supabase.com/docs/guides/local-development).

![Architecture](apps/docs/public/img/supabase-architecture.svg)

- [Postgres](https://www.postgresql.org/) is an object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- [Realtime](https://github.com/supabase/realtime) is an Elixir server that allows you to listen to PostgreSQL inserts, updates, and deletes using websockets. Realtime polls Postgres' built-in replication functionality for database changes, converts changes to JSON, then broadcasts the JSON over websockets to authorized clients.
- [PostgREST](http://postgrest.org/) is a web server that turns your PostgreSQL database directly into a RESTful API
- [GoTrue](https://github.com/supabase/gotrue) is a JWT based API for managing users and issuing JWT tokens.
- [Storage](https://github.com/supabase/storage-api) provides a RESTful interface for managing Files stored in S3, using Postgres to manage permissions.
- [pg_graphql](http://github.com/supabase/pg_graphql/) a PostgreSQL extension that exposes a GraphQL API
- [postgres-meta](https://github.com/supabase/postgres-meta) is a RESTful API for managing your Postgres, allowing you to fetch tables, add roles, and run queries, etc.
- [Kong](https://github.com/Kong/kong) is a cloud-native API gateway.

#### Client libraries

Our approach for client libraries is modular. Each sub-library is a standalone implementation for a single external system. This is one of the ways we support existing tools.

<table style="table-layout:fixed; white-space: nowrap;">
  <tr>
    <th>Language</th>
    <th>Client</th>
    <th colspan="5">Feature-Clients (bundled in Supabase client)</th>
  </tr>
  <!-- notranslate -->
  <tr>
    <th></th>
    <th>Supabase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/supabase/gotrue" target="_blank" rel="noopener noreferrer">GoTrue</a></th>
    <th><a href="https://github.com/supabase/realtime" target="_blank" rel="noopener noreferrer">Realtime</a></th>
    <th><a href="https://github.com/supabase/storage-api" target="_blank" rel="noopener noreferrer">Storage</a></th>
    <th>Functions</th>
  </tr>
  <!-- TEMPLATE FOR NEW ROW -->
  <!-- START ROW
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/supabase-community/supabase-lang" target="_blank" rel="noopener noreferrer">supabase-lang</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/supabase-community/realtime-lang" target="_blank" rel="noopener noreferrer">realtime-lang</a></td>
    <td><a href="https://github.com/supabase-community/storage-lang" target="_blank" rel="noopener noreferrer">storage-lang</a></td>
  </tr>
  END ROW -->
  <!-- /notranslate -->
  <th colspan="7">⚡️ Official ⚡️</th>
  <!-- notranslate -->
  <tr>
    <td>JavaScript (TypeScript)</td>
    <td><a href="https://github.com/supabase/supabase-js" target="_blank" rel="noopener noreferrer">supabase-js</a></td>
    <td><a href="https://github.com/supabase/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/supabase/gotrue-js" target="_blank" rel="noopener noreferrer">gotrue-js</a></td>
    <td><a href="https://github.com/supabase/realtime-js" target="_blank" rel="noopener noreferrer">realtime-js</a></td>
    <td><a href="https://github.com/supabase/storage-js" target="_blank" rel="noopener noreferrer">storage-js</a></td>
    <td><a href="https://github.com/supabase/functions-js" target="_blank" rel="noopener noreferrer">functions-js</a></td>
  </tr>
    <tr>
    <td>Flutter</td>
    <td><a href="https://github.com/supabase/supabase-flutter" target="_blank" rel="noopener noreferrer">supabase-flutter</a></td>
    <td><a href="https://github.com/supabase/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-dart</a></td>
    <td><a href="https://github.com/supabase/gotrue-dart" target="_blank" rel="noopener noreferrer">gotrue-dart</a></td>
    <td><a href="https://github.com/supabase/realtime-dart" target="_blank" rel="noopener noreferrer">realtime-dart</a></td>
    <td><a href="https://github.com/supabase/storage-dart" target="_blank" rel="noopener noreferrer">storage-dart</a></td>
    <td><a href="https://github.com/supabase/functions-dart" target="_blank" rel="noopener noreferrer">functions-dart</a></td>
  </tr>
  <tr>
    <td>Swift</td>
    <td><a href="https://github.com/supabase/supabase-swift" target="_blank" rel="noopener noreferrer">supabase-swift</a></td>
    <td><a href="https://github.com/supabase/supabase-swift/tree/main/Sources/PostgREST" target="_blank" rel="noopener noreferrer">postgrest-swift</a></td>
    <td><a href="https://github.com/supabase/supabase-swift/tree/main/Sources/Auth" target="_blank" rel="noopener noreferrer">auth-swift</a></td>
    <td><a href="https://github.com/supabase/supabase-swift/tree/main/Sources/Realtime" target="_blank" rel="noopener noreferrer">realtime-swift</a></td>
    <td><a href="https://github.com/supabase/supabase-swift/tree/main/Sources/Storage" target="_blank" rel="noopener noreferrer">storage-swift</a></td>
    <td><a href="https://github.com/supabase/supabase-swift/tree/main/Sources/Functions" target="_blank" rel="noopener noreferrer">functions-swift</a></td>
  </tr>
  <!-- /notranslate -->
  <th colspan="7">💚 Community 💚</th>
  <!-- notranslate -->
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/supabase-community/supabase-csharp" target="_blank" rel="noopener noreferrer">supabase-csharp</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">gotrue-csharp</a></td>
    <td><a href="https://github.com/supabase-community/realtime-csharp" target="_blank" rel="noopener noreferrer">realtime-csharp</a></td>
    <td><a href="https://github.com/supabase-community/storage-csharp" target="_blank" rel="noopener noreferrer">storage-csharp</a></td>
    <td><a href="https://github.com/supabase-community/functions-csharp" target="_blank" rel="noopener noreferrer">functions-csharp</a></td>
  </tr>
  <tr>
    <td>Go</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-go" target="_blank" rel="noopener noreferrer">gotrue-go</a></td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/storage-go" target="_blank" rel="noopener noreferrer">storage-go</a></td>
    <td><a href="https://github.com/supabase-community/functions-go" target="_blank" rel="noopener noreferrer">functions-go</a></td>
  </tr>
  <tr>
    <td>Java</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/gotrue-java" target="_blank" rel="noopener noreferrer">gotrue-java</a></td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/storage-java" target="_blank" rel="noopener noreferrer">storage-java</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>Kotlin</td>
    <td><a href="https://github.com/supabase-community/supabase-kt" target="_blank" rel="noopener noreferrer">supabase-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
    <td><a href="https://github.com/supabase-community/supabase-kt/tree/master/Functions" target="_blank" rel="noopener noreferrer">functions-kt</a></td>
  </tr>
  <tr>
    <td>Python</td>
    <td><a href="https://github.com/supabase-community/supabase-py" target="_blank" rel="noopener noreferrer">supabase-py</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-py" target="_blank" rel="noopener noreferrer">gotrue-py</a></td>
    <td><a href="https://github.com/supabase-community/realtime-py" target="_blank" rel="noopener noreferrer">realtime-py</a></td>
    <td><a href="https://github.com/supabase-community/storage-py" target="_blank" rel="noopener noreferrer">storage-py</a></td>
    <td><a href="https://github.com/supabase-community/functions-py" target="_blank" rel="noopener noreferrer">functions-py</a></td>
  </tr>
  <tr>
    <td>Ruby</td>
    <td><a href="https://github.com/supabase-community/supabase-rb" target="_blank" rel="noopener noreferrer">supabase-rb</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Rust</td>
    <td>-</td>
    <td><a href="https://github.com/supabase-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>Godot Engine (GDScript)</td>
    <td><a href="https://github.com/supabase-community/godot-engine.supabase" target="_blank" rel="noopener noreferrer">supabase-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/postgrest-gdscript" target="_blank" rel="noopener noreferrer">postgrest-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/gotrue-gdscript" target="_blank" rel="noopener noreferrer">gotrue-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/realtime-gdscript" target="_blank" rel="noopener noreferrer">realtime-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/storage-gdscript" target="_blank" rel="noopener noreferrer">storage-gdscript</a></td>
    <td><a href="https://github.com/supabase-community/functions-gdscript" target="_blank" rel="noopener noreferrer">functions-gdscript</a></td>
  </tr>
  <!-- /notranslate -->
</table>

<!--- Remove this list if you're translating to another language, it's hard to keep updated across multiple files-->
<!--- Keep only the link to the list of translation files-->

## Badges

![Made with Supabase](./apps/www/public/badge-made-with-supabase.svg)

\`\`\`md
[![Made with Supabase](https://supabase.com/badge-made-with-supabase.svg)](https://supabase.com)
\`\`\`

\`\`\`html
<a href="https://supabase.com">
  <img
    width="168"
    height="30"
    src="https://supabase.com/badge-made-with-supabase.svg"
    alt="Made with Supabase"
  />
</a>
\`\`\`

![Made with Supabase (dark)](./apps/www/public/badge-made-with-supabase-dark.svg)

\`\`\`md
[![Made with Supabase](https://supabase.com/badge-made-with-supabase-dark.svg)](https://supabase.com)
\`\`\`

\`\`\`html
<a href="https://supabase.com">
  <img
    width="168"
    height="30"
    src="https://supabase.com/badge-made-with-supabase-dark.svg"
    alt="Made with Supabase"
  />
</a>
\`\`\`

## Translations

- [Arabic | العربية](/i18n/README.ar.md)
- [Albanian / Shqip](/i18n/README.sq.md)
- [Bangla / বাংলা](/i18n/README.bn.md)
- [Bulgarian / Български](/i18n/README.bg.md)
- [Catalan / Català](/i18n/README.ca.md)
- [Czech / čeština](/i18n/README.cs.md)
- [Danish / Dansk](/i18n/README.da.md)
- [Dutch / Nederlands](/i18n/README.nl.md)
- [English](https://github.com/supabase/supabase)
- [Estonian / eesti keel](/i18n/README.et.md)
- [Finnish / Suomalainen](/i18n/README.fi.md)
- [French / Français](/i18n/README.fr.md)
- [German / Deutsch](/i18n/README.de.md)
- [Greek / Ελληνικά](/i18n/README.el.md)
- [Gujarati / ગુજરાતી](/i18n/README.gu.md)
- [Hebrew / עברית](/i18n/README.he.md)
- [Hindi / हिंदी](/i18n/README.hi.md)
- [Hungarian / Magyar](/i18n/README.hu.md)
- [Nepali / नेपाली](/i18n/README.ne.md)
- [Indonesian / Bahasa Indonesia](/i18n/README.id.md)
- [Italiano / Italian](/i18n/README.it.md)
- [Japanese / 日本語](/i18n/README.jp.md)
- [Korean / 한국어](/i18n/README.ko.md)
- [Lithuanian / lietuvių](/i18n/README.lt.md)
- [Latvian / latviski](/i18n/README.lv.md)
- [Malay / Bahasa Malaysia](/i18n/README.ms.md)
- [Norwegian (Bokmål) / Norsk (Bokmål)](/i18n/README.nb.md)
- [Persian / فارسی](/i18n/README.fa.md)
- [Polish / Polski](/i18n/README.pl.md)
- [Portuguese / Português](/i18n/README.pt.md)
- [Portuguese (Brazilian) / Português Brasileiro](/i18n/README.pt-br.md)
- [Romanian / Română](/i18n/README.ro.md)
- [Russian / Pусский](/i18n/README.ru.md)
- [Serbian / Srpski](/i18n/README.sr.md)
- [Sinhala / සිංහල](/i18n/README.si.md)
- [Slovak / slovenský](/i18n/README.sk.md)
- [Slovenian / Slovenščina](/i18n/README.sl.md)
- [Spanish / Español](/i18n/README.es.md)
- [Simplified Chinese / 简体中文](/i18n/README.zh-cn.md)
- [Swedish / Svenska](/i18n/README.sv.md)
- [Thai / ไทย](/i18n/README.th.md)
- [Traditional Chinese / 繁體中文](/i18n/README.zh-tw.md)
- [Turkish / Türkçe](/i18n/README.tr.md)
- [Ukrainian / Українська](/i18n/README.uk.md)
- [Vietnamese / Tiếng Việt](/i18n/README.vi-vn.md)
- [List of translations](/i18n/languages.md) <!--- Keep only this -->`;function M(o,...a){const r=Object.assign({},o);return Object.keys(r).forEach(s=>{a.includes(s)&&delete r[s]}),r}const n=o=>o,C=[n({name:"AI & LLM",slug:"ai-llm"}),n({name:"Programming Languages",slug:"pro-lang"}),n({name:"Frameworks",slug:"framework"}),n({name:"Libraries",slug:"library"}),n({name:"Languages",slug:"lang"}),n({name:"Databases",slug:"db"}),n({name:"ORMs",slug:"orm"}),n({name:"DevOps",slug:"devops"}),n({name:"Testing",slug:"test"}),n({name:"Dev Tools",slug:"devtools"}),n({name:"Markup & Style",slug:"markup-style"}),n({name:"Design",slug:"design"}),n({name:"Soft Skills",slug:"soft"}),n({name:"Manage",slug:"management"})],t=o=>{const a=M(o,"category");return o.category&&(a.category=C.find(r=>r.slug===o.category)),a},p=[t({slug:"ai-llm-tools",color:"#8b5cf6",description:"Software development with AI and large language models (LLM): Model Context Protocol (MCP), GPT/OpenAI API, Cursor, Claude, prompt engineering and AI-assistant integration. Context management with MCP servers, agentic workflow and productivity in daily development.",logo:e.AI,name:"AI & LLM Tools",category:"ai-llm"}),t({slug:"utility",color:"#8950FC",description:"utility project means the acquisition, construction, installation, retrofitting, rebuilding, or other addition to or improvement of any equipment, device, ...",logo:e.Utility,name:"Utility",category:"management"}),t({slug:"js",color:"#efd81b",description:"JavaScript is a versatile, high-level programming language primarily used for creating interactive and dynamic web content. It allows developers to implement complex features on web pages, such as updating content, controlling multimedia, and animating images. JavaScript is essential for front-end development, enabling the creation of responsive and engaging user interfaces.",logo:e.JavaScript,name:"Javascript",category:"pro-lang"}),t({slug:"ts",color:"#3178c6",description:T,logo:e.TypeScript,name:"Typescript",category:"pro-lang"}),t({slug:"mjml",color:"#f93748",description:S,logo:e.MJML,name:"Mjml",category:"markup-style"}),t({slug:"reactjs",color:"cyan",description:l,logo:e.ReactJs,name:"React Js",category:"framework"}),t({slug:"nextjs",color:"#000000",description:g,logo:e.NextJs,name:"NextJs",category:"framework"}),t({slug:"gatsby",color:"#663399",description:m,logo:e.Gatsby,name:"Gatsby",category:"framework"}),t({slug:"vuejs",color:"#41b883",description:b,logo:e.VueJs,name:"Vue.js",category:"framework"}),t({slug:"nuxtjs",color:"#00c58e",description:f,logo:e.Nuxt,name:"Nuxt.js",category:"framework"}),t({slug:"vitejs",color:"#a26cdd",description:y,logo:e.Vite,name:"ViteJs",category:"library"}),t({slug:"react-native",color:"#21232a",description:l,logo:e.ReactNative,name:"ReactNative",category:"framework"}),t({slug:"millionjs",color:"#a26cdd",description:R,logo:e.MillionJs,name:"Million.js",category:"library"}),t({slug:"biome",color:"#60a5fa",description:"Format code like Prettier, save time. Biome is a fast formatter for JavaScript, TypeScript, JSX, and JSON that scores 97% compatibility with Prettier, saving CI ...",logo:e.Biome,name:"Biome.js",category:"library"}),t({slug:"expressjs",color:"#21232a",description:j,logo:e.ExpressJs,name:"Express.js",category:"framework"}),t({slug:"remotion",color:"#0b84f3",description:w,logo:e.Remotion,name:"Remotion",category:"library"}),t({slug:".Net",color:"#512BD4",description:"Downloads for building and running applications with .NET Framework. Get web installer, offline installer, and language pack downloads for .NET Framework.",logo:e.DotNet,name:".Net",category:"framework"}),t({slug:"Xamarin",color:"#512BD4",description:"Xamarin support has ended. Build cross-platform mobile and desktop apps with .NET.",logo:e.Xamarin,name:"Xamarin",category:"framework"}),t({slug:"node",color:"#52a144",description:"Node.js® is a JavaScript runtime built on Chromes V8 JavaScript engine.",logo:e.NodeJs,name:"NodeJs",category:"library"}),t({slug:"angular",color:"#d70230",description:k,logo:e.Angular,name:"Angular",category:"framework"}),t({slug:"html",color:"#e96328",description:"HTML (HyperText Markup Language) is the standard markup language used to create and structure content on the web. It provides the basic building blocks for web pages, allowing developers to define elements such as headings, paragraphs, links, images, and more. HTML is essential for organizing and presenting information in a web browser.",logo:e.HTML,name:"HTML",category:"markup-style"}),t({slug:"css",color:"#2762e9",description:"CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of HTML documents. It controls the layout, colors, fonts, and overall visual appearance of web pages. CSS enables developers to create visually appealing and responsive designs that enhance the user experience across different devices and screen sizes.",logo:e.CSS,name:"CSS",category:"markup-style"}),t({slug:"sass",color:"#c55d90",description:v,logo:e.Sass,name:"Sass",category:"markup-style"}),t({slug:"frontend-architecture",color:"#000000",description:"Frontend architecture enhances user experience and web application performance. A well-structured and modular frontend architecture enables ...",logo:e.FrontendArchitecture,name:"Frontend Architecture",category:"management"}),t({slug:"teamwork",color:"#000000",description:"The activity of working together in a group with other people, especially when this is successful...",logo:e.TeamWork,name:"Teamwork",category:"management"}),t({slug:"team-leadership",color:"#2563eb",description:"Leading a technical team: setting direction, mentoring, code review, and aligning work with product goals.",logo:e.TeamWork,name:"Team Leadership",category:"management"}),t({slug:"team-management",color:"#1d4ed8",description:"Managing team capacity, priorities, and delivery; facilitating ceremonies and stakeholder communication.",logo:e.TeamWork,name:"Team Management",category:"management"}),t({slug:"spring",color:"#78bc1e",description:"Spring Framework is an open source application development framework developed for Java. The core features of Spring Framework can be used by any Java application. It can be used with its plug-ins to disseminate web applications on the Java EE platform.",logo:e.Spring,name:"Spring",category:"framework"}),t({slug:"reactive-programming",color:"#F80090",description:"Reactive programming is a declarative programming paradigm that is based on the idea of asynchronous event processing and data streams. Today, reactive programming is used in many different areas, such as GUI programming, web programming, microservices, or reactive systems in general.",logo:e.Reactive,name:"Reactive Programming",category:"soft"}),t({slug:"service-worker",color:"#DDDDDD",description:I,logo:e.ServiceWorker,name:"Service Worker",category:"soft"}),t({slug:"github-api",color:"#000000",description:"GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, ...",logo:e.Github,name:"Github API",category:"devtools"}),t({slug:"jenkins",color:"#d24939",description:"Jenkins is an open-source automation server that helps automate parts of the software development process, including building, testing, and deploying code. It supports continuous integration and continuous delivery (CI/CD) pipelines, allowing developers to deliver high-quality software quickly and efficiently.",logo:e.Jenkins,name:"Jenkins",category:"devtools"}),t({slug:"fastapi",color:"#000000",description:x,logo:e.FastApi,name:"FastAPI",category:"framework"}),t({slug:"pools-api",color:"#8950FC",description:P,logo:e.PoolsApi,name:"Pools API",category:"db"}),t({slug:"omdb-api",color:"#8950FC",description:"OMDb API ... The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. If ...",logo:e.OMDbApi,name:"OMDB API",category:"db"}),t({slug:"graphql",color:"#f6009c",description:u,logo:e.Graphql,name:"GraphQL",category:"db"}),t({slug:"supabase",color:"#38996c",description:E,logo:e.Supabase,name:"Supabase",category:"db"}),t({slug:"svelte",color:"#f73c01",description:h,logo:e.Svelte,name:"Svelte",category:"framework"}),t({slug:"pwa",color:"#5a0fc8",description:"A Progressive Web App (PWA) is a type of application software delivered through the web, built using common web technologies including HTML, CSS, and JavaScript. It is intended to work on any platform that uses a standards-compliant browser, offering features such as offline capabilities, push notifications, and more.",logo:e.Pwa,name:"PWA",category:"framework"}),t({slug:"remixjs",color:"#3f72af",description:A,logo:e.RemixJs,name:"Remix",category:"framework"}),t({slug:"monorepo-microfrontend",color:"#444",description:"Monorepo is a development strategy where code for many projects is stored in the same repository. Microfrontend is a design approach in which a front-end app is decomposed into individual, semi-independent “microapps” working loosely together. Both aim to improve the modularity and scalability of applications.",logo:e.MonorepoMicrofrontend,name:"Monorepo & Microfrontend",category:"devtools"}),t({slug:"figma",color:"#444",description:"Figma is the leading collaborative design tool for building meaningful products. Seamlessly design, prototype, develop, and collect feedback in a single ...",logo:e.Figma,name:"Figma",category:"design"}),t({slug:"hasura",color:"#ff5722",description:"Hasura is an open-source engine that connects to your databases & microservices and auto-generates a production-ready GraphQL backend. It provides real-time GraphQL APIs on new or existing Postgres databases.",logo:e.Hasura,name:"Hasura",category:"devtools"})],D="Skills",G=(...o)=>p.filter(a=>o.includes(a.slug)),N=o=>{const a=[],r=[];return p.forEach(s=>{if(o.trim()&&!s.name.toLowerCase().includes(o.trim().toLowerCase()))return;if(!s.category){console.log(s.category),r.push(s);return}let i=a.find(d=>{var c;return d.category.slug===((c=s.category)==null?void 0:c.slug)});i||(i={items:[],category:s.category},a.push(i)),i.items.push(s)}),r.length!==0&&a.push({category:{name:"Others",slug:"others"},items:r}),a};export{N as a,G as g,p as i,D as t};
