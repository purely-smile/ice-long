export declare class Long {
    /**
     *
     * @param str 需要被转换成ice long格式字符串
     */
    static parser(str: any): any;
    /**
     * 判断是否是ice long
     * @param long
     */
    static isIceLong(long: any): boolean;
    /**
     * 判断是否数ice long toString 后的格式
     * @param longStr '123123:123132
     */
    static isIceLongString(longStr: any): RegExpMatchArray;
    /**
     * 支持'11:22'格式字符串，和ice long构造的结构，其他数据原样返回
     * @param str
     */
    static toString(str: any): any;
    static wrap(str: any): string;
    /**
     * JSON.parser 预处理long为对应的字符串
     * @param str json 数据
     */
    static json(str: any): any;
    /**
     * json数据替换字符串long为对应的数值
     * @param str json 数据
     */
    static replace(str: any): any;
    private static to_long(var_src);
    private static long_div(sr_1k, x, rt);
    private static to16(arr);
}
