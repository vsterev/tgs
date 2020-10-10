function test3() {
  const hotels = [
    { _id: 1907, name: 'Berlin Golden Beach', resortId: { _id: 33, name: 'Golden Sands' } },
    { _id: 1464, name: 'Laguna Beach Albena', resortId: { _id: 14, name: 'Albena' } },
    { _id: 1472, name: 'Oasis Albena', resortId: { _id: 14, name: 'Albena' } },
  ];
  const reduced = hotels.reduce((acc, curr) => {
    acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr.name];
    return acc;
  }, {});
  const sorted = [...Object.entries(reduced)].sort((a, b) => a[0].localeCompare(b[0]));
  const modified = sorted.map((resort) => {
    console.log(resort[0]);
    const hotels = resort[1];
    hotels.map((hotel) => console.log('-' + hotel));
  });
  //   console.log(sorted);
}
test3();
