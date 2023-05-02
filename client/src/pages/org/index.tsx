import OrganizationalChart from './orgChart'
import employees from './data'
import PageContainer from '../../components/container/PageContainer'
const index = () => {
    return (
        <>
            <PageContainer title="orgchart" description="this is orgchart">
                <OrganizationalChart data={employees} />
            </PageContainer>
        </>
    )
}

export default index