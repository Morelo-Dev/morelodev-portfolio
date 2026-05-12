import { test, expect } from '@playwright/test'

test('navegación principal funciona', async ({ page }) => {
  await page.goto('/es')
  await expect(page).toHaveTitle(/Jorge/)
  await page.getByRole('link', { name: /proyectos/i }).click()
  await expect(page).toHaveURL(/\/es\/projects/)
})

test('cambio de idioma funciona', async ({ page }) => {
  await page.goto('/es')
  await page.getByRole('button', { name: /en/i }).click()
  await expect(page).toHaveURL(/\/en/)
})

test('dark mode toggle funciona', async ({ page }) => {
  await page.goto('/es')
  const html = page.locator('html')
  await page.getByRole('button', { name: /tema/i }).click()
  await expect(html).toHaveClass(/dark/)
})
