// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import event from './event'
import user from './user'
import book from './book'
import kaamil from './kaamil'
import khassidaActivity from './khassida-activity'
import khassida from './khassida'
import prayer from './prayer'
import newsletter from './newsletter'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    event,
    user,
    book,
    kaamil,
    khassidaActivity,
    khassida,
    prayer,
    newsletter
  ]),
})
