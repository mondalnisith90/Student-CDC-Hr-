import defaultUser from "../../images/default_hr.png";
import "../../css/HrCard.css";
import axios from "axios";
import { useEffect, useState } from "react";

const HrRequestCard = ({hrRequestId, fetchDataFromServer})=>{
    const [hrData, setHrData] = useState({});

    useEffect(()=>{
        fetchHRDataFromServer();
    }, []);

    const fetchHRDataFromServer = async ()=>{
        const apiUrl = `http://localhost:8000/hr/search/${hrRequestId}`;
        try {
            const serverResponse = await axios.get(apiUrl);
            if(serverResponse.status == 200){
                setHrData(serverResponse.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    const hrViewButton = () => {
      alert("Hr Profile Details.");
    }

    const hrAcceptBtn = async () => {
      hrIsGrantedStatusUpdate("true");
    }


    const hrRejectBtn = async () => {
      hrIsGrantedStatusUpdate("false");
    }


    const hrIsGrantedStatusUpdate = async (value)=>{
      const apiUrl = `http://localhost:8000/hr/isgranted/update/${hrRequestId}`;
      const data = {isGranted: value};
      try {
        const serverResponse = await axios.put(apiUrl, data);
        if(serverResponse.status == 200){
          hrRequestIdDelete();
        }
      } catch (error) {
        alert("Update failed.");
        console.log(error.message)
      }
    }


    const hrRequestIdDelete = async ()=>{
      try {
        const apiUrl = `http://localhost:8000/admin/hr-request/remove/${hrRequestId}`;
        const serverResponse = await axios.delete(apiUrl);
        if(serverResponse.status==200){
          alert("Delete Successfully.");
          fetchDataFromServer();
        }
        console.log(serverResponse);
      } catch (error) {
        alert("Error: "+error.message);
      }
    }

    return(
        <>
          <div className="card shadow" style={{ width: "18rem" }} >
           <div className="text-center p-2">
           <img className="card-img-top img-fluid student_card_image" src={defaultUser}  alt="Card image cap" />
           </div>
           <hr/>
         
         <div className="card-body text-start">
           <h5 className="card-title hr_card_text"><b>Name: </b>{hrData.name}</h5>
           <p className="card-text hr_card_text"><b>Type: </b> {hrData.type}</p>
           <p className="card-text hr_card_text"><b>Company Name: </b> {hrData.companyName}</p>
           <p className="card-text hr_card_text"><b>Phone Number: </b> {hrData.phoneNumber} </p>
           <p className="card-text hr_card_text"><b>Date: </b>07-10-2021 </p>
           <div className="d-flex justify-content-start align-content-center">
           <div>
               <button href="#" className="btn btn-warning" onClick={hrViewButton}>View</button>
             </div>
             <div>
               <button href="#" className="btn btn-success ml-2" onClick={hrAcceptBtn} >Accept</button>
             </div>
             <div>
               <button href="#" className="btn btn-danger ml-3" onClick={hrRejectBtn}>Reject</button>
             </div>
           </div>
         </div>
         </div>
        </>
    );
}


export default HrRequestCard;