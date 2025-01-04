const jwt = require('jsonwebtoken');
const { generateResponse } = require('./response');


const generateJwt = (id, email) => {

    return new Promise( (resolve, reject) => {

        const payload = { id, email };

        jwt.sign( payload, process.env.SECRET_JWT, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }

        } )

    } )

}

const validateJwt = (req, res, next) => {

    const token = req.header('Authorization');

    if( !token ) {
        return generateResponse(401, 'Token required', null, res);
    }

    try {
        const { id, email } = jwt.verify( token, process.env.SECRET_JWT );

        req.locals = {
            id,
            email
        };

        next();
    } catch (error) {
        return generateResponse(401, 'Token invalid', null, res);
    }

    next();
}

module.exports = {
    generateJwt,
    validateJwt
}