import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { useStore } from '../../../state/store';

export default function NamesList({ triggerNextStep }: any) {

    const teammates = useStore((state: any) => state.teammates)
    const setTeammate = useStore((state: any) => state.setTeammate)
    const teammate = useStore((state: any) => state.teammate)

    const handleChange = (event: SelectChangeEvent) => {
        setTeammate(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Teammates</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={teammate || ""}
                    label="Teammate"
                    onChange={handleChange}>
                    {teammates.map((item: any) =>
                        <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                    )}
                </Select>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => triggerNextStep({ value: teammate, trigger: 'BOT/TeammateQuestion' })}
                    sx={{
                        mt: '5px',
                        color: 'white', "&:hover": {
                            backgroundColor: "#49be25",
                        },
                    }}
                >
                    Next
                </Button>
            </FormControl>
        </div>
    );
}