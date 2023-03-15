import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addTimerList, deleteTimerUpdate } from '../../Redux/State/AddTimer/AddTimerSlice';

function ManageTimers(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let addTimerInfo = useSelector(state => state.addTimer.value);
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
            dispatch(deleteTimerUpdate(index));
        }
    }
    return (
        <div id='manageTimers'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-black fw-bold">Manage Timers</h1>
                    </div>
                </div>

                <div className="table_wrapper">
                    <div className="text-end mb-3"><Link to="/add_timer" className="btn btn-primary px-5">Add Timer</Link></div>

                    {addTimerInfo.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table text-black table-borderless border border-secondary">
                                <thead className='border-0'>
                                    <tr className='border-0 bg-secondary'>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>No.</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Name</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Image</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Inhale</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Hold 1</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Exhale</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Hold 2</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Number of cycles</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addTimerInfo.map((v, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='py-3 border-bottom border-secondary'>{i + 1}.</td>
                                                <td className='py-3 border-bottom border-secondary'>{v.name_field}</td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    <img src={v.image_field} alt="img" height="50px" />
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.inhale_field}
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.hold_1_field}
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.exhale_field}
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.hold_2_field}
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.number_of_cycles_field}
                                                </td>
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

                    ) : <h3 className="p-5 text-center text-black"> No data found!</h3>}

                </div>
            </div>
        </div>
    );
}

export default ManageTimers;