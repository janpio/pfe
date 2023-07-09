export const transformData = (orgData: any) => {
    const transformedData = orgData?.map((building: any) => {
        const buildingNode = {
            id: building.id.toString(),
            name: building.name,
            parentId: "",

        };
        const stageNodes = building.stages.map((stage: any) => {
            const stageId = `${building.id}-${stage.id}`;
            const stageNode = {
                id: stageId,
                name: stage.name,
                parentId: building.id.toString(),
                imageUrl: stage?.image
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
                            email: supervisor.email,
                            parentId: teamId,
                            position: supervisor.position,
                            imageUrl: supervisor.image
                        };
                        const employeeNodes = supervisor.supervisedEmployees.map((employee: any) => {
                            const employeeId = `${supervisorId}-${employee.id}`;
                            const employeeNode = {
                                id: employeeId,
                                name: employee.name,
                                email: employee.email,
                                parentId: supervisorId,
                                position: employee.position,
                                imageUrl: employee.image,
                                responses: employee.response

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

export const getNodeByEmail = (jsonData: any, email: any) => {

    function findId(items: any, email: any) {
        for (const item of items) {
            if (item.email === email) {
                return item;
            }
        }
        return null;
    }

    const node = findId(jsonData, email);
    return node;
}


export const getNodeById = (jsonData: any, id: any) => {

    function findNode(items: any, id: any) {
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
        }
        return null;
    }

    const node = findNode(jsonData, id);
    return node;
}


export const getTeammatesNodes = (jsonData: any, parentId: any) => {
    const nodes: any = [];

    function findNodes(items: any, parentId: any) {
        for (const item of items) {
            if (item.parentId === parentId) {
                nodes.push(item);
            }
        }
        return null
    }

    findNodes(jsonData, parentId);
    return nodes;
};
