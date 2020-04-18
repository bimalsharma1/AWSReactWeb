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
    <div className="card p-3 col-6">
      <h2>Upload file</h2>
     
        <CSVReader
          cssClass="csv-reader-input"
          label="Select CSV file with LP or TOU"
          onFileLoaded={handleFileData}
          // onError={this.handleDarkSideForce}
          parserOptions={parseOptions}
          inputId="ObiWan"
          inputStyle={{color: 'red'}}
        />
{/*     
      <button onClick={()=> handleFileData}
                className="btn btn-primary mt-2">Save Data</button> */}
      <div>{JSON.stringify(lp)}</div>
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

export const ConnectedUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadComponent);
