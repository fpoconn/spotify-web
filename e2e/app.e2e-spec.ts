import { SpotifyWebPage } from './app.po';

describe('spotify-web App', function() {
  let page: SpotifyWebPage;

  beforeEach(() => {
    page = new SpotifyWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
