import {BehaviorSubject, of, Subject, Subscription} from 'rxjs';
import {CalcInputEvent, CalcInputType, Calculator, CalculatorState, StackItem} from '../calculator/Calculator';

describe('Calculator command publication', () => {
    let input: Subject<CalcInputEvent>;
    let textInput: Subject<string>;
    let result: BehaviorSubject<number>;
    let editorText: BehaviorSubject<string>;
    let expressionStack: BehaviorSubject<StackItem[]>;
    let calculator: Calculator;
    let subscriptions: Subscription;

    beforeEach(() => {
        input = new Subject<CalcInputEvent>();
        textInput = new Subject<string>();
        result = new BehaviorSubject<number>(NaN);
        editorText = new BehaviorSubject<string>('');
        expressionStack = new BehaviorSubject<StackItem[]>([]);
        calculator = new Calculator({
            inputEvent: input,
            editorTextInput: textInput,
            result,
            editorText,
            expressionStack
        });
        subscriptions = new Subscription();
    });

    afterEach(() => {
        subscriptions.unsubscribe();
        calculator.destroy();
    });

    function command(type: CalcInputType, payload?: string) {
        input.next({type, payload});
    }

    function prepareOperands() {
        command(CalcInputType.ADD_NUMBER, '2');
        command(CalcInputType.ENTER);
        command(CalcInputType.ADD_NUMBER, '3');
    }

    test('multiplication publishes only the final result and one coherent state', () => {
        prepareOperands();
        const results: number[] = [];
        const states: CalculatorState[] = [];
        subscriptions.add(result.subscribe(value => results.push(value)));
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        command(CalcInputType.OPERATION, '*');

        expect(results).toEqual([3, 6]);
        expect(states).toHaveLength(2);
        expect(states[1]).toEqual({
            editorText: '',
            expressionStack: [{texFormula: '2\\times3', result: 6}],
            stackResult: {texFormula: '2\\times3', result: 6},
            result: 6
        });
        expect(states[0].editorText).toBe('3');
        expect(states[0].expressionStack.map(item => item.result)).toEqual([2]);
    });

    test('reset does not briefly expose the old stack result', () => {
        prepareOperands();
        const results: number[] = [];
        const states: CalculatorState[] = [];
        subscriptions.add(result.subscribe(value => results.push(value)));
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        command(CalcInputType.CLEAR);

        expect(results).toEqual([3, NaN]);
        expect(states).toHaveLength(2);
        expect(states[1]).toEqual({editorText: '', expressionStack: [], stackResult: undefined, result: NaN});
    });

    test('swap with editor input publishes the final stack once', () => {
        prepareOperands();
        const stacks: number[][] = [];
        const states: CalculatorState[] = [];
        subscriptions.add(expressionStack.subscribe(stack => stacks.push(stack.map(item => item.result))));
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        command(CalcInputType.SWAP);

        expect(stacks).toEqual([[2], [3, 2]]);
        expect(states).toHaveLength(2);
        expect(states[1].editorText).toBe('');
        expect(states[1].result).toBe(2);
    });

    test('a pasted string publishes its full text and value once', () => {
        const texts: string[] = [];
        const results: number[] = [];
        const states: CalculatorState[] = [];
        subscriptions.add(editorText.subscribe(value => texts.push(value)));
        subscriptions.add(result.subscribe(value => results.push(value)));
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        textInput.next('12,5');

        expect(texts).toEqual(['', '12.5']);
        expect(results).toEqual([NaN, 12.5]);
        expect(states).toHaveLength(2);
        expect(states[1].editorText).toBe('12.5');
        expect(states[1].result).toBe(12.5);
    });

    test('separate synchronous commands each publish their own state', () => {
        const states: CalculatorState[] = [];
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        command(CalcInputType.ADD_NUMBER, '2');
        command(CalcInputType.ENTER);
        command(CalcInputType.ADD_NUMBER, '3');
        command(CalcInputType.OPERATION, '*');

        expect(states.map(state => state.result)).toEqual([NaN, 2, 2, 3, 6]);
        expect(states.map(state => state.editorText)).toEqual(['', '2', '', '3', '']);
    });

    test('commands sent from subscribers wait for the current publication to finish', () => {
        const first: number[] = [];
        const second: number[] = [];
        subscriptions.add(calculator.state$.subscribe(state => {
            first.push(state.result);
            if (state.editorText === '2') {
                command(CalcInputType.ADD_NUMBER, '3');
            }
        }));
        subscriptions.add(calculator.state$.subscribe(state => second.push(state.result)));

        command(CalcInputType.ADD_NUMBER, '2');

        expect(first).toEqual([NaN, 2, 23]);
        expect(second).toEqual(first);
    });

    test('typing does not republish the unchanged stack', () => {
        const stacks: StackItem[][] = [];
        subscriptions.add(expressionStack.subscribe(stack => stacks.push(stack)));

        command(CalcInputType.ADD_NUMBER, '2');
        command(CalcInputType.ADD_NUMBER, '3');

        expect(stacks).toEqual([[]]);
    });

    test('a late subscriber receives the complete current state', () => {
        prepareOperands();
        command(CalcInputType.OPERATION, '*');
        const states: CalculatorState[] = [];
        subscriptions.add(calculator.state$.subscribe(state => states.push(state)));

        expect(states).toHaveLength(1);
        expect(states[0].editorText).toBe('');
        expect(states[0].expressionStack.map(item => item.result)).toEqual([6]);
        expect(states[0].stackResult?.result).toBe(6);
        expect(states[0].result).toBe(6);
    });

    test('synchronous constructor inputs are processed after outputs are connected', () => {
        const output = new BehaviorSubject<number>(NaN);
        const results: number[] = [];
        subscriptions.add(output.subscribe(value => results.push(value)));
        const synchronousCalculator = new Calculator({
            inputEvent: of(
                {type: CalcInputType.ADD_NUMBER, payload: '2'},
                {type: CalcInputType.ENTER},
                {type: CalcInputType.ADD_NUMBER, payload: '3'},
                {type: CalcInputType.OPERATION, payload: '*'}
            ),
            result: output
        });
        try {
            expect(results).toEqual([NaN, NaN, 2, 3, 6]);
        } finally {
            synchronousCalculator.destroy();
        }
    });
});
