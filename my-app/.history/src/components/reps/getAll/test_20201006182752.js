function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  arr.reduce((r, a) => {
    r[a.make] = [...(r[a.make] || []), a];
    return r;
  });
  return arr;
}
console.log(test());
