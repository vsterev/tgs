function test() {
  const arr1 = [3, 4, 5];
  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
  //   const arr3 = arr2.map((a) => {
  //     if (arr1.includes(a)) {
  //       return { name: a, cheked: true };
  //     } else {
  //       return { name: a, cheked: false };
  //     }
  //   });
  const arr3 = arr2.find((a, i) => arr2[i] === a);
  console.log(arr3);
}
test();
