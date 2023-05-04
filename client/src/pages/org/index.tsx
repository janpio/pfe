import OrganizationalChart from './orgChart'
import employees from './data'
import PageContainer from '../../components/container/PageContainer'
import { useEffect, useState } from 'react'

const transformBuildingData = (buildingData: any) => {
    const transformedData = buildingData.map((building: any) => {
        const buildingNode = {
            id: building.id.toString(),
            name: building.name,
            parentId: "",
            imageUrl:
                "https://www.ab-engineering.fr/wp-content/uploads/2016/01/The-Stadthaus-un-immeuble-en-bois-de-9-%C3%A9tages-%C3%A0-Londres.jpg",
        };

        const stageNodes = building.stages.map((stage: any) => {
            const stageId = `${building.id}-${stage.id}`;
            const stageNode = {
                id: stageId,
                name: stage.name,
                parentId: building.id.toString(),
                imageUrl:
                    "https://www.signaletique.biz/25946-large_default/plaque-1er-etage-carre-alu-brosse.jpg",
            };

            const roomNodes = stage.rooms.map((room: any) => {
                const roomId = `${stageId}-${room.id}`;
                const roomNode = {
                    id: roomId,
                    name: room.name,
                    parentId: stageId,
                    imageUrl: room.image
                };

                const teamNodes = room.teams.map((team: any) => {
                    const teamId = `${roomId}-${team.id}`;
                    const teamNode = {
                        id: teamId,
                        name: team.name,
                        parentId: roomId,
                        imageUrl:
                            "https://www.signaletique.biz/25946-large_default/plaque-1er-etage-carre-alu-brosse.jpg",
                    };

                    const supervisorNodes = team.supervisor.map((supervisor: any) => {
                        const supervisorId = `${teamId}-${supervisor.id}`;
                        const supervisorNode = {
                            id: supervisorId,
                            name: supervisor.name,
                            parentId: teamId,
                            role: supervisor.role,
                            imageUrl: supervisor.image
                        };
                        const employeeNodes = supervisor.employees.map((employee: any) => {
                            const employeeId = `${supervisorId}-${employee.id}`;
                            const employeeNode = {
                                id: employeeId,
                                name: employee.name,
                                parentId: supervisorId,
                                role: employee.role,
                                imageUrl: employee.image
                            };
                            return employeeNode;
                        });

                        return [supervisorNode, ...employeeNodes];
                    });

                    return [teamNode, ...supervisorNodes.flat()];
                });

                return [roomNode, ...teamNodes.flat()];
            });

            return [stageNode, ...roomNodes.flat()];
        });

        return [buildingNode, ...stageNodes.flat()];
    });

    return transformedData.flat();
};




const Index = () => {

    const [data, setData] = useState()

    const handleEmployees = async () => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        const transformedData = transformBuildingData(data);
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