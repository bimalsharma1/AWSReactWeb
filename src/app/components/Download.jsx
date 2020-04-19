import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const DownloadComponent = ({ filter, setFilterDate, setFilterMeter, setFilterDataType, setFilterData, loadData, lpSummary }) => {
  return (
    <div>
      {/* <div>
        <button onClick={() => loadData()}
          className="btn btn-primary mt-2">GetData</button>
      </div>
      <div>{JSON.stringify(lpSummary)}</div> */}
      <div className="card p-3 col-12">
        <div>
          <div>
            <div class="table-responsive-sm">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Min</th>
                    <th scope="col">Max</th>
                    <th scope="col">Median</th>
                    <th scope="col">Download Link</th>
                  </tr>
                </thead>
                <tbody>
                  {lpSummary.map((val, index) => (
                    <tr key={index}>
                      <td>{val?.FileName}</td>
                      <td>{val?.Min}</td>
                      <td>{val?.Max}</td>
                      <td>{val?.Median}</td>
                      <td> 
                     
                        <CSVLink
                            data={lpSummary}
                            filename={val?.FileName}
                            className="btn btn-primary"
                            target="_blank"
                          >
                            Download
                        </CSVLink>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        {/* <div>
          <input onChange={setFilterDate} value={filter.date}
            className="form-control form-control-lg" />
        </div>
        <div>
          <input onChange={setFilterMeter} value={filter.meter}
            className="form-control form-control-lg" />
        </div>
        <div>
          <input onChange={setFilterDataType} value={filter.dataType}
            className="form-control form-control-lg" />
        </div>
        <div>
          <button onClick={() => setFilterData(filter.date, filter.meter, filter.dataType)}
            className="btn btn-primary mt-2">GetData</button>
        </div> */}

        <div>
          <a href="/" target="_top">Back</a>
        </div>
      </div>
    
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    filter: { date: '', meter: '', dataType: '' },
    lpSummary: state.lpSummary
  }
};

const mapDispatchToProps = (dispatch) => {
  // if (!state.lpSummary) {
  // dispatch(mutations.requestLPSummary());
  // }

  return {
    loadData() {
      dispatch(mutations.requestLPSummary());
    }

    // setFilterDate(id) {
    //   dispatch(requestTaskCreation(id));
    // },
    // setFilterMeter(id) {
    //   dispatch(requestTaskCreation(id));
    // },
    // setFilterDataType(id) {
    //   dispatch(requestTaskCreation(id));
    // },
    // setFilterData(id) {
    //   dispatch(requestTaskCreation(id));
    // }
    // setFilterDate, setFilterMeter, setFilterDataType, setFilterData
    // handleFileData(data) {
    //   console.log(JSON.stringify(data));
    //   const cleanData = data.map((val, index) => {
    //     return {
    //       id: uuidv4(),
    //       meterPointCode: val.meterpoint_code,
    //       serialNumber: val.serial_number,
    //       plantCode: val.plant_code,
    //       dateTime: val.date_time,
    //       dataType: val.data_type,
    //       dataValue: val.data_value,
    //       units: val.units,
    //       status: val.status
    //     };
    //   })

    //   dispatch(mutations.requestLPCreation(cleanData));
    // },
    // createNewTask(id) {
    //   console.log("Creating file contents", id);
    //   dispatch(requestTaskCreation(id));
    // }
  }
};

export const ConnectedDownload = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadComponent);
