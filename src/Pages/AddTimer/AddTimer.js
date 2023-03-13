import React, { useRef, useState } from 'react';

function AddTimer(props) {
    const name_field = useRef();
    const image_field = useRef();
    const inhale_field = useRef();
    const hold_1_field = useRef();
    const exhale_field = useRef();
    const hold_2_field = useRef();
    const number_of_cycles_field = useRef();

    const [formValue, setFormValue] = useState([]);
    
    const submitFormHandle = (e)=> {
        e.preventDefault();

        console.log(name_field.current.value)
    }
    return (
        <div id='addTimer'>
            <div className="container">
                <div className="jumbotron jumbotron-fluid  my-3 text-center">
                    <div className="p-4">
                        <h1 className="display-4 text-white fw-bold">Add Timer</h1>
                    </div>
                </div>
                <form onSubmit={event=> submitFormHandle(event)} className='text-white mx-auto my-3 shadow rounded border border-secondary bg-dark px-3 px-md-5 py-3' style={{ maxWidth: '600px' }}>
                    <div className="form-group mb-3">
                        <label className='mb-2' htmlFor="name_field">Name</label>
                        <input type="text" ref={name_field} className="form-control" id="name_field" aria-describedby="" placeholder="Enter name" />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image_field" className='d-block mb-2'>Image upload</label>
                        <input type="file" ref={image_field} className="form-control-file" id="image_field" />
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

                    <div className="form-group mb-0 text-center">
                        <button className="btn btn-primary px-5">Submit</button>
                    </div>

                </form>


            </div>
        </div>
    );
}

export default AddTimer;