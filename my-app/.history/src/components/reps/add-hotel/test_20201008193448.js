function test() {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [3, 4, 5, 6, 7, 8];
  const arr3 = arr2.forEach((a) => {
    if (arr1.includes(a)) {
      return { name: a, cheked: true };
    } else {
      return { name: a, cheked: false };
    }
  });
  console.log(arr3);
}
test();
