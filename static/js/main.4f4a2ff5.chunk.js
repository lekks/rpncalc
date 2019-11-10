(window.webpackJsonprpcalc=window.webpackJsonprpcalc||[]).push([[0],{14:function(e,t,n){e.exports=n(31)},19:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(10),s=n.n(r),c=(n(19),n(1)),o=n(2),u=n(4),l=n(3),h=n(5),E=n(11),m=function e(t,n){Object(c.a)(this,e),this.action=t,this.payload=n},d=new E.Dispatcher;var p,f=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).onClick=function(){var e,t;e=n.props.action,t=n.props.tag,d.dispatch(new m(e,t))},n.onKeyDown=function(e){e.key===n.props.keybind&&n.onClick()},document.addEventListener("keydown",n.onKeyDown),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown)}},{key:"render",value:function(){return i.a.createElement("div",{onClick:this.onClick,className:"Button"},this.props.caption)}}]),t}(i.a.Component),k=n(7),N=n(12);!function(e){e[e.ADD_NUMBER=0]="ADD_NUMBER",e[e.OPERATION=1]="OPERATION",e[e.ENTER=2]="ENTER",e[e.SWAP=3]="SWAP",e[e.BS=4]="BS",e[e.DEL=5]="DEL",e[e.CLEAR=6]="CLEAR"}(p||(p={}));var v,g=p;!function(e){e[e.PLUS_MINUS=0]="PLUS_MINUS",e[e.MULT__DIV=1]="MULT__DIV",e[e.FUNC=2]="FUNC",e[e.NUMBER=3]="NUMBER"}(v||(v={}));var y=function(){function e(t){Object(c.a)(this,e),this.tex=void 0,this.result_value=void 0,"number"===typeof t?(this.tex=t.toString(),this.result_value=t):(this.result_value=parseFloat(t),this.tex=t)}return Object(o.a)(e,[{key:"getResult",value:function(){return this.result_value}},{key:"getRank",value:function(){return v.NUMBER}},{key:"getTex",value:function(){return this.tex}},{key:"useExplicitTexParentheses",value:function(){return!1}}]),e}();function b(e,t){return t?"\\left(".concat(e.getTex(),"\\right)"):"".concat(e.getTex())}var _=function(){function e(t,n,a,i,r,s,o){Object(c.a)(this,e),this.rank=a,this.associative=i,this.left=s,this.right=o,this.tex_formula=void 0,this.result_value=void 0,this.explicitTexParentheses=void 0,this.explicitTexParentheses=r,this.tex_formula=this.buildTex(t),this.result_value=n(s.getResult(),o.getResult())}return Object(o.a)(e,[{key:"getResult",value:function(){return this.result_value}},{key:"needLeftParenthesis",value:function(){return this.rank>this.left.getRank()}},{key:"needRightParenthesis",value:function(){return this.rank>this.right.getRank()||!this.associative&&this.rank===this.right.getRank()}},{key:"getRank",value:function(){return this.rank}},{key:"getTex",value:function(){return this.tex_formula}},{key:"useExplicitTexParentheses",value:function(){return this.explicitTexParentheses}},{key:"buildTex",value:function(e){return e(b(this.left,this.needLeftParenthesis()&&this.left.useExplicitTexParentheses()),b(this.right,this.needRightParenthesis()&&this.right.useExplicitTexParentheses()),this.left,this.right)}}]),e}(),T=function(){function e(t,n,a){Object(c.a)(this,e),this.arg=a,this.tex_formula=void 0,this.result_value=void 0,this.tex_formula=n(b(a,a.useExplicitTexParentheses()),a),this.result_value=t(a.getResult())}return Object(o.a)(e,[{key:"getRank",value:function(){return v.FUNC}},{key:"getTex",value:function(){return this.tex_formula}},{key:"useExplicitTexParentheses",value:function(){return!1}},{key:"getResult",value:function(){return this.result_value}}]),e}(),x=function(){function e(t){Object(c.a)(this,e),this.arg=t,this.tex_formula=void 0,this.result_value=void 0,this.tex_formula="{-".concat(b(t,t.useExplicitTexParentheses()),"}"),this.result_value=-t.getResult()}return Object(o.a)(e,[{key:"getRank",value:function(){return v.FUNC}},{key:"getTex",value:function(){return this.tex_formula}},{key:"useExplicitTexParentheses",value:function(){return!0}},{key:"getResult",value:function(){return this.result_value}},{key:"getArg",value:function(){return this.arg}}]),e}();var A=function(){function e(){Object(c.a)(this,e),this.expression=""}return Object(o.a)(e,[{key:"getInput",value:function(){return this.expression}},{key:"addSymbol",value:function(t){return 1===t.length&&(-1!==e.allowed.indexOf(t)&&(("."!==t||-1===this.expression.indexOf(t))&&(this.expression+=t,!0)))}},{key:"clear",value:function(){this.expression=""}},{key:"backSpace",value:function(){return this.expression.length>0&&(this.expression=this.expression.slice(0,-1),!0)}},{key:"notEmpty",value:function(){return 0!==this.expression.length}}]),e}();A.allowed=".0123456789";var S,R={"+":{operandsNumber:2,build:function(e,t){return new _(function(e,t){return"".concat(e,"+").concat(t)},function(e,t){return e+t},v.PLUS_MINUS,!0,!0,e,t)}},"-":{operandsNumber:2,build:function(e,t){return new _(function(e,t){return"".concat(e,"-").concat(t)},function(e,t){return e-t},v.PLUS_MINUS,!1,!0,e,t)}},"*":{operandsNumber:2,build:function(e,t){return new _(function(e,t){return"".concat(e,"\\times").concat(t)},function(e,t){return e*t},v.MULT__DIV,!0,!0,e,t)}},"/":{operandsNumber:2,build:function(e,t){return new _(function(e,t,n,a){return"\\frac{".concat(n.getTex(),"}{").concat(a.getTex(),"}")},function(e,t){return e/t},v.MULT__DIV,!1,!0,e,t)}},sqrt:{operandsNumber:1,build:function(e){return new T(function(e){return Math.sqrt(e)},function(e,t){return"\\sqrt{".concat(t.getTex(),"}")},e)}},sqr:{operandsNumber:1,build:function(e){return new T(function(e){return e*e},function(e){return"{".concat(e,"}^2")},e)}},uminus:{operandsNumber:1,build:function(e){return(t=e)instanceof x?t.getArg():new x(t);var t}}},O={buildExpression:function(e){for(var t,n=arguments.length,a=new Array(n>1?n-1:0),i=1;i<n;i++)a[i-1]=arguments[i];return(t=R[e]).build.apply(t,a)},operandsNumber:function(e){return R[e].operandsNumber},defined:function(e){return e in R}};!function(e){e.INPUT_CHANGE_EVENT="INPUT_CHANGE_EVENT",e.STACK_CHANGE_EVENT="STACK_CHANGE_EVENT"}(S||(S={}));var C=new(function(){function e(){var t=this;Object(c.a)(this,e),this.editor=new A,this.stack=[],this.emitter=void 0,this.dispatcher=void 0,this.dispatchToken=void 0,this.history=[],this.dispatcher=d,this.emitter=new N.EventEmitter,this.dispatchToken=this.dispatcher.register(function(e){t.reactActions(e)})}return Object(o.a)(e,[{key:"getInput",value:function(){return this.editor.getInput()}},{key:"getStack",value:function(){return this.stack}},{key:"addChangeListener",value:function(e,t){return this.emitter.addListener(e,t)}},{key:"reactActions",value:function(e){switch(e.action){case g.ADD_NUMBER:this.editor.addSymbol(e.payload)&&this.emitter.emit(S.INPUT_CHANGE_EVENT);break;case g.OPERATION:this.addOperation(e.payload)&&(this.emitter.emit(S.INPUT_CHANGE_EVENT),this.emitter.emit(S.STACK_CHANGE_EVENT));break;case g.DEL:this.del();break;case g.CLEAR:this.clear();break;case g.BS:this.backSpace();break;case g.ENTER:this.push()&&(this.emitter.emit(S.INPUT_CHANGE_EVENT),this.emitter.emit(S.STACK_CHANGE_EVENT));break;case g.SWAP:this.swap()}}},{key:"backSpace",value:function(){this.editor.backSpace()?this.emitter.emit(S.INPUT_CHANGE_EVENT):this.popHistory()&&(this.emitter.emit(S.INPUT_CHANGE_EVENT),this.emitter.emit(S.STACK_CHANGE_EVENT))}},{key:"popHistory",value:function(){var e=this.history.pop();return console.log("Restore ",this.history.length),!!e&&(this.stack=e,!0)}},{key:"stashHistory",value:function(){this.history.push(Object(k.a)(this.stack)),console.log("Save ",this.history.length)}},{key:"push",value:function(){return this.editor.notEmpty()?(this.stashHistory(),this.stack.push(this.editorExpression()),this.editor.clear(),!0):this.stack.length>0&&(this.stashHistory(),this.stack.push(this.stack[this.stack.length-1]),!0)}},{key:"swap",value:function(){if(this.stack.length>=2){this.stashHistory();var e=[this.stack[this.stack.length-2],this.stack[this.stack.length-1]];this.stack[this.stack.length-1]=e[0],this.stack[this.stack.length-2]=e[1],this.emitter.emit(S.STACK_CHANGE_EVENT)}}},{key:"clear",value:function(){this.editor.clear(),this.history=[],this.stack=[],this.emitter.emit(S.INPUT_CHANGE_EVENT),this.emitter.emit(S.STACK_CHANGE_EVENT)}},{key:"del",value:function(){this.editor.notEmpty()?(this.editor.clear(),this.emitter.emit(S.INPUT_CHANGE_EVENT)):this.stack.length>0&&(this.stashHistory(),this.stack.pop(),this.emitter.emit(S.STACK_CHANGE_EVENT))}},{key:"editorExpression",value:function(){return new y(this.editor.getInput())}},{key:"addOperation",value:function(e){if(!O.defined(e))return!1;var t=O.operandsNumber(e)-(this.editor.notEmpty()?1:0);if(t>this.stack.length)return!1;this.stashHistory();var n=this.stack.splice(-t,t);return this.editor.notEmpty()&&(n.push(this.editorExpression()),this.editor.clear()),this.stack.push(O.buildExpression.apply(O,[e].concat(Object(k.a)(n)))),!0}}]),e}()),U=(n(25),n(13)),P=function(e){var t=Number(e.expression.getResult().toFixed(6)),n=isNaN(t)?"?":String(t),a="".concat(e.expression.getTex(),"=").concat(n);return i.a.createElement("div",{className:"Expression"},i.a.createElement(U.BlockMath,{math:a}))},D=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).eventSubscription=void 0,n.onChange=function(){n.setState(t.getStateFromStores())},n.state=t.getStateFromStores(),n.eventSubscription=C.addChangeListener(S.STACK_CHANGE_EVENT,n.onChange),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){this.eventSubscription.remove()}},{key:"render",value:function(){var e=this.state.expressions.slice().reverse();return i.a.createElement("div",{className:"Stack"},e.map(function(e,t){return i.a.createElement(i.a.Fragment,{key:t},t?i.a.createElement("hr",null):null,i.a.createElement(P,{expression:e}))}))}}],[{key:"getStateFromStores",value:function(){return{expressions:C.getStack()}}}]),t}(i.a.Component),w=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).eventSubscription=void 0,n.onChange=function(){n.setState(t.getStateFromStores())},n.state=t.getStateFromStores(),n.eventSubscription=C.addChangeListener(S.INPUT_CHANGE_EVENT,n.onChange),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){this.eventSubscription.remove()}},{key:"render",value:function(){return i.a.createElement("div",{className:"Input"},this.state.text)}}],[{key:"getStateFromStores",value:function(){return{text:C.getInput()}}}]),t}(i.a.Component),I=(n(30),function(){return i.a.createElement("div",{className:"App"},i.a.createElement(D,null),i.a.createElement(w,null),i.a.createElement("div",{className:"Pad"},i.a.createElement("table",{className:"Buttons"},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"7",tag:"7",keybind:"7",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"8",tag:"8",keybind:"8",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"9",tag:"9",keybind:"9",action:g.ADD_NUMBER})),i.a.createElement("td",null,i.a.createElement(f,{caption:"/",tag:"/",keybind:"/",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"<-",keybind:"Backspace",action:g.BS}))),i.a.createElement("tr",null,i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"4",tag:"4",keybind:"4",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"5",tag:"5",keybind:"5",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"6",tag:"6",keybind:"6",action:g.ADD_NUMBER})),i.a.createElement("td",null,i.a.createElement(f,{caption:"*",tag:"*",keybind:"*",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"Del",tag:"clear",keybind:"Delete",action:g.DEL}))),i.a.createElement("tr",null,i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"1",tag:"1",keybind:"1",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"2",tag:"2",keybind:"2",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"3",tag:"3",keybind:"3",action:g.ADD_NUMBER})),i.a.createElement("td",null,i.a.createElement(f,{caption:"-",tag:"-",keybind:"-",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"Swap",keybind:"PageDown",action:g.SWAP}))),i.a.createElement("tr",null,i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:"0",tag:"0",keybind:"0",action:g.ADD_NUMBER})),i.a.createElement("td",{className:"Num"},i.a.createElement(f,{caption:".",tag:".",keybind:".",action:g.ADD_NUMBER})),i.a.createElement("td",null),i.a.createElement("td",null,i.a.createElement(f,{caption:"+",tag:"+",keybind:"+",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"Reset",keybind:"Escape",action:g.CLEAR}))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement(f,{caption:"\u221a",tag:"sqrt",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"x\xb2",tag:"sqr",action:g.OPERATION})),i.a.createElement("td",null,i.a.createElement(f,{caption:"-x",tag:"uminus",action:g.OPERATION})),i.a.createElement("td",null),i.a.createElement("td",null,i.a.createElement(f,{caption:"Enter",keybind:"Enter",action:g.ENTER})))))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.4f4a2ff5.chunk.js.map