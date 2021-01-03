import { Model, Collection } from 'js-abstract-model'
import { AnswerList } from './Answer'
import { ChoiceList } from './Choice'

class Question extends Model {
    constructor (data) {
        super(data, [
            {
                key: 'baseRoute',
                default: 'https://alaatv.com/api/aaa/v1/exam/1'
            },
            { key: 'id' },
            { key: 'title' },
            { key: 'body' },
            { key: 'photo' },
            { key: 'order' },
            {
                key: 'isInView',
                default: false
            },
            { key: 'sub_category' },
            {
                key: 'answers',
                relatedModel: AnswerList
            },
            {
                key: 'choices',
                relatedModel: ChoiceList
            },
            {
                key: 'state',
                default: ''
            },
            {
                key: 'bookmarked',
                default: false
            },
            { key: 'lesson' },
            {
                key: 'seen',
                default: false
            }
        ])
    }

    getAnsweredChoice () {
        return this.choices.list.find((item) => {
            return (item.active === true)
        })
    }

    isAnswered () {
        let answeredChoice = this.getAnsweredChoice()

        if (answeredChoice) {
            this.state = ''
            return true
        } else {
            return false
        }
    }

    changeState (newState) {
        this.uncheckChoices()
        if (newState === this.state) {
            this.state = ''
            return
        }
        this.state = newState
    }

    bookmark () {
        this.bookmarked = !this.bookmarked
    }

    choiceClicked (choiceId) {
        this.choices.list.map((item)=> {
            if (item.id !== choiceId) {
                item.active = false
            } else if (item.active) {
                item.active = false
            } else {
                item.active = true
            }
        })
    }

    uncheckChoices () {
        this.choices.list.map((item)=> {
            item.active = false
        })
    }
}

class QuestionList extends Collection {
    model () {
        return Question
    }

    sortByOrder() {
        return this.sortByKey('order');
    }

    getQuestionIndexById (questionId) {
        return this.list.findIndex((item)=> parseInt(item.id) === parseInt(questionId))
    }

    getQuestionById (questionId) {
        return this.list.find((item)=> parseInt(item.id) === parseInt(questionId))
    }

    getQuestionByIndex (questionIndex) {
        let question = this.list[questionIndex]
        if (question) {
            return question
        } else {
            return false
        }
    }

    getNextQuestion (questionId) {
        let currentIndex = this.getQuestionIndexById(questionId),
            nextIndex = ++currentIndex
        return this.getQuestionByIndex(nextIndex)
    }

    getPrevQuestion (questionId) {
        let currentIndex = this.getQuestionIndexById(questionId),
            prevIndex = --currentIndex
        return this.getQuestionByIndex(prevIndex)
    }
}

export { Question, QuestionList }