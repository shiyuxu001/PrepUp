import { useNavigate } from 'react-router-dom'
import '../styles/Profile.css';

function Profile({username}) {
    let navigate = useNavigate();

    const handleBackButton = () => {
        navigate("/PrepUp");
    }

    return (
        <div>
            <button className="back-button" onClick={handleBackButton}>Back</button>
            <div className="container">
                <div className="profile-pic">

                </div>
            </div>
            <h1 className="profile-name">John Doe</h1>
            <div className="container">
                <div className="profile-setting">
                    <p className="setting-header">Experience level</p>
                    <div className="setting">

                    </div>
                </div>
            </div>
            <div className="container">
                <div className="profile-setting">
                    <p className="setting-header">Experience level</p>
                    <div className="setting">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;