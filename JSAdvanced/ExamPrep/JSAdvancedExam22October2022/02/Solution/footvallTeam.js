class footballTeam {
    constructor(clubName, country) {
        this.clubName = clubName;
        this.country = country;
        this.invitedPlayers = [];
    }

    newAdditions(footballPlayers) {
        let nameArr = [];
        for (let i = 0; i < footballPlayers.length; i++) {
            const element = footballPlayers[i];
            let [name, age, playerValue] = element.split('/');
            playerValue = Number(playerValue);
            let player = { name, age, playerValue };
            let isAlreadyInvited = false;
            let alreadyInvitedIndex = 0;

            for (let j = 0; j < this.invitedPlayers.length; j++) {
                const currentPlayer = this.invitedPlayers[j];
                if (currentPlayer.name === player.name) {
                    isAlreadyInvited = true;
                    alreadyInvitedIndex = j;
                }
            }

            if (isAlreadyInvited) {
                if (this.invitedPlayers[alreadyInvitedIndex].playerValue < player.playerValue) {
                    this.invitedPlayers[alreadyInvitedIndex].playerValue = player.playerValue;
                }
                isAlreadyInvited = false;
            } else {
                nameArr.push(name);
                this.invitedPlayers.push(player);
            }
        }
        return `You successfully invite ${nameArr.join(', ')}.`
    }

    signContract(selectedPlayer) {
        let [name, playerOffer] = selectedPlayer.split('/');
        playerOffer = Number(playerOffer);
        let isNotPresent = true;
        let playerIndex = 0;
        for (let i = 0; i < this.invitedPlayers.length; i++) {
            const player = this.invitedPlayers[i];
            if (player.name === name) {
                isNotPresent = false;
                playerIndex = i;
            }
        }
        if (isNotPresent) {
            throw new Error(`${name} is not invited to the selection list!`)
        }
        if (this.invitedPlayers[playerIndex].playerValue > playerOffer) {
            throw new Error(`The manager's offer is not enough to sign a contract with ${name}, ${this.invitedPlayers[playerIndex].playerValue - playerOffer} million more are needed to sign the contract!`)
        }
        this.invitedPlayers[playerIndex].playerValue = 'Bought';
        return `Congratulations! You sign a contract with ${name} for ${playerOffer} million dollars.`
    }

    ageLimit(name, age) {
        let isNotPresent = true;
        let playerIndex = 0;
        for (let i = 0; i < this.invitedPlayers.length; i++) {
            const player = this.invitedPlayers[i];
            if (player.name === name) {
                isNotPresent = false;
                playerIndex = i;
            }
        }
        if (isNotPresent) {
            throw new Error(`${name} is not invited to the selection list!`)
        }
        if (this.invitedPlayers[playerIndex].age < age) {
            const diff = age - this.invitedPlayers[playerIndex].age
            if (diff < 5) {
                return `${name} will sign a contract for ${diff} years with ${this.clubName} in ${this.country}!`;
            }
            return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
        } else {
            return `${name} is above age limit!`
        }
    }

    transferWindowResult() {
        let result = [];
        result.push('Players list:')
        this.invitedPlayers.sort((a, b) => a.name.localeCompare(b.name));
        for (let i = 0; i < this.invitedPlayers.length; i++) {
            const player = this.invitedPlayers[i];
            result.push(`Player ${player.name}-${player.playerValue}`);
        }
        return result.join('\n')
    }
}

let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());




