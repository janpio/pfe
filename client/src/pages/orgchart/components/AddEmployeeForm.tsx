import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { FC } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { addEmployee } from '../../../features/api/api';
import { useStore } from "../../../state/store";

type AddEmployeeProps = {
    showForm: boolean,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    setSupervisor: React.Dispatch<React.SetStateAction<string>>
    Supervisor: string,
    chart: any,
    parentNodeId: string
}

const employeeSchema = object({
    name: string().nonempty('Name is required'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
    position: string().nonempty('Position is required'),
    image: string().nonempty('Image is required'),
    supervisor: string()
});

export type EmployeeInput = TypeOf<typeof employeeSchema>;

const AddEmployee: FC<AddEmployeeProps> = ({ showForm, setShowForm, Supervisor, setSupervisor, chart, parentNodeId }) => {

    const token = useStore((state: any) => state.token)

    const addNode = () => {
        const node = {
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            name: getValues().name,
            email: getValues().email,
            position: getValues().position,
            imageUrl: getValues().image,
            parentId: parentNodeId
        };
        chart.addNode(node);
    }
    const {
        register,
        formState: { errors },
        getValues,
        reset,
        handleSubmit,
    } = useForm<EmployeeInput>({
        resolver: zodResolver(employeeSchema),
    });

    const onSubmitHandler: SubmitHandler<EmployeeInput> = (values) => {
        addEmployeee(values);
        addNode()
    };

    const { mutate: addEmployeee } =
        useMutation((employeeData: EmployeeInput) =>
            addEmployee(employeeData, token), {
            onError: (err) => {
                console.log(err)
            }
            , onSuccess: () => {
                setShowForm(false)
                reset()
            }
        });

    return (
        <div>
            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TextField
                            margin="normal"
                            label='Name'
                            fullWidth
                            type='text'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            {...register('name')}
                        />
                        <TextField
                            label='Email'
                            fullWidth
                            margin="normal"
                            type='email'
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email')}
                        />
                        <TextField
                            label='Password'
                            fullWidth
                            margin="normal"
                            type='password'
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...register('password')}
                        />
                        <TextField
                            label='Position'
                            fullWidth
                            margin="normal"
                            type='text'
                            error={!!errors.position}
                            helperText={errors.position?.message}
                            {...register('position')}
                        />
                        <TextField
                            label='Image'
                            fullWidth
                            margin="normal"
                            type='text'
                            error={!!errors.image}
                            helperText={errors.image?.message}
                            {...register('image')}
                        />
                        <TextField
                            label='Supervisor'
                            value={Supervisor}
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register('supervisor')}
                        />
                        <DialogActions>
                            <Button onClick={() => {
                                setShowForm(false)

                            }}>Cancel</Button>
                            <LoadingButton
                                variant="contained"
                                size="large"
                                type="submit"
                                sx={{
                                    color: 'white', "&:hover": {
                                        backgroundColor: "#49be25",
                                    },
                                }}>
                                Add Employee
                            </LoadingButton>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export default AddEmployee