require('../lib/colors');
import util = require('util')
util.promisify(setInterval);

let i = 0;
let j = 0;

setInterval((h:any)=>{
    if(i > 44)
    {
        i = 0;
        console.log(
            "                                             "
            .position(2+i, 2))
    }

    console.log(" ".position(2+i, 2).gray_bg(j));

    let percent = Math.floor((i*25+j)/(44*25)*100);
    console.log((percent +"%  ").position(50, 2).green);

    j = j+1;
    if(j > 25)
    {
        i = i+1;
        j = 0;
    }
}, 1);

console.log("+=============================================+".position(0,0).clear_line)
console.log("|                                             |")
console.log("+=============================================+")

