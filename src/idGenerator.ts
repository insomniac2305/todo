export default ((): { getUniqueID: (type: string) => number } => {
  const uniqueIDs: { [index: string]: { currentID: number } } = {};

  const getUniqueID = (type: string): number => {
    if (!(type in uniqueIDs)) {
      uniqueIDs[type] = { currentID: 0 };
    }
    uniqueIDs[type].currentID += 1;
    return uniqueIDs[type].currentID;
  };

  return { getUniqueID };
})();
