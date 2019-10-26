import { DateTime } from "luxon";

export const sortAttendees = list => {
    list && list.sort(function(a,b) {
        return b.joinDate.toDate() - a.joinDate.toDate()
    })
    const attendeeList = list && list.slice(0, list.length-1)
    attendeeList.unshift(list[list.length-1])
    return attendeeList
}

export const optimizePixel = photo => {
    if (photo && photo.includes('graph.facebook.com')) photo+='?height=250'
    return photo
}

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
    const timestamp = DateTime.local().toJSDate()
    return {
        ...event,
        hostUid: currentUser.uid,
        hostedBy: currentUser.displayName,
        hostAvatarUrl: avatarUrl || '/static/images/whazup-square-logo.png',
        createdAt: timestamp,
        save: {
            [currentUser.uid]: {
                timestamp: timestamp,
                avatarUrl: avatarUrl,
                displayName: currentUser.displayName,
                host: true,
            }
        },
        attendees: {
            [currentUser.uid]: {
                going: true,
                joinDate: timestamp,
                avatarUrl: avatarUrl || '/static/images/whazup-square-logo.png',
                displayName: currentUser.displayName,
                host: true,
            }
        }
    }
}