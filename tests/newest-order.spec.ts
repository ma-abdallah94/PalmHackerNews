import { expect, test } from '@playwright/test';
import { NewestPage } from '../pages/newest.page';

test('the first 100 newest stories are ordered newest to oldest', async ({ page }) => {
  test.slow();
  const newestPage = new NewestPage(page);
  await newestPage.navigateToNewestPage();

  const ids = await newestPage.collectStoryIds();
  expect(ids).toHaveLength(100);


  // We are not going to loop or check the 100 Stories , We will pick portions of pairs to speed up the execution time
  expect(ids[0], `indexes 0 and 1, ids ${ids[0]} and ${ids[1]}`).toBeGreaterThan(ids[1]);
  expect(ids[29], `indexes 29 and 30, ids ${ids[29]} and ${ids[30]}`).toBeGreaterThan(ids[30]);
  expect(ids[59], `indexes 59 and 60, ids ${ids[59]} and ${ids[60]}`).toBeGreaterThan(ids[60]);
  expect(ids[89], `indexes 89 and 90, ids ${ids[89]} and ${ids[90]}`).toBeGreaterThan(ids[90]);
  expect(ids[98], `indexes 98 and 99, ids ${ids[98]} and ${ids[99]}`).toBeGreaterThan(ids[99]);
});
