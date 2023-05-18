"use strict";
/*
1. Get a string input ( which is in utf-8 by default because node uses utf-8);
2. Convert it to binary
3. Use base64 charset to convert the binary-to-string ( decode ) and display.
4. Again convert the string back to binary using the base64 charset.
*/
function decimaltoBinary(input) {
    let result = "";
    for (let i = 0; i < 8; i++) {
        let lastbit = input & 1;
        input = input >> 1;
        result = lastbit.toString() + result;
    }
    return result;
}
function convertToBinary(input) {
    let binaryForm = "";
    input.forEach((cur) => {
        const res = decimaltoBinary(cur);
        binaryForm += res;
    });
    return binaryForm;
}
const b64map = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a',
    'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', '+',
    "/"
];
function base64decode(input) {
    const bn = Buffer.from(input, 'utf-8');
    /*
        console.log(bn); Output: <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64> ( displayed in hex)
    
        console.log(bn.toJSON());
        Output: ( displayed in decimal)
        {
            type: 'Buffer',
            data: [
                72, 101, 108, 108,
                111,  32,  87, 111,
                114, 108, 100
            ]
        }

        ** we can check the exact comparision in the utf-8 table.
    */
    const obj = bn.toJSON();
    // consolidated binary string
    const binary = convertToBinary(obj.data);
    //groups
    let i = 0;
    let j = 6;
    let output = [];
    while (j < binary.length) {
        output.push(binary.substring(i, j));
        i += 6;
        j += 6;
    }
    const remaining = binary.substring(i, binary.length);
    const zeros = "0".repeat(6 - remaining.length);
    output.push(remaining + zeros);
    console.log("Output in 6bit binary --->" + output);
    // convert each binary number to a decimal
    const myarr = output.map(cur => {
        return parseInt(cur, 2);
    });
    console.log("Output converted to decimal --->" + myarr);
    // getting the characters from the base64 mapping;
    const mymaps = myarr.map(cur => {
        return b64map[cur];
    });
    console.log("Base64 characters --->" + mymaps);
    // add padding "=="
    const multiplier = Math.ceil(output.length / 4);
    const padding_number = 4 * multiplier - output.length;
    const padding = "=".repeat(padding_number);
    const my_encoding = mymaps.join("") + padding;
    return my_encoding;
}
function base64encode_bitmap(input) {
    const bn = Buffer.from(input);
}
console.log(base64decode("Biswarup Bouri"));
