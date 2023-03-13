import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addTimerList } from '../../Redux/State/AddTimer/AddTimerSlice';


function AddTimer(props) {
    // updating var
    const location = useLocation();
    const isUpdateList = new URLSearchParams(location.search).get("update");
    //console.log('updateParam', updateParam)

    // field default value
    const name_field = useRef();
    const image_field = useRef();
    const inhale_field = useRef();
    const hold_1_field = useRef();
    const exhale_field = useRef();
    const hold_2_field = useRef();
    const number_of_cycles_field = useRef();
    //const [formValue, setFormValue] = useState([]);
    const dispatch = useDispatch();
    //let addTimerInfo = useSelector(state => state.addTimer.value);
    const submitFormHandle = (event) => {
        event.preventDefault();

        // for img field local use.
        let img_local_src = '';
        console.log(image_field.current.files[0])
        let reader = new FileReader();
        let file = image_field.current.files[0];

        reader.onloadend = () => {
            img_local_src = reader.result;
            dataResult(img_local_src)
        }
        if (file) {
            reader.readAsDataURL(file);
        }

        if (image_field.current.value === '') {
            dataResult()
        }
        function dataResult(image_src = '') {
            let newFormValue = {
                name_field: name_field.current.value,
                image_field: image_src !== '' ? image_src : '',
                inhale_field: inhale_field.current.value,
                hold_1_field: hold_1_field.current.value,
                exhale_field: exhale_field.current.value,
                hold_2_field: hold_2_field.current.value,
                number_of_cycles_field: number_of_cycles_field.current.value,
            }
            dispatch(addTimerList(newFormValue));

            alert('Information added successfully!')
        }

    }
    useEffect(() => {
        //console.log(addTimerInfo)
        //you can use ajax request here to store in database, use addTimerInfo variable for ajax data
    })
    //console.log(formValue)
    return (
        <div id='addTimer'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-white fw-bold"> {isUpdateList ? 'Update Timer' : 'Add Timer'}</h1>
                    </div>
                </div>
                <form onSubmit={event => submitFormHandle(event)} className='text-white mx-auto my-3 shadow rounded border border-secondary bg-dark px-3 px-md-5 py-3' style={{ maxWidth: '600px' }}>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="name_field">Name</label>
                        <input type="text" ref={name_field} className="form-control" id="name_field" aria-describedby="" placeholder="Enter name" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image_field" className='d-block mb-2'>Image upload</label>
                        <input type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file" id="image_field" />
                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="inhale_field">Inhale</label>
                        <input type="text" ref={inhale_field} className="form-control" id="inhale_field" aria-describedby="" placeholder="Enter inhale" />
                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="hold_1_field">Hold 1</label>
                        <input type="text" ref={hold_1_field} className="form-control" id="hold_1_field" aria-describedby="" placeholder="Enter hold 1" />
                    </div>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="exhale_field">Exhale</label>
                        <input type="text" ref={exhale_field} className="form-control" id="exhale_field" aria-describedby="" placeholder="Enter exhale" />
                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="hold_2_field">Hold 2</label>
                        <input type="text" ref={hold_2_field} className="form-control" id="hold_2_field" aria-describedby="" placeholder="Enter hold 2" />
                    </div>

                    <div className="form-group mb-4">
                        <label className='mb-2' htmlFor="number_of_cycles_field">Number of cycles</label>
                        <input type="text" ref={number_of_cycles_field} className="form-control" id="number_of_cycles_field" aria-describedby="" placeholder="Enter number of cycles" />
                    </div>

                    <div className="form-group mb-3 text-center">
                        <button className="btn btn-primary px-5">
                            {isUpdateList ? 'Update': 'Submit'}
                        </button>
                    </div>

                    <div className="form-group mb-3 text-center">
                        <Link to="/manage_timers" className="btn btn-secondary px-5">Manage Timers</Link>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default AddTimer;