export default (() => {
  const uniqueIDs = {};

  const getUniqueID = (type) => {
    if (!(type in uniqueIDs)) {
      uniqueIDs[type] = {};
      uniqueIDs[type].currentID = 0;
    }
    uniqueIDs[type].currentID += 1;
    return uniqueIDs[type].currentID;
  };

  return { getUniqueID };
})();
