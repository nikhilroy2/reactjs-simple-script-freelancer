import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import { addTimerList, updateAddTimer } from '../../Redux/State/AddTimer/AddTimerSlice';
import axios from 'axios';

import { getTimersApi, addTimerApi, updateTimerApi, getTimersSingleApi } from '../../Api/Api';

function AddTimer(props) {
    // updating var
    const navigate = useNavigate();
    const location = useLocation();
    const updateIndex = new URLSearchParams(location.search).get("update");

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
    // const dispatch = useDispatch();
    let [addTimerInfo, setAddTimerInfo] = useState([]);

    let fetchData = async (id) => {
        const data = await getTimersSingleApi(id)
        //let newData = data.data.filter((v, i) => Number(v.ID) === Number(updateIndex));
        //console.log('newData', (data.data));
        //console.log(newData[0])
        //console.log(newData)
        setAddTimerInfo((data.data));
    }

    //console.log(addTimerInfo.length)

    const submitFormHandle = (event) => {
        event.preventDefault();

        let submit_btn = event.nativeEvent.submitter
        submit_btn.innerHTML += '<span class="spinner spinner-border spinner-sm spinner-border-sm ms-2"> </span>';
        submit_btn.setAttribute("disabled", 'disabled')

        // let img_local_src = '';
        // let reader = new FileReader();
        let file = image_field.current.files[0];

        // reader.onloadend = () => {
        //     let img_data = reader.result;
        //     let base64_data = btoa(img_data);
        //     img_local_src = `data:image/jpeg;base64,${base64_data}`;
        //     dataResult(img_local_src);
        // }

        // if (file) {
        //     reader.readAsBinaryString(file);
        // }

        // if (image_field.current.value === '') {
        //     dataResult();
        // }


        function generateUUID() {
            const cryptoObj = window.crypto || window.msCrypto; // for IE 11
            const buffer = new Uint16Array(8);
            cryptoObj.getRandomValues(buffer);
            return (
                buffer[0].toString(16) +
                buffer[1].toString(16) +
                '-' +
                buffer[2].toString(16) +
                '-' +
                buffer[3].toString(16) +
                '-' +
                buffer[4].toString(16) +
                '-' +
                buffer[5].toString(16) +
                buffer[6].toString(16) +
                buffer[7].toString(16)
            );
        }
        dataResult();

        async function dataResult(image_src = '') {
            let newFormValue = new FormData();
            newFormValue.append('id', generateUUID());
            newFormValue.append('name_field', name_field.current.value);

            file && newFormValue.append('image_field', file)
            newFormValue.append('inhale_field', inhale_field.current.value);
            newFormValue.append('hold_1_field', hold_1_field.current.value);
            newFormValue.append('exhale_field', exhale_field.current.value);
            newFormValue.append('hold_2_field', hold_2_field.current.value);
            newFormValue.append('number_of_cycles_field', number_of_cycles_field.current.value);

            console.log(newFormValue)

            if (updateIndex) {
                // for update data
                //console.log('updateIndex', updateIndex)
                // dispatch(updateAddTimer({ updateIndex, newFormValue }));
                console.log(updateIndex, newFormValue)
                await updateTimerApi(Number(updateIndex), newFormValue) // api post 
                alert('Information updated successfully!')
                navigate('/manage_timers') // redirect to manage timer page
            } else {
                // dispatch(addTimerList(await addTimerApi(newFormValue)));
                //console.log(newFormValue)
                await addTimerApi(newFormValue) // api post 

                alert('Information added successfully!')
                navigate('/manage_timers') // redirect to manage timer page
            }

        }

    };

    useEffect(() => {
        if (updateIndex && addTimerInfo.length === 0) {
            fetchData(updateIndex) // 
        }
    })
    return (
        <div id='addTimer'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-black fw-bold"> {updateIndex ? 'Update Timer' : 'Add Timer'}</h1>
                    </div>
                </div>
                <form onSubmit={event => submitFormHandle(event)} className='text-black mx-auto my-3 shadow rounded border border-secondary bg-light px-3 px-md-5 py-3' style={{ maxWidth: '600px' }}>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="name_field">Name</label>
                        <input required defaultValue={updateIndex ? addTimerInfo.name : ''} type="text" ref={name_field} className="form-control" id="name_field" aria-describedby="" placeholder="Enter name" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image_field" className='d-block mb-2'>Image upload</label>
                        {
                            updateIndex ? <input type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file form-control" id="image_field" />
                                :
                                <input required type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file form-control" id="image_field" />
                        }

                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="inhale_field">Inhale</label>
                        <input required type="number" defaultValue={updateIndex ? addTimerInfo.inhale : ''} ref={inhale_field} className="form-control" id="inhale_field" aria-describedby="" placeholder="Enter inhale" />
                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="hold_1_field">Hold 1</label>
                        <input required type="number" ref={hold_1_field} defaultValue={updateIndex ? addTimerInfo.hold1 : ''} className="form-control" id="hold_1_field" aria-describedby="" placeholder="Enter hold 1" />
                    </div>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="exhale_field">Exhale</label>
                        <input required type="number" ref={exhale_field} defaultValue={updateIndex ? addTimerInfo.exhale : ''} className="form-control" id="exhale_field" aria-describedby="" placeholder="Enter exhale" />
                    </div>

                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="hold_2_field">Hold 2</label>
                        <input required type="number" ref={hold_2_field} defaultValue={updateIndex ? addTimerInfo.hold2 : ''} className="form-control" id="hold_2_field" aria-describedby="" placeholder="Enter hold 2" />
                    </div>

                    <div className="form-group mb-4">
                        <label className='mb-2' htmlFor="number_of_cycles_field">Number of cycles</label>
                        <input required type="number" ref={number_of_cycles_field} defaultValue={updateIndex ? addTimerInfo.cycles : ''} className="form-control" id="number_of_cycles_field" aria-describedby="" placeholder="Enter number of cycles" />
                    </div>

                    <div className="form-group mb-3 text-center">
                        <button className="btn btn-primary px-5">
                            {updateIndex ? 'Update' : 'Submit'}
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