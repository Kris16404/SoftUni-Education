function filterEmplotyees(data, criteria) {
    let parsedInput = JSON.parse(data);
    let [prop, searchValue] = criteria.split('-');
    let isMatched = false;
    let resutlArr = [];
    for (const obj of parsedInput) {
        for (const [key, value] of Object.entries(obj)) {
            if (prop == key || prop == 'all') {
                if (searchValue == value || prop == 'all') {
                    isMatched = true;
                }
            }
        }
        if (isMatched) {
            resutlArr.push(obj);
            isMatched = false;
        }
    }
    for (let i = 0; i < resutlArr.length; i++) {
        const element = resutlArr[i];
        console.log(`${i}. ${element.first_name} ${element.last_name} - ${element.email}`);
    }
}

filterEmplotyees(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
    }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
    },
   {
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
    }]`,
    'gender-Female'
);

// 0. Ardine Bassam - abassam0@cnn.com
// 1. Kizzee Jost - kjost1@forbes.com

filterEmplotyees(`[{"id": "1",
"first_name": "Kaylee",
"last_name": "Johnson",
"email": "k0@cnn.com",
"gender": "Female"
}, {"id": "2",
"first_name": "Kizzee",
"last_name": "Johnson",
"email": "kjost1@forbes.com",
"gender": "Female"
}, {"id": "3",
"first_name": "Evanne",
"last_name": "Maldin",
"email": "emaldin2@hostgator.com",
"gender": "Male"
}, {"id": "4",
"first_name": "Evanne",
"last_name": "Johnson",
"email": "ev2@hostgator.com",
"gender": "Male"
}]`,
    'last_name-Johnson'

);

// 0. Kaylee Johnson - k0@cnn.com
// 1. Kizzee Johnson - kjost1@forbes.com
// 2. Evanne Johnson - ev2@hostgator.com