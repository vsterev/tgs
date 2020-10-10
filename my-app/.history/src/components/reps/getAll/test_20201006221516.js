function test() {
  let arr = [
    { resort: 'Albena', hotel: 'Kaliakra' },
    { resort: 'Golden Sands', hotel: 'Havana' },
    { resort: 'Bansko', hotel: 'Bansko Spa' },
    { resort: 'Albena', hotel: 'Laguna Beach' },
    { resort: 'Golden Sands', hotel: 'Morsko Oko' },
  ];
  let sorted = arr.sort((a, b) => a.resort.localeCompare(b.resort));
  sorted.reduce((acc, curr) => {
    if (!acc.hasOwnProperty(curr.resort) || {}) {
      acc[curr.resort] = [curr.hotel];
    }
  }, {});
  console.log(sorted);
  //   let init = '';
  //   sorted.map((a, i) => {
  //     if (init !== a.resort) {
  //       console.log(a.resort);
  //       init = a.resort;
  //     }
  //     console.log('---> ' + a.hotel);
  //   });
}
test();
