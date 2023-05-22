import swaggerJSDoc from "swagger-jsdoc"





const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Data',
            version: '1.0.0',
            description: 'a REST application Documentations to manage the display of control notes for your sector',
        },
        host: 'localhost:5000',
        basePath: '/'
    },
    apis: ['./routes/*.js']
};



const swaggerDoc = swaggerJSDoc(swaggerOptions)
export default swaggerDoc 
