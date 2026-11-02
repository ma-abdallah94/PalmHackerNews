# Palm Hacker News

This project checks the [newest stories on Hacker News](https://news.ycombinator.com/newest).

The first 100 stories should be in order, newest first and oldest last. Each story has a number. A bigger number means the story is newer.

The site shows 30 stories on a page. The check clicks **More** until it has the first 100, and ignores any extra stories on the last page.

It does not compare all 100 stories. That would take longer. It only looks at a few pairs:

- the first two stories
- the last story on a page and the first story on the next page
- the last two stories

In each pair, the story that comes first should be newer. If the order is wrong, the result names the two stories that failed.

## Install

```bash
npm install
npx playwright install firefox
```

## Run the test

```bash
npx playwright test
```

## Automatic check

Each time a change is saved on the main branch, GitHub runs this test on its own.
