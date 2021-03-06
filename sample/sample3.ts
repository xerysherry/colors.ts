import Colors = require('../lib/colors')

Colors.support(Colors.Support.ANSI256);
// gray
console.log("---gray level---")
console.log("0:black                     >>>Gray Level>>>                         25:while")
let result = "";
for (let i = 0; i < 26; ++i)
{
    let num = i.toString();
    if(i<10)
        num = "0"+num;
    result += num.gray(i) + " ";
}
console.log(result)

result = "";
for (let i = 0; i < 26; ++i)
{
    let num = i.toString();
    if(i<10)
        num = "0"+num;
    result += num.gray_bg(i) + " ";
}
console.log(result)

console.log("---256 colors---")

result = "";
for (let i = 0; i < 256; ++i)
{
    let n = i.toString();
    if(i < 10)
        n = "00"+i;
    else if(i < 100)
        n = "0" + i;
    result += n.color_at_256(i) + " ";
    if((i+1)%16 == 0)
    {
        console.log(result);
        result = "";
    }
}

console.log("---256 colors bg---")
result = "";
for (let i = 0; i < 216; ++i)
{
    let n = i.toString();
    if(i < 10)
        n = "00"+i;
    else if(i < 100)
        n = "0" + i;
    result += n.color_bg_at_256(i) + " ";
    if((i+1)%16 == 0)
    {
        console.log(result);
        result = "";
    }
}

let hexs = ['00','33','66','99','CC','FF'];
let key:[number, number, number] = [0,0,0];

console.log("---web safe 216 colors---")
result = "";
for (let i = 0; i < 216; ++i, ++key[0]) {
    if (key[0] >= 6) {
        key[0] = 0;
        key[1] += 1;
        if (key[1] >= 6) {
            key[1] = 0;
            key[2] += 1;
        }
    }
    let code = "#" + hexs[key[2]]+hexs[key[1]]+hexs[key[0]];
    result += code.colors(code) + " "
    if((i+1)%6==0)
    {
        console.log(result);
        result="";
    }
}

console.log("---web safe 216 colors bg---")
result = "";
key = [0,0,0];
for (let i = 0; i < 216; ++i, ++key[0]) {
    if (key[0] >= 6) {
        key[0] = 0;
        key[1] += 1;
        if (key[1] >= 6) {
            key[1] = 0;
            key[2] += 1;
        }
    }
    let code = "b#" + hexs[key[2]]+hexs[key[1]]+hexs[key[0]];
    result += code.colors([code, "black"]) + " "
    if((i+1)%6==0)
    {
        console.log(result);
        result="";
    }
}

console.log("---random colors---")
result="";
for (let i = 0; i < 24; ++i) {
    let r = Math.floor(Math.random()*255).toString(16);
    if(r.length == 1)
        r = "0"+r;
    let g = Math.floor(Math.random()*255).toString(16);
    if(g.length == 1)
        g = "0"+g;
    let b = Math.floor(Math.random()*255).toString(16);
    if(b.length == 1)
        b = "0"+b;
    let code = "#" + r + g + b;
    result += code.colors(code) + " "
    if((i+1)%6==0)
    {
        console.log(result);
        result="";
    }
}
console.log("---random colors bg---")
result="";
for (let i = 0; i < 24; ++i) {
    let r = Math.floor(Math.random()*255).toString(16);
    if(r.length == 1)
        r = "0"+r;
    let g = Math.floor(Math.random()*255).toString(16);
    if(g.length == 1)
        g = "0"+g;
    let b = Math.floor(Math.random()*255).toString(16);
    if(b.length == 1)
        b = "0"+b;
    let code = "b#" + r + g + b;
    result += code.colors([code,'black']) + " "
    if((i+1)%6==0)
    {
        console.log(result);
        result="";
    }
}