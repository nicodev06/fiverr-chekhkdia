export default {
    name: 'user',
    type: 'document',
    Title: 'User',
    fields : [
        {
            name: 'first_name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'surname',
            title: 'Surname',
            type: 'string'
        },
        {
            name: 'username',
            title: 'Username',
            type: 'string'
        },
        {
            name: 'current_book',
            title: 'Current Book',
            type: 'reference',
            to: [{type:'book'}]
        },
        {
            name: 'second_book',
            title: 'Second Book',
            type: 'reference',
            to: [{type:'book'}]
        }
    ]
}