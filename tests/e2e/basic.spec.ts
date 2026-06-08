import { expect, test } from '@playwright/test'

test('host, contestant, and stage routes load', async ({ page }) => {
  await page.goto('/host')
  await expect(page.getByText('Oda Kodu')).toBeVisible()
  await page.goto('/play/K7M4PX')
  await expect(page.getByText('ÇEVİR CAVO!')).toBeVisible()
  await page.goto('/stage/K7M4PX?overlay=1')
  await expect(page.getByText('ÇARKAVO')).toBeVisible()
})
