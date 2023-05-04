import React, { FC } from "react";
import "./styles.css";
//import styled from "styled-components";

const Card: FC<any> = ({ data: { name, imageUrl, role, positionName, team, _directSubordinates } }) => {
  return (
    <div>
      {name === "immeuble" ?
        (<div className="immeubleContainer">
        </div>)

        : name.toLowerCase().includes("etage") ?
          (<div className="etageContainer">
            <img src={imageUrl} alt="etage img" />
          </div>)

          : name.toLowerCase().includes("salle") ?
            (<div className="etageContainer">
              <img src={imageUrl} alt="salle img" />
            </div>)

            : name.toLowerCase().includes("equipe") ?
              (<div className="equipeContainer">
                <h1 className="name" >
                  {name}
                </h1>
              </div>)

              : <div className="container">
                <div >
                  <img src={imageUrl} className="avatar" alt="avatar" />:
                  {_directSubordinates ? <div className="badge">{_directSubordinates}</div> : null}
                </div>
                <div className="table">
                  <h1 className="name" >
                    {name || team}
                  </h1>
                  <h1 className="job">
                    {role}
                  </h1>
                </div>
              </div>
      }
    </div>
  );
};

export default Card;
