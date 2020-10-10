function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  const numbers = [1, 2, 3, 4, 5];
  return numbers.reduce((r, a) => {
    r + a;
  }, {});
  //   console.log(arr);
}
console.log(test());
