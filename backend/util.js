const shuffle = (decksNumber) => {
    var deck = [];
    for(var i = 0; i < decksNumber * 52; ++i) deck[i] = i;
    var currentIndex = deck.length,  randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

const getNewPlayer = ({isBank, name, index}) => {
    return {
        name,
        index,
        state: "ACTIVE",
        isBank,
        isBattled: false,
        canBet: false,
        canStand: false,
        canHit: false,
        canBlackJack: false,
        cash: 0,
        bet: 0,
        cards: [],
        resultType: "NONE",
        resultTimes: 0,
    }
}

const getCardFromDeck = (room) => {
    const card = room.deck.pop();
    if(room.deck.length === 0){
        room.deck = shuffle(room.roomInfo.decksNumber);
    }
    return card;
}

const getPossibleCardNumber = (number) => {
    const x = (number % 52) % 13;
    if(x === 0) return [1, 11];
    else if(x >= 9) return [10];
    else return [x + 1];
}

const getPossibleSum = (cards) => {
    let sum = [0];
    for(var i = 0; i < cards.length; ++i){
        let set = new Set();
        getPossibleCardNumber(cards[i].number).forEach((x) => {
            sum.forEach(y => set.add(x + y));
        })
        sum = [...set];
    }
    return sum.sort((a, b) => a - b);
}


const getBattlePoint = (cards) => {
    const sum = getPossibleSum(cards);
    const unBombed = sum.filter(x => x <= 21);
    const bombed = sum.filter(x => x > 21);
    if(unBombed.length > 0) return Math.max(...unBombed);
    else return Math.min(...bombed);
}

const getBattleState = (cards) => {
    const point = getBattlePoint(cards);
    if(cards.length === 3 && cards.every(c => (c.number % 52) % 3 === 6)) return {isNormal: false, times: 7, point};
    else if(cards.length === 5 && point < 21) return {isNormal: false, times: 3, point};
    else if(cards.length === 5 && point === 21) return {isNormal: false, times: 5, point};
    else if(point === 21) return {isNormal: false, times: 2, point};
    else return {isNormal: true, times: 0, point};
}

const battle = async (bank, player) => {
    const bankState = getBattleState(bank.cards);
    const playerState = getBattleState(player.cards);
    let playerResultTimes;
    if(!bankState.isNormal || !playerState.isNormal) playerResultTimes = playerState.times - bankState.times;
    else {
        if(bankState.point > 21 && playerState.point > 21) playerResultTimes = 0;
        else if(bankState.point > 21) playerResultTimes = 1;
        else if(playerState.point > 21) playerResultTimes = -1;
        else playerResultTimes = (playerState.point > bankState.point) ? 1 : (playerState.point < bankState.point ? -1 : 0);
    }
    player.isBattled = true;
    player.resultTimes = playerResultTimes;
    player.cash += player.bet + player.resultTimes * player.bet;
    bank.cash -= player.resultTimes * player.bet;
    await player.save();
    await bank.save();
}

const findBlackJack = async (room, playerModels) => {
    if(playerModels[11].canBlackJack){
        await Promise.all(
            playerModels
            .filter(p => p && p.state === "ACTIVE" && !p.isBank)
            .map(async p => await battle(playerModels[11], p))
        );
    }
    else {
        await Promise.all(
            playerModels
            .filter(p => p && p.state === "ACTIVE" && !p.isBank && p.canBlackJack)
            .map(async p => await battle(playerModels[11], p))
        )
    }
    if(playerModels.filter(p => p && !p.isBank && p.state === "ACTIVE").every(p => p.isBattled)){
        room.state === "GAMEOVER";
    }
    await room.save();
}

const canBlackJack = (cards) => {
    return cards.length === 2 && getPossibleSum(cards).includes(21);
}

const canHit = (cards) => {
    return Math.min(...getPossibleSum(cards)) < 21 && cards.length < 5;
}

const canStand = (cards) => {
    return Math.max(...getPossibleSum(cards)) >= 15;
}

const setCardsState = (player) => {
    player.canHit = canHit(player.cards);
    player.canStand = canStand(player.cards);
    player.canBlackJack = canBlackJack(player.cards);
}


export {shuffle, getCardFromDeck, getNewPlayer, canBlackJack, canHit, canStand, setCardsState, findBlackJack, battle};