import { DateTime } from "luxon";

export const createDataTree = dataset => {
    let hashTable = Object.create(null)
    dataset.forEach(a => hashTable[a.id] = {...a, nodes: []})
    let dataTree = []
    dataset.forEach(a => {
        if (a.targetCode) hashTable[a.targetCode].nodes.push(hashTable[a.id])
        else dataTree.push(hashTable[a.id])
    })
    return dataTree
};

export const objToArray = (obj) => {
    if (obj) {
        return Object.entries(obj).map(
            e => Object.assign(e[1],{id: e[0]})
        )
    }
}

export const shapeNewEvent = (currentUser, avatarUrl, event) => {
    event.startDate = DateTime
        .fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
        .toJSDate()
    event.endDate = DateTime
        .fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
        .toJSDate()
    return {
        ...event,
        hostUid: currentUser.uid,
        hostedBy: currentUser.displayName,
        hostAvatarUrl: avatarUrl || '/static/images/whazup-square-logo.png',
        createdAt: DateTime.local().toJSDate(),
        attendees: {
            [currentUser.uid]: {
                going: true,
                joinDate: DateTime.local().toJSDate(),
                avatarUrl: avatarUrl || '/static/images/whazup-square-logo.png',
                displayName: currentUser.displayName,
                host: true,
            }
        }
    }
}