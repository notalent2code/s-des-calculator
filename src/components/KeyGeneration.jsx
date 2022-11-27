import { Component } from 'react';
import { P10, P8, merge, split, leftShift } from '../utils/HelperFunctions';

const KeyGeneration = (props) => {
    let { key, perm10, firstSplit, leftHalfLS1, rightHalfLS1,
          firstMerge, firstPerm8, leftHalfLS2, rightHalfLS2,
          secondMerge, secondPerm, finalKeys
    } = props.vars;

    return (
        <div>
            <h1 className='text-lg text-bold'>{finalKeys.key1}</h1>
        </div>
    );
};

export default KeyGeneration;