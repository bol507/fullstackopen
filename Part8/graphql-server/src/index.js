const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');

const config = require('./utils/config');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const jwt = require('jsonwebtoken');

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

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
      }
      
      type Token {
        value: String!
      }
    
    type Query {
        dummy: Int
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String):[Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
        ): Book!

        editAuthor(id: ID!, setBornTo: Int!): Author
        addAuthor(name: String!, born: Int): Author!
        createUser(
            username: String!
            favoriteGenre: String!
          ): User
          login(
            username: String!
            password: String!
          ): Token
      }
`;

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async () => {
			return await Book.find({}).populate('author');
		},
		allAuthors: async () => {
			return await Author.find({});
		},
		me: (root, args, context) => {
			if (!context.user) {
				throw new GraphQLError('Authentication required');
			}
			return context.user;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
            if (!context.token) {
                throw new Error('Authentication required');
            }
			const author = await Author.findOne({ name: args.author }).exec();

			if (!author) {
				throw new Error(`Author not found: ${args.author}`);
			}

			const newBook = new Book({
				title: args.title,
				author: author.id,
				published: args.published,
				genres: args.genres,
			});
			try {
				await newBook.save();
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}
			return newBook;
		},
		editAuthor: async (root, args) => {
            if (!context.token) {
                throw new Error('Authentication required');
              }
			const author = Author.findById(args.id);
			if (!author) {
				throw new GraphQLError(`Author not found: ${args.name}`, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
					},
				});
			}
			author.born = args.setBornTo;
			try {
				await author.save();
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}

			return author;
		},
		addAuthor: async (root, args) => {
			const existingAuthor = await Author.findOne({ name: args.name }).exec();

			if (existingAuthor) {
				throw new GraphQLError(`Author already exists: ${args.name}`, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
					},
				});
			}
			const newAuthor = new Author({ name: args.name, born: args.born });
			try {
				await newAuthor.save();
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						args,
						error,
					},
				});
			}

			return newAuthor;
		}, //addAuthor
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});
			try {
				await user.save();
			} catch (error) {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: username,
						favouriteGenre,
						error,
					},
				});
			}
			return user;
		}, //createUser
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username }).exec();
	
			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
            const userForToken = {
                username: user.username,
                id: user.id,
            }
			
            const token = jwt.sign(userForToken, process.env.JWT_SECRET);
			console.log(token)
            return { value: token };
		},
	}, //mutation
}; //resolver

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
