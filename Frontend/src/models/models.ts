export namespace Model {
    export interface AnswerInterface extends Timestamp {
        _id?: string
        content?: String,
        chosen: Boolean,

        upvotes: String[],
        downvotes: String[],

        childAnswers?: AnswerInterface[],
        parentAnswer?: AnswerInterface,
        question?: String,
        user?: String
    }

    export interface QuestionInterface extends Timestamp{
        _id?: String,
        title?: String,
        description?: String,
        tags?: String[],
        views?: Number,
        user?: String
    }

    export interface UserInterface extends Timestamp{
        _id?: String
        email?: String,
        username?: String,
        password?: String,
        image?: String
    }

    export interface LoginResponse {
        token?: String,
        expires?: String,
        id?: String
    }
}

interface Timestamp {
    createdAt?: String,
    updatedAt?: String
}
