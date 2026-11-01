import {Stack} from '../calculator/Stack';
import {NumberExpression} from '../calculator/Expression';

describe('Stack state', () => {
    test('immediately publishes the initial empty stack', () => {
        const stack = new Stack();
        const received: number[][] = [];
        const subscription = stack.getExpressionsObservable().subscribe(expressions => {
            received.push(expressions.map(expression => expression.getResult()));
        });

        expect(received).toEqual([[]]);
        subscription.unsubscribe();
    });

    test('new subscribers receive the current stack and subsequent changes', () => {
        const stack = new Stack();
        stack.push(new NumberExpression(2));
        const received: number[][] = [];
        const subscription = stack.getExpressionsObservable().subscribe(expressions => {
            received.push(expressions.map(expression => expression.getResult()));
        });

        expect(received).toEqual([[2]]);
        stack.push(new NumberExpression(3));
        expect(received).toEqual([[2], [2, 3]]);
        stack.clear();
        expect(received).toEqual([[2], [2, 3], []]);
        subscription.unsubscribe();

        const afterClear: number[][] = [];
        const lateSubscription = stack.getExpressionsObservable().subscribe(expressions => {
            afterClear.push(expressions.map(expression => expression.getResult()));
        });
        expect(afterClear).toEqual([[]]);
        lateSubscription.unsubscribe();
    });
});
