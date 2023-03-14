import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addMeditationList, updateAddMeditation, deleteMeditationUpdate } from '../../Redux/State/AddMeditationSlice/AddMeditationSlice';
function ManageMeditations(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let stateList = useSelector(state => state.addMeditation.value);
    //console.log(addTimerInfo)
    const editHandle = (index) => {
        let isConfirm = window.confirm('Are you sure to update it?')
        if (isConfirm) {
            navigate(`/add_timer?update=${index}`)
        }
    }

    const deleteHandle = (index) => {

        // deleting item
        let isConfirm = window.confirm('Are you sure to delete it?')

        if (isConfirm) {
            dispatch(deleteMeditationUpdate(index));
        }
    }
    return (
        <div id='manageTimers'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-white fw-bold">Manage Meditation</h1>
                    </div>
                </div>

                <div className="table_wrapper">
                    <div className="text-end mb-3"><Link to="/add_meditation" className="btn btn-primary px-5">Add Meditation</Link></div>

                    {stateList.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table text-white table-borderless border border-secondary">
                                <thead className='border-0'>
                                    <tr className='border-0 bg-secondary'>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>No.</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Name</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Image</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Audio</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Audio duration</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stateList.map((v, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='py-3 border-bottom border-secondary'>{i + 1}.</td>
                                                <td className='py-3 border-bottom border-secondary'>{v.name_field}</td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    <img src={v.image_field} alt="img" height="50px" />
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    <audio src={v.audio_field}></audio>
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>Duration: 3434</td>

                                                <td className='py-3 border-bottom border-secondary'>
                                                    <button className='btn btn-sm btn-warning me-2' onClick={() => editHandle(i)}> Edit </button>
                                                    <button className='btn btn-sm btn-danger' onClick={() => deleteHandle(i)}> Delete </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>

                    ) : <h3 className="p-5 text-center text-white"> No data found!</h3>}

                </div>
            </div>
        </div>
    );
}

export default ManageMeditations;