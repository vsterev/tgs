function test2() {
  const obj = [
    {
      name: 'Plamen Rachev',
      phone: '03598123213',
      hotels: [
        { name: 'Kaliakra', resortId: { name: 'Albena', id: 1 } },
        { name: 'Havana', resortId: { name: 'Golden Sands', id: 2 } },
        { name: 'Bansko Spa', resortId: { name: 'Bansko', id: 3 } },
        { name: 'Laguna Beach', resortId: { name: 'Albena', id: 1 } },
        { name: 'Berlin Golden Beach', resortId: { name: 'Golden Sands', id: 2 } },
      ],
    },
    {
      name: 'Yulia Georgieva',
      phone: '03597218378266',
      hotels: [
        { name: 'Junona', resortId: { name: 'Sunny Beach', id: 4 } },
        { name: 'Helios Beach', resortId: { name: 'Obzor', id: 5 } },
        { name: 'Diamant', resortId: { name: 'Obzor', id: 5 } },
        { name: 'Riu Helios Palace', resortId: { name: 'Sunny Beach', id: 4 } },
        { name: 'Nessebar Palace', resortId: { name: 'Nessebar', id: 6 } },
      ],
    },
  ];
  const sorted = obj.map((person) => {
    person.hotels.sort((a, b) => a.resortId.name.localeCompare(b.resortId.name));
    return person;
  });
  let str = '';
  sorted.map((a) => {
    let hotelRepeat = '';
    str += `${a.name}\n`;
    a.hotels.map((hotel) => {
      if (hotel !== hotelRepeat) {
        str += hotel.resortId.name + '\n';
        hotelRepeat = hotel;
        return;
      }
    });
  });

  console.log(str);
}
test2();
