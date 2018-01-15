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

declare global {
    interface String {
        reset: string;
        bold: string;
        dim: string;
        italic: string;
        underline: string;
        inverse: string;
        hidden: string;
        strikethrough: string;

        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        //gray: string;
        //grey: string;

        bg_black: string;
        bg_red: string;
        bg_green: string;
        bg_yellow: string;
        bg_blue: string;
        bg_magenta: string;
        bg_cyan: string;
        bg_white: string;

        //theme
        verbose: string;
        info: string;
        warning: string;
        debug: string;
        error: string;

        custom0: string;
        custom1: string;
        custom2: string;
        custom3: string;
        custom4: string;
        custom5: string;
        custom6: string;
        custom7: string;
        custom8: string;
        custom9: string;

        color_at_256(idx:number):string;
        color_bg_at_256(idx:number):string;
        gray(level:number):string;
        grey(level:number):string;
        gray_bg(level:number):string;
        grey_bg(level:number):string;

        colors(color:string|string[]):string;
        paint(  paint:{
                    key:string|string[]|RegExp|RegExp[], 
                    colors:string|string[]
                }[]):string;

        up(n?:number):string;
        down(n?:number):string;
        right(n?:number):string;
        left(n?:number):string;
        
        next_line(n?:number):string;
        prev_line(n?:number):string;
        column(n:number):string;
        position(x:number, y:number):string;
        save_position(slot:number):string;
        load_position(slot:number):string;
    }
}

declare namespace Colors
{
    export function colors(color: string|string[], value: string):string;
    export function enable(value?: boolean): void;
    export function theme(theme?: {[key:string]:string|string[]}): void;
    export function paint(paint:{key:string|string[]|RegExp|RegExp[], colors:string|string[]}[], value:string):string
}
export = Colors;