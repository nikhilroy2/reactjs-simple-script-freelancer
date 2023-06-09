import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { addMeditationList, updateAddMeditation, deleteMeditationUpdate } from '../../Redux/State/AddMeditationSlice/AddMeditationSlice';
import { getMeditationApi, deleteMeditationApi } from '../../Api/Api';

function ManageMeditations(props) {
    const navigate = useNavigate();
    let audioRef = useRef()
    const dispatch = useDispatch();
    //console.log(addTimerInfo)
    const editHandle = (index) => {
        let isConfirm = window.confirm('Are you sure to update it?')
        if (isConfirm) {
            navigate(`/add_meditation?update=${index}`)
        }
    }

    const deleteHandle = async (index) => {

        // deleting item
        let isConfirm = window.confirm('Are you sure to delete it?')

        if (isConfirm) {
            //dispatch(deleteMeditationUpdate(index));
            await deleteMeditationApi(index);
            fetchData(); // updating

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }

    const playAudioHandle = (src, _self) => {
        let audio = audioRef.current;
        if (audio && !audio.paused) {
            console.log('pause')
            audio.pause();
            _self.innerHTML = 'Play';
        } else {
            console.log('play')

            audio = new Audio();
            audio.src = src;
            audio.play();
            audioRef.current = audio;

            audio.onplay = e => {
                _self.innerHTML = 'Pause';
            }

            audio.onended = e => {
                _self.innerHTML = 'Play';
            };
        }
    }


    let [stateList, setStateList] = useState([]);

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

    let fetchData = async () => {
        const data = await getMeditationApi();
        let newData = data.data.map(async (v) => {
            if (!v.audio) {
                return { ...v, audio_duration: 'N/A' };
            }

            let audio_duration = new Audio();
            audio_duration.src = `https://temp.thejournalapp.com/freelancer/${v.audio}`;

            return new Promise((resolve, reject) => {
                audio_duration.addEventListener('loadedmetadata', function () {
                    let get_duration = formatTime(audio_duration.duration);
                    resolve({ ...v, audio_duration: get_duration });
                });

                audio_duration.addEventListener('error', function () {
                    //console.error(`Failed to load audio: ${v.audio}`);
                    resolve({ ...v, audio_duration: 'N/A' });
                });
            });
        });

        Promise.all(newData).then((updatedData) => {
            //console.log('newData', updatedData);
            setStateList(updatedData);
        });
    }

    useEffect(() => {
        fetchData();
        return () => {
            // stop audio playback when unmounting component
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);
    //console.log(stateList)

    return (
        <div id='manageTimers'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-black fw-bold">Manage Meditation</h1>
                    </div>
                </div>

                <div className="table_wrapper">
                    <div className="text-end mb-3"><Link to="/add_meditation" className="btn btn-primary px-5">Add Meditation</Link></div>

                    {stateList.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table text-black table-borderless border border-secondary">
                                <thead className='border-0'>
                                    <tr className='border-0 bg-secondary'>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>No.</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Name</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Image</th>
                                        <th className='text-nowrap text-white pb-3 border-bottom border-secondary'>Details</th>

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
                                                <td className='py-3 border-bottom border-secondary'>{v.name}</td>
                                                <td className='py-3 border-bottom border-secondary'>
                                                    <img src={`http://temp.thejournalapp.com/freelancer/${v.image}`} alt="img" height="50px" />
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>{v.details}</td>

                                                <td className='py-3 border-bottom border-secondary'>
                                                    {v.audio_field !== '' && (
                                                        <button className='btn btn-success btn-sm' onClick={(event) => playAudioHandle(`https://temp.thejournalapp.com/freelancer/${v.audio}`, event.target)}>
                                                            Play
                                                        </button>
                                                    )}
                                                </td>
                                                <td className='py-3 border-bottom border-secondary'>

                                                    {v.audio !== '' && (
                                                        <span>Duration: {v.audio_duration}</span>
                                                    )}
                                                </td>

                                                <td className='py-3 border-bottom border-secondary'>
                                                    <button className='btn btn-sm btn-warning me-2' onClick={() => editHandle(v.id)}> Edit </button>
                                                    <button className='btn btn-sm btn-danger' onClick={() => deleteHandle(v.id)}> Delete </button>
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

export default ManageMeditations;