import OrganizationalChart from './orgChart'
import employees from './data'
import PageContainer from '../../components/container/PageContainer'
import { useEffect, useState } from 'react'

const test = [{
    id: 1,
    name: "immeuble",
    parentId: "",
    imageUrl: 'https://www.ab-engineering.fr/wp-content/uploads/2016/01/The-Stadthaus-un-immeuble-en-bois-de-9-%C3%A9tages-%C3%A0-Londres.jpg'
},
{
    id: 2,
    parentId: 1,
    name: "Etage 1",
    imageUrl: "https://www.signaletique.biz/25946-large_default/plaque-1er-etage-carre-alu-brosse.jpg"
},
{
    id: 3,
    parentId: 1,
    name: "Etage 2",
    imageUrl: "https://www.signaletique.biz/25937-large_default/plaque-2eme-etage-carre-alu-brosse.jpg"
},
{
    id: 4,
    parentId: 1,
    name: "Etage 3",
    imageUrl: "https://www.signaletique.biz/25928-large_default/plaque-3eme-etage-carre-alu-brosse.jpg"
},]

const transformBuildingData = (buildingData: any) => {
    const transformedData = buildingData.map((building: any) => {
        const buildingNode = {
            id: building.id,
            name: building.name,
            parentId: "",
            imageUrl:
                "https://www.ab-engineering.fr/wp-content/uploads/2016/01/The-Stadthaus-un-immeuble-en-bois-de-9-%C3%A9tages-%C3%A0-Londres.jpg",
        };

        const stageNodes = building.stages.map((stage: any) => ({
            id: (Math.floor(Math.random() * 100000)),
            name: stage.name,
            parentId: building.id,
            imageUrl: "https://www.signaletique.biz/25946-large_default/plaque-1er-etage-carre-alu-brosse.jpg",
        }));

        return [buildingNode, ...stageNodes];
    });
    return transformedData.flat();
}


const Index = () => {

    const [data, setData] = useState([])

    const handleEmployees = async () => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        const transformedData = transformBuildingData(data.building);
        setData(transformedData);
    }
    useEffect(() => {
        handleEmployees()
    }, [])

    console.log("data :  ", data)

    return (
        <>
            <PageContainer title="orgchart" description="this is orgchart">
                <OrganizationalChart data={data} />
            </PageContainer>
        </>
    )
}

export default Index