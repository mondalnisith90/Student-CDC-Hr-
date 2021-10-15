import axios from 'axios';
import {useState, useContext} from 'react';
import {currentUserDataContext} from "../../App";
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';


const reactToastStyle = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

const Login = () => {


    const {currentUserData, setCurrentUserData}  = useContext(currentUserDataContext);
    const history = useHistory();

    const [inputFormData, setInputFormData] = useState({
        email: "",
        password: ""
    });

    // console.log(currentUserData)

    const inputFieldChange = (event) => {
       const fieldName = event.target.name;
       const fieldValue = event.target.value;
        setInputFormData({...inputFormData, [fieldName]: fieldValue});
    }

    const {email, password} = inputFormData;
     

    const studentLoginFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl = `http://localhost:8000/student/signin`;
            const serverResponse = await axios.post(apiUrl, inputFormData, {withCredentials: true});
            if(serverResponse.status == 200){
                const data = serverResponse.data;
                //set cookies in client side
                Cookies.set("user_type", "student", {expires: 60});
                setCurrentUserData({...currentUserData, isAlreadyLogin: true, userId: data._id, name: data.name, profile_pic: data.profile_pic, type: data.type});
                toast.success("Login successfull", reactToastStyle);
                setTimeout(()=>{
                    history.push("/");
                }, 2000);
            } 
        } catch (error) {
            setCurrentUserData({...currentUserData, isAlreadyLogin: false});
            toast.error(error.response.data, reactToastStyle);
        }
    }

    return (
    <>
    <div >
    <ToastContainer />
    <h2 style={{marginTop: "70px", textAlign: "center"}}>Student Login</h2>
    <form action="POST" className="login" onSubmit={studentLoginFormSubmit}>
                
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={email} onChange={inputFieldChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={inputFieldChange} id="exampleInputPassword1"/>
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className ="form-check-label" for="exampleCheck1">Accept our T&C</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>

    </>
    );
}
export default Login;