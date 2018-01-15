"use strict";
exports.__esModule = true;
var _codes_base = {
    reset: "\u001B[0m",
    bold: "\u001B[1m",
    dim: "\u001B[2m",
    italic: "\u001B[3m",
    underline: "\u001B[4m",
    inverse: "\u001B[7m",
    hidden: "\u001B[8m",
    strikethrough: "\u001B[9m",
    black: "\u001B[30m",
    red: "\u001B[31m",
    green: "\u001B[32m",
    yellow: "\u001B[33m",
    blue: "\u001B[34m",
    magenta: "\u001B[35m",
    cyan: "\u001B[36m",
    white: "\u001B[37m",
    bg_black: "\u001B[40m",
    bg_red: "\u001B[41m",
    bg_green: "\u001B[42m",
    bg_yellow: "\u001B[43m",
    bg_blue: "\u001B[44m",
    bg_magenta: "\u001B[45m",
    bg_cyan: "\u001B[46m",
    bg_white: "\u001B[47m"
};
var _codes_advanced = {
    lightblack: "\u001B[30;1m",
    lightred: "\u001B[31;1m",
    lightgreen: "\u001B[32;1m",
    lightyellow: "\u001B[33;1m",
    lightblue: "\u001B[34;1m",
    lightmagenta: "\u001B[35;1m",
    lightcyan: "\u001B[36;1m",
    lightwhite: "\u001B[37;1m",
    bg_lightblack: "\u001B[40;1m",
    bg_lightred: "\u001B[41;1m",
    bg_lightgreen: "\u001B[42;1m",
    bg_lightyellow: "\u001B[43;1m",
    bg_lightblue: "\u001B[44;1m",
    bg_lightmagenta: "\u001B[45;1m",
    bg_lightcyan: "\u001B[46;1m",
    bg_lightwhite: "\u001B[47;1m"
};
var _reset_ctrl = _codes_base.reset;
var _color_256bits = "\u001B[38;5;";
var _color_256bits_endl = "m";
var _color_256bits_black = "\u001B[38;5;0m";
var _color_256bits_white = "\u001B[38;5;15m";
var _color_256bits_bg = "\u001B[48;5;";
var _color_256bits_bg_endl = "m";
var _color_256bits_bg_black = "\u001B[48;5;0m";
var _color_256bits_bg_white = "\u001B[48;5;15m";
var _gray_color_startpos = 232;
function _get_gray_code(level) {
    if (_enable) {
        if (level <= 0)
            return _color_256bits_black;
        else if (level >= 25)
            return _color_256bits_white;
        return _color_256bits + (level - 1 + 232).toString() + _color_256bits_endl;
    }
    return '';
}
function _get_gray_bg_code(level) {
    if (_enable) {
        if (level <= 0)
            return _color_256bits_bg_black;
        else if (level >= 25)
            return _color_256bits_bg_white;
        return _color_256bits_bg + (level - 1 + 232).toString() + _color_256bits_bg_endl;
    }
    return '';
}
function _get_256bits_color_code(idx) {
    if (idx < 0)
        idx = 0;
    else if (idx > 255)
        idx = 255;
    return _color_256bits + idx + _color_256bits_endl;
}
function _get_256bits_color_bg_code(idx) {
    if (idx < 0)
        idx = 0;
    else if (idx > 255)
        idx = 255;
    return _color_256bits_bg + idx + _color_256bits_bg_endl;
}
var _0_ascii = 0x30;
var _9_ascii = 0x39;
var _a_ascii = 0x61;
var _f_ascii = 0x66;
function _get_web_safe_code(hexcode, map, list) {
    while (hexcode.length < 6)
        hexcode = '0' + hexcode;
    var code = map[hexcode];
    if (code != null)
        return code;
    for (var i = 0; i < hexcode.length; ++i) {
        var c_1 = hexcode.charCodeAt(i);
        if ((_0_ascii <= c_1 && c_1 <= _9_ascii) ||
            (_a_ascii <= c_1 && c_1 <= _f_ascii))
            continue;
        return "";
    }
    var c = "";
    var m = 0x300;
    var r = parseInt(hexcode[0] + hexcode[1], 16);
    var g = parseInt(hexcode[2] + hexcode[3], 16);
    var b = parseInt(hexcode[4] + hexcode[5], 16);
    for (var i = 0; i < list.length; ++i) {
        var item = list[i];
        var v = Math.abs(item.r - r) +
            Math.abs(item.g - g) +
            Math.abs(item.b - b);
        if (v < m) {
            m = v;
            c = item.c;
        }
    }
    map[hexcode] = c;
    return c;
}
function _get_code(color) {
    if (color.length == 0)
        return "";
    var code = _codes_base[color];
    if (code != null)
        return code;
    code = _codes_advanced[color];
    if (code != null)
        return code;
    color = color.toLowerCase();
    if (color.charAt(0) == "#")
        return _get_web_safe_code(color.slice(1), _color_web_safe_map, _color_web_safe_list);
    else if (color.charAt(0) == 'b' && color.charAt(1) == "#")
        return _get_web_safe_code(color.slice(2), _color_bg_web_safe_map, _color_bg_web_safe_list);
    return code;
}
var _color_web_safe_map = null;
var _color_bg_web_safe_map = null;
var _color_web_safe_list = null;
var _color_bg_web_safe_list = null;
function _color_web_safe_map_init() {
    var hexs = ['00', '33', '66', '99', 'cc', 'ff'];
    var step = 51;
    _color_web_safe_map = {};
    _color_bg_web_safe_map = {};
    _color_web_safe_list = [];
    _color_bg_web_safe_list = [];
    var startpos = 16;
    var key = [0, 0, 0];
    for (var i = 0; i < 216; ++i, ++key[0]) {
        if (key[0] >= 6) {
            key[0] = 0;
            key[1] += 1;
            if (key[1] >= 6) {
                key[1] = 0;
                key[2] += 1;
            }
        }
        var pos = startpos + i;
        _color_web_safe_map[hexs[key[2]] + hexs[key[1]] + hexs[key[0]]] =
            _color_256bits + pos + _color_256bits_endl;
        _color_web_safe_list.push({
            r: key[2] * step,
            g: key[1] * step,
            b: key[0] * step,
            c: _color_256bits + pos + _color_256bits_endl
        });
        _color_bg_web_safe_map[hexs[key[2]] + hexs[key[1]] + hexs[key[0]]] =
            _color_256bits_bg + pos + _color_256bits_bg_endl;
        _color_bg_web_safe_list.push({
            r: key[2] * step,
            g: key[1] * step,
            b: key[0] * step,
            c: _color_256bits_bg + pos + _color_256bits_bg_endl
        });
    }
}
var _default_theme = {
    verbose: "white",
    info: "green",
    warning: "yellow",
    debug: "blue",
    error: "red",
    custom0: "white",
    custom1: "white",
    custom2: "white",
    custom3: "white",
    custom4: "white",
    custom5: "white",
    custom6: "white",
    custom7: "white",
    custom8: "white",
    custom9: "white"
};
var _enable = true;
var _theme = _default_theme;
function _check_reset_end(value) {
    return value.length >= _reset_ctrl.length &&
        value.lastIndexOf(_reset_ctrl) + _reset_ctrl.length == value.length;
}
function _up(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "A";
}
function _down(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "B";
}
function _right(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "C";
}
function _left(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "D";
}
function _next_line(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "E";
}
function _prev_line(n) {
    if (n === void 0) { n = 1; }
    return "\u001B[" + n + "F";
}
function _column(n) { return "\u001B[" + n + "G"; }
function _position(x, y) { return "\u001B[" + y + ";" + x + "H"; }
function _save_position(slot) { return "\u001B[" + slot + "I"; }
function _load_position(slot) { return "\u001B[" + slot + "J"; }
function _codes_init() {
    var _loop_1 = function (key_1) {
        var ctrl = _codes_base[key_1];
        if (ctrl == null)
            return "continue";
        Object.defineProperty(String.prototype, key_1, {
            get: function () {
                if (_enable) {
                    if (_check_reset_end(this))
                        return ctrl + this;
                    else
                        return ctrl + this + _reset_ctrl;
                }
                else
                    return this;
            },
            enumerable: false,
            configurable: false
        });
    };
    for (var key_1 in _codes_base) {
        _loop_1(key_1);
    }
    String.prototype.color_at_256 = function (idx) {
        if (_check_reset_end((this)))
            return _get_256bits_color_code(idx) + this;
        else
            return _get_256bits_color_code(idx) + this + _reset_ctrl;
    };
    String.prototype.color_bg_at_256 = function (idx) {
        if (_check_reset_end((this)))
            return _get_256bits_color_bg_code(idx) + this;
        else
            return _get_256bits_color_bg_code(idx) + this + _reset_ctrl;
    };
    String.prototype.gray = function (level) {
        if (_check_reset_end((this)))
            return _get_gray_code(level) + this;
        else
            return _get_gray_code(level) + this + _reset_ctrl;
    };
    String.prototype.grey = String.prototype.gray;
    String.prototype.gray_bg = function (level) {
        if (_check_reset_end((this)))
            return _get_gray_bg_code(level) + this;
        else
            return _get_gray_bg_code(level) + this + _reset_ctrl;
    };
    String.prototype.grey_bg = String.prototype.gray_bg;
    String.prototype.colors = function (color) {
        return colors(color, this);
    };
    String.prototype.paint = function (pt) {
        return paint(pt, this);
    };
    String.prototype.up = function (n) {
        return _up(n) + this;
    };
    String.prototype.down = function (n) {
        return _down(n) + this;
    };
    String.prototype.right = function (n) {
        return _right(n) + this;
    };
    String.prototype.left = function (n) {
        return _left(n) + this;
    };
    String.prototype.next_line = function (n) {
        return _next_line(n) + this;
    };
    String.prototype.prev_line = function (n) {
        return _prev_line(n) + this;
    };
    String.prototype.column = function (n) {
        return _column(n) + this;
    };
    String.prototype.position = function (x, y) {
        return _position(x, y) + this;
    };
    String.prototype.save_position = function (n) {
        return _save_position(n) + this;
    };
    String.prototype.load_position = function (n) {
        return _load_position(n) + this;
    };
}
function _theme_init() {
    var _loop_2 = function (key_2) {
        var _key = key_2;
        Object.defineProperty(String.prototype, key_2, {
            get: function () {
                if (_enable) {
                    var s = _theme[key_2];
                    if (s == null)
                        return this;
                    return colors(s, this);
                }
                return this;
            },
            enumerable: false,
            configurable: false
        });
    };
    for (var key_2 in _theme) {
        _loop_2(key_2);
    }
}
_color_web_safe_map_init();
_codes_init();
_theme_init();
function colors(color, value) {
    if (_enable) {
        if (typeof (color) == "string") {
            var s = _theme[color];
            if (s != null)
                return colors(s, value);
            var code = _get_code(color);
            if (code == null)
                return value;
            return code + value + _reset_ctrl;
        }
        else {
            var result_1 = value;
            for (var i = color.length - 1; i >= 0; --i) {
                var code = _get_code(color[i]);
                if (code != null)
                    result_1 = code + result_1;
            }
            return result_1 + _reset_ctrl;
        }
    }
    return value;
}
exports.colors = colors;
function enable(value) {
    if (value === void 0) { value = true; }
    _enable = value;
}
exports.enable = enable;
function theme(theme) {
    if (theme === void 0) { theme = _default_theme; }
    if (theme == null)
        _theme = _default_theme;
    else
        _theme = theme;
}
exports.theme = theme;
function replace_all(value, search, replace) {
    if (search == null || search.length == 0)
        return value;
    var idx = -1;
    var array = [];
    while (true) {
        idx = value.indexOf(search);
        if (idx < 0) {
            array.push(value);
            break;
        }
        array.push(value.slice(0, idx));
        array.push(replace);
        value = value.slice(idx + search.length);
    }
    value = "";
    for (var i = 0; i < array.length; ++i) {
        value += array[i];
    }
    return value;
}
function paint(paint, value) {
    if (!_enable || paint == null || value == null || value.length == 0 || paint.length == 0)
        return value;
    var _loop_3 = function (i) {
        var item = paint[i];
        var key_3 = item.key;
        var cs = item.colors;
        if (key_3 == null || cs == null || colors.length == 0)
            return "continue";
        if (typeof (key_3) == "string") {
            value = replace_all(value, key_3, colors(cs, key_3));
        }
        else if (key_3 instanceof RegExp) {
            value = value.replace(key_3, function (ar) {
                return colors(cs, ar);
            });
        }
        else {
            if (key_3.length == 0)
                return { value: value };
            if (typeof (key_3[0]) == "string") {
                for (var idx = 0; idx < key_3.length; ++idx) {
                    var k = key_3[idx];
                    value = replace_all(value, k, colors(cs, k));
                }
            }
            else {
                for (var idx = 0; idx < key_3.length; ++idx) {
                    value = value.replace(key_3[idx], function (ar) {
                        return colors(cs, ar);
                    });
                }
            }
        }
    };
    for (var i = 0; i < paint.length; ++i) {
        var state_1 = _loop_3(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return value;
}
exports.paint = paint;
//# sourceMappingURL=colors.js.map