export default {
    name: 'kaamil',
    type: 'document',
    title: 'Kaamil',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'start_date',
            title: 'Start Date',
            type: 'date'
        },
        {
            name: 'end_date',
            title: 'End Date',
            type: 'date'
        },
        {
            name: 'users',
            title: 'Users',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type:'user'}]
             }]
        },
        {
            name: 'books',
            title: 'Books',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type:'book'}]
             }]
        },
        {
            name: 'already_read',
            title: 'Books already Read',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type:'book'}]
             }]
        },
        {
            name: 'completed',
            title: 'Is kaamil Completed?',
            type: 'boolean'
        },
        {
            name: 'completion_note',
            title: 'Completion Note',
            type: 'string'
        }
    ]
}