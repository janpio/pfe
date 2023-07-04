import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { IconMessage2Question } from '@tabler/icons-react';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import Activities from "./components/Activities";
import Invitations from "./components/Invitations";
import Questions from "./components/Questions";
import PageContainer from "../../components/container/PageContainer";
const Admin = () => {

    const [value, setValue] = useState("1");
    const handleChange = (e: SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            <PageContainer title="admin" description="this is the admin dashboard">
                <Box marginTop={-2}>
                    <TabContext value={value}>
                        <Box sx={{
                            borderBottom: 1,
                            borderColor: "divider"
                        }}>
                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                <TabList
                                    onChange={handleChange}>
                                    <Tab
                                        icon={<CallReceivedIcon />}
                                        label="Activités" value="1" />
                                    <Tab icon={<IconMessage2Question />}
                                        label="Questions de Chatbot" value="2" />
                                    <Tab icon={<ConnectWithoutContactOutlinedIcon />}
                                        label="Toutes les invitations des activités" value="3" />
                                </TabList>
                            </Box>

                        </Box>
                        <TabPanel value="1"><Activities /></TabPanel>
                        <TabPanel value="2"><Questions /></TabPanel>
                        <TabPanel value="3"><Invitations /></TabPanel>
                    </TabContext>
                </Box>
            </PageContainer>
        </>
    );
}

export default Admin;
