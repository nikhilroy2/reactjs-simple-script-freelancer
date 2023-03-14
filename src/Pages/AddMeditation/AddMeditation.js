import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addMeditationList, updateAddMeditation } from '../../Redux/State/AddMeditationSlice/AddMeditationSlice';

function AddMeditation(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const updateIndex = new URLSearchParams(location.search).get("update");



    // field default value
    const name_field = useRef();
    const image_field = useRef();
    const audio_field = useRef();

    const dispatch = useDispatch();
    let stateList = useSelector(state => state.addMeditation.value);

    const submitFormHandle = (event) => {
        event.preventDefault();

        // for img field local use.
        let img_local_src = '';
        //console.log(image_field.current.files[0])
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

        function dataResult(image_src = '') {
            let newFormValue = {
                id: generateUUID(),
                name_field: name_field.current.value,
                image_field: image_src !== '' ? image_src : '',
                audio_field: audio_field.current.value
            }

            if (updateIndex) {
                // for update data
                //console.log('updateIndex', updateIndex)
                dispatch(updateAddMeditation({ updateIndex, newFormValue }));

                alert('Information updated successfully!')
                navigate('/manage_meditation') // redirect to manage timer page
            } else {

                // for add data
                dispatch(addMeditationList(newFormValue));

                alert('Information added successfully!')
                navigate('/manage_meditation') // redirect to manage timer page

            }

        }
    }
    return (
        <div id='addTimer'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-white fw-bold"> {updateIndex && stateList.length > 0 ? 'Update Meditation' : 'Add Meditation'}</h1>
                    </div>
                </div>
                <form onSubmit={event => submitFormHandle(event)} className='text-white mx-auto my-3 shadow rounded border border-secondary bg-dark px-3 px-md-5 py-3' style={{ maxWidth: '600px' }}>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="name_field">Name</label>
                        <input defaultValue={updateIndex ? stateList[updateIndex].name_field : ''} type="text" ref={name_field} className="form-control" id="name_field" aria-describedby="" placeholder="Enter name" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image_field" className='d-block mb-2'>Image upload</label>
                        <input type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file" id="image_field" />
                    </div>


                    <div className="form-group mb-4">
                        <label className='mb-2' htmlFor="audio_field">Audio upload</label>
                        <input type="file" accept='.mp3,.amr,.wav' ref={audio_field} defaultValue={updateIndex ? stateList[updateIndex].number_of_cycles_field : ''} className="form-control" id="number_of_cycles_field" aria-describedby="" placeholder="Enter number of cycles" />
                    </div>

                    <div className="form-group mb-3 text-center">
                        <button className="btn btn-primary px-5">
                            {updateIndex && stateList.length > 0 ? 'Update' : 'Submit'}
                        </button>
                    </div>

                    <div className="form-group mb-3 text-center">
                        <Link to="/manage_meditations" className="btn btn-secondary px-5">Manage Meditation</Link>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default AddMeditation;