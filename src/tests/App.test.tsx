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
});
