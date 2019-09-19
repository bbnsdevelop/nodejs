const env = process.env.NODE_ENV || 'dev';

const config = () =>{

    switch(env){
        case 'dev':
            return {
                url_bd: 'mongodb+srv://usuario_admin:6559279bb2@clusterapi-2jqic.mongodb.net/test?retryWrites=true&w=majority',
                private_key: 'feijaocomarroz',
                expireToken: '7d'
            }

        case 'hml':
            return {
                url_bd: 'mongodb+srv://usuario_admin:6559279bb2@clusterapi-2jqic.mongodb.net/test?retryWrites=true&w=majority',
                private_key: 'feijaocomarroz',
                expireToken: '7d'
            }
        case 'prod':
            return {
                url_bd: 'mongodb+srv://usuario_admin:6559279bb2@clusterapi-2jqic.mongodb.net/test?retryWrites=true&w=majority',
                private_key: 'feijaocomarroz',
                expireToken: '7d'
            }
    }
}

console.log(`Iniciando a api em ambiente: ${env.toUpperCase()}`);


module.exports = config();