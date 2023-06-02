import { Question } from "../../features/api/types"

export const getQuestionResponse = (teammate: string, questionAsked: string, questions: Question[] | any) => {
    const question = questions?.filter((qes: any) =>
        qes.question.toLowerCase().includes(questionAsked.toLowerCase()) ||
        qes.abreviation.toLowerCase().includes(questionAsked.toLowerCase())
    )
    const responses = question?.flatMap((qes: any) => qes.response);

    const teammateResponseObject = responses?.find((res: any) =>
        res.Employee.name === teammate);

    return teammateResponseObject?.response
}

