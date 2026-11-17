import React, {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import App from '../components/App';

describe('App', () => {
    let div: HTMLDivElement;
    let root: Root;

    beforeEach(async () => {
        div = document.createElement('div');
        document.body.appendChild(div);
        root = createRoot(div);
        await act(async () => root.render(<App/>));
        await press('Escape');
    });

    afterEach(async () => {
        await act(async () => root.unmount());
        div.remove();
    });

    async function press(key: string) {
        await act(async () => {
            document.dispatchEvent(new KeyboardEvent('keydown', {key}));
        });
    }

    it('renders the calculator controls', () => {
        expect(div.querySelectorAll('.Button')).toHaveLength(23);
    });

    it('calculates with the keyboard and renders the expression with KaTeX', async () => {
        for (const key of ['2', 'Enter', '3', '+']) {
            await press(key);
        }
        expect(div.querySelector('.katex')).not.toBeNull();
        expect(div.querySelector('annotation')?.textContent).toBe('2+3=5');
        expect(div.querySelector('.Input')?.textContent).toBe('');
    });

    it('calculates with the on-screen buttons', async () => {
        for (const caption of ['4', 'Enter', '5', '*']) {
            const button = Array.from(div.querySelectorAll<HTMLDivElement>('.Button'))
                .find(element => element.textContent === caption);
            expect(button).toBeDefined();
            await act(async () => button!.click());
        }
        expect(div.querySelector('annotation')?.textContent).toBe('4\\times5=20');
    });

    it('accepts decimal separators from both keyboard layouts without duplicating the separator', async () => {
        await press('1');
        await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: ',', code: 'NumpadDecimal'})));
        await press('5');
        await press('.');
        expect(div.querySelector('.Input')?.textContent).toBe('1.5');
    });

    it('keeps numpad Delete working when Num Lock is off', async () => {
        await press('1');
        await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Delete', code: 'NumpadDecimal'})));
        expect(div.querySelector('.Input')?.textContent).toBe('');
    });

    it('restores current editor text and stack when the UI reconnects', async () => {
        for (const key of ['2', 'Enter', '3']) {
            await press(key);
        }

        await act(async () => root.unmount());
        root = createRoot(div);
        await act(async () => root.render(<App/>));

        expect(div.querySelector('.Input')?.textContent).toBe('3');
        expect(div.querySelector('annotation')?.textContent).toBe('2=2');

        // Reconnecting displays state without replaying earlier commands.
        await press('+');
        expect(div.querySelectorAll('.Expression')).toHaveLength(1);
        expect(div.querySelector('annotation')?.textContent).toBe('2+3=5');
    });
});
