# DM Copilot

A copilot for DMs. Get out of the handbooks and back to the table.

The principle is: this thing will listen to your game and surface relevant, just-in-time information and hints.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.

## Demo features

- Capture streaming audio using [Deepgram Streaming Speech to Text](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio).
= Display mentoined spells from the [Open5e project](https://open5e.com/).

## Quickstart

### Manual

Follow these steps to get started with this starter application.

#### Clone the repository

Go to GitHub and [clone the repository](https://github.com/sjmog/dnd-copilot).

#### Install dependencies

Install the project dependencies.

```bash
npm install
```

#### Edit the config file

Copy the code from `sample.env.local` and create a new file called `.env.local`.

```bash
DEEPGRAM_API_KEY=YOUR-DG-API-KEY
```

For `DEEPGRAM_API_KEY` paste a key from the [Deepgram console](https://console.deepgram.com/). It currently needs admin privileges.

#### Run the application

Once running, you can [access the application in your browser](http://localhost:3000).

```bash
npm run dev
```

## Author

[Deepgram](https://deepgram.com)
[Sam Morgan](https://github.com/sjmog)