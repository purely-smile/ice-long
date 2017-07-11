'use strict';
exports.__esModule = true;
var Ice = require('ice').Ice;
var IceLong = Ice.Long;
var Long = (function () {
    function Long() {
    }
    /**
     *
     * @param str 需要被转换成ice long格式字符串
     */
    Long.parser = function (str) {
        if (this.isIceLong(str)) {
            return str;
        }
        else if (/^\d+$/.test(str)) {
            str += '';
            var to = this.to_long(str);
            var rt = this.long_div(to, 16, []);
            rt = rt.reverse();
            var higharr = rt.slice(0, -8) || '0';
            var lowarr = rt.slice(-8) || '0';
            var high = this.to16(higharr);
            var low = this.to16(lowarr);
            return new IceLong(high || 0, low || 0);
        }
        else {
            throw new Error('long parser 参数无效' + str);
        }
    };
    /**
     * 判断是否是ice long
     * @param long
     */
    Long.isIceLong = function (long) {
        return long instanceof IceLong;
    };
    /**
     * 判断是否数ice long toString 后的格式
     * @param longStr '123123:123132
     */
    Long.isIceLongString = function (longStr) {
        return longStr && typeof longStr === 'string' && longStr.match(':');
    };
    /**
     * 支持'11:22'格式字符串，和ice long构造的结构，其他数据原样返回
     * @param str
     */
    Long.toString = function (str) {
        var high;
        var low;
        if (this.isIceLongString(str)) {
            _a = str.split(':'), high = _a[0], low = _a[1];
            high = parseInt(high, 10);
            low = parseInt(low, 10);
        }
        else if (this.isIceLong(str)) {
            var high = str.high, low = str.low;
        }
        else {
            return str;
        }
        high = high || 0;
        low = low || 0;
        var mult = 4294967296;
        var ls_1k = [296, 967, 294, 4];
        var rbs = '';
        var res = low;
        var i;
        for (i = 0; i < 4; i++) {
            res = res + high * ls_1k[i];
            var d = res % 1000 + '';
            res = Math.floor(res / 1000);
            if (res != 0) {
                for (var k = d.length; k < 3; k++) {
                    d = '0' + d;
                }
            }
            rbs = d + rbs;
        }
        if (res != 0) {
            rbs = res % 1000 + '' + rbs;
        }
        return (rbs.replace(/^0*/, '') || '0') + '';
        var _a;
    };
    Long.wrap = function (str) {
        return 'yylong' + this.toString(str) + 'yylong';
    };
    /**
     * JSON.parser 预处理long为对应的字符串
     * @param str json 数据
     */
    Long.json = function (str) {
        if (!str)
            return;
        return str.replace(/:\d{6,}/g, function (num) {
            return ':"' + num.slice(1) + '"';
        });
    };
    /**
     * json数据替换字符串long为对应的数值
     * @param str json 数据
     */
    Long.replace = function (str) {
        return str && str.replace(/"{0,1}yylong"{0,1}/g, '');
    };
    Long.to_long = function (var_src) {
        var nbit_1k = [];
        while (var_src.length >= 4) {
            nbit_1k.push(parseInt(var_src.substr(var_src.length - 4, var_src.length)));
            var_src = var_src.substr(0, var_src.length - 4);
        }
        if (var_src.length >= 0) {
            nbit_1k.push(parseInt(var_src));
        }
        return nbit_1k;
    };
    Long.long_div = function (sr_1k, x, rt) {
        var left = 0;
        var all_0 = true;
        var i;
        for (i = 0; i < sr_1k.length; i++) {
            if (sr_1k[i] != 0) {
                all_0 = false;
            }
        }
        if (all_0)
            return rt;
        for (i = sr_1k.length - 1; i >= 0; i--) {
            var bger = left * 10000 + sr_1k[i];
            sr_1k[i] = parseInt(bger / x + '');
            left = bger % x;
        }
        rt.push(left);
        return this.long_div(sr_1k, x, rt);
    };
    Long.to16 = function (arr) {
        var result = 0;
        result = arr.map(function (num) {
            return new Number(num).toString(16);
        }).join('');
        var num16 = '0x' + result;
        return parseInt(num16);
    };
    return Long;
}());
exports.Long = Long;
