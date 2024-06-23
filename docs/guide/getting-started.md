# 1.使用篇

## 1. Promise基本使用

> Promise 是 JavaScript 中处理异步操作的一种方式。它是一个代表了异步操作最终完成或者失败的对象。

#### 1.1 创建一个Promise


我们可以通过 new Promise() 来创建一个新的 Promise。这个构造函数接受一个函数作为参数，这个函数接受两个参数：resolve 和 reject，它们是两个函数，由 JavaScript 引擎提供，不需要自己定义。

```javascript
let promise = new Promise((resolve, reject) => {
  // 这里是你的异步操作
  // 当异步操作成功时，你应该调用 resolve 方法
   resolve("成功");
  // 当异步操作失败时，你应该调用 reject 方法
   // reject("失败")
});
```



#### 1.2 使用Promise

> Promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。

Promise 实例生成以后，可以用 then 方法分别指定 Resolved 状态和 Reject 状态的回调函数。

```javascript
promise.then(value => {

  // 这里是当 promise 成功时要执行的代码
  console.log(value)
  // value 是 resolve 方法传入的值
}, error => {
  // 这里是当 promise 失败时要执行的代码
  console.log(error)
  // error 是 reject 方法传入的值
});
```



#### 1.3 Promise链

> then 方法返回的是一个新的 Promise 实例，因此可以采用链式写法。

```javascript
let promise = new Promise(function(resolve, reject) {
 resolve(1);
});

promise.then(function(value) {

 console.log(value); // 1

 return value + 1;

}).then(function(value) {
 console.log(value); // 2
});
```



#### 1.4 错误处理

> 在Promise 链中，如果任何一个 Promise 被 reject，那么整个链条都会立即终止，并且后续的 Promise 不会再执行。

```javascript
let promise = new Promise(function(resolve, reject) {

  // reject('失败')
  resolve('成功')
  // alert(1)
 // throw new Error('test');

});

// 写法1： 使用catch不会
promise.then(function (value) {
    console.log(value)
}).catch(function(error) {
 console.log(error,22);
});
```

#### 1.5 Promise最终只有一种状态

> 你可以把它想象成一个正在进行的比赛。比赛只有两种可能的结果：你赢了（Fulfilled）或者你输了（Rejected）。一旦比赛结果出来，就不能再改变了，无论你之后做什么，结果都是确定的。

```javascript
let promise = new Promise((resolve, reject) => {
    resolve("成功"); // 这里我们 resolve 了 Promise
    reject("失败"); // 这里的 reject 不会有任何效果，因为 Promise 的状态已经确定为 Fulfilled
});

promise.then(value => {
    console.log(value); // 输出 "成功"
}, error => {
    console.log(error); // 这里的代码不会执行
});
```



## 2.Promise实例方法

#### 1.6 all方法

>Promise.all是一个 Promise 静态方法，它接收一个Promise对象的数组，然后返回一个新的Promise对象。这个新的Promise对象会在所有的Promise对象都成功时成功，如果有任何一个Promise对象失败，新的Promise对象就会失败。

```javascript
let promise1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('成功1')
    }, 1000);
  });
let promise2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('成功2')
    }, 1000);
  });
let promise3 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        // resolve('成功3')
        reject('失败')
    }, 1000);
  });


Promise.all([promise1,promise2,promise3]).then((res)=>{
    console.log(res,'res');
}).catch(err=>{
    console.log(err);
})

```

#### 1.7 race方法

> Promise.race 是一个 Promise 静态方法，它接收一个 Promise 对象的数组作为参数，然后返回一个新的 Promise 对象。这个新的 Promise 对象会在数组中的任何一个 Promise 对象的状态变为 fulfilled 或 rejected 时，立即改变自己的状态。
>
> 这意味着，Promise.race 返回的 Promise 对象的状态由最快完成的 Promise 对象决定。如果最快的 Promise 成功了，那么 Promise.race 返回的 Promise 也会成功；如果最快的 Promise 失败了，那么 Promise.race 返回的 Promise 也会失败。

```javascript
let promise1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('成功1')
    }, 1000);
  });
let promise2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('成功2')
    }, 1000);
  });
let promise3 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        // resolve('成功3')
        reject('失败')
    }, 10);
  });


Promise.race([promise1,promise2,promise3]).then((res)=>{
    console.log(res,'res');
}).catch(err=>{
    console.log(err);
})
```

#### 1.8`then()` 方法

用于处理成功的结果。

```javascript
promise.then(function(result) {
    // 处理成功的结果
    console.log(result);
}, function(error) {
    // 处理失败的原因
    console.log(error);
});
```

#### 1.9 `catch()` 方法

用于处理失败的结果。

```javascript
promise.catch(function(error) {
    // 处理失败的原因
    console.log(error);
});
```

#### 1.10 `finally()` 方法

无论结果如何，都会执行的回调。

```javascript
promise.finally(function() {
    // 总是会执行的代码
    console.log("Promise 完成");
});
```

## 3. Promise静态方法

### `Promise.resolve()`

返回一个成功状态的 Promise。

```javascript
let promise = Promise.resolve('成功');
promise.then(function(value) {
    console.log(value); // "成功"
});
```

### `Promise.reject()`

返回一个失败状态的 Promise。

```javascript
let promise = Promise.reject('失败');
promise.catch(function(reason) {
    console.log(reason); // "失败"
});
```



### `Promise.all()`

用于将多个 Promise 实例组合成一个新的 Promise 实例。

```javascript
let promise1 = Promise.resolve(3);
let promise2 = 42;
let promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values); // [3, 42, "foo"]
});
```

### `Promise.race()`

只要其中一个 Promise 完成或失败，就会返回那个 Promise 的结果。

```javascript
let promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});
let promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then(function(value) {
    console.log(value); // "two"
});
```

### `Promise.allSettled()`

等所有的 Promise 都完成后，返回一个包含每个 Promise 结果的数组。

```javascript
let promise1 = Promise.resolve('成功');
let promise2 = Promise.reject('失败');

Promise.allSettled([promise1, promise2]).then(function(results) {
    results.forEach((result) => console.log(result.status));
    // "fulfilled"
    // "rejected"
});
```

### `Promise.any()`

只要其中一个 Promise 成功，就会返回那个 Promise 的结果。

```javascript
let promise1 = Promise.reject('失败');
let promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, '成功');
});

Promise.any([promise1, promise2]).then(function(value) {
    console.log(value); // "成功"
});
```



# 2.手写篇

## 1.手写Promise

### 1.简单实现

```javascript
// 定义一个名为MyPromise的类
class MyPromise {
    // 构造函数接收一个执行器函数作为参数
    constructor (executor) {
        // 初始化状态为"pending"
        this.state = "pending"
        // 初始化值为undefined
        this.value = undefined; 
        // 初始化原因为undefined
        this.reason = undefined;
        // 定义resolve函数
        const resolve = (value)=>{
            // 当状态为"pending"时，改变状态为"fulfilled"并设置值
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value;
            }
        }

        // 定义reject函数
        const reject = (reason)=>{
           // 当状态为"pending"时，改变状态为"rejected"并设置原因
           if (this.state === 'pending') {
            this.state = "rejected"
            this.reason = reason;
           }
        }

        // 执行执行器函数，并将resolve和reject函数作为参数传入
        executor(resolve, reject)
    }

    // 定义then方法，接收两个函数作为参数，分别对应fulfilled和rejected状态
    then (onFulfilled, onRejected) {
        // 当状态为"fulfilled"时，执行onFulfilled函数，并将值作为参数传入
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }

        // 当状态为"rejected"时，执行onRejected函数，并将原因作为参数传入
        if (this.state === 'rejected') {
            onRejected(this.reason)
        }
    }
}

// 导出MyPromise类
module.exports = MyPromise
```

注意：

> 这是一个简单的Promise实现，并没有考虑异步情况

### 2.支持异步

```javascript
class MyPromsie {
    // 构造函数接收一个执行器
    constructor (exector) {
        // 初始化状态为"pending"
        this.state = "pending"
        // 初始化值为undefined
        this.value = undefined; 
        // 初始化原因为undefined
        this.reason = undefined;
        // 初始化成功回调函数队列
        this.onResolvedCallBacks = []
        // 初始化失败回调函数队列
        this.onRejectedCallBacks = []
        // 定义resolve函数
        const resolve = (value)=>{
            // 当状态为"pending"时，改变状态为"fulfilled"，并设置值
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value;
                // 执行所有成功的回调函数
                this.onResolvedCallBacks.forEach(fn=>fn(this.value))
            }
        }

        // 定义reject函数
        const reject = (reason)=>{
           // 当状态为"pending"时，改变状态为"rejected"，并设置原因
           if (this.state === 'pending') {
            this.state = "rejected"
            this.reason = reason;
            // 执行所有失败的回调函数
            this.onRejectedCallBacks.forEach(fn=>fn(this.reason))
           }
        }

        // 执行执行器函数，并将resolve和reject函数传入
        exector(resolve, reject)
    }

    // 定义then方法
    then (onFulfilled, onRejected) {
        // 当状态为"fulfilled"时，执行成功的回调函数
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }

        // 当状态为"rejected"时，执行失败的回调函数
        if (this.state === 'rejected') {
            onRejected(this.reason)
        }

        // 当状态为"pending"时，将成功和失败的回调函数加入对应的队列中
        if (this.state === 'pending') {
            this.onResolvedCallBacks.push(()=> onFulfilled(this.value))
            this.onRejectedCallBacks.push(()=> onRejected(this.reason))
        }
    }
}

// 导出MyPromise类
module.exports = MyPromsie
```

> 这个Promise虽然解决了异步的问题，但是没有解决链式调用的问题

### 3.支持链式调用

```javascript
class MyPromsie {
    // 构造函数接收一个执行器
    constructor(exector) {
        // 初始化状态为"pending"
        this.state = "pending"
        // 初始化值为undefined
        this.value = undefined;
        // 初始化原因为undefined
        this.reason = undefined;
        // 初始化成功回调函数队列
        this.onResolvedCallBacks = []
        // 初始化失败回调函数队列
        this.onRejectedCallBacks = []
        
        // 定义resolve函数
        const resolve = (value) => {
            // 当状态为"pending"时，改变状态为"fulfilled"，并设置值
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value;
                // 执行所有成功的回调函数
                this.onResolvedCallBacks.forEach(fn => fn(this.value))
            }
        }

        // 定义reject函数
        const reject = (reason) => {
            // 当状态为"pending"时，改变状态为"rejected"，并设置原因
            if (this.state === 'pending') {
                this.state = "rejected"
                this.reason = reason;
                // 执行所有失败的回调函数
                this.onRejectedCallBacks.forEach(fn => fn(this.reason))
            }
        }

        // 执行执行器函数，并将resolve和reject函数传入
        exector(resolve, reject)
    }

    // 定义then方法
    then(onFulfilled, onRejected) {
        return new MyPromsie((resolve, reject) => {
            // 当状态为"fulfilled"时，执行成功的回调函数
            if (this.state === 'fulfilled') {
                const x = onFulfilled(this.value)
                try {
                    // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
                    if (x instanceof MyPromsie) {
                        x.then(resolve, reject)
                    } else {
                        // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
                        resolve(x)
                    }
                } catch (error) {
                    // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
                    reject(error)
                }
            }

            // 当状态为"rejected"时，执行失败的回调函数
            if (this.state === 'rejected') {
                const x = onRejected(this.reason)
                try {
                    // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
                    if (x instanceof MyPromsie) {
                        x.then(resolve, reject)
                    }else {
                        // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
                        resolve(x)
                    }
                } catch (error) {
                    // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
                    reject(error)
                }
            }

            // 当状态为"pending"时，将成功和失败的回调函数加入对应的队列中
            if (this.state === 'pending') {
                this.onResolvedCallBacks.push(() => {
                    try {
                        const x = onFulfilled(this.value)
                        // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
                        if (x instanceof MyPromsie) {
                            x.then(resolve, reject)
                        }else {
                            // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
                            resolve(x)
                        }
                    } catch (error) {
                        // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
                        reject(error)
                    }
                })
                this.onRejectedCallBacks.push(() => {
                     try {
                        const x = onRejected(this.reason)
                        // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
                        if (x instanceof MyPromsie) {
                            x.then(resolve, reject)
                        }else {
                            // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
                            resolve(x)
                        }
                    } catch (error) {
                        // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
                        reject(error)
                    }
                })
            }
        })
    }
}

// 导出MyPromise类
module.exports = MyPromsie
```



> 以上代码虽然支持链式调用，但是存在冗余代码,需要把冗余代码进一步封装

冗余代码如下

```javascript
 try {
        // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
        if (x instanceof MyPromsie) {
            x.then(resolve, reject)
        } else {
            // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
            resolve(x)
        }
    } catch (error) {
        // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
        reject(error)
    }
```



封装成如下方法

```javascript
// 处理then方法中回调函数的返回值，并根据返回值的类型决定如何改变新的Promise对象的状态。
function resolvePromise (x, resolve, reject) {
    try {
        // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
        if (x instanceof MyPromsie) {
            x.then(resolve, reject)
        } else {
            // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
            resolve(x)
        }
    } catch (error) {
        // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
        reject(error)
    }
}
```

优化后的完整代码如下

