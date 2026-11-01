import {expect, test} from '@playwright/test';

test('production assets load and the keyboard calculates an expression', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
        if (response.url().startsWith('http://127.0.0.1:4173/') && response.status() >= 400) {
            errors.push(`${response.status()} ${response.url()}`);
        }
    });
    await page.goto('/');
    await expect(page.locator('.Button')).toHaveCount(23);
    for (const key of ['2', 'Enter', '3', '+']) {
        await page.keyboard.press(key);
    }
    await expect(page.locator('.Expression annotation')).toHaveText('2+3=5');
    await expect(page.locator('.katex-html')).toBeVisible();
    await expect(page.locator('.Input')).toBeEmpty();
    await page.evaluate(() => document.fonts.ready);
    expect(errors).toEqual([]);
});

test('buttons, unary operations, swap, undo and reset work', async ({page}) => {
    await page.goto('/');
    const button = (caption: string) => page.locator('.Button').getByText(caption, {exact: true});
    for (const caption of ['9', '√', 'x²', '-x']) {
        await button(caption).click();
    }
    await expect(page.locator('.Expression annotation')).toContainText('=-9');
    await button('Reset').click();
    await expect(page.locator('.Expression')).toHaveCount(0);

    for (const caption of ['2', 'Enter', '8', 'Swap', '/']) {
        await button(caption).click();
    }
    await expect(page.locator('.Expression annotation')).toContainText('=4');
    await button('<-').click();
    await expect(page.locator('.Expression')).toHaveCount(2);
    await button('Reset').click();
    await button('1').click();
    await button('.').click();
    await button('5').click();
    await expect(page.locator('.Input')).toHaveText('1.5');
    await button('Del').click();
    await expect(page.locator('.Input')).toBeEmpty();
});

test('clipboard paste and copy keep calculator values', async ({page}) => {
    await page.goto('/');
    await page.evaluate(() => {
        const data = new DataTransfer();
        data.setData('text/plain', '12.5');
        document.dispatchEvent(new ClipboardEvent('paste', {clipboardData: data, bubbles: true}));
    });
    await expect(page.locator('.Input')).toHaveText('12.5');
    await page.keyboard.press('Enter');
    await page.keyboard.press('2');
    await page.keyboard.press('*');
    await expect(page.locator('.Expression annotation')).toContainText('=25');
    const copied = await page.evaluate(() => {
        const data = new DataTransfer();
        document.dispatchEvent(new ClipboardEvent('copy', {clipboardData: data, bubbles: true}));
        return data.getData('text/plain');
    });
    expect(copied).toBe('25');
});
