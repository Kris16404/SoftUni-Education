function constructionCrew(worker) {
    let isDizzy = worker.dizziness;

    if (isDizzy) {
        let requiredWater = 0.1 * worker.weight * worker.experience;
        worker.levelOfHydrated += requiredWater;
        worker.dizziness = false;
        return worker;
    } else {
        return worker
    }

}

constructionCrew({
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
});
// {
//     weight: 80,
//     experience: 1,
//     levelOfHydrated: 8,
//     dizziness: false
// }
constructionCrew({
    weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true
});
// {
//     weight: 120,
//     experience: 20,
//     levelOfHydrated: 440,
//     dizziness: false
// }
constructionCrew({
    weight: 95,
    experience: 3,
    levelOfHydrated: 0,
    dizziness: false
});
// {
//     weight: 95,
//     experience: 3,
//     levelOfHydrated: 0,
//     dizziness: false
// }

