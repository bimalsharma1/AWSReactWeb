import React from "react";
import CSVReader from 'react-csv-reader'
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { v4 as uuidv4 } from 'uuid';


const parseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header =>
    header
      .toLowerCase()
      .replace(/\W/g, '_')
}

const DownloadComponent = ({ lp, handleFileData }) => {
  return (
    <div className="card p-3 col-6">
            <div>
                <input onChange={setTaskName} value={task.name}
                className="form-control form-control-lg"/>
            </div>
            <div>
                <button onClick={()=> setTaskCompletion(id, !isComplete)}
                className="btn btn-primary mt-2">{isComplete ? `Reopen` : `Complete`}</button>
            </div>
            <div>
                <select onChange={setTaskGroup} value={task.group}
                className="form-control">
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Link to="/dashboard">
                    <button className="btn btn-primary mt-2">Done</button>
                </Link>
            </div>
        </div>
  );
};

const mapStateToProps = ( state, ownProps ) => {
  console.log(JSON.stringify(state));
  console.log(JSON.stringify(ownProps));
  return {
    lp:state.lp
  }
};

const mapDispatchToProps = (dispatch) => {
  // const id = new GUI
  return {
    handleFileData(data) {
      console.log(JSON.stringify(data));
      const cleanData = data.map((val, index) => { 
        return {id:uuidv4(),
          meterPointCode:val.meterpoint_code,
          serialNumber:val.serial_number,
          plantCode:val.plant_code,
          dateTime:val.date_time,
          dataType:val.data_type,
          dataValue:val.data_value,
          units:val.units,
          status:val.status}; 
    }) 
      
      dispatch(mutations.requestLPCreation(cleanData));
    },
    createNewTask(id) {
        console.log("Creating file contents", id);
        dispatch(requestTaskCreation(id));
    }
  }
};

export const ConnectedDownload = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadComponent);