```javascript
class MyPromsie {
    static PEDDING = "PEDDING"
    static FULLFILLED = "FULLFILLED"
    static REJECTED = "REJECTED"
    // 构造函数接收一个执行器
    constructor(exector) {
        // 初始化状态为"pending"
        this.state = MyPromsie.PEDDING
        // 初始化值为undefined
        this.value = undefined;
        // 初始化原因为undefined
        this.reason = undefined;
        // 初始化成功回调函数队列
        this.onResolvedCallBacks = []
        // 初始化失败回调函数队列
        this.onRejectedCallBacks = []
        
        // 定义resolve函数
        const resolve = (value) => {
            // 当状态为"pending"时，改变状态为"fulfilled"，并设置值
            if (this.state === MyPromsie.PEDDING) {
                this.state = MyPromsie.FULLFILLED
                this.value = value;
                // 执行所有成功的回调函数
                this.onResolvedCallBacks.forEach(fn => fn(this.value))
            }
        }

        // 定义reject函数
        const reject = (reason) => {
            // 当状态为"pending"时，改变状态为"rejected"，并设置原因
            if (this.state ===MyPromsie.PEDDING) {
                this.state = MyPromsie.REJECTED
                this.reason = reason;
                // 执行所有失败的回调函数
                this.onRejectedCallBacks.forEach(fn => fn(this.reason))
            }
        }

        // 执行执行器函数，并将resolve和reject函数传入
        exector(resolve, reject)
    }

    // 定义then方法
    then(onFulfilled, onRejected) {
        return new MyPromsie((resolve, reject) => {
            // 当状态为"fulfilled"时，执行成功的回调函数
            if (this.state === MyPromsie.FULLFILLED) {
                const x = onFulfilled(this.value)
                resolvePromise(x, resolve,reject)
            }

            // 当状态为"rejected"时，执行失败的回调函数
            if (this.state === MyPromsie.REJECTED) {
                const x = onRejected(this.reason)
                resolvePromise(x, resolve,reject)
            }

            // 当状态为"pending"时，将成功和失败的回调函数加入对应的队列中
            if (this.state === MyPromsie.PEDDING) {
                this.onResolvedCallBacks.push(() => {

                    const x = onFulfilled(this.value)
                    resolvePromise(x, resolve,reject)
                    
                })
                this.onRejectedCallBacks.push(() => {
                    const x = onRejected(this.reason)
                    resolvePromise(x, resolve,reject)
                })
            }
        })
    }
}


function resolvePromise (x,resolve,reject) {
    try {
        // 如果回调函数返回的是Promise对象，那么需要等待这个Promise对象状态改变后，再执行resolve或reject
        if (x instanceof MyPromsie) {
            x.then(resolve, reject)
        } else {
            // 如果回调函数返回的不是Promise对象，那么直接将返回值作为新的Promise对象的结果
            resolve(x)
        }
    } catch (error) {
        // 如果执行回调函数过程中出现错误，那么新的Promise对象的状态为rejected
        reject(error)
    }
}

// 导出MyPromise类
module.exports = MyPromsie
```

### 4.手写all方法

```javascript
static all (promises) {
    // 返回一个新的Promise对象
    return new Promise((resolve,reject)=>{
        // 初始化计数器，用于跟踪已解决的Promise数量
        let count = 0;
        // 初始化结果数组，用于存储所有Promise的结果
        let result = [];
        // 遍历传入的Promise数组
        for (let i = 0; i < promises.length; i++) {
            // 对每个Promise调用then方法
            promises[i].then(value=>{
                // 当Promise解决时，增加计数器并将结果存储在结果数组中的相应位置
                count++;
                result[i] = value;
                // 如果所有Promise都已解决，那么解决包含所有结果的新Promise
                if (count === promises.length) {
                    resolve(result)
                }
            },reason=>{
                // 如果任何Promise被拒绝，那么拒绝新的Promise并传递原因
                reject(reason)
            })
        }
    
    })
}
```

### 5.手写race方法

```javascript
    // 定义静态race方法
    static race (promises) {
        // 返回一个新的Promise对象
        return new Promise((resolve, reject)=>{
            // 遍历传入的Promise数组
            for (let i = 0; i < promises.length; i++) {
                // 对每个Promise对象调用then方法
                // 当任何一个Promise对象状态改变（无论是fulfilled还是rejected），就会调用resolve或reject方法
                // 这样新的Promise对象的状态就会改变，race方法就会返回
                promises[i].then(resolve, reject)
            }
        })
    }
```

### 6.Promise 3秒钟之后求和

```javascript
function sumAfter3Seconds(...args) {
    // 创建一个新的 Promise
    return new Promise((resolve, reject) => {
        // 使用 setTimeout 来延迟 3 秒
        setTimeout(() => {
            // 计算参数的和
            let sum = args.reduce((a, b) => a + b, 0);
            // 使用 resolve 函数来改变 Promise 的状态为 fulfilled，并传递结果
            resolve(sum);
        }, 3000);
    });
}

// 使用这个函数
sumAfter3Seconds(1, 2, 3, 4, 5).then(value=> {console.log(value)});  // 输出：15
```





## 2.手写浅拷贝

```javascript
function shallowCopy(obj) {
    // 如果obj不是对象或者obj是null，直接返回obj
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 判断obj是数组还是对象，创建一个相应的空数组或对象
    let copy = Array.isArray(obj) ? [] : {};
    // 遍历obj的所有属性
    for (let key in obj) {
        // 如果属性是obj自身的（不是继承来的）
        if (obj.hasOwnProperty(key)) {
            // 将属性复制到新的对象或数组中
            copy[key] = obj[key];
        }
    }

    // 返回新的对象或数组
    return copy;
}
```



## 3.手写深拷贝

```javascript
// 定义一个名为deepCopy的函数，接受一个参数obj
function deepCopy (obj) {
    // 如果obj不是对象或者obj是null，直接返回obj
    // 这是递归的基本情况
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 根据obj是否为数组，创建一个新的空数组或空对象
    let copy = Array.isArray(obj) ? [] : {};

    // 遍历obj的所有属性
    for (let key in obj) {
        // 如果当前属性是obj自身的属性（不是从原型链继承的属性）
        if (obj.hasOwnProperty(key) ) {
            // 如果当前属性的值是一个非null对象，递归调用deepCopy函数
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                copy[key] = deepCopy(obj[key])
            } else {
                // 如果当前属性的值不是对象，直接复制
                copy[key] = obj[key]
            }
        }
    }

    // 返回复制后的对象
    return copy;
}
```



## 4.手写防抖

> 防抖（debounce）的主要思想是：在一定时间内，事件被触发多次，只执行最后一次。

```javascript
/
  防抖函数
  @param {Function} func 需要进行防抖处理的目标函数
  @param {number} delay 延迟时间，单位是毫秒
  @return {Function} 经过防抖处理的函数
 /
function debounce(func, delay) {
  let timer = null; // 声明一个定时器

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function(...args) {
    // 每次触发时清除上一次的定时器
    if(timer) {
      clearTimeout(timer);
    }

    // 然后设置新的定时器，延迟执行用户传入的方法
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
}
```



## 5.手写节流

> 节流（throttle）的主要思想是：在一定时间内，事件被触发多次，只执行第一次。

```javascript
/
  节流函数
  @param {Function} func 需要进行节流处理的目标函数
  @param {number} delay 延迟时间，单位是毫秒
  @return {Function} 经过节流处理的函数
 /
function throttle(func, delay) {
  let lastTime = 0; // 声明一个变量记录上一次执行的时间

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function(...args) {
    // 获取当前时间
    let nowTime = Date.now();

    // 如果当前时间与上一次执行的时间间隔大于设定的延迟时间，则执行函数
    if (nowTime - lastTime > delay) {
      func.apply(this, args);
      // 更新上一次执行的时间
      lastTime = nowTime;
    }
  }
}
```

