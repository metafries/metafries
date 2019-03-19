import { DateTime } from "luxon";

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