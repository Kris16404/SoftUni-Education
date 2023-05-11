function stringLength(str1, str2, str3){
    let sumOfString = str1.length + str2.length + str3.length;
    let averageLength = sumOfString / 3;

    console.log(sumOfString);
    console.log(Math.floor(averageLength));
}

stringLength('pasta', '5', '22.3' );