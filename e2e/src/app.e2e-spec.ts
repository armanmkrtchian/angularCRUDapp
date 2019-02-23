import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome addOrEditMode', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to example!');
  });
});
