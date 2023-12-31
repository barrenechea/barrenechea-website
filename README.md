<p align="center">
  <img src='src/assets/og-image.png' alt='Barrenechea Logo' width='200' />
</p>
<h1 align="center">Barrenechea Website Repository</h1>
<p align="center">
  Source code for <a href='https://www.barrenechea.cl/'>barrenechea.cl</a>, where the website's construction takes place.
</p>

## Overview

Welcome to the official repository for the Barrenechea website. This site is crafted with modern web technologies to ensure a fast, responsive, and visually appealing experience for all visitors.

## Key Features

- **Static Site Generation**: Powered by [Astro](https://astro.build/), enhancing performance and SEO.
- **Styling**: Leveraging [Tailwind CSS](https://tailwindcss.com/) for scalable and maintainable design.
- **Typography**: Featuring [Work Sans](https://fonts.google.com/specimen/Work+Sans) for clean and professional text presentation.
- **Internationalization (i18n)**: Offering multi-language support with automated translation powered by Large Language Models (LLMs).
- **SEO Optimization**: Equipped with sitemap, RSS feed, and OpenGraph images to improve search engine visibility.

## Getting Started

To contribute to the development of the website or set up a local version, follow the steps below:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) >=20 installed on your machine.

### Installation

1. Clone the repository and navigate to its directory:

   ```bash
   git clone https://github.com/barrenechea/barrenechea-website.git
   cd barrenechea-website
   ```

2. Install project dependencies:

   ```bash
   pnpm install
   ```

### Development Server

To start the local development server:

```bash
pnpm start
```

Visit `http://localhost:3000` in your browser to view the site.

### Gitpod Development

Alternatively, launch a ready-to-code dev environment with Gitpod:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/barrenechea/barrenechea-website)

## Internationalization (i18n) Content Automation

For detecting and translating content automatically:

```bash
pnpm i18n:generate
```

Before running the command, set the `OPENAI_API_KEY` environment variable with your OpenAI API key for translation services.

For custom AI API endpoints, use the `OPENAI_BASE_URL` environment variable. I'm currently experimenting with the [llama-cpp-python](https://github.com/abetlen/llama-cpp-python?tab=readme-ov-file#openai-compatible-web-server) server as an alternative.
