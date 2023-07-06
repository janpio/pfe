import OrganizationalChart from './components/orgChart';
import PageContainer from '../../components/container/PageContainer';
import { getOrgChartData } from '../../features/api/api';
import { useQuery } from 'react-query';
import { Node } from './types';
import { toast } from 'react-toastify'
import { useStore } from '../../state/store';
import Spinner from '../../components/shared/Spinner';

const Index = () => {

    const token = useStore((state: any) => state.token)
    const logout = useStore((state: any) => state.logout)

    const { isLoading, data } = useQuery<Node[], any>('orgData', () => getOrgChartData(token), {
        retry: 2
        , onError(error: any) {
            if (error.response?.data?.error === "Expired Token") {
                toast.error(`${error.response.data?.error}, Login again ! `,
                    { position: 'bottom-center' })
                setTimeout(() => {
                    localStorage.removeItem("user");
                    logout()
                }, 3400);
                // clearTimeout(time)
            }
            else if (error.response?.data?.error === "Invalid Token") {
                toast.error(`${error.response.data?.error}, Login again`,
                    { position: 'bottom-center' })
                setTimeout(() => {
                    localStorage.removeItem("user");
                    logout()
                }, 3400);
                //  clearTimeout(time)
            }
        }
    });
    if (isLoading) return <Spinner />
    if (!data) return <div>No data !!</div>;
    return (
        <>
            <PageContainer title="Organizational chart" description="organizational chart of the company">
                <OrganizationalChart data={data} />
            </PageContainer>

        </>
    );
};

export default Index;
