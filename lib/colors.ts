/* Copyright xerysherry 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const _codes_base: { [key: string]: string } = {
    reset: `\u001b[0m`,

    bold: `\u001b[1m`,
    dim: `\u001b[2m`,
    italic: `\u001b[3m`,
    underline: `\u001b[4m`,
    inverse: `\u001b[7m`,
    hidden: `\u001b[8m`,
    strikethrough: `\u001b[9m`,

    black: `\u001b[30m`,
    red: `\u001b[31m`,
    green: `\u001b[32m`,
    yellow: `\u001b[33m`,
    blue: `\u001b[34m`,
    magenta: `\u001b[35m`,
    cyan: `\u001b[36m`,
    white: `\u001b[37m`,
    //gray: `\u001b[90m`,
    //grey: `\u001b[90m`,

    bg_black: `\u001b[40m`,
    bg_red: `\u001b[41m`,
    bg_green: `\u001b[42m`,
    bg_yellow: `\u001b[43m`,
    bg_blue: `\u001b[44m`,
    bg_magenta: `\u001b[45m`,
    bg_cyan: `\u001b[46m`,
    bg_white: `\u001b[47m`,
};
const _codes_advanced:{ [key: string]: string } = {
    lightblack: `\u001b[30;1m`,
    lightred: `\u001b[31;1m`,
    lightgreen: `\u001b[32;1m`,
    lightyellow: `\u001b[33;1m`,
    lightblue: `\u001b[34;1m`,
    lightmagenta: `\u001b[35;1m`,
    lightcyan: `\u001b[36;1m`,
    lightwhite: `\u001b[37;1m`,

    bg_lightblack: `\u001b[40;1m`,
    bg_lightred: `\u001b[41;1m`,
    bg_lightgreen: `\u001b[42;1m`,
    bg_lightyellow: `\u001b[43;1m`,
    bg_lightblue: `\u001b[44;1m`,
    bg_lightmagenta: `\u001b[45;1m`,
    bg_lightcyan: `\u001b[46;1m`,
    bg_lightwhite: `\u001b[47;1m`,
}
const _reset_ctrl:string = _codes_base.reset

// 256bits
const _color_256bits:string = `\u001b[38;5;`;
const _color_256bits_endl:string = `m`;
const _color_256bits_black:string = `\u001b[38;5;0m`
const _color_256bits_white:string = `\u001b[38;5;15m`
// bg 256bits
const _color_256bits_bg:string = `\u001b[48;5;`;
const _color_256bits_bg_endl:string = `m`;
const _color_256bits_bg_black:string = `\u001b[48;5;0m`
const _color_256bits_bg_white:string = `\u001b[48;5;15m`

const _gray_color_startpos = 232
// gray level at [0,25], 0 is black, and 25 is white
// 26级灰度，0为黑色，25为白色
function _get_gray_code(level:number): string {
    if(_enable)
    {
        if(level<=0)
            //黑
            return _color_256bits_black;
        else if(level>=25)
            //白
            return _color_256bits_white;
        return _color_256bits + (level - 1 + 232).toString() + _color_256bits_endl;
    }
    return '';
}
function _get_gray_bg_code(level:number): string {
    if(_enable)
    {
        if(level<=0)
            //黑
            return _color_256bits_bg_black;
        else if(level>=25)
            //白
            return _color_256bits_bg_white;
        return _color_256bits_bg + (level - 1 + 232).toString() + _color_256bits_bg_endl;
    }
    return '';
}
// get 256 colors, idx at [0, 255]
function _get_256bits_color_code(idx:number):string {
    if(idx < 0)
        idx = 0;
    else if(idx > 255)
        idx = 255;
    return _color_256bits + idx + _color_256bits_endl;
}
// get bg 256 colors, idx at [0, 255]
function _get_256bits_color_bg_code(idx:number):string {
    if(idx < 0)
        idx = 0;
    else if(idx > 255)
        idx = 255;
    return _color_256bits_bg + idx + _color_256bits_bg_endl;
}

const _0_ascii = 0x30;
const _9_ascii = 0x39;
const _a_ascii = 0x61;
const _f_ascii = 0x66;

function _get_web_safe_code(hexcode:string, 
                            map:{ [key: string]: string }, 
                            list:{r:number, g:number, b:number, c:string}[])
{
    while(hexcode.length<6)
        hexcode = '0'+hexcode;

    let code = map[hexcode];
    if(code != null)
        return code;
    for(let i=0; i<hexcode.length; ++i)
    {
        let c = hexcode.charCodeAt(i)
        if((_0_ascii <= c && c <= _9_ascii) ||
            (_a_ascii <= c && c <= _f_ascii))
            continue;
        return "";
    }

    let c = "";
    let m = 0x300;
    let r = parseInt(hexcode[0]+hexcode[1], 16);
    let g = parseInt(hexcode[2]+hexcode[3], 16);
    let b = parseInt(hexcode[4]+hexcode[5], 16);
    for(let i=0; i<list.length; ++i)
    {
        let item = list[i];
        let v = Math.abs(item.r - r) + 
                Math.abs(item.g - g) + 
                Math.abs(item.b - b);
        if(v < m)
        {
            m = v;
            c = item.c;
        }
    }
    return c;
}

function _get_code(color:string) {
    if(color.length == 0)
        return "";
    let code = _codes_base[color];
    if(code != null)
        return code;
    code = _codes_advanced[color];
    if(code != null)
        return code;

    color = color.toLowerCase();
    if(color.charAt(0) == "#")
        return _get_web_safe_code(color.slice(1), 
            _color_web_safe_map, _color_web_safe_list);
    else if(color.charAt(0)=='b' && color.charAt(1)=="#")
        return _get_web_safe_code(color.slice(2), 
            _color_bg_web_safe_map, _color_bg_web_safe_list);
    return code;
}                   

let _color_web_safe_map:{ [key: string]: string } = null;
let _color_bg_web_safe_map:{ [key: string]: string } = null;
let _color_web_safe_list:{r:number, g:number, b:number, c:string}[]=null;
let _color_bg_web_safe_list:{r:number, g:number, b:number, c:string}[]=null;

function _color_web_safe_map_init():void {
    let hexs = ['00','33','66','99','cc','ff'];
    let step = 51;
    
    _color_web_safe_map = {};
    _color_bg_web_safe_map = {};
    _color_web_safe_list = [];
    _color_bg_web_safe_list = [];

    let startpos = 16;
    let key:[number, number, number] = [0,0,0];
    for(let i=0; i<216; ++i, ++key[0]) {
        if(key[0]>=6)
        {
            key[0]=0;
            key[1]+=1;
            if(key[1]>=6)
            {
                key[1]=0;
                key[2]+=1;
            }
        }
        let pos = startpos + i;
        _color_web_safe_map[hexs[key[2]]+hexs[key[1]]+hexs[key[0]]] = 
            _color_256bits + pos + _color_256bits_endl;
        _color_web_safe_list.push({
            r:key[2]*step,
            g:key[1]*step,
            b:key[0]*step,
            c:_color_256bits + pos + _color_256bits_endl
         })
        _color_bg_web_safe_map[hexs[key[2]]+hexs[key[1]]+hexs[key[0]]] = 
            _color_256bits_bg + pos + _color_256bits_bg_endl;
        _color_bg_web_safe_list.push({
            r:key[2]*step,
            g:key[1]*step,
            b:key[0]*step,
            c:_color_256bits_bg + pos + _color_256bits_bg_endl
        })
    }
}

const _default_theme:{[key:string]:string|string[]} = {
    verbose: "white",
    info: "green",
    debug: "blue",
    error: "red",
    // custom
    custom0: "white",
    custom1: "white",
    custom2: "white",
    custom3: "white",
    custom4: "white",
    custom5: "white",
    custom6: "white",
    custom7: "white",
    custom8: "white",
    custom9: "white",
}
let _enable:boolean = true;
let _theme:{[key:string]:string|string[]} = _default_theme

function _check_reset_end(value:string):boolean {
    return value.length >= _reset_ctrl.length &&
        value.lastIndexOf(_reset_ctrl) + _reset_ctrl.length == value.length
}

function _up(n:number=1):string { return `\u001b[${n}A`; }
function _down(n:number=1):string { return `\u001b[${n}B`; }
function _right(n:number=1):string { return `\u001b[${n}C`; }
function _left(n:number=1):string { return `\u001b[${n}D`; }
function _next_line(n:number=1):string { return `\u001b[${n}E`; }
function _prev_line(n:number=1):string { return `\u001b[${n}F`; }
function _column(n:number):string { return `\u001b[${n}G`; }
function _position(x:number, y:number):string { return `\u001b[${y};${x}H`; }
function _save_position(slot:number):string { return `\u001b[${slot}I`; }
function _load_position(slot:number):string { return `\u001b[${slot}J`; }

function _codes_init() {
    for (const key in _codes_base) {
        let ctrl = _codes_base[key]
        if (ctrl == null)
            continue;
        Object.defineProperty(String.prototype, key, {
            get: function (): string {
                if(_enable)
                {
                    if(_check_reset_end(<string>this))
                        return ctrl + this;
                    else
                        return ctrl + this + _reset_ctrl;
                }
                else
                    return this;
            },
            enumerable: false,
            configurable: false
        })
    }

    String.prototype.color_at_256 = function(idx:number):string
    {
        if(_check_reset_end(<string>(this)))
            return _get_256bits_color_code(idx) + this;
        else
            return _get_256bits_color_code(idx) + this + _reset_ctrl;
    }

    String.prototype.color_bg_at_256 = function(idx:number):string
    {
        if(_check_reset_end(<string>(this)))
            return _get_256bits_color_bg_code(idx) + this;
        else
            return _get_256bits_color_bg_code(idx) + this + _reset_ctrl;
    }

    String.prototype.gray = function(level:number):string
    {
        if(_check_reset_end(<string>(this)))
            return _get_gray_code(level) + this;
        else
            return _get_gray_code(level) + this + _reset_ctrl;
    }
    String.prototype.grey = String.prototype.gray;

    String.prototype.gray_bg = function(level:number):string
    {
        if(_check_reset_end(<string>(this)))
            return _get_gray_bg_code(level) + this;
        else
            return _get_gray_bg_code(level) + this + _reset_ctrl;
    }
    String.prototype.grey_bg = String.prototype.gray_bg;

    String.prototype.colors = function(color:string|string[]):string
    {
        return Colors(color, this);
    }
    
    String.prototype.paint = function(paint:{key:string|RegExp, colors:string|string[]}[]):string
    {
        return Colors.paint(paint, this);
    }

    String.prototype.up = function(n:number):string
    {
        return _up(n) + this;
    }
    String.prototype.down = function(n:number):string
    {
        return _down(n) + this;
    }
    String.prototype.right = function(n:number):string
    {
        return _right(n) + this;
    }
    String.prototype.left = function(n:number):string
    {
        return _left(n) + this;
    }

    String.prototype.next_line = function(n:number):string
    {
        return _next_line(n) + this;
    }
    String.prototype.prev_line = function(n:number):string
    {
        return _prev_line(n) + this;
    }
    String.prototype.column = function(n:number):string
    {
        return _column(n) + this;
    }
    String.prototype.position = function(x:number, y:number):string
    {
        return _position(x, y) + this;
    }
    String.prototype.save_position = function(n:number):string
    {
        return _save_position(n) + this;
    }
    String.prototype.load_position = function(n:number):string
    {
        return _load_position(n) + this;
    }
}

function _theme_init() {
    for (const key in _theme) {
        let _key = key;
        Object.defineProperty(String.prototype, key, {
            get: function (): string {
                if (_enable) {
                    let s = _theme[key];
                    if (s == null)
                        return this;
                    return Colors(s, this);
                }
                return this;
            },
            enumerable: false,
            configurable: false
        })
    }
}

_color_web_safe_map_init();
_codes_init();
_theme_init();

export function Colors(color: string|string[], value: string):string
{
    if(_enable)
    {
        if(typeof(color) == "string")
        {
            let s:string|string[] = _theme[color]
            if(s != null)
                return Colors(s, value);

            var code = _get_code(color);
            if(code == null)
                return value;
            return code + value + _reset_ctrl;
        }
        else
        {
            let result = value;
            for(let i=color.length - 1; i>=0; --i)
            {
                var code = _get_code(color[i]);
                if(code != null)
                    result = code + result;
            }
            return result + _reset_ctrl;
        }
    }
    return value;
}
export namespace Colors {
    export function enable(value: boolean = true) {
        _enable = value;
    }
    export function theme(theme: {[key:string]:string|string[]} = _default_theme) {
        if(theme == null)
            _theme = _default_theme;
        else
            _theme = theme;
    }
    export function paint(paint:{key:string|RegExp, colors:string|string[], other?:any[]}[], value:string):string {
        if(!_enable || paint == null || value == null || value.length == 0 || paint.length == 0)
            return value;
        for(let i=0; i<paint.length; ++i)
        {
            let item=paint[i];
            let key = item.key;
            let colors = item.colors;
            let other = item.other;

            if(key == null || colors == null || colors.length == 0)
                continue;

            value = value.replace(key, (ar) => {
                return Colors(colors, ar);
            })
        }
        return value;
    }
}

