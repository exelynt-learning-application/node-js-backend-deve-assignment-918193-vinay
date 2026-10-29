# Understanding the Event Loop & Asynchronous Programming

This repository contains explanations and examples for common asynchronous JavaScript behavior. The goal is to predict the output of snippets and explain why that order happens.

## Key rule

JavaScript runs code on the call stack synchronously. Asynchronous work such as `setTimeout`, Promises, and `await` is deferred to the browser/Node event loop. Microtasks (like Promise callbacks) run before the next macrotask (like timer callbacks).

---

## Example 1: Simple callback timing

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
```

### Output

```txt
A
C
B
```

### Explanation

- `console.log('A')` runs immediately.
- `setTimeout` schedules callback `B` for a future timer phase.
- `console.log('C')` runs immediately.
- When the current script finishes, the event loop processes the timer callback and prints `B`.

---

## Example 2: Promise microtask before timer

```js
console.log('start');
Promise.resolve().then(() => console.log('microtask'));
setTimeout(() => console.log('timeout'), 0);
console.log('end');
```

### Output

```txt
start
end
microtask
timeout
```

### Explanation

- `start` and `end` are synchronous, so they print immediately.
- The Promise callback is a microtask, which runs before the next timer callback.
- After the current JS stack is empty, microtasks run first, so `microtask` prints before `timeout`.

---

## Example 3: `await` defers continuation until microtask queue

```js
async function demo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

demo();
console.log('C');
```

### Output

```txt
A
C
B
```

### Explanation

- `A` runs immediately inside the function.
- `await` pauses the function and schedules the continuation as a microtask.
- The rest of the script continues, so `C` prints next.
- Once the microtask queue is processed, the function resumes and prints `B`.

---

## Example 4: Order with multiple async tasks

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```

### Output

```txt
1
4
3
2
```

### Explanation

- `1` and `4` run synchronously.
- The Promise callback is a microtask, so it runs before the timer callback.
- `3` prints before `2` because microtasks have higher priority than timer callbacks.

---

## Example 5: Nested `setTimeout` and async behavior

```js
console.log('first');

setTimeout(() => {
  console.log('second');
  setTimeout(() => console.log('third'), 0);
}, 0);

console.log('fourth');
```

### Output

```txt
first
fourth
second
third
```

### Explanation

- `first` and `fourth` are synchronous.
- The first timer callback runs later and prints `second`.
- Inside that callback, another timer is scheduled, which runs after the current timer phase completes, so `third` prints after `second`.

---

## Summary

The main idea is:

1. Synchronous code runs first.
2. Promise callbacks run in the microtask queue.
3. Timers and I/O callbacks run in the macrotask queue.
4. Microtasks run before the next timer task.

This is why `Promise.then()` often executes before `setTimeout(..., 0)`.

---

## Short answer

When predicting asynchronous output, remember:

- `console.log()` runs immediately.
- `Promise.then()` / `await` continues in the microtask queue.
- `setTimeout()` runs in a later task queue iteration.

The browser/Node event loop handles these queues in a strict order.
