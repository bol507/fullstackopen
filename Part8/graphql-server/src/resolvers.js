const Book = require("./models/Book")
const Author = require("./models/Author");
const User = require("./models/User");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root,args) => {
			return await Book.find({}).populate('author');
		},
		allAuthors: async () => {
			return await Author.find({});
		},
		me: (root, args, context) => {
			return context.currentUser
		},
		allBooksByGenre: async (root, args, context) => {
            const genre = args.genre;
            if (genre === "ALL") {
                const books = await Book.find({}).populate("author");
                return books
            }
            // case insensitive
            const res = await Book.find({ genres: { $regex: new RegExp(genre, "i") } }).populate("author");
            return res;
        },
	},
	Mutation: {
		addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

			const authorExists = await Author.findOne({ name: args.author }).exec();

			if (!authorExists) {
				const newAuthor = new Author({ "name": args.author })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }

			}
			const author = await Author.findOne({ name: args.author }).exec();
			
            const newBook = new Book({ ...args, author: author });
			try {
				const addedBook = await newBook.save();
				//subscription
				pubsub.publish("BOOK_ADDED", { bookAdded: addedBook })

				return addedBook;

			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args
					},
				});
			}
			
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
			
			const author = await Author.findById(args.id);
			
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
				return await author.save();
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}

			
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
			
            return { value: token };
		},
		 
	}, //mutation
	Subscription: {
		bookAdded:{
			subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
		}
	}//subscription
}; //resolver

module.exports = resolvers;