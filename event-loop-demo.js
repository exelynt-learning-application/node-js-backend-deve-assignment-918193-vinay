const examples = [
  {
    name: 'Simple timer order',
    code: () => {
      console.log('A');
      setTimeout(() => console.log('B'), 0);
      console.log('C');
    },
    expected: ['A', 'C', 'B']
  },
  {
    name: 'Promise before timer',
    code: () => {
      console.log('start');
      Promise.resolve().then(() => console.log('microtask'));
      setTimeout(() => console.log('timeout'), 0);
      console.log('end');
    },
    expected: ['start', 'end', 'microtask', 'timeout']
  },
  {
    name: 'Await pause/resume',
    code: async () => {
      console.log('A');
      await Promise.resolve();
      console.log('B');
    },
    expected: ['A', 'B']
  }
];

for (const example of examples) {
  console.log(`\n--- ${example.name} ---`);
  if (example.code.constructor.name === 'AsyncFunction') {
    example.code().then(() => console.log('async function finished'));
  } else {
    example.code();
  }
}

console.log('\nNote: Promise callbacks run before the next timer callback in the event loop.');
