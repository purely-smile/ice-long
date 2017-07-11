import assert = require('assert');
import {Long} from './';
let {Long:IceLong} = require('ice').Ice;
const isAssert = typeof(describe) !== 'undefined';
interface Parsedata {
  name : string,
  value : string | number,
  high?: number,
  low?: number,
  err?: any
}

interface ToStringData{
  name:string,
  value:any,
  string:string
}

const parseDatas : Parsedata[] = [
  {
    name: '普通数字字符串',
    value: '98282964779689',
    high: 22883,
    low: 1228145321
  }, {
    name: '普通数值',
    value: 98282964779689,
    high: 22883,
    low: 1228145321
  }, {
    name: '数值0',
    value: 0,
    high: 0,
    low: 0
  }, {
    name: '字符串0',
    value: '0',
    high: 0,
    low: 0
  }, {
    name: '无效参数aaa',
    value: 'aaa',
    err: 'long parser 参数无效aaa'
  }
];

const toStringDatas:ToStringData[] = [
  {
    name:'icelong 格式0',
    value:new IceLong(0,0),
    string:'0'
  },
  {
    name:'icelong toString 格式',
    value:'22883:1228145321',
    string:'98282964779689'
  },
  {
    name:'无效字符串原样返回aaaa',
    value:'aaaa',
    string:'aaaa'
  }
]

/**
 * 测试 parse 方法
 * @param val
 */
function testParseLong(val : Parsedata) {
  let {name, value, high, low, err} = val;
  it('parse ' + name, () => {
    if (err) {
      assert.throws(Long.parser.bind(null, value), Error);
    } else {
      let long = Long.parser(value);
      assert.equal(long.low, low);
      assert.equal(long.high, high);
    }
  });
}

/**
 * 测试toStrong方法
 * @param val
 */
function testTostringLong(val:ToStringData){
  let {name,value,string} = val;
    it('toString '+name, () => {
      assert.equal(Long.toString(value), string);
    });
}

isAssert && describe('ice Long 测试', () => {
  parseDatas.forEach(val => {
    testParseLong(val);
  })
  toStringDatas.forEach(val=>{
    testTostringLong(val);
  })

})

!isAssert && console.log(Long.parser('aaa'));