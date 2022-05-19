import knex from '../contenedores/contenedorMySql'

const clients = {};

//------------------------------------------
//functions

clients.getClients= async(req, res, next) => {
    try{
        if(req.query.pag != "" && req.query.orderby != "" && req.query.order != ""){
            const arrayclients = []
            if(req.query.orderby == "cuic"){
                if(req.query.order == "asc"){
                    arrayclients = await knex('clients').innerJoin('plan',function(){
                        this.on('clients.plan', '=', 'plan.id').orderby('clients.cuic')
                    })
                }else if(req.query.order == "desc"){
                    arrayclients = await knex('clients').innerJoin('plan',function(){
                        this.on('clients.plan', '=', 'plan.id').orderby('clients.cuic', 'desc')
                    })
                }
            }else if(req.query.orderby == "razon_social"){
                if(req.query.order == "asc"){
                    arrayclients = await knex('clients').innerJoin('plan',function(){
                        this.on('clients.plan', '=', 'plan.id').orderby('clients.razon_social')
                    })
                }else if(req.query.order == "desc"){
                    arrayclients = await knex('clients').innerJoin('plan',function(){
                        this.on('clients.plan', '=', 'plan.id').orderby('clients.razon_social', 'desc')
                    })
                }
            }
            const clientes = {
                clientes: arrayclients,
                total_clients: arrayclients.length()
            }

            res.status(201).json(clientes)

        }else{

        }



    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

clients.save = async (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let objeto = {
                "timestamp": fyhActual,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            await knex('clientss').insert(objeto)

            res.status(201).json({'messaje':'clients Agregado'})
        }
        else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }


}

clients.getById = async(req, res, next) => {
    try{
        res.status(201).json(await knex('clientss').where("id", req.params.id))
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

clients.updateById = async (req, res, next) => {
    try {
        if (req.body.nombre !== undefined && req.body.descripcion !== undefined && req.body.codigo !== undefined && req.body.foto !== undefined && req.body.precio !== undefined && req.body.stock !== undefined) {
            let fyh = new Date();

            let fyhActual = fyh.getDate() + '/' + (fyh.getMonth() + 1) + '/' + fyh.getFullYear() + " - " + fyh.getHours() + ':' + fyh.getMinutes() + ':' + fyh.getSeconds()
            let objeto = {
                "timestamp": fyhActual,
                "nombre": req.body.nombre,
                "descripcion": req.body.descripcion,
                "codigo": req.body.codigo,
                "foto": req.body.foto,
                "precio": req.body.precio,
                "stock": req.body.stock
            }
            await knex('clientss').where("id", req.params.id).update(objeto)

            res.status(201).json({'messaje':'clients Actualizado'})
        }
        else {
            res.status(500).json({ 'messaje': 'Error de datos' })
        }

    } catch (err) {
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

clients.deleteById = async(req, res, next) => {
    try{
        await knex('clientss').where("id", req.params.id).del()
        res.status(201).json({'messaje':'clients Borrado'}) 
    }catch{
        res.status(500).json( { message: `Server Error ${err}`} )
    }
}

export default clients;