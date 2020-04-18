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

const UploadComponent = ({ lp, handleFileData }) => {
  return (
    <div className="card p-3 col-12">
      <h2>Upload file</h2>
     
        <CSVReader
          cssClass=""
          cssInpuClass="form-control form-control-lg"
          label="Select CSV file with LP or TOU"
          onFileLoaded={handleFileData}
          // onError={this.handleDarkSideForce}
          parserOptions={parseOptions}
          inputId="ObiWan"
          inputStyle={{color: 'red'}}
        />
      <div>
        <div>{lp.length > 0 ? 'File uploaded' : ''}</div>
        <div class="table-responsive-sm">
          <table class="table">
            {lp.map((val, index) => (
              <tr key={index}>
                <td>{val.meterPointCode}</td>
                <td>{val.dateTime}</td>
                <td>{val.dataValue}</td>
              </tr>
            ))}
          </table>
        </div>
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
  return {
    handleFileData(data, fileDetails) {
      console.log(JSON.stringify(data));
      console.log(fileDetails, fileDetails.name);
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

export const ConnectedUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadComponent);
