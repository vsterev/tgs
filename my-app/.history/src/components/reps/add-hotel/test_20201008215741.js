function test() {
  const arr1 = [
    { id: 3, name: 'tes' },
    { id: 4, name: 'dsf' },
    { id: 5, name: 'fgg' },
  ];
  const modified = arr1.map((a) => a.name);
  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr3 = arr2.map((a) => {
    if (arr1.includes(a)) {
      return { name: a, cheked: true };
    } else {
      return { name: a, cheked: false };
    }
  });
  console.log(arr3);
}
test();
