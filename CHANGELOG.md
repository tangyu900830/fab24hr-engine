# Changelog

## 0.3.0

- **Korean:** `"lang": "ko"` is a game language. The engine's interface is translated into Korean (`engine/lang/ko.json`, in the voice of a Korean app); the credit line reads "Powered by fab24hr" (the same in every language) and "☕ fab24hr 후원하기". The page is `<html lang="ko">`, uses Korean system fonts first (a game's own `:root` fonts in `game.css` still win), and wraps lines only at spaces (`word-break: keep-all`), never inside a word.
- **Tappable words in Korean:** a Korean glossary term is matched only when no Hangul syllable is glued to its front, so `단골` is tappable in `단골손님이` but not inside `왕단골`; particles and endings after a term are fine.
- **Korean sample game:** *오픈 준비* (`samples/ko/`), the same café half hour as *Opening Shift*, written in Korean. `npm run ko` switches the project to Korean (and an untouched `game/` to this sample); `npm run en` switches back. `npm run test:samples` now plays all three samples.
- **Korean README** (`README.ko.md`), linked from the English and Chinese ones. `AGENTS.md`: when the person writes in Korean, AI coding tools work in Korean and run `npm run ko` first. `npm run ko` and `npm run dev` print their messages in Korean for Korean projects.

## 0.2.0

- **Engine:** a blocky 3D world (three.js r128) with people who wear name tags, walking and pathfinding, and automatic quality. A day made of moments and beats, with a one-line next step and a *Take me there* button. Dialogue with choices and jargon players can tap for a plain explanation. Phone calls and messages, panels for mini-games, a codex, save and resume. An ending card with a 9:16 share image, a copy button and a share link. Synthesized sound with no audio files. Light and dark mode, phone and desktop.
- **Credit line:** one small line on the home screen and the ending screen with two links, "Powered by fab24hr" and "☕ Support fab24hr" (the second in the game's language). It cannot be turned off: the build stops if a game sets `HOME.credit`, and `npm test` checks that both links are visible on both screens and point to the right places.
- **Build:** plain JavaScript files with no `import`/`export` to write, load-order checks, the engine's interface in English, Traditional Chinese and Simplified Chinese, and a one-line license notice at the top of every game's script.
- **Test:** an automatic playthrough on desktop and on phone.
- **Sample game:** *Opening Shift* (half an hour before a café opens), in English and Traditional Chinese.
- **License:** the fab24hr engine License. It is free for noncommercial use only (voluntary donations are fine), and a game made with the engine that others can play must keep the credit line. For commercial use or other terms, write to mcl@mclty.com.

Not in the engine yet: side quests, interruptions while the player walks around freely, titles, a minimap, more than one playable role, and loading a level only when it is needed.
