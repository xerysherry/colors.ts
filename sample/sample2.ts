import {Colors} from '../lib/colors'

console.log('[' + 'INFO'.info +  '] everything is ok!');
console.log('[' + 'DEBUG'.debug +'] wait! something is wrong!');
console.log('[' + 'ERROR'.error + '] ' + 'WTF! ERROR'.error);

Colors.theme({
    info: "bgGreen",
    debug: "bgBlue",
    error: "bgRed",
})

console.log('[' + 'INFO'.info +  '] everything is ok!');
console.log('[' + 'DEBUG'.debug +'] wait! something is wrong!');
console.log('[' + 'ERROR'.error + '] ' + 'WTF! ERROR'.error);