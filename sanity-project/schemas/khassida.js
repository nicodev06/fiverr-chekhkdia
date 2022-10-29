export default {
    name: 'khassida',
    type: 'document',
    title: 'Khassida',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'activities',
            title: 'Activities',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: 'khassida-activity'}]
            }]
        }
    ]
}