function townsToJSON(arr) {
    let trimmedArr = arr.map((row) => 
        row.trim()
           .split('|')
           .map((cell) => cell.trim())
      
    ).map((row) => row.filter((cell) => cell !== ''));
    
    const headers = trimmedArr[0];
    const data = trimmedArr.slice(1);


    let result = data.map((row) => {
        const temp = {};
        headers.forEach((header, index) => {
            const parsedNum= Number(row[index]);
            temp[header] = isNaN(parsedNum) ? row[index] : Number(parsedNum.toFixed(2));
            
        });
        return temp;
    })

    console.log(JSON.stringify(result));
}

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'
]);

// [{
//     "Town": "Sofia",
//     "Latitude": 42.7,
//     "Longitude": 23.32
// },
// {
//     "Town": "Beijing",
//     "Latitude": 39.91,
//     "Longitude": 116.36
// }]

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Veliko Turnovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |'
]);

// [{
//     "Town": "Veliko Turnovo",
//     "Latitude": 43.08,
//     "Longitude": 25.62
// },
// {
//     "Town": "Monatevideo",
//     "Latitude": 34.5,
//     "Longitude": 56.11
// }]