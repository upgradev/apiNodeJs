const env = process.env.NODE_ENV || 'dev';

const config = () => {
    
    switch(env){
        case 'dev':
            return {
                bd_string : '',
                jwt_pass : '',
                jtw_expires_in: '7d'
            }
        case 'hml': 
            return {
                bd_string : '',
                jwt_pass : '',
                jtw_expires_in: '7d'
            }   
        case 'prod':
            return {
                bd_string : '',
                jwt_pass : '',
                jtw_expires_in: '7d'
        }     
    }
}

console.log(`Starting api in environment ${env.toUpperCase()}`);

module.exports = config();