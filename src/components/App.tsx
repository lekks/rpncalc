import React from 'react';
import CalcButton from './CalcButton';
import ExpressionStack from "./ExpressionStack";
import InputPanel from "./InputPanel";
import './App.css';
import {CalcInputType, Calculator} from "../calculator/Calculator";

const calculator = new Calculator();

const App: React.FC = () => {

    return (
        <div className="App">
            <ExpressionStack subject={calculator.expressionStack}/>
            <InputPanel subject={calculator.editorText}/>
            <div className="Pad">
                <table className="Buttons">
                    <tbody>
                    <tr>
                        <td className="Num"><CalcButton caption="7" tag="7" keybind="7"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="8" tag="8" keybind="8"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="9" tag="9" keybind="9"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td><CalcButton caption="/" tag="/" keybind="/" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="<-" keybind="Backspace" action={CalcInputType.BS}
                                        subject={calculator.calcInputEvent}/></td>
                    </tr>
                    <tr>
                        <td className="Num"><CalcButton caption="4" tag="4" keybind="4"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="5" tag="5" keybind="5"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="6" tag="6" keybind="6"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td><CalcButton caption="*" tag="*" keybind="*" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="Del" tag="clear" keybind="Delete" action={CalcInputType.DEL}
                                        subject={calculator.calcInputEvent}/></td>
                    </tr>
                    <tr>
                        <td className="Num"><CalcButton caption="1" tag="1" keybind="1"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="2" tag="2" keybind="2"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="3" tag="3" keybind="3"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td><CalcButton caption="-" tag="-" keybind="-" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="Swap" keybind="PageDown" action={CalcInputType.SWAP}
                                        subject={calculator.calcInputEvent}/></td>
                    </tr>
                    <tr>
                        <td className="Num"><CalcButton caption="0" tag="0" keybind="0"
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td className="Num"><CalcButton caption="." tag="." keybind="."
                                                        action={CalcInputType.ADD_NUMBER}
                                                        subject={calculator.calcInputEvent}/>
                        </td>
                        <td/>
                        <td><CalcButton caption="+" tag="+" keybind="+" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="Reset" keybind="Escape" action={CalcInputType.CLEAR}
                                        subject={calculator.calcInputEvent}/></td>
                    </tr>
                    <tr>
                        <td><CalcButton caption="√" tag="sqrt" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="x²" tag="sqr" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td><CalcButton caption="-x" tag="uminus" action={CalcInputType.OPERATION}
                                        subject={calculator.calcInputEvent}/></td>
                        <td/>
                        <td><CalcButton caption="Enter" keybind="Enter" action={CalcInputType.ENTER}
                                        subject={calculator.calcInputEvent}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
