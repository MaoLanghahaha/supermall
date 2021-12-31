// 抽取公共函数

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export function debounce (fn, delay) {
  let timer = null;
  return function (...args) { // 可变参数 (param1,param2,param3.....) == (...args)
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}
