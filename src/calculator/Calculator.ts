import {BS_SYMBOL, CLEAR_SYMBOL, Editor} from "./Editor";
import {Expression, NumberExpression} from "./Expression";
import ops from "./Operations";
import {BehaviorSubject, EMPTY, merge, Observable, Observer, queueScheduler, Subject, Subscription} from "rxjs"
import {distinctUntilChanged, map, observeOn} from "rxjs/operators";
import {Stack} from "./Stack";


export enum CalcInputType {
    ADD_NUMBER,
    OPERATION,
    ENTER,
    SWAP,
    BS,
    DEL,
    CLEAR
}

export interface CalcInputEvent {
    type: CalcInputType;
    payload?: string;
}

export interface StackItem {
    readonly texFormula: string
    readonly result: number
}

export interface CalculatorState {
    readonly editorText: string;
    readonly expressionStack: StackItem[];
    readonly stackResult: StackItem | undefined;
    readonly result: number;
}

export interface CalculatorSignals {
    inputEvent?: Observable<CalcInputEvent>,
    editorTextInput?: Observable<string>,
    result?: Observer<number>
    editorText?: Observer<string>,
    expressionStack?: Observer<StackItem[]>
    stackResult?: Observer<StackItem | undefined>;
}

export class Calculator {

    private readonly state = new BehaviorSubject<CalculatorState>({
        editorText: "",
        expressionStack: [],
        stackResult: undefined,
        result: NaN
    });
    public readonly state$ = this.state.asObservable();

    private readonly expressionStack = new BehaviorSubject<StackItem[]>([]);
    private readonly stack = new Stack();
    private readonly editorText = new BehaviorSubject<string>("")
    private readonly editorValue = new BehaviorSubject<number>(NaN)
    private readonly editorInputSymbols = new Subject<string>();
    private readonly editorInputString = new Subject<string>();
    private readonly editor: Editor;
    private subscriptions: Subscription = new Subscription();

    constructor(extern: CalculatorSignals) {

        this.editor = new Editor({
            outputText: this.editorText,
            inputSymbols: this.editorInputSymbols,
            inputString: this.editorInputString,
            outputValue: this.editorValue
        });

        this.subscriptions.add(this.stack.getExpressionsObservable().pipe(
            map((exprStack: Expression[]): StackItem[] => exprStack.map((expr: Expression): StackItem => {
                return {
                    texFormula: expr.getTex(),
                    result: expr.getResult()
                }
            }))
        ).subscribe(this.expressionStack))

        this.publishState();

        this.subscriptions.add(this.state$.pipe(
            map(state => state.result),
            distinctUntilChanged(Object.is)
        ).subscribe(extern.result))
        this.subscriptions.add(this.state$.pipe(
            map(state => state.expressionStack),
            distinctUntilChanged()
        ).subscribe(extern.expressionStack))
        this.subscriptions.add(this.state$.pipe(
            map(state => state.stackResult),
            distinctUntilChanged()
        ).subscribe(extern.stackResult))
        this.subscriptions.add(this.state$.pipe(
            map(state => state.editorText),
            distinctUntilChanged()
        ).subscribe(extern.editorText))

        // A command (including a pasted string) finishes before its state is published.
        // Reentrant commands wait until every subscriber receives the current state.
        this.subscriptions.add(merge(
            extern.inputEvent?.pipe(map(event => ({kind: "command" as const, event}))) ?? EMPTY,
            extern.editorTextInput?.pipe(map(text => ({kind: "text" as const, text}))) ?? EMPTY
        ).pipe(observeOn(queueScheduler)).subscribe(input => {
            if (input.kind === "command") {
                this.processInputEvent(input.event);
            } else {
                this.editorInputString.next(input.text);
            }
            this.publishState();
        }))
    }

    public destroy() {
        this.editor.destroy()
        this.subscriptions.unsubscribe()
        this.state.complete()
    }

    private publishState() {
        const expressionStack = this.expressionStack.getValue();
        const stackResult = expressionStack[expressionStack.length - 1];
        const editorValue = this.editorValue.getValue();
        this.state.next({
            editorText: this.editorText.getValue(),
            expressionStack,
            stackResult,
            result: !isNaN(editorValue) ? editorValue : (stackResult ? stackResult.result : NaN)
        });
    }

    private editorExpression(): Expression {
        return new NumberExpression(this.editorText.getValue())
    }

    private editorNotEmpty(): boolean {
        return this.editorText.getValue().length !== 0;
    }

    private addOperation(oper: string) {
        // operation is unknown
        if (!ops.defined(oper)) {
            return
        }

        // we must have in stack as much items as we need for operation
        const opnNum: number = ops.operandsNumber(oper);
        const stackGet = opnNum - (this.editorNotEmpty() ? 1 : 0);
        if (stackGet > this.stack.getLength()) {
            return
        }

        const operandsExpr: Expression[] = this.stack.getTop(stackGet)

        if (this.editorNotEmpty()) {
            operandsExpr.push(this.editorExpression());
            this.editorInputSymbols.next(CLEAR_SYMBOL);
        }
        this.stack.addOperation(ops.buildExpression(oper, ...operandsExpr));
    }

    private processInputEvent(event: CalcInputEvent) {
        switch (event.type) {
            case CalcInputType.ADD_NUMBER:
                event.payload && this.editorInputSymbols.next(event.payload);
                break;
            case CalcInputType.OPERATION:
                event.payload && this.addOperation(event.payload);
                break;
            case CalcInputType.DEL:
                if (this.editorNotEmpty()) {
                    this.editorInputSymbols.next(CLEAR_SYMBOL);
                } else {
                    this.stack.del()
                }
                break;
            case CalcInputType.CLEAR:
                this.editorInputSymbols.next(CLEAR_SYMBOL);
                this.stack.clear()
                break;
            case CalcInputType.BS:
                if (this.editorNotEmpty()) {
                    this.editorInputSymbols.next(BS_SYMBOL)
                } else {
                    this.stack.backSpace()
                }
                break;
            case CalcInputType.ENTER:
                if (this.editorNotEmpty()) {
                    this.stack.push(this.editorExpression());
                    this.editorInputSymbols.next(CLEAR_SYMBOL);
                } else {
                    this.stack.duplicate()
                }
                break;
            case CalcInputType.SWAP:
                if (this.editorNotEmpty()) {
                    this.stack.push(this.editorExpression());
                    this.editorInputSymbols.next(CLEAR_SYMBOL);
                }
                this.stack.swap();
                break;
        }
    }
}
