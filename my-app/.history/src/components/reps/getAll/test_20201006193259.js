function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  return arr.reduce((r, a) => {
    console.log(r[a['name']]);
  }, {});
  {
  }
  //   console.log(arr);
}
console.log(test());
