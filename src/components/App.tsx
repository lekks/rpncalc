import React from 'react';
import './App.css';
import Button from './Button';
import ExpressionStack from "./ExpressionStack";
import InputPanel from "./InputPanel";
import Actions from "../dispatcher/Actions";

const App: React.FC = () => {

  return (
      <div className="App">
        <ExpressionStack/>
          <InputPanel/>
        <table className="Buttons">
            <tbody>
            <tr>
              <td><Button caption="7" tag="7" keybind="7" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="8" tag="8" keybind="8" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="9" tag="9" keybind="9" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="/" tag="/" keybind="/" action={Actions.OPERATION}/></td>
              <td><Button caption="<-" keybind="Backspace" action={Actions.BS}/></td>
            </tr>
            <tr>
              <td><Button caption="4" tag="4" keybind="4" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="5" tag="5" keybind="5" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="6" tag="6" keybind="6" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="*" tag="*" keybind="*" action={Actions.OPERATION}/></td>
              <td><Button caption="Del" tag="clear" keybind="Delete" action={Actions.DEL}/></td>
            </tr>
            <tr>
              <td><Button caption="1" tag="1" keybind="1" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="2" tag="2" keybind="2" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="3" tag="3" keybind="3" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="-" tag="-" keybind="-" action={Actions.OPERATION}/></td>
              <td><Button caption="Swap" keybind="PageDown" action={Actions.SWAP}/></td>
            </tr>
            <tr>
              <td><Button caption="0" tag="0" keybind="0" action={Actions.ADD_NUMBER}/></td>
              <td><Button caption="." tag="." keybind="." action={Actions.ADD_NUMBER}/></td>
              <td/>
              <td><Button caption="+" tag="+" keybind="+" action={Actions.OPERATION}/></td>
              <td><Button caption="Reset" keybind="Escape" action={Actions.CLEAR}/></td>
            </tr>
            <tr>
              <td><Button caption="√" tag="sqrt" action={Actions.OPERATION}/></td>
              <td><Button caption="x²" tag="sqr" action={Actions.OPERATION}/></td>
              <td/>
              <td/>
              <td><Button caption="Enter" keybind="Enter" action={Actions.ENTER}/></td>
            </tr>
            </tbody>
          </table>
      </div>
  );
};

export default App;