// P10 Permutation

const P10 = (key) => {
  let p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
  let result = "";
  for (let i = 0; i < p10.length; i++) {
    result += key[p10[i] - 1];
  }
  return result;
};

// P8 Permutation

const P8 = (key) => {
  let p8 = [6, 3, 7, 4, 8, 5, 10, 9];
  let result = "";
  for (let i = 0; i < p8.length; i++) {
    result += key[p8[i] - 1];
  }
  return result;
};

// P4 Permutation

const P4 = (key) => {
  let p4 = [2, 4, 3, 1];
  let result = "";
  for (let i = 0; i < p4.length; i++) {
    result += key[p4[i] - 1];
  }
  return result;
};

// IP Permutation

const IP = (plainText) => {
  let ip = [2, 6, 3, 1, 4, 8, 5, 7];
  let result = "";
  for (let i = 0; i < ip.length; i++) {
    result += plainText[ip[i] - 1];
  }
  return result;
};

// IP-1 Permutation

const IP_1 = (key) => {
  let ip_1 = [4, 1, 3, 5, 7, 2, 8, 6];
  let result = "";
  for (let i = 0; i < key.length; i++) {
    result += key[ip_1[i] - 1];
  }
  return result;
};

// Expanded Permutation

const EP = (key) => {
  let ep = [4, 1, 2, 3, 2, 3, 4, 1];
  let result = "";
  for (let i = 0; i < ep.length; i++) {
    result += key[ep[i] - 1];
  }
  return result;
};

// Decimal to Binary

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

// S0 Permutation

const S0Box = (key) => {
  let s0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2],
  ];
  let row = parseInt(key[0] + key[3], 2);
  let col = parseInt(key[1] + key[2], 2);
  let result = ("00" + dec2bin(s0[row][col]).toString(2)).slice(-2);

  return result;
};

// S1 Permutation

const S1Box = (key) => {
  let s1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3],
  ];
  let row = parseInt(key[0] + key[3], 2);
  let col = parseInt(key[1] + key[2], 2);
  let result = ("00" + dec2bin(s1[row][col]).toString(2)).slice(-2);

  return result;
};

// Left Shift

const leftShift = (key, offset) => {
  let result = "";
  for (let i = offset; i < key.length + offset; i++) {
    if (i < key.length) {
      result += key[i];
    } else {
      result += key[i - key.length];
    }
  }
  return result;
};

// Splitting the key into two halves

const split = (key) => {
  let splitKeys = { leftHalf: "", rightHalf: "" };
  for (let i = 0; i < key.length; i++) {
    if (i < key.length / 2) {
      splitKeys.leftHalf += key[i];
    } else {
      splitKeys.rightHalf += key[i];
    }
  }
  return splitKeys;
};

// Merge the keys

const merge = (key1, key2) => {
  return (key1 += key2);
};

// XOR Operation

const XOR = (key1, key2) => {
  let result = "";
  for (let i = 0; i < key1.length; i++) {
    result += key1[i] ^ key2[i];
  }
  return result;
};

// Key Generation

const generateKey = (masterKey) => {
  let key = masterKey;
  let finalKeys = { key1: "", key2: "" };
  let perm10 = P10(key);
  let firstSplit = split(perm10);
  let leftHalfLS1 = leftShift(firstSplit.leftHalf, 1);
  let rightHalfLS1 = leftShift(firstSplit.rightHalf, 1);
  let firstMerge = merge(leftHalfLS1, rightHalfLS1);
  let firstPerm8 = P8(firstMerge);

  finalKeys.key1 = firstPerm8;

  let leftHalfLS2 = leftShift(leftHalfLS1, 2);
  let rightHalfLS2 = leftShift(rightHalfLS1, 2);

  let secondMerge = merge(leftHalfLS2, rightHalfLS2);

  let secondPerm8 = P8(secondMerge);

  finalKeys.key2 = secondPerm8;

  let result = {
    key,
    perm10,
    firstSplit,
    leftHalfLS1,
    rightHalfLS1,
    firstMerge,
    firstPerm8,
    leftHalfLS2,
    rightHalfLS2,
    secondMerge,
    secondPerm8,
    finalKeys,
  };

  return result;
};

// Encrypt/Decrypt

const calculateSDES = (plainText, keys, mode) => {
  if (mode === "DECRYPT") {
    [keys.key1, keys.key2] = [keys.key2, keys.key1];
  }

  let initialPerm = IP(plainText);
  let firstSplit = split(initialPerm);
  let expandedRight = EP(firstSplit.rightHalf);
  let expandedXOR = XOR(expandedRight, keys.key1);

  let secondSplit = split(expandedXOR);
  let firstS0Box = S0Box(secondSplit.leftHalf);
  let firstS1Box = S1Box(secondSplit.rightHalf);

  let firstMerge = merge(firstS0Box, firstS1Box);
  let firstPerm4 = P4(firstMerge);

  let xorFirstSplitLeft = XOR(firstPerm4, firstSplit.leftHalf);
  let secondExpanded = EP(xorFirstSplitLeft);

  let xorWithKey2 = XOR(secondExpanded, keys.key2);

  let thirdSplit = split(xorWithKey2);
  let secondS0Box = S0Box(thirdSplit.leftHalf);
  let secondS1Box = S1Box(thirdSplit.rightHalf);

  let secondMerge = merge(secondS0Box, secondS1Box);
  let secondPerm4 = P4(secondMerge);

  let finalXOR = XOR(secondPerm4, firstSplit.rightHalf);

  let thirdMerge = merge(finalXOR, xorFirstSplitLeft);
  let finalPerm = IP_1(thirdMerge);

  let result = {
    plainText,
    keys,
    mode,
    initialPerm,
    firstSplit,
    expandedRight,
    expandedXOR,
    secondSplit,
    firstS0Box,
    firstS1Box,
    firstMerge,
    firstPerm4,
    xorFirstSplitLeft,
    secondExpanded,
    xorWithKey2,
    thirdSplit,
    secondS0Box,
    secondS1Box,
    secondMerge,
    secondPerm4,
    finalXOR,
    thirdMerge,
    finalPerm,
  };

  return result;
};

export {
  P10,
  P8,
  P4,
  IP,
  IP_1,
  EP,
  S0Box,
  S1Box,
  leftShift,
  split,
  merge,
  XOR,
  generateKey,
  calculateSDES,
};