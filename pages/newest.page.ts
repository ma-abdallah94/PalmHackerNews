import { type Locator, type Page } from '@playwright/test';

export class NewestPage {
  readonly page: Page;
  readonly stories: Locator;
  readonly moreLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.stories = page.locator('tr.athing.submission');
    this.moreLink = page.getByRole('link', { name: 'More', exact: true });
  }

  async navigateToNewestPage() {
    await this.page.goto('https://news.ycombinator.com/newest');
  }

  async goToNextPage() {
    await this.moreLink.click();
  }

  async idsOnThisPage(): Promise<number[]> {
    return this.stories.evaluateAll((rows) => rows.map((row) => Number(row.id)));
  }

  async collectStoryIds(): Promise<number[]> {
    const ids = await this.idsOnThisPage();
    return this.addIdsFromNextPages(ids);
  }

  async addIdsFromNextPages(ids: number[]): Promise<number[]> {
    if (ids.length >= 100) {
      return ids.slice(0, 100);
    }

    await this.goToNextPage();
    const idsOnThisPage = await this.idsOnThisPage();
    return this.addIdsFromNextPages(ids.concat(idsOnThisPage));
  }
}
