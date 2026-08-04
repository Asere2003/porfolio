import { PROJECTS, SERVICES } from './portfolio.data';
describe('portfolio data', () => {
  it('uses unique public slugs and complete services', () => {
    expect(new Set(PROJECTS.map(({ slug }) => slug)).size).toBe(PROJECTS.length);
    expect(
      SERVICES.every(
        ({ title, description, technologies }) => title && description && technologies.length,
      ),
    ).toBe(true);
  });
});
