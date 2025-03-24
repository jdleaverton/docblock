# 🖐️ DocBlock

DocBlock detects and manipulates those pesky invisible document trackers that DocSend embeds in your "confidential" documents.

## What It Does

- ✅ Detects invisible separators (U+2063) used to fingerprint document recipients
- 🧹 Removes existing fingerprints with a single click
- 😈 Frame someone else by changing the fingerprint signature
- 🚫 Puts the "block" in DocBlock

## The Technical Bits

Built with React, TypeScript, and Vite. No server needed - all fingerprint detection and manipulation happens client-side.

## Why

Because privacy matters, and so does knowing when you're being tracked.

## Deploy

```
npm install
npm run build
serve -s dist
```

Or just push to GitHub and connect to your favorite static site hosting service.

## Security Note

DocBlock runs entirely in your browser. Your document text never leaves your machine.

## Contributing

PRs welcome. If you find other types of document fingerprinting in the wild, let's add detection for those too.
