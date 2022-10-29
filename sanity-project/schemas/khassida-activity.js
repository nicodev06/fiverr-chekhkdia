export default {
    name: 'khassida-activity',
    type: 'document',
    title: 'Khassida Activity',
    fields: [
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to: [{type: 'user'}]
        },
        {
            name: 'times',
            title: 'Number of times',
            type: 'number'
        }
    ]
}