import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { useQuery } from 'react-query';
import { useStore } from '../../../state/store';
import { getQuestions } from '../../../features/api/api';
import { Question } from '../../../features/api/types';
import { getQuestionResponse } from '../utils';

export default function QuestionsList({ triggerNextStep }: any) {

    const token = useStore((state: any) => state.token)
    const teammate = useStore((state: any) => state.teammate)

    const { data: questions } = useQuery<Question[]>('chatbot', () => getQuestions(token), {

    });

    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState<any>('');


    const handleChange = (e: SelectChangeEvent) => {
        setQuestion(e.target.value);
    };


    useEffect(() => {
        setResponse(getQuestionResponse(teammate, question, questions) ?
            getQuestionResponse(teammate, question, questions) :
            `Oops ${teammate} doesn't provide a response to this question !`)
    }, [question])

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="question-select">Questions</InputLabel>
                <Select
                    labelId="question-select"
                    id="question-select-id"
                    value={question}
                    label="Questions"
                    onChange={handleChange}>
                    {questions?.map((question) =>
                        <MenuItem key={question.id} value={question.abreviation}>
                            {question.abreviation} ?
                        </MenuItem>)}
                </Select>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => triggerNextStep({ value: response, trigger: 'BOT/response' })}
                    sx={{
                        mt: '5px',
                        color: 'white', "&:hover": {
                            backgroundColor: "#49be25",
                        },
                    }}
                >
                    Ask
                </Button>
            </FormControl>
        </div>
    );
}