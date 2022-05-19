import MySqlOption from '../config/knex.js'
import knex from 'knex'
const dbKnex = knex(MySqlOption)

dbKnex.schema.hasTable('clients')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('clients', table =>{
    table.increments('id').primary().notNullable()
    table.string('cuic').notNullable()
    table.string('razon_social').notNullable()
    table.integer('plan').notNullable()
}): false))
.catch((err)=>{console.log(err);})


dbKnex.schema.hasTable('proyectos')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('proyectos', table =>{
    table.increments('id').primary().notNullable()
    table.integer('id_org').notNullable()
    table.string('nombre').notNullable()
    table.string('tipo').notNullable()
}): false))
.catch((err)=>{console.log(err);})


dbKnex.schema.hasTable('plan')
.then((isExist) => (!isExist ? dbKnex.schema.createTable('plan', table =>{
    table.increments('id').primary().notNullable()
    table.string('cantSW').notNullable()
    table.string('cantDbMySQL').notNullable()
    table.string('cantDbSQL').notNullable()
}): false))
.catch((err)=>{console.log(err);})

export default dbKnex