const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const http = require('http')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const config = require('./utils/config');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});


const start = async() => {
	const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/',
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    })

	await server.start()

    app.use('/', cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(
					auth.substring(7), process.env.JWT_SECRET
				  )
				  const currentUser = await User.findOne({ username: decodedToken.username })
				
				return { currentUser }
            }
        },
    }))

    const PORT = 4000
    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}//start

start()
