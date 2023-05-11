const makeChunk = function (chunks, element, size) {
  const newChunks = chunks.slice(0);
  const lastChunkIndex = newChunks.length - 1;
  const lastChunk = newChunks[lastChunkIndex];

  if (lastChunk.length < size) {
    lastChunk.push(element);
  } else {
    newChunks.push([element]);
  }

  return newChunks;
}

const chunk = function (list, size) {
  return list.reduce(function (chunks, element) {
    return makeChunk(chunks, element, size);
  }, [[]]);
}

exports.chunk = chunk;