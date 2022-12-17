import _ from "lodash";

function SplitIntoChunks(list, columns) {
  const splitedAlbums = [];
  let chunk = [];
  let listCount = 0;

  for (let i = 0; i < list.length; i++) {
    chunk.push(list[i]);
    listCount++;

    if (listCount === columns) {
      splitedAlbums.push(chunk);
      chunk = [];
      listCount = 0;
    }
  }
  splitedAlbums.push(chunk);
  chunk = 0;

  return splitedAlbums;
}

export function ClearedList(list, columns) {
  const filteredAlbums = _.uniqBy(list, (listItem) => listItem.id);
  const splitedAlbums = SplitIntoChunks(filteredAlbums, columns);
  return splitedAlbums;
}
