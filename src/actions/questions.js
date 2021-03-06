import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion({ id, timestamp, author, optionOne, optionTwo }) {
    return {
        type: ADD_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        const questionInfo = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }

        return saveQuestion(questionInfo)
            .then((question) => {
                console.log('created QUESTION', question);
                dispatch(addQuestion(question))
            })
            
    }
}

function addAnswer({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        authedUser, 
        qid, 
        answer
    }
}

export function handleAddAnswer(info) {
    return (dispatch) => {
        dispatch(addAnswer(info))
        return saveQuestionAnswer(info)
    }
}