function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  let sorted = arr.sort((a, b) => a.resort.localeCompare(b.resort));
  //   let test = sorted.reduce((r, a) => {
  //     r[a.resort] = [...(r[a.resort] || []), a.hotel];
  //     return r;
  //   }, {});
  //   {
  //   }

  //   let sorted = Object.keys(test).sort((a, b) => a.localeCompare(b));
  sorted.map((a, i) => {
    console.log(sorted[i + 1].resort === a.resort);
  });
}
test();
