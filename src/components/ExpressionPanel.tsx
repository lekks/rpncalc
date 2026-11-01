import React, {useMemo} from 'react';

import 'katex/dist/katex.min.css';
import katex from 'katex';
import {StackItem} from "../calculator/Calculator";

const ROUND = 6;

interface Props {
    expression: StackItem;
}

const ExpressionPanel: React.FC<Props> = (expression) => {
    const result = Number(expression.expression.result.toFixed(ROUND));
    const resStr: string = isNaN(result) ? "?" : String(result);
    //Choosing fonts (overrides ,katex): https://katex.org/docs/supported.html#style-color-size-and-font
    const texStr: string = `${expression.expression.texFormula}=${resStr}`;
    const mathHtml = useMemo(() => katex.renderToString(texStr, {
        displayMode: true,
        throwOnError: false,
        trust: false,
    }), [texStr]);
    return (
        <div className="Expression">
            <div dangerouslySetInnerHTML={{__html: mathHtml}}/>
        </div>

    );
};

export default ExpressionPanel;
