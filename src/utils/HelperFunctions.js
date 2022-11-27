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
    let p4 = [2, 4, 3, 1]
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
    let ip_1 = [4, 1, 3, 5, 7, 2, 8, 6]
    let result = "";
    for (let i = 0; i < key.length; i++) {
        result += key[ip_1[i] - 1];
    }
    return result;
}

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
};

// S0 Permutation

const S0Box = (key) => {
    let s0 = [
        [1, 0, 3, 2],
        [3, 2, 1, 0],
        [0, 2, 1, 3],
        [3, 1, 3, 2]
    ]
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
        [2, 1, 0, 3]
    ]
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
    return key1 += key2;
};

// XOR Operation

const XOR = (key1, key2) => {
    let result = "";
    for (let i = 0; i < key1.length; i++) {
        result += (key1[i] ^ key2[i]);
    }
    return result;
};

const generateKey = (masterKey) => {
    let key = masterKey;
    let finalKeys = { key1: '', key2: '' };
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
        key: key, 
        perm10: perm10, 
        firstSplit: firstSplit, 
        leftHalfLS1: leftHalfLS1,
        rightHalfLS1: rightHalfLS1,
        firstMerge: firstMerge,
        firstPerm8: firstPerm8,
        leftHalfLS2: leftHalfLS2, 
        rightHalfLS2: rightHalfLS2, 
        secondMerge: secondMerge, 
        secondPerm8: secondPerm8, 
        finalKeys: finalKeys
    };

    return result; 
};



// console.log(P10("0111100001"));
// console.log(split(P10("0111100001")));
// console.log(leftShift(split(P10("0111100001")).leftHalf, 1));
// console.log(leftShift(split(P10("0111100001")).rightHalf, 1));
// console.log(P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))));

// console.log("\n");
// console.log(leftShift(split(P10("0111100001")).leftHalf, 3));
// console.log(leftShift(split(P10("0111100001")).rightHalf, 3));
// console.log(P8(merge(leftShift(split(P10("0111100001")).leftHalf, 3), leftShift(split(P10("0111100001")).rightHalf, 3))));
// console.log("\n");

// console.log(IP("01001011"));
// console.log(split(IP("01001011")));
// console.log(EP(split(IP("01001011")).rightHalf));
// console.log(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1)))));
// console.log(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))));
// console.log(S0(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).leftHalf));
// console.log(S1(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).rightHalf));
// console.log(P4(merge(S0(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).leftHalf), S1(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).rightHalf))));
// console.log(XOR(split(IP("01001011")).leftHalf, P4(merge(S0(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).leftHalf), S1(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).rightHalf)))));
// console.log(merge(XOR(split(IP("01001011")).leftHalf, P4(merge(S0(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).leftHalf), S1(split(XOR(EP(split(IP("01001011")).rightHalf), P8(merge(leftShift(split(P10("0111100001")).leftHalf, 1), leftShift(split(P10("0111100001")).rightHalf, 1))))).rightHalf)))), split(IP("01001011")).rightHalf));

// console.log(P8("1101100001"));
// console.log(P4("1101"));
// console.log(IP_1("10110101"));

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
    generateKey
};