const sampleData = {
    events: [
        {
          id: '1',
          title: 'Trip to Tower of London',
          startDate: '2018/03/27, 11:00',
          endDate: '2018/03/28, 14:00',    
          category: 'culture',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
          location: "St Katharine's & Wapping, London",
          latlng: {
            lat: 51.5057927,
            lng: -0.06306960000006256,
          },
          hostedBy: 'Bob',
          hostPhotoURL: '/static/images/whazup-square-logo.png',
          permission: 0,
          attendees: [
            {
              id: 'a',
              name: 'Bob',
              photoURL: '/static/images/whazup-square-logo.png'
            },
            {
              id: 'b',
              name: 'Tom',
              photoURL: ''
            }
          ]
        },
        {
          id: '2',
          title: 'Trip to Punch and Judy Pub',
          startDate: '2018/03/28, 14:00',
          endDate: '2018/03/29, 11:00',        
          category: 'drinks',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
          location: 'Henrietta Street, London, UK',
          latlng: {
            lat: 51.5111991,
            lng: -0.12350170000001981,
          },
          hostedBy: 'Tom',
          hostPhotoURL: '/static/images/whazup-square-logo.png',
          permission: 1,      
          attendees: [
            {
              id: 'b',
              name: 'Tom',
              photoURL: '/static/images/whazup-square-logo.png'
            },
            {
              id: 'a',
              name: 'Bob',
              photoURL: ''
            }
          ]
        }
    ]
}

export default sampleData