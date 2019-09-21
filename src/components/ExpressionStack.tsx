import React from 'react';
import FBEmitter from "fbemitter";

import {ExpressionEvents, expressionStore} from "../stores/ExpressionStore";
import ExpressionPanel from "./ExpressionPanel";
import {Expression} from "../stores/Expression";

interface State {
    expressions: Expression[];
}

class ExpressionStack extends React.Component<any, State> {
    private eventSubscription: FBEmitter.EventSubscription;

    constructor(props: {}) {
        super(props,);
        this.state = ExpressionStack.getStateFromStores();
        this.eventSubscription = expressionStore.addChangeListener(ExpressionEvents.STACK_CHANGE_EVENT, this.onChange);
    }

    private static getStateFromStores(): State {
        return {expressions: expressionStore.getStack()};
    }

    public componentWillUnmount() {
        this.eventSubscription.remove();
    }

    render() {
        return (
            <div className="Stack">
                {this.state.expressions.map((expr: Expression, index) => <ExpressionPanel expression={expr} key={index}/>)}
            </div>
        );
    }

    private onChange = () => {
        this.setState(ExpressionStack.getStateFromStores());
    };
}

export default ExpressionStack;
