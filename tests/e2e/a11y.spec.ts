import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = ['/', '/es', '/en', '/es/projects', '/es/blog', '/es/contact']

for (const route of routes) {
  test(`WCAG AAA - ${route}`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
