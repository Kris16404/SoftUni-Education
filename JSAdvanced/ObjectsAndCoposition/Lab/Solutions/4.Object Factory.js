function objectFactory(library, orders) {
    let result = [];

    for (const order of orders) {
        let templatetedObj = Object.assign({}, order.template);
        for (const command of order.parts) {
            templatetedObj[command] = library[command];
        }

        result.push(templatetedObj);
    }

    return result;
}

const library = {
    print: function () {
        console.log(`${this.name} is printing a page`);
    },
    scan: function () {
        console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
        console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};

const orders = [
    {
        template: { name: 'ACME Printer' },
        parts: ['print']
    },
    {
        template: { name: 'Initech Scanner' },
        parts: ['scan']
    },
    {
        template: { name: 'ComTron Copier' },
        parts: ['scan', 'print']
    },
    {
        template: { name: 'BoomBox Stereo' },
        parts: ['play']
    }
];

const products = objectFactory(library, orders);
console.log(products);