## 6.手写Object.create

> Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的 __proto__。

```javascript
/
  实现Object.create方法
  @param {Object} proto 要用作原型的对象
  @return {Object} 新创建的对象
 /
function create(proto) {  
  // 创建一个空的构造函数
  function F() {}
  
  // 将构造函数的原型指向传入的对象
  F.prototype = proto;
  
  // 使用构造函数创建一个新的对象，这个新对象的__proto__就指向传入的对象
  const obj = new F();
  // 返回新对象
  return obj;
}
```

## 7.手写instanceof方法

> instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。

```javascript
// 手写instanceof方法
function instanceOf(left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left);

    // 循环判断对象的原型是否等于指定类型的原型，直到对象的原型为null，因为原型链最顶端是null
    while (true) {
        // 如果原型为null，说明检查到了原型链的顶端，返回false
        if (proto === null) return false;

        // 如果原型等于指定类型的原型，返回true
        if (proto === right.prototype) return true;

        // 如果不等于，那么沿着原型链继续向上查找
        proto = Object.getPrototypeOf(proto);
    }
}
```



## 8.手写new

```javascript
         // 定义一个myNew函数，模拟new操作符的行为
         function myNew (constructor, ...args) {
             // 使用Object.create创建一个新对象，该对象的原型指向构造函数的prototype
             let obj = Object.create(constructor.prototype);

             // 使用apply方法调用构造函数，改变this指向新创建的对象，并传入参数
             let result = constructor.apply(obj, args )

             // 如果构造函数返回的是一个对象，则返回该对象，否则返回新创建的对象
             return typeof result === 'object' ? result : obj;
         }

         // 定义一个Person构造函数
         function Person (name) {
            // 为实例添加name属性
            this.name = name;
         }

         // 使用myNew函数创建一个Person实例，传入参数'刘德华'
         let p = myNew (Person, '刘德华');

         // 打印创建的实例
         console.log(p);
```

## 9.手写bind

### 1.借助apply实现

```javascript
// 为Function.prototype添加一个myBind方法
// 这个方法接收一个context参数和若干个args参数
Function.prototype.myBind = function (context, ...args) {
    // 保存当前函数的引用
    let self = this;
    // 返回一个新的函数
    return function () {
        // 在新的函数中，使用apply方法调用原函数
        // 并将context作为原函数的上下文
        // 将myBind方法接收的参数和新函数接收的参数一起传递给原函数
        return self.apply(context,[...args, ...arguments])
    }
}
```

### 2.原生JS实现

```javascript
// 为Function.prototype添加一个myBind方法
// 这个方法接收一个context参数和若干个args参数
Function.prototype.myBind = function (context, ...args) {
    // 保存当前函数的引用
    // let self = this;
    context.temp = this;
    // 返回一个新的函数
    return  (...args1) => {
        // 在新的函数中，使用apply方法调用原函数
        // 并将context作为原函数的上下文
        // 将myBind方法接收的参数和新函数接收的参数一起传递给原函数
         context.temp(...args, ...args1)
         delete context.temp;
    }
}

```





## 10.手写call

```javascript
// 在 Function.prototype 上定义 myCall 方法
Function.prototype.myCall = function(context) {
    // 如果没有传入 context 或者 context 是 null，那么 context 默认为全局对象
    context = context || window;

    // 为 context 添加一个临时的方法，这个方法就是当前函数（this 指向当前函数）
    context.temp = this;

    // 获取参数，从第二个参数开始，因为第一个参数是 context
    let args = [...arguments].slice(1);

    // 调用这个临时方法，并传入参数
    let result = context.temp(...args);

    // 删除这个临时方法
    delete context.temp;

    // 返回结果
    return result;
}
```



## 11.手写Apply

```javascript
// 在 Function.prototype 上定义 myApply 方法
Function.prototype.myApply = function(context, arr) {
    // 如果没有传入 context 或者 context 是 null，那么 context 默认为全局对象
    context = context || window;

    // 为 context 添加一个临时的方法，这个方法就是当前函数（this 指向当前函数）
    context.temp = this;

    // 定义一个变量用来保存结果
    let result;

    // 判断是否存在第二个参数
    if (!arr) {
        // 如果不存在第二个参数，直接执行函数
        result = context.temp();
    } else {
        // 如果存在第二个参数，使用 spread operator (...) 将数组展开，然后传入函数
        result = context.temp(...arr);
    }

    // 删除这个临时方法
    delete context.temp;

    // 返回结果
    return result;
}
```



## 12.循环打印红黄绿灯

红灯3秒亮一次，绿灯1s亮一次，黄灯2s亮一次，如何让三个灯不断交替重复亮灯

```javascript
// 定义一个函数，用于返回一个在指定时间后解析的Promise
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

// 定义一个异步函数，用于循环打印红黄绿灯
async function loopLight() {
    while (true) { // 使用while(true)来创建一个无限循环
        console.log('红灯'); // 打印红灯
        await delay(3000); // 等待3秒
        console.log('绿灯'); // 打印绿灯
        await delay(1000); // 等待1秒
        console.log('黄灯'); // 打印黄灯
        await delay(2000); // 等待2秒
    }
}

// 调用函数
loopLight();
```

## 13.递归实现斐波那契数列

```javascript
// 定义斐波那契数列的递归函数
function fibonacci(n) {
    // 基本情况：n为0或1时，斐波那契数列的值就是n本身
    if (n <= 1) {
        return n;
    }
    // 递归情况：n大于1时，斐波那契数列的值是前两项的和
    else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

// 使用这个函数
console.log(fibonacci(10));  // 输出：55
```



## 14.冒泡排序

```javascript
// 定义冒泡排序函数
function bubbleSort(arr) {
    // 外层循环控制所有的回合
    for(let i = 0; i < arr.length - 1; i++) {
        // 内层循环控制每一轮的冒泡处理
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {
                 // 如果前一个元素大于后一个元素，则交换他们
          		 [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    // 返回排序后的数组
    return arr;
}

// 使用这个函数
console.log(bubbleSort([5, 3, 8, 4, 6]));  // 输出：[3, 4, 5, 6, 8]
```

## 15.快速排序

```javascript
  // 定义快速排序函数
        function quickSort(arr) {
            // 如果数组长度小于等于1，无需排序，直接返回
            if (arr.length <= 1) {
                return arr;
            }

            // 选择一个基准元素，这里我们选择数组的中间元素
            const middleIndex = Math.floor(arr.length / 2);
            const middle = arr.splice(middleIndex, 1)[0];

            // 定义两个数组，left用于存放比基准元素小的元素，right用于存放比基准元素大的元素
            const left = [];
            const right = [];

            // 遍历数组，进行划分
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < middle) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }

            // 递归地对左右子数组进行快速排序，然后合并结果
            return [...quickSort(left),middle, ...quickSort(right)]
        }

        // 使用这个函数
        console.log(quickSort([5, 3, 8, 4, 6]));  // 输出：[3, 4, 5, 6, 8]
```



## 16.Promise实现3秒后函数参数求和

```javascript
// 定义一个函数，该函数接受两个参数a和b
function sumAfter3Seconds(a, b) {
  // 返回一个新的Promise对象
  return new Promise((resolve, reject) => {
    // 使用setTimeout函数，设置3秒后执行的代码
    setTimeout(() => {
      // 检查输入的参数a和b是否都是数字
      if (typeof a === 'number' && typeof b === 'number') {
        // 如果是，那么调用resolve函数，将a和b的和作为Promise的结果
        resolve(a + b);
      } else {
        // 如果不是，那么调用reject函数，将错误信息作为Promise的结果
        reject('无效输入');
      }
    }, 3000); // 设置延迟时间为3秒
  });
}
```

```javascript
sumAfter3Seconds(1, 2)
  .then(sum => console.log(sum)) // 如果Promise成功，打印结果
  .catch(error => console.log(error)); // 如果Promise失败，打印错误信息
```

## 17.Promise应用：图片异步加载

```javascript
// 定义一个函数，该函数接受一个url作为参数
function loadImage(url) {
  // 返回一个新的Promise对象
  return new Promise((resolve, reject) => {
    // 创建一个新的Image对象
    let image = new Image();

    // 当图片加载成功时，调用resolve函数，将Image对象作为Promise的结果
    image.onload = function() {
      resolve(image);
    };

    // 当图片加载失败时，调用reject函数，将错误信息作为Promise的结果
    image.onerror = function() {
      reject(new Error('无法加载图片 ' + url));
    };

    // 设置图片的源为传入的url
    image.src = url;
  });
}
```

````javascript
loadImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F2eb217dc-f9a0-4b7a-896e-b1d8db766d8c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1696548898&t=8957321ea32cf51845e76eb9fcf2083d')
  .then(image => {
    // 如果Promise成功，将图片添加到body中
    document.body.appendChild(image);
  })
  .catch(error => {
    // 如果Promise失败，打印错误信息
    console.log(error);
  });
````

## 18.1实现Sleep函数（使用Promise封装setTimeout）

```javascript
// 定义一个sleep函数，接受一个参数ms，表示延迟的毫秒数
function sleep(ms) {
  // 返回一个新的Promise对象
  return new Promise((resolve) => {
    // 使用setTimeout函数，设置ms毫秒后执行的代码
    setTimeout(() => {
      // ms毫秒后，调用resolve函数，表示Promise已经完成
      resolve();
    }, ms);
  });
}
```

```javascript
sleep(1000).then(() => {
  console.log('1秒后打印这行');
});
```



## 19. 1秒后打印1,2秒后打印2,3秒后打印3重复交替打印下去

分别使用callback、promise、async、await3种方式实现

### 1.callback 实现

```javascript
// 定义一个函数，该函数接受一个数字n和一个回调函数callback作为参数
function printAfterNSeconds(n, callback) {
  // 使用setTimeout函数，设置n秒后执行的代码
  setTimeout(() => {
    // n秒后，调用callback函数，将n作为参数
    callback(n);
    // 递归调用printAfterNSeconds函数，实现交替打印
    printAfterNSeconds(n % 3 + 1, callback);
  }, n *1000);
}
// 调用printAfterNSeconds函数，开始打印
printAfterNSeconds(1, console.log);
```



### 2.promise实现

```javascript
// 定义一个名为sleep的函数，该函数接受一个参数ms（毫秒）
function sleep(ms) {
    // 返回一个新的Promise对象
    return new Promise((resolve, reject) => {
        // 使用setTimeout函数，设置ms毫秒后执行resolve函数
        setTimeout(resolve, ms);
    });
}

// 定义一个名为printAfterNSeconds的函数，该函数接受一个参数n（秒）
function printAfterNSeconds(n) {
    // 调用sleep函数，等待1000毫秒（1秒）
    sleep(n*1000).then(() => {
        // 等待结束后，打印参数n
        console.log(n);
        // 递归调用printAfterNSeconds函数，参数为(n % 3) + 1
        printAfterNSeconds((n % 3) + 1);
    });
}

// 调用printAfterNSeconds函数，参数为1
printAfterNSeconds(1);
```



### 3.async、await

```javascript
async function printNumbers() {
    let i = 1;
    // 无限循环
    while (true) {
        // 每隔i秒（i在1,2,3之间循环）执行一次
        await new Promise(resolve => setTimeout(resolve, i*1000));
        // 打印当前的i值
        console.log(i);
        // 更新i的值，使其在1,2,3之间循环
        i = (i % 3) + 1;
    }
}

// 调用printNumbers函数
printNumbers();
```

## 20. 递归取出每个菜单的id

```javascript
        // 定义一个函数getIds，参数为menu
        function getIds(menu) {
            // 初始化一个空数组ids，用于存储id
            let ids = [];
            // 如果menu对象有id属性
            if (menu.id) {
                // 将id添加到ids数组中
                ids.push(menu.id);
            }
            // 如果menu对象有children属性
            if (menu.children) {
                // 遍历menu的children数组
                for (let child of menu.children) {
                    // 对每个child对象，递归调用getIds函数，并将返回的id数组合并到ids数组中
                    ids.push(...getIds(child));
                }
            }
            // 返回ids数组
            return ids;
        }

        // 定义一个menu对象，包含id、name和children属性
        let menu = {
            id: 1, // id属性
            name:"系统管理", // name属性
            children: [ // children属性，是一个数组，包含多个子菜单对象
                {
                    id: 2,
                    name:"用户管理",
                    children: [ // 子菜单对象也可以有自己的children属性
                        {
                            id: 3,
                            name:"添加用户"
                        },
                        {
                            id: 4,
                            name:"修改用户"
                        }
                    ]
                },
                {
                    id: 5 ,
                    name:"角色管理"
                }
            ]
        };
```

## 21.递归-数组扁平化输出

```javascript
        // 定义一个函数 flattenArray，它接受一个数组作为参数
        function flattenArray(arr) {
            // 使用 reduce 方法对数组进行迭代
            // reduce 方法接受一个回调函数，该函数有两个参数：累加器（acc）和当前值（val）
            // 累加器是上一次调用回调时返回的值，或者是提供的初始值（这里是一个空数组 []）
            // 当前值是数组中正在处理的元素
            return arr.reduce((acc, val) => 
                // 如果当前值是一个数组，那么递归调用 flattenArray 函数
                // 并将返回的结果（一个扁平化的数组）与累加器合并
                Array.isArray(val) ? acc.concat(flattenArray(val)) 
                // 如果当前值不是一个数组，那么直接将其与累加器合并
                : acc.concat(val), 
                // 初始值是一个空数组
                []);
        }
        // 定义一个嵌套数组
        let arr = [1, [2, [3, 4], 5], 6];
```

## 22.递归-数组求和

```javascript
function sumArray(arr) {
    // 基本情况：如果数组为空，那么和就是0
    if (arr.length === 0) {
        return 0;
    } else {
        // 递归情况：将数组的第一个元素与剩余部分的和相加
        // 使用 slice(1) 获取数组的剩余部分
        return arr[0] + sumArray(arr.slice(1));
    }
}

let arr = [1, 2, 3, 4, 5];
console.log(sumArray(arr)); // 输出: 15
```

