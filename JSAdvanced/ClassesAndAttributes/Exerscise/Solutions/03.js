function tickets(arrOfTicets, sortCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    function compare(a, b) {
        if (a[sortCriteria] < b[sortCriteria]) {
            return - 1;
        }
        if (a[sortCriteria] > b[sortCriteria]) {
            return 1;
        }
        return 0;
    }

    let resultArr = [];
    for (let i = 0; i < arrOfTicets.length; i++) {
        const element = arrOfTicets[i];
        let [destination, price, status] = element.split('|');
        price = Number(price);
        const ticket = new Ticket(destination, price, status);
        resultArr.push(ticket);

    }

    resultArr.sort(compare);
    return resultArr;
}

tickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination');