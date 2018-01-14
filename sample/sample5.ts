require('../lib/colors');

let ts = `Class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
}

document.body.appendChild(button);`;

console.log(ts.paint([
    {key:new RegExp("let|new|alert|class", "g"), colors:"red"},
    {key:"this", colors:"lightgreen"},
    {key:"return", colors:"green"},
    {key:"document", colors:"green"},
    {key:new RegExp("string|number|function", "g"), colors:"#6600FF"},
    {key:new RegExp("\\{|\\}", "g"), colors:"bold"},
    {key:new RegExp("\\(|\\)", "g"), colors:"bold"},
    {key:new RegExp('"[^"]*"', "g"), colors:["lightyellow", "underline"]},
    {key:new RegExp("'[^']*'", "g"), colors:["lightyellow", "underline"]},
]))