## 23.递归组件

### 1.vue2写法

在App.vue

```vue
<template>
  <div id="app">
    <!-- 如果menu存在，则显示MenuComponent组件，并将menu作为属性传递 -->
    <MenuComponent v-if="menu" :menu="menu" />
  </div>
</template>

<script>
// 导入MenuComponent组件
import MenuComponent from './components/menu-component.vue';

export default {
  name: 'App',
  components: {
    // 注册MenuComponent组件
    MenuComponent
  },
  data () {
     return {
      // 定义menu数据
      menu: [
        {
          id: 1,
          name: '系统管理',
          children: [
            {
              id: 2,
              name: '用户管理',
              children: [
                {
                  id: 3,
                  name: '添加用户'
                },
                {
                  id: 4,
                  name: '修改用户'
                }
              ]
            },
            {
              id: 5,
              name: '角色管理'
            }
          ]
        }
      ]
     }
  }
}
</script>
```



在components/menu-component.vue

```vue
<template>
    <div>
        <!-- 如果菜单存在，显示菜单列表 -->
        <ul v-if="menu">
            <!-- 遍历菜单项 -->
            <li v-for="item in menu" :key="item.id">
                <!-- 显示菜单项名称 -->
                {{ item.name }}
                <!-- 如果菜单项有子菜单，递归显示子菜单 -->
                <menu-component  v-if="item.children" :menu="item.children"></menu-component>
                
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"MenuComponent",
        props:{
            // 接收一个必要的菜单数组作为属性
            menu:{
                type:Array,
                required:true
            }
        }
    }
</script>
```

### 2.vue3写法

app.vue

```vue
<template>
  <!-- 应用主体 -->
  <div id="app">
    <!-- 如果菜单存在，渲染菜单组件 -->
    <MenuComponent v-if="menu" :menu="menu" />
  </div>
</template>

<script setup>
// 导入菜单组件
import MenuComponent from './components/menu-component.vue';
// 导入vue的ref函数
import {ref} from 'vue'
// 定义菜单数据
 const menu = ref([
      {
        // 系统管理菜单项
        id: 1,
        name: '系统管理',
        children: [
          {
            // 用户管理子菜单
            id: 2,
            name: '用户管理',
            children: [
              {
                // 添加用户选项
                id: 3,
                name: '添加用户'
              },
              {
                // 修改用户选项
                id: 4,
                name: '修改用户'
              }
            ]
          },
          {
            // 角色管理菜单项
            id: 5,
            name: '角色管理'
          }
        ]
      }
    ]);
</script>

```



components/men-components.vue

```vue
<template>
    <!-- 定义无序列表 -->
    <ul>
      <!-- 列表项，使用v-for循环遍历menu数组 -->
      <li v-for="item in menu" :key="item.id">
        <!-- 显示菜单项名称 -->
        {{ item.name }}
        <!-- 如果菜单项有子菜单，递归调用menu-component组件 -->
        <menu-component v-if="item.children" :menu="item.children"></menu-component>
      </li>
    </ul>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'  
  defineProps({
    menu: {
      type: Array,
      required: true
    }
  })
  
  </script>
```



## 24.日期格式化

> '2-digit' 是一个选项，它表示在格式化输出时，如果数字的位数少于2位，那么将在数字前面补0，以确保总是输出2位数字。

```javascript
        // 定义一个名为formatDate的函数，接受两个参数：date和pattern
        function formatDate(date, pattern) {
            // 创建一个options对象，包含年、月、日的格式
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            // 如果pattern字符串中包含'HH'，则在options对象中添加小时的格式
            if (pattern.includes('HH')) options.hour = '2-digit';
            // 如果pattern字符串中包含'mm'，则在options对象中添加分钟的格式
            if (pattern.includes('mm')) options.minute = '2-digit';
            // 如果pattern字符串中包含'ss'，则在options对象中添加秒的格式
            if (pattern.includes('ss')) options.second = '2-digit';
            // 使用toLocaleDateString方法将date转换为指定格式的字符串，然后使用replace方法将所有的'/'替换为'-'
            return new Date(date).toLocaleDateString('zh-CN', options).replace(/\//g, '-');
        }
        // 调用formatDate函数，并将当前日期和指定的格式字符串作为参数传入，然后打印返回的结果
        console.log(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
```

## 25.数据脱敏-手机号的中间4位替换成



```javascript
        // 定义一个函数maskPhoneNumber，接受一个参数phoneNumber
        function maskPhoneNumber(phoneNumber) {
            // 使用正则表达式替换phoneNumber中的数字，将中间四位数字替换为
            // 正则表达式(\d{3})\d{4}(\d{4})表示匹配三位数字，然后是四位数字，然后是四位数字
            // $1$2表示将匹配到的第一组和第三组数字保留，中间四位数字替换为
            return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }

        // 调用maskPhoneNumber函数，传入一个电话号码字符串，然后打印结果
        console.log(maskPhoneNumber('13812345678'));  // 输出: 1385678
```

## 26.手写Vue2双向数据绑定

1. observe 函数
2. Observer 类
3. defineReactive 函数
4. 对象的创建和观察

### 1.observe 函数

```javascript
// 1. observe函数用于观察一个对象
function observe(obj) {
    // 如果obj不是对象或者是null，那么直接返回
    if (typeof obj !== 'object' || obj === null) {
        return;
    }

    // 创建一个Observer实例，用于观察对象
    new Observer(obj);
}
```

### 2.Observer 类

```javascript
// 2. Observer类，用于观察对象
class Observer {
    // 构造函数接收一个value参数
    constructor(value) {
        // 调用walk方法，遍历value对象的所有属性
        this.walk(value);
    }

    // walk方法，用于遍历对象的所有属性
    walk(obj) {
        // 遍历对象的所有属性，对每个属性调用defineReactive方法
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }
}
```

### 3.defineReactive 函数

```javascript
  // defineReactive函数，用于定义一个响应式的属性
        function defineReactive(obj, key, val) {
            // 对val进行观察，实现深度监听
            observe(val); 
            // 使用Object.defineProperty方法，定义一个响应式的属性
            Object.defineProperty(obj, key, {
                // getter方法，用于获取属性值
                get() {
                    return val;
                },
                // setter方法，用于设置属性值
                set(newVal) {
                    // 如果新的值和旧的值不同
                    if (newVal !== val) {
                        // 对新的值进行观察，如果新的值是对象，也需要监听
                        observe(newVal); 
                        // 更新属性值
                        val = newVal;
                        // 通知更新，打印日志
                        console.log(`set ${key}: ${newVal}`);
                    }
                }
            });
        }
```

### 4.对象的创建和观察

```javascript
// 4. 创建一个对象并进行观察
let data = { name: 'Vue', age: { number: 20 } };
// 对对象进行观察
observe(data);
// 修改对象的属性值
data.name = 'Vue2';
data.age.number = 21;
```

### 5.完整代码

```javascript
        // observe函数用于观察一个对象
        function observe(obj) {
            // 如果obj不是对象或者是null，那么直接返回
            if (typeof obj !== 'object' || obj === null) {
                return;
            }

            // 创建一个Observer实例，用于观察对象
            new Observer(obj);
        }

        // Observer类，用于观察对象
        class Observer {
            // 构造函数接收一个value参数
            constructor(value) {
                // 调用walk方法，遍历value对象的所有属性
                this.walk(value);
            }

            // walk方法，用于遍历对象的所有属性
            walk(obj) {
                // 遍历对象的所有属性，对每个属性调用defineReactive方法
                Object.keys(obj).forEach(key => {
                    defineReactive(obj, key, obj[key]);
                });
            }
        }

        // defineReactive函数，用于定义一个响应式的属性
        function defineReactive(obj, key, val) {
            // 对val进行观察，实现深度监听
            observe(val); 
            // 使用Object.defineProperty方法，定义一个响应式的属性
            Object.defineProperty(obj, key, {
                // getter方法，用于获取属性值
                get() {
                    return val;
                },
                // setter方法，用于设置属性值
                set(newVal) {
                    // 如果新的值和旧的值不同
                    if (newVal !== val) {
                        // 对新的值进行观察，如果新的值是对象，也需要监听
                        observe(newVal); 
                        // 更新属性值
                        val = newVal;
                        // 通知更新，打印日志
                        console.log(`set ${key}: ${newVal}`);
                    }
                }
            });
        }

        // 创建一个对象
        let data = { name: 'Vue', age: { number: 20 } };
        // 对对象进行观察
        observe(data);
        // 修改对象的属性值
        data.name = 'Vue2';
        data.age.number = 21;
```

## 27.手写Vue3双向数据绑定

```javascript
// observe函数用于观察一个对象
function observe(obj) {
    // 如果obj不是对象或者是null，那么直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 创建一个Proxy实例，用于观察对象
    return new Proxy(obj, {
        get(target, key) {
            return observe(target[key]);
        },
        set(target, key, value) {
            // 如果新的值和旧的值不同
            if (value !== target[key]) {
                // 对新的值进行观察，如果新的值是对象，也需要监听
                observe(value);
                // 更新属性值
                target[key] = value;
                // 通知更新，打印日志
                console.log(`set ${key}: ${value}`);
            }
            
            // 表示属性的赋值操作已经成功完成。
            return true;
        }
    });
}

// 创建一个对象
let data = { name: 'Vue', age: { number: 20 } };
// 对对象进行观察
data = observe(data);
// 修改对象的属性值
data.name = 'Vue2';
data.age.number = 21;
```

## 27.其他手写代码

### 1.实现数组的flat方法

```javascript
 // 定义一个函数，名为flatArray，参数为arr
        function flatArray (arr) {
            // 使用reduce方法对数组进行遍历，acc为累计值，val为当前值
            // 如果当前值是数组，则递归调用flatArray函数，将返回的结果与累计值进行合并
            // 如果当前值不是数组，则直接与累计值进行合并
            return arr.reduce((acc,val)=> Array.isArray(val) ? acc.concat(flatArray(val)) : acc.concat(val), [])
        }
        
        // 调用flatArray函数，参数为一个包含多层嵌套的数组
        // 打印flatArray函数的返回结果
        console.log(flatArray([10,[20,30], 20]));
```

### 2.实现数组的push方法

```javascript
        // 在Array的原型上定义一个名为myPush的方法
        Array.prototype.myPush = function () {
            // 遍历传入的参数
            for (let i = 0; i< arguments.length; i++) {
                // 将参数添加到数组的末尾
                this[this.length] = arguments[i]
            }
            // 返回新的数组长度
            return this.length;
        }
        // 定义一个数组
        let arr = [1,2,3]

        // 调用自定义的myPush方法，将4和5添加到数组的末尾
        var r = arr.myPush(4,5)
        // 打印新的数组和新的数组长度
        console.log(arr, r);
```

### 3.实现数组的filter方法

```javascript
        // 在Array的原型上添加一个名为myFilter的方法，参数为callback
        Array.prototype.myFilter = function (callback) {
            // 初始化一个新的数组
            let newArr = []
            // 遍历当前数组
            for (let i = 0; i< this.length; i++) {
                // 如果callback函数返回真值，将当前元素添加到新数组中
                if (callback(this[i],i, this)){
                    newArr.push(this[i])
                }
            }
            // 返回新数组
            return newArr
        }

        // 定义一个数组
        let arr = [1,2,3]

        // 使用自定义的myFilter方法过滤数组，保留大于1的元素
        const newArr = arr.myFilter(item=> item > 1)
        // 打印新数组
        console.log(newArr);
```

### 4.实现数组的map方法

 ```javascript
        // 在Array的原型上定义一个新的方法myMap，接收一个回调函数作为参数
        Array.prototype.myMap = function (callback) {
            // 初始化一个新的空数组
            let newArr = []
            // 遍历当前数组
            for (let i = 0; i< this.length; i++) {
                // 将回调函数的返回值添加到新数组中
                // 回调函数接收当前元素、当前索引和原数组作为参数
                newArr.push(callback(this[i],i, this))
            }
            // 返回新数组
            return newArr
        }

        // 定义一个数组
        let arr = [1,2,3]

        // 使用自定义的myMap方法对数组进行处理，将每个元素乘以2
        const newArr = arr.myMap(item=> item * 2 )
        // 打印处理后的新数组
        console.log(newArr);
 ```



### 5.实现字符串的repeat方法

 ```javascript
        // 在String的原型上添加一个名为myRepeat的方法，参数为count
        String.prototype.myRepeat = function (count) {
            // 初始化一个空字符串str
            let str = ""
            // 使用for循环，循环次数为count
            for (let i = 0; i < count; i++) {
                // 在每次循环中，将当前字符串（this）添加到str后面
                str += this;
            }
            // 返回拼接后的字符串str
            return str;
        }

        // 调用"abc"字符串的myRepeat方法，参数为3，打印返回结果
        console.log("abc".myRepeat(3))
 ```

### 6.实现字符串反转

```javascript
String.prototype.reverse = function() {
    // 使用split方法将字符串转换为字符数组
    // 使用reverse方法反转字符数组
    // 使用join方法将字符数组重新组合为字符串
    return this.split('').reverse().join('');
}

console.log("abc".reverse()); // 输出：cba
```

### 7.将数字每千分位用逗号隔开

```javascript
        // 定义一个名为formatNumber的函数，参数为num
        function formatNumber(num) {
            // 使用toLocaleString方法将数字转换为本地化的字符串
            // 这通常会在数字中添加逗号作为千位分隔符
            return num.toLocaleString();
        }

        // 调用formatNumber函数，参数为1234567890
        // 打印formatNumber函数的返回结果
        // 输出 "1,234,567,890"
        console.log(formatNumber(1234567890));  
```



## 28.斐波那契

### 1.递归实现

```javascript
// 定义一个函数，名为fibonacci，参数为n
function fibonacci(n) {
    // 如果n小于等于1，直接返回n
    if (n <= 1) {
        return n;
    } else {
        // 否则，返回前两个斐波那契数的和
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

// 调用fibonacci函数，参数为10
// 打印fibonacci函数的返回结果
console.log(fibonacci(10));  // 输出：55
```

### 2.动态规划

```javascript
// 定义一个名为fibonacci的函数，参数为n
function fibonacci(n) {
    // 初始化一个数组fib，包含两个元素0和1，这是斐波那契数列的前两个数
    let fib = [0, 1];
    // 从2开始，到n结束，遍历这个范围内的每一个数
    for (let i = 2; i <= n; i++) {
        // 对于每一个数i，它的值是数组fib中前两个数的和
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    // 返回数组fib中的第n个数，这就是斐波那契数列的第n个数
    return fib[n];
}
// 调用fibonacci函数，参数为10，打印返回的结果
console.log(fibonacci(10));  // 输出：55
```



# 3.力扣题

## 1.[1. 两数之和](https://leetcode.cn/problems/two-sum/)

### 1.前置知识map


以下是 Map 的一些基本用法：

```javascript
//创建 Map
let map = new Map();
//设置键值对
map.set('name', 'John');
map.set(1, 'num1');
map.set(true, 'bool1');
 //获取键值
console.log(map.get('name')); 
console.log(map.get(1)); 
console.log(map.get(true)); 
// 检查键是否存在
console.log(map.has('name'));
// 获取 Map 的大小
console.log(map.size); 
// 删除键值对
map.delete('name')
console.log(map.has('name')); 
// 清空 Map
map.clear();
console.log(map.size);
// 遍历 Map
for (let [key, value] of map) { 
    console.log(key, value);
}
```



 ```javascript
// 两数之和
// 定义两数之和函数，输入为一个数组和一个目标值
 function twoSum (nums,target) {
    // 创建一个新的Map对象
     const map = new Map()
     // 遍历输入的数组
     for (let i = 0; i<nums.length;i++) {
        // 如果Map对象中有目标值减去当前元素的值
         if (map.has(target - nums[i])) {
            // 打印Map对象
              // 返回Map对象中目标值减去当前元素的值的值和当前元素的索引
               return [map.get(target - nums[i]), i]
            }else {
                      // 否则在Map对象中设置当前元素的值和索引
                         map.set(nums[i], i)
                 }
         }  
       return []
 }

// 打印调用两数之和函数的结果
 console.log( twoSum([6,3, 4,7, 5,8], 10));
 ```

## 2.[ 回文数](https://leetcode.cn/problems/palindrome-number/)

给你一个整数 `x` ，如果 `x` 是一个回文整数，返回 `true` ；否则，返回 `false` 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

- 例如，`121` 是回文，而 `123` 不是。

### 1. 字符串操作方式

```javascript
function isPalindrome(x) {
    // 将整数转换为字符串
    let str = x.toString();
    // 反转字符串
    let reversedStr = str.split('').reverse().join('');
    // 比较原始字符串和反转后的字符串
    return str === reversedStr;
}
```

### 2.双指针完成

``` javascript
        var isPalindrome = function (x) {
            // 将输入转换为字符串
            let str = x.toString()
            // 获取字符串的长度
            for (let i = 0,len = str.length; i < len; i++) {
                // 比较字符串的前后字符，如果不相等，则返回false
                if (str[i] !== str[len-1 -i]) {
                    return false
                }
            }
            // 如果所有的前后字符都相等，那么这个字符串就是一个回文，返回true
            return true
            
        };
        // 测试函数，输入121，期望输出true
        console.log(isPalindrome(121));
```

## 3.[两个数组的交集 ](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)

给你两个整数数组 `nums1` 和 `nums2` ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

 

**示例 1：**

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
```

**示例 2:**

```
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
```

### 1.数组方法完成

```javascript
var intersect = function(nums1, nums2) {
    return nums1.filter(value => nums2.includes(value));
};
```

注意：这个解决方案并不考虑元素出现的次数

### 2.算法实现

```javascript
// 定义一个名为intersect的函数，接收两个参数nums1和nums2
        var intersect = function (nums1, nums2) {
            // 创建一个空对象map用于存储nums1中的数字及其出现的次数
            var map = {};
            // 创建一个空数组res用于存储交集结果
            var res = [];
            // 遍历nums1
            for (var num of nums1) {
                // 如果map中已经有这个数字，那么将其出现的次数加1
                if (map[num]) {
                    map[num]++;
                } else {
                    // 如果map中没有这个数字，那么将其出现的次数设为1
                    map[num] = 1;
                }
            }
            console.log(map);
            // 遍历nums2
            for (var num of nums2) {
                // 如果map中有这个数字，并且其出现的次数大于0，那么将其添加到res中，并将其在map中的出现次数减1
                if (map[num] && map[num] > 0) {
                    res.push(num);
                    map[num]--;
                }
            }
            // 返回交集结果
            return res;
        };

        console.log(intersect([1,2,2,1], [2,2]));
```

## 4.[删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

给你一个 **升序排列** 的数组 `nums` ，请你**[ 原地](http://baike.baidu.com/item/原地算法)** 删除重复出现的元素，使每个元素 **只出现一次** ，返回删除后数组的新长度。元素的 **相对顺序** 应该保持 **一致** 。然后返回 `nums` 中唯一元素的个数。

```javascript
function removeDuplicates(nums) {
    // 如果数组长度为0，直接返回0
    if(nums.length == 0) return 0;
    // 初始化一个指针i
    let i = 0;
    // 从数组的第二个元素开始遍历
    for(let j = 1; j < nums.length; j++) {
        // 如果当前元素和指针i指向的元素不同
        if(nums[j] != nums[i]) {
            // 将指针i向前移动一位
            i++;
            // 并将当前元素赋值给新的位置
            nums[i] = nums[j];
        }
    }
    // 返回去重后的数组长度
    return i + 1;
}
```

## 5.二叉树

给定一个二叉树 `root` ，返回其最大深度。

二叉树的 **最大深度** 是指从根节点到最远叶子节点的最长路径上的节点数。

 

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：3
```

**示例 2：**

```
输入：root = [1,null,2]
输出：2
```

 

**提示：**

- 树中节点的数量在 `[0, 104]` 区间内。
- `-100 <= Node.val <= 100`

```javascript
// 定义一个二叉树节点
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

// 定义一个函数，用于计算二叉树的最大深度
function maxDepth(root) {
    // 如果节点为空，深度为0
    if (root == null) {
        return 0;
    } else {
        // 计算左子树的最大深度
        let leftHeight = maxDepth(root.left);
        // 计算右子树的最大深度
        let rightHeight = maxDepth(root.right);
        // 返回左右子树深度的最大值加1
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
```

```javascript
// 创建二叉树节点
let node15 = new TreeNode(15);
let node7 = new TreeNode(7);
let node20 = new TreeNode(20, node15, node7);
let node9 = new TreeNode(9);
let root = new TreeNode(3, node9, node20);

// 计算二叉树的最大深度
console.log(maxDepth(root));  // 输出：3
```