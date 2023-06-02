import OrganizationalChart from './components/orgChart';
import PageContainer from '../../components/container/PageContainer';
import { getOrgChartData } from '../../features/api/api';
import { CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import { Node } from './types';
import { toast } from 'react-toastify'
import { useStore } from '../../state/store';

const Index = () => {

    const token = useStore((state: any) => state.token)
    const logout = useStore((state: any) => state.logout)

    const { isLoading, data } = useQuery<Node[], any>('orgData', () => getOrgChartData(token), {
        retry: 2
        , onError(error: any) {
            if (error.response.data.error === "Expired Token") {
                toast.error(`${error.response.data.error}, Login again ! `,
                    { position: 'bottom-center' })
                setTimeout(() => {
                    localStorage.removeItem("user");
                    logout()
                }, 3400);
                // clearTimeout(time)
            }
            else if (error.response.data.error === "Invalid Token") {
                toast.error(`${error.response.data.error}, Login again`,
                    { position: 'bottom-center' })
                setTimeout(() => {
                    localStorage.removeItem("user");
                    logout()
                }, 3400);
                //  clearTimeout(time)
            }
        }
    });
    if (isLoading) return <CircularProgress size={90} sx={{ position: 'absolute', left: '50%', top: '50%' }} />
    if (!data) return <div>No data !!</div>;
    return (
        <>
            <PageContainer title="orgchart" description="this is orgchart">
                <OrganizationalChart data={data} />
            </PageContainer>

        </>
    );
};

export default Index;
