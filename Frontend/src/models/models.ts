export namespace Model {
    export interface AnswerInterface extends Timestamp {
        content?: String,
        chosen: Boolean,

        upvotes: String[],
        downvotes: String[],

        childAnswers?: String[],
        parentAnswer?: String,
        question?: String,
        user?: String
    }

    export interface QuestionInterface extends Timestamp{
        title?: String,
        description?: String,
        tags?: String[],
        views?: Number,
        user?: String
    }

    export interface UserInterface extends Timestamp{
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
