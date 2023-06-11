class WineSelection {
    constructor(space) {
        this.space = space;
        this.wines = [];
        this.bill = 0;
    }

    reserveABottle(wineName, wineType, price) {
        if (this.wines.length >= this.space) {
            throw new Error('Not enough space in the cellar.')
        }

        price = Number(price);
        const tempWine = {
            wineName,
            wineType,
            price,
            paid: false
        }

        this.wines.push(tempWine);

        return `You reserved a bottle of ${wineName} ${wineType} wine.`
    }

    payWineBottle(wineName, price) {
        let searchedWine = this.wines.find((w) => w.wineName === wineName)
        if (searchedWine === undefined) {
            throw new Error(`${wineName} is not in the cellar.`);
        }

        if (searchedWine.paid === true) {
            throw Error(`${wineName} has already been paid.`)
        }

        searchedWine.paid = true;
        this.bill += searchedWine.price;
        return `You bought a ${wineName} for a ${price}$.`
    }

    openBottle(wineName) {
        let searchedWine = this.wines.find((w) => w.wineName === wineName)
        if (searchedWine === undefined) {
            throw new Error(`The wine, you're looking for, is not found.`);
        }
        if (searchedWine.paid === false) {
            throw new Error(`${wineName} need to be paid before open the bottle.`)
        }

        let indexOfWine = this.wines.indexOf(searchedWine);
        this.wines.splice(indexOfWine, 1);
        return `You drank a bottle of ${wineName}.`
    }

    cellarRevision(wineType) {
        let resultArr = [];
        if (wineType === undefined) {
            let emptySlots = this.space - this.wines.length;
            this.wines.sort((a, b) => a.wineName.localeCompare(b.wineName))
            resultArr.push(`You have space for ${emptySlots} bottles more.`);
            resultArr.push(`You paid ${this.bill}$ for the wine.`);
            this.wines.forEach((element) => {
                if (element.paid === false) {
                    resultArr.push(`${element.wineName} > ${element.wineType} - Not Paid.`)
                } else {
                    resultArr.push(`${element.wineName} > ${element.wineType} - Has Paid.`)
                }
            })
        } else {
            let searchedWine = this.wines.find((w) => w.wineType === wineType)
            if (searchedWine === undefined) {
                throw new Error(`There is no ${wineType} in the cellar.`)
            }
            if (searchedWine.paid === false) {
                resultArr.push(`${searchedWine.wineName} > ${searchedWine.wineType} - Not Paid.`);
            } else {
                resultArr.push(`${searchedWine.wineName} > ${searchedWine.wineType} - Has Paid.`);
            }
        }
        return resultArr.join('\n')
    }
}

const selection = new WineSelection(5)
selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144);
selection.payWineBottle('Bodegas Godelia Mencía', 144);
selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50);
selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120);
console.log(selection.cellarRevision());


