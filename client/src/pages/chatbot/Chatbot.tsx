import ChatBot from "react-simple-chatbot"
import { stepifyScript } from "./utils";
import { useState } from "react";
import NamesList from "./components/NamesList";
import QuestionsList from "./components/QuestionsList";
import { useStore } from "../../state/store";
import { useQuery, useMutation } from "react-query";
import { getQuestions, saveResponse } from "../../features/api/api";
import { Question, Response } from "../../features/api/types";
import { ThemeProvider } from 'styled-components';
import Icon from "./components/Icon";
import FIS_icon from '/src/assets/images/logos/FIS_icon.png';
import Header from "./components/Header";


const Chatbot = () => {

    const theme = {         //chatbtor theme
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#eaeeed',
        botFontColor: '#4f5352',
        userBubbleColor: '#4ace3c',
        userFontColor: '#fff',
    };

    const [open, setOpen] = useState(false)

    const user = useStore((state: any) => state.user)
    const token = useStore((state: any) => state.token)

    const { data: questions, isLoading } = useQuery('chatbot', () => getQuestions(token), {
    });

    const { mutate: postResponse } =
        useMutation((employeeData: Response) => saveResponse(employeeData, token), {
            onSuccess: () => {
                console.log('success')
            }
        });
    const script = [
        {
            id: "BOT/intro",
            message: "Hello there! What do you want to do ?",
            trigger: "CHOICES/intro",
        },
        {
            id: "CHOICES/intro",
            options: [
                { label: "Ask questions about teammates!", trigger: "BOT/chooseTeammate" },
                //    { label: "Answer chatbot some questions", trigger: "BOT/firstQS" },
            ],
            placeholder: 'Choose an option'

        },
        {
            id: "BOT/chooseTeammate",
            message: "Choose One of the following teammates...",
            trigger: "CHOICES/choose",
        },
        {
            id: "CHOICES/choose",
            placeholder: "Choose one from the list",
            component:
                <NamesList />,
            waitAction: true,

        },
        /* 
        {  id: "BOT/firstQS",
             message: "How old are you ?",
             trigger: "USER/firstRes"
         },
         {
             id: "USER/firstRes",
             user: true,
             trigger: (({ value }: any) => {
                 return "BOT/secondQS"
             }),
         },
         {
             id: "BOT/secondQS",
             message: "what are your hobbies ?",
             trigger: "USER/secondRes"
         },
         {
             id: "USER/secondRes",
             user: true,
             trigger: (({ value }: any) => {
                 // setData({ ...data, hobbies: value })
                 return "BOT/end"
             }),
         },*/
        {
            id: 'BOT/TeammateQuestion',
            message: (props: any) => {
                console.log(props);
                return `What do you want to now about  ${props.previousValue} ?`;
            },
            trigger: 'BOT/TeammateQuestionList',
            // placeholder: "Choose from the list",
        },
        {
            id: 'BOT/TeammateQuestionList',
            placeholder: "Choose one from the list",
            component:
                <QuestionsList />,
            waitAction: true,
        },
        {
            id: 'BOT/response',
            message: ({ previousValue }: any) => {
                return `${previousValue} `;
            }, trigger: 'BOT/askAnotherOrChangeOrEnd',
        },
        {
            id: 'BOT/askAnotherOrChangeOrEnd',
            placeholder: "Choose an option",
            options: [
                { label: 'Ask another question', trigger: 'BOT/TeammateQuestionList' },
                { label: 'Ask another Teammate', trigger: 'CHOICES/choose' },
                { label: 'End', trigger: 'BOT/end' },
            ],
        },
        {
            id: 'BOT/end',
            message: 'Thank you for using the chatbot. Goodbye!',
            end: true,
        },
    ]
    const adminScript = [
        {
            id: "BOT/intro",
            message: "Salut Admin !",
            trigger: "CHOICES/intro",
        },
        {
            id: "CHOICES/intro",
            options: [
                { label: "Voire Questions", trigger: "BOT/first" },
            ],
            placeholder: 'Choisissez une option'
        },
        {
            id: "BOT/first",
            message: "Voire liste",
            trigger: "CHOICES/liste",
        },
        {
            id: "CHOICES/liste",
            placeholder: "Liste Questions",
            component:
                <QuestionsList />,
            trigger: "BOT/finConversation"
        },
        {
            id: 'BOT/finConversation',
            placeholder: "Choisissez un option",
            options: [
                { label: 'Finir la conversation', trigger: 'BOT/end' },
            ]
        },
        {
            id: 'BOT/end',
            message: "Merci d'avoir utilisé le chatbot. Au revoir!",
            end: true,
        }
    ]

    const buildSteps = (questions: any) => {
        let steps = [] as any[];

        questions?.forEach((question: Question, index: number) => {
            const questionId = `BOT/Question${index + 1}`;
            const responseId = `BOT/Response${index + 1}`;
            steps.push({
                id: "BOT/intro",
                message: "Salut! Qu'est-ce que vous voulez faire ?",
                trigger: "CHOICES/intro",
            },
                {
                    id: "CHOICES/intro",
                    options: [
                        { label: "Répondre aux questions", trigger: "BOT/Question1" },
                        { label: "Savoir des informations sur d'autres employés", trigger: "BOT/chooseTeammate" },
                    ],
                    placeholder: 'Choisissez une option'

                },
                {
                    id: "BOT/chooseTeammate",
                    message: "Choisissez un employé de la liste",
                    trigger: "CHOICES/choose",
                },
                {
                    id: "CHOICES/choose",
                    placeholder: "Choisissez un employé de la liste",
                    component:
                        <NamesList />,
                    waitAction: true,
                },
                {
                    id: 'BOT/TeammateQuestion',
                    message: (props: any) => {
                        // console.log(props);
                        return `Que voulez-vous savoir sur ${props.previousValue} ?`;
                    },
                    trigger: 'BOT/TeammateQuestionList',
                },
                {
                    id: 'BOT/TeammateQuestionList',
                    placeholder: "Choisissez une question de la liste",
                    component:
                        <QuestionsList />,
                    waitAction: true,
                },
                {
                    id: 'BOT/response',
                    message: ({ previousValue }: any) => {
                        return `${previousValue} `;
                    }, trigger: 'BOT/askAnotherOrChangeOrEnd',
                },
                {
                    id: 'BOT/askAnotherOrChangeOrEnd',
                    placeholder: "Choose an option",
                    options: [
                        { label: 'Choisir une autre question', trigger: 'BOT/TeammateQuestionList' },
                        { label: 'Choisir un autre employé', trigger: 'CHOICES/choose' },
                        { label: 'Finir la conversation', trigger: 'BOT/end' },
                    ],
                },
                {
                    id: 'BOT/end',
                    message: "Merci d'avoir utilisé le chatbot. Au revoir!",
                    end: true,
                },)
            steps.push(
                {
                    id: questionId,
                    message: ` ${question.question}?`,
                    trigger: responseId,
                },
                {
                    id: responseId,
                    user: true,
                    trigger: ({ value }: any) => {
                        postResponse({ questionId: question.id, response: value, employeeId: user.id });
                        return (index === questions?.length - 1) ? 'BOT/endAnswer' :
                            `BOT/Question${index + 2}`
                    },
                }
            );
        });

        steps.push({
            id: 'BOT/endAnswer',
            message: 'Merci pour vos réponses que voulez-vous faire ensuite ?',
            trigger: 'BOT/endAnswerOptions'
        }
            , {
                id: 'BOT/endAnswerOptions',
                placeholder: "Choisissez un option",
                options: [
                    { label: "Savoir des informations sur d'autres employés", trigger: 'CHOICES/choose' },
                    { label: 'Finir la conversation', trigger: 'BOT/end' },
                ]
            }

        );

        return steps;
    };

    let steps = buildSteps(questions)

    if (isLoading) {
        return <></>
    }

    /* let scale = keyframes`
     0% {
         transform: scale(1);
       }
       50% {
         transform: scale(1.2);
       }
       100% {
         transform: scale(1);
       }
 `;
     let animation = (props: any) => css`${scale} 2s linear infinite; `
 
     let styles = {
         background: '#4ace3c',
         animation: `${animation} `
     };*/
    return (
        <ThemeProvider theme={theme}>
            <ChatBot
                headerComponent={<Header setOpen={setOpen} open={open} />}
                toggleFloating={() => setOpen(!open)}
                //  handleEnd={() => console.log(userResponses)}
                opened={open}
                floating={true}
                floatingIcon={<Icon />}
                floatingStyle={{ background: '#4ace3c' }}
                bubbleStyle={{ lineHeight: '20px', width: 'auto' }}
                bubbleOptionStyle={{ backgroundColor: "#4ace3c", color: "white", width: 'auto' }}
                steps={stepifyScript(user.role == "ADMIN" ? adminScript : steps)}
                width={"400px"}
                height={"500px"}
                userAvatar={user?.image}
                botAvatar={FIS_icon}
            />
        </ThemeProvider>

    )
}

export default Chatbot
