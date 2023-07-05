import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SendIcon from '@mui/icons-material/Send';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import InvitationsSent from "./components/InvitationsSent";
import InvitationsReceived from "./components/InvitationsReceived";
import PageContainer from "../../components/container/PageContainer";
function App() {
    const [value, setValue] = React.useState("1");

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <>
            <PageContainer title="invitations" description="this is invitations page">
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
                                        label="Invitations reçues" value="1" />
                                    <Tab icon={<SendIcon />}
                                        label="Invitations Envoyées" value="2" />
                                </TabList>
                            </Box>

                        </Box>
                        <TabPanel value="1"><InvitationsReceived /></TabPanel>
                        <TabPanel value="2"><InvitationsSent /></TabPanel>
                    </TabContext>
                </Box>
            </PageContainer>
        </>
    );
}

export default App;
