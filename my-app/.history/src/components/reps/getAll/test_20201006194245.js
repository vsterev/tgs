function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  let test = arr.reduce((r, a) => {
    r[a.resort] = [...(r[a.resort] || []), a.hotel];
    return r;
  }, {});
  {
  }

  Object.keys(test).map((r, i) => console.log(r, i));
}
test();
