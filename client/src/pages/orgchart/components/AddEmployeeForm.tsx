import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from "@mui/material";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { addEmployee } from '../../../features/api/api';
import useAuthStore from "../../../store";

const employeeSchema = object({
    name: string().nonempty('Name is required'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
    role: string().nonempty('Role is required'),
    image: string().nonempty('Image is required'),
    supervisor: string()
});

export type EmployeeInput = TypeOf<typeof employeeSchema>;

const AddEmployee: FC<any> = ({ showForm, setShowForm, Supervisor, chart, parentNodeId }) => {

    const store = useAuthStore()
    console.log(parentNodeId)
    const addNode = () => {
        const node = {
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            name: getValues().name,
            email: getValues().email,
            role: getValues().role,
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

    const { mutate: addEmployeee, isSuccess } =
        useMutation((employeeData: EmployeeInput) =>
            addEmployee(employeeData, store.token), {
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
                            label='Role'
                            fullWidth
                            margin="normal"
                            type='text'
                            error={!!errors.role}
                            helperText={errors.role?.message}
                            {...register('role')}
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
                            fullWidth
                            margin="normal"
                            type='text'
                            {...register('supervisor')}
                        />
                        <DialogActions>
                            <Button onClick={() => { setShowForm(false) }}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add Employee</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export default AddEmployee