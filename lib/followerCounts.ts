const followerCounts = (companyName: string): number => {
  // Source: http://www.cse.yorku.ca/~oz/hash.html
  // It initializes the hash variable to 5381. This is an arbitrary starting value; you can use any other number as well.
  let hash = 5381;
  for (let i = 0; i < companyName.length; i++) {
    // ^ (bitwise XOR) operator
    hash = (hash * 33) ^ companyName.charCodeAt(i);
  }

  const min = 10000;
  const max = 99000;
  const scaledHash = (hash % (max - min + 1)) + min;

  return Math.abs(scaledHash); // Ensure the result is an unsigned 32-bit integer
};

export default followerCounts;
