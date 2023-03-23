import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';


//import { addMeditationList, updateAddMeditation } from '../../Redux/State/AddMeditationSlice/AddMeditationSlice';
import { addMeditationApi, updateMeditationApi, getMeditationSingleApi } from '../../Api/Api';
function AddMeditation(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const updateIndex = new URLSearchParams(location.search).get("update");

    // field default value
    const name_field = useRef();
    const image_field = useRef();
    const audio_field = useRef();
    const details_field = useRef();


    // const dispatch = useDispatch();
    // let stateList = useSelector(state => state.addMeditation.value);
    const [stateList, setStateList] = useState([]);

    let fetchData = async (id) => {
        const data = await getMeditationSingleApi(id)
        //let newData = data.data.filter((v, i) => Number(v.ID) === Number(updateIndex));
        //console.log('newData', (data.data));
        //console.log(newData[0])
        //console.log(newData)
        console.log(data.data)
        setStateList((data.data));
    }


    const submitFormHandle = (event) => {
        event.preventDefault();
        let submit_btn = event.nativeEvent.submitter
        submit_btn.innerHTML += '<span class="spinner spinner-border spinner-sm spinner-border-sm ms-2"> </span>';
        submit_btn.setAttribute("disabled", 'disabled')

        // for img field local use.
        // let img_local_src = '';
        //console.log(image_field.current.files[0])
        // let reader = new FileReader();
        let file = image_field.current.files[0];

        // reader.onloadend = () => {
        //     img_local_src = reader.result;
        //     getAudioSrc(img_local_src)

        // }
        // if (file) {
        //     reader.readAsDataURL(file);
        // }

        // if (image_field.current.value === '') {
        //     getAudioSrc()
        // }

        getAudioSrc()



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

        function formatTime(duration) {
            let hours = Math.floor(duration / 3600);
            let minutes = Math.floor((duration % 3600) / 60);
            let seconds = Math.floor(duration % 60);

            if (hours > 0) {
                return hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
            } else {
                return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
            }
        }

        async function getAudioSrc(img_src = '') {

            let audioFile = audio_field.current.files[0];
            //console.log(audio_field.current.files)
            //console.log('audioFile', audioFile)
            let newFormValue = new FormData();
            newFormValue.append('id', generateUUID());
            newFormValue.append('name_field', name_field.current.value);
            newFormValue.append('details_field', details_field.current.value);
            audioFile && newFormValue.append('audio_field', audioFile);
            newFormValue.append('audio_duration', '');
            file && newFormValue.append('image_field', file);

            // audioFile
            if (false) {
                let reader = new FileReader();

                reader.onloadend = () => {
                    let audio = new Audio(reader.result);
                    audio.addEventListener('loadedmetadata', async () => {

                        newFormValue.audio_field = reader.result;

                        let formattedDuration = formatTime(audio.duration);
                        //console.log(formattedDuration)
                        newFormValue.audio_duration = formattedDuration;
                        //console.log(reader.result)
                        if (updateIndex) {
                            // dispatch(updateAddMeditation(newFormValue));
                            await updateMeditationApi(updateIndex, newFormValue)

                            alert('Information update successfully!');
                            navigate('/manage_meditation'); // redirect to manage timer page
                        } else {
                            // dispatch(addMeditationList(newFormValue));
                            console.log(newFormValue)
                            await addMeditationApi(newFormValue)

                            alert('Information added successfully!');
                            navigate('/manage_meditation'); // redirect to manage timer page
                        }

                    })

                };
                reader.readAsDataURL(audioFile);
            } else {
                if (updateIndex) {
                    // dispatch(updateAddMeditation({ updateIndex, newFormValue }));
                    await updateMeditationApi(updateIndex, newFormValue)
                    alert('Information added successfully!');
                } else {
                    // dispatch(addMeditationList(newFormValue));
                    await addMeditationApi(newFormValue)
                    alert('Information added successfully!');
                }
                navigate('/manage_meditation'); // redirect to manage timer page

            }
        }
    }

    useEffect(() => {
        if (updateIndex && stateList.length === 0) {
            fetchData(updateIndex) // 
        }
    })
    return (
        <div id='addMeditation'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-black fw-bold"> {updateIndex ? 'Update Meditation' : 'Add Meditation'}</h1>
                    </div>
                </div>
                <form onSubmit={event => submitFormHandle(event)} encType="multipart/form-data" className='text-black mx-auto my-3 shadow rounded border border-secondary bg-light px-3 px-md-5 py-3' style={{ maxWidth: '600px' }}>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="name_field">Name</label>
                        <input required defaultValue={updateIndex ? stateList.name : ''} type="text" ref={name_field} className="form-control" id="name_field" aria-describedby="" placeholder="Enter name" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image_field" className='d-block mb-2'>Image upload</label>
                        {updateIndex ? <input type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file form-control" id="image_field" />
                            : <input required type="file" accept='.jpg,.png,.gif,.jpge,.svg' ref={image_field} className="form-control-file form-control" id="image_field" />
                        }
                    </div>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="details_field">Details</label>
                        <textarea required ref={details_field} defaultValue={updateIndex ? stateList.details : ''} name="" id="details_field" rows="3" placeholder='Enter details' className="form-control w-100"></textarea>
                    </div>
                    <div className="form-group mb-4">
                        <label className='mb-2' htmlFor="audio_field">Audio upload</label>
                        {updateIndex ? <input type="file" accept='.mp3,.amr,.wav' ref={audio_field} className="form-control" id="number_of_cycles_field" aria-describedby="" placeholder="Enter number of cycles" />
                            : <input required type="file" accept='.mp3,.amr,.wav' ref={audio_field} className="form-control" id="number_of_cycles_field" aria-describedby="" placeholder="Enter number of cycles" />}

                    </div>

                    <div className="form-group mb-3 text-center">
                        <button className="btn btn-primary px-5">
                            {updateIndex ? 'Update' : 'Submit'}
                        </button>
                    </div>
                    <div className="form-group mb-3 text-center">
                        <Link to="/manage_meditation" className="btn btn-secondary px-5">Manage Meditation</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMeditation;