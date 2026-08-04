import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
test('home is usable and accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Alberto Pérez García');
  await expect(page.getByText('Banco Santander')).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
test('navigation and public project work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Ver caso' }).click();
  await expect(page).toHaveURL(/la-casa-de-los-juegos/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('La Casa de los Juegos');
});
test('contact form reports invalid fields', async ({ page }) => {
  await page.goto('/#contacto');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(page.getByText('Revisa los campos indicados.')).toBeVisible();
});
test('unknown route shows 404', async ({ page }) => {
  await page.goto('/ruta-que-no-existe');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Esta página no existe');
});
