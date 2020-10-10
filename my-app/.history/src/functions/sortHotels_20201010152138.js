function sortHotels(ha, hr, setHotels) {
  const hotelsRepArray = [...hr].map((a) => a._id);
  const checkedRepHotels = [...ha]
    .sort((a, b) => {
      if (a.resortId.name === b.resortId.name) {
        return a.name.localeCompare(b.name.localeCompare);
      } else {
        return a.resortId.name.localeCompare(b.resortId.name);
      }
    })
    .map((a) => {
      if (hotelsRepArray.includes(a._id)) {
        return { ...a, checked: true };
      } else {
        return { ...a, checked: false };
      }
    })
    .reduce((acc, curr) => {
      acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr];
      return acc;
    }, {});
  setHotels(checkedRepHotels);
  console.log(checkedRepHotels);
}
export default sortHotels;
