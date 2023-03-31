import { getLink, links } from './links';

describe('Links tests', () => {
  test('getLink()', () => {
    links.forEach((link) => {
      window.history.replaceState({}, '', decodeURIComponent(link.to));
      expect(getLink().label).toBe(link.label);
    });

    window.history.replaceState({}, '', decodeURIComponent('/bad-route'));
    expect(getLink().label).toBe('404');
  });
});
