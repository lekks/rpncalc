import React from 'react';
import ExpressionPanel from "./ExpressionPanel";
import {StackItem} from "../calculator/Calculator";
import {Observable, Subscription} from "rxjs";

interface State {
    expressions: StackItem[];
}

interface Props {
    exprStack: Observable<StackItem[]>;
}

class ExpressionStack extends React.Component<Props, State> {
    private readonly subscription = new Subscription();

    constructor(props: Props) {
        super(props,);
        this.state = {expressions: []};
    }

    public componentDidMount() {
        this.subscription.add(this.props.exprStack.subscribe((expressions) => {
            this.setState({expressions})
        }))
    }

    public componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        const reversed = this.state.expressions.slice().reverse();
        return (
            <div className="Stack">
                {reversed.map((expr: StackItem, index) =>
                    <React.Fragment key={index}>
                        {index ? <hr/> : null}
                        <ExpressionPanel expression={expr}/>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default ExpressionStack;
