/**
 * url: /event
 * select: 'title, venues, artists'
 * filter: 'tenant.id = 10, date > now, venues.address.postalcode = 4500'
 * order: 'dateStart ASC'
 *
 * fields that are in twice get concatenated by or?
 */
var Example = {
    action:         'read'
    , collection:   'event'
    , select:       ['title'] // how do we realize that... do we append a filter? events.reduce(cb)?
    , filters:      [
        {
            field: 'date'
            , operator: '<'
            , value: 'now'  // this needs to be resolved on the tenant to have adequate timezone support!
        }
        , {
            field: 'tenant'
            , operator: '='
            , value: '10'
        }
    ]
    , isResolved: true
    , subRequests: [
        {
            action: 'read'
            , collection: 'venues'
            , select: '*'
            , filters: [
                {
                    belongsTo: 'event', // or just pass in a list of entities?
                    withId: [10, 20, 30, 40]
                }
            ]
            , isResolved: false
            , subRequests: [
                {
                    action: 'read'
                    , collection: 'location'
                    , select: null
                    , filters: [
                        {
                            belongsTo: 'event',
                            withId: [10, 20, 30, 40]
                        },
                        {
                            field: 'postalcode'
                            , operator: '='
                            , value: '4500'
                        }
                    ]
                }
            ]
        }
        , {
            action: 'read'
            , collection: 'artists'
            , select: '*'
            , filters: [
                {
                    belongsTo: 'event' // or just pass in a list of entities?
                    , withId: [10, 20, 30, 40]
                }
            ]
            , isResolved: false
        }
    ]
};