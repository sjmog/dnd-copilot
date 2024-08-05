# DM Copilot

A copilot for DMs. Get out of the handbooks and back to the table.

> This thing will listen to your game and surface relevant, just-in-time information and hints.

### Features

- Capture streaming audio using [Deepgram Streaming Speech to Text](https://developers.deepgram.com/docs/getting-started-with-live-streaming-audio).
- Display mentioned spells from the [Open5e project](https://open5e.com/).

## Getting started

Follow these steps to get started with this starter application.

1. [Clone this repository](https://github.com/sjmog/dnd-copilot)
2. Install dependencies with `npm install`.
3. Copy `sample.env.local` to `.env.local` and add a `DEEPGRAM_API_KEY` from the [Deepgram console](https://console.deepgram.com/). (Key requires admin privileges.)
4. Run the application with `npm run dev` and [visit it](http://localhost:3000).

### Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker.

### Authors

- [Deepgram](https://deepgram.com)
- [Sam Morgan](https://github.com/sjmog)