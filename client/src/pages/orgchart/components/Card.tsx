import { FC } from "react";
import "../styles.css";
import { useStore } from "../../../state/store";

const Card: FC<any> = ({ data: { name, imageUrl, position, team, _directSubordinates } }) => {

  const user = useStore((state: any) => state.user)

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

            : name.toLowerCase().includes("team") ?
              (<div className="equipeContainer">
                <h1 className="name"  >
                  {name}
                </h1>
              </div>)
              : <div className="container">
                <div>
                  {user.name != name && user.role === "USER" && <button
                    id="inviteBtn" style={{
                      position: 'absolute',
                      top: '40px',
                      right: '40px',
                      backgroundColor: '#4ace3c',
                      border: '1px solid #4ace3c',
                      color: 'white',
                      padding: '20px 30px',
                      borderRadius: '25px',
                      fontSize: '40px',
                      cursor: 'pointer',
                    }}>
                    Invite
                  </button>}
                  <img src={imageUrl} className="avatar" alt="avatar" />:
                  {_directSubordinates ? <div className="badge">{_directSubordinates}</div> : null}
                </div>
                <div className="table">
                  <h1 className="name" >
                    {name || team}
                  </h1>
                  <h1 className="job">
                    {position}
                  </h1>
                </div>
              </div>
      }
    </div>
  );
};

export default Card;
