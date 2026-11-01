import React from 'react';

import {Observable, Subscription} from "rxjs";

interface State {
    text: string;
}

interface Props {
    text: Observable<string>;
}

class InputPanel extends React.Component<Props, State> {
    private readonly subscription = new Subscription();

    constructor(props: Props) {
        super(props,);
        this.state = {text: ""};
    }

    public componentDidMount() {
        this.subscription.add(this.props.text.subscribe((text) => {
            this.setState({text})
        }))
    }

    public componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="Input">
                {this.state.text}
            </div>
        );
    }

}

export default InputPanel